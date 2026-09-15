"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle, Archive, CheckCircle, Loader2, Syringe, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase"
import { useAuth } from "@/context/auth-context"
import {
  archiveAdminVaccine,
  getAdminVaccines,
  getApprovedVeterinarians,
  safeDeleteAdminVaccine,
  type AdminVaccine,
  type VeterinarianOption,
} from "@/lib/clinic-data"

type VacinaStatus = "vencida" | "proxima" | "ok" | "sem-dose"

function getVacinaStatus(proximaDose: string | null): { status: VacinaStatus; label: string; color: string } {
  if (!proximaDose) {
    return { status: "sem-dose", label: "Sem próxima dose", color: "bg-muted text-muted-foreground" }
  }

  const proxima = new Date(`${proximaDose}T00:00:00`)
  const now = new Date()
  const diffDays = Math.ceil((proxima.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return { status: "vencida", label: "Vencida", color: "bg-destructive/10 text-destructive" }
  if (diffDays <= 30) return { status: "proxima", label: "Próxima", color: "bg-woofy-gold/20 text-woofy-gold" }
  return { status: "ok", label: "Em dia", color: "bg-woofy-accent/20 text-primary" }
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "Não definida"
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("pt-BR")
}

function formatCurrency(value: number | null) {
  if (value == null) return "Não definido"
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

function vaccineStatusLabel(status: AdminVaccine["status"]) {
  const labels: Record<AdminVaccine["status"], string> = {
    recommended: "Recomendada",
    scheduled: "Agendada",
    confirmed: "Confirmada",
    applied: "Aplicada",
    cancelled: "Cancelada",
  }
  return labels[status] || status
}

export default function VacinacaoPage() {
  const { user, loading, refreshProfile } = useAuth()
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  const [vacinas, setVacinas] = useState<AdminVaccine[]>([])
  const [veterinarios, setVeterinarios] = useState<VeterinarianOption[]>([])
  const [filterVeterinarian, setFilterVeterinarian] = useState("todos")
  const [filterPet, setFilterPet] = useState("")
  const [filterTutor, setFilterTutor] = useState("")
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function loadVaccines() {
      if (loading) return
      if (!user) {
        router.replace("/login?redirect=/vacinacao")
        return
      }

      setIsLoadingData(true)
      setErrorMessage(null)
      await refreshProfile(user.id)

      try {
        const [vaccinesResult, veterinariansResult] = await Promise.all([
          getAdminVaccines(supabase),
          getApprovedVeterinarians(supabase),
        ])
        setVacinas(vaccinesResult)
        setVeterinarios(veterinariansResult)
      } catch {
        setErrorMessage("Não foi possível carregar as vacinas reais do Supabase.")
      } finally {
        setIsLoadingData(false)
      }
    }

    loadVaccines()
  }, [loading, refreshProfile, router, supabase, user])

  const filteredVacinas = useMemo(() => {
    const petSearch = filterPet.trim().toLowerCase()
    const tutorSearch = filterTutor.trim().toLowerCase()

    return vacinas.filter((vacina) => {
      const matchesVeterinarian = filterVeterinarian === "todos" || vacina.veterinarioId === filterVeterinarian
      const matchesPet = !petSearch || vacina.petNome.toLowerCase().includes(petSearch)
      const matchesTutor = !tutorSearch || vacina.tutorDisplayName.toLowerCase().includes(tutorSearch)
      return matchesVeterinarian && matchesPet && matchesTutor
    })
  }, [filterPet, filterTutor, filterVeterinarian, vacinas])

  const sortedVacinas = useMemo(() => {
    const order: Record<VacinaStatus, number> = { vencida: 0, proxima: 1, ok: 2, "sem-dose": 3 }
    return [...filteredVacinas].sort((a, b) => {
      const statusA = getVacinaStatus(a.proximaDose).status
      const statusB = getVacinaStatus(b.proximaDose).status
      return order[statusA] - order[statusB]
    })
  }, [filteredVacinas])

  const hasFilters = filterVeterinarian !== "todos" || filterPet || filterTutor

  function clearFilters() {
    setFilterVeterinarian("todos")
    setFilterPet("")
    setFilterTutor("")
  }

  async function handleArchive(vaccineId: string) {
    if (!user) return
    try {
      await archiveAdminVaccine(supabase, vaccineId, user.id)
      setVacinas((current) => current.filter((vacina) => vacina.id !== vaccineId))
    } catch {
      setErrorMessage("Não foi possível arquivar a vacina.")
    }
  }

  async function handleDelete(vaccineId: string) {
    const confirmed = window.confirm("Tem certeza que deseja excluir definitivamente este registro? Esta ação não poderá ser desfeita.")
    if (!confirmed) return

    try {
      const result = await safeDeleteAdminVaccine(supabase, vaccineId)
      if (!result.deleted) {
        setErrorMessage(result.reason || "Não foi possível excluir este registro com segurança.")
        return
      }
      setVacinas((current) => current.filter((vacina) => vacina.id !== vaccineId))
    } catch {
      setErrorMessage("Não foi possível excluir a vacina.")
    }
  }

  if (loading || isLoadingData) {
    return (
      <div className="flex min-h-[360px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-serif">Vacinação</h1>
        <p className="text-muted-foreground mt-1">Controle real de vacinas registradas pelos veterinários</p>
        {errorMessage && <p className="mt-2 text-sm text-destructive">{errorMessage}</p>}
      </div>

      <div className="grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-[1fr_1fr_1fr_auto]">
        <select
          value={filterVeterinarian}
          onChange={(event) => setFilterVeterinarian(event.target.value)}
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="todos">Todos os veterinários</option>
          {veterinarios.map((vet) => (
            <option key={vet.id} value={vet.id}>
              {vet.full_name || "Veterinário sem nome"}
            </option>
          ))}
        </select>
        <input
          type="search"
          placeholder="Buscar pet"
          value={filterPet}
          onChange={(event) => setFilterPet(event.target.value)}
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="search"
          placeholder="Buscar tutor"
          value={filterTutor}
          onChange={(event) => setFilterTutor(event.target.value)}
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="button"
          onClick={clearFilters}
          disabled={!hasFilters}
          className="h-10 rounded-lg border border-border px-4 text-sm font-medium text-card-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          Limpar filtros
        </button>
      </div>

      {sortedVacinas.length > 0 ? (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1500px]">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-4 py-3 text-sm font-semibold text-card-foreground">Pet</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-card-foreground">Tutor</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-card-foreground">Vacina</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-card-foreground">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-card-foreground">Recomendação</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-card-foreground">Agendada</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-card-foreground">Aplicação</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-card-foreground">Próxima Dose</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-card-foreground">Veterinário</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-card-foreground">Valor</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-card-foreground">Resposta do tutor</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-card-foreground">Status</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-card-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {sortedVacinas.map((vacina) => {
                  const statusInfo = getVacinaStatus(vacina.proximaDose)
                  return (
                    <tr key={vacina.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-card-foreground">{vacina.petNome}</td>
                      <td className="px-4 py-3 text-muted-foreground">{vacina.tutorDisplayName}</td>
                      <td className="px-4 py-3 text-card-foreground">{vacina.vacina}</td>
                      <td className="px-4 py-3 text-muted-foreground">{vaccineStatusLabel(vacina.status)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatDate(vacina.dataRecomendada)}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {vacina.dataAgendada ? `${formatDate(vacina.dataAgendada)} ${vacina.horarioAgendado || ""}` : "Não agendada"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{formatDate(vacina.dataAplicacao)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatDate(vacina.proximaDose)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{vacina.veterinarianDisplayName}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatCurrency(vacina.valor)}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {vacina.tutorResposta === "confirmada" && "Confirmada pelo tutor"}
                        {vacina.tutorResposta === "cancelada" && (
                          <span>
                            Cancelada pelo tutor
                            {vacina.tutorMotivoCancelamento ? ` - Motivo do cancelamento: ${vacina.tutorMotivoCancelamento}` : ""}
                          </span>
                        )}
                        {!vacina.tutorResposta && "Aguardando resposta do tutor"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium", statusInfo.color)}>
                          {statusInfo.status === "vencida" && <AlertTriangle className="h-3 w-3" />}
                          {statusInfo.status === "ok" && <CheckCircle className="h-3 w-3" />}
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleArchive(vacina.id)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-muted/80"
                            title="Arquivar vacina"
                          >
                            <Archive className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(vacina.id)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-destructive text-destructive-foreground transition-opacity hover:opacity-90"
                            title="Excluir definitivamente"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-xl border border-border">
          <Syringe className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-card-foreground">Nenhuma vacina registrada</h3>
          <p className="text-muted-foreground mt-1">Nenhuma vacina registrada.</p>
        </div>
      )}
    </div>
  )
}
