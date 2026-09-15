"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ArchiveRestore, FileText, Loader2, PawPrint, Stethoscope, Syringe } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { useAuth } from "@/context/auth-context"
import {
  getArchivedAdminConsultations,
  getArchivedAdminExams,
  getArchivedAdminPets,
  getArchivedAdminVaccines,
  restoreAdminConsultation,
  restoreAdminExam,
  restoreAdminPet,
  restoreAdminVaccine,
  type AdminConsultation,
  type AdminExam,
  type AdminPet,
  type AdminVaccine,
} from "@/lib/clinic-data"

type Tab = "pets" | "consultas" | "vacinas" | "exames"

const tabs: { id: Tab; label: string; icon: typeof PawPrint }[] = [
  { id: "pets", label: "Pets", icon: PawPrint },
  { id: "consultas", label: "Consultas", icon: Stethoscope },
  { id: "vacinas", label: "Vacinas", icon: Syringe },
  { id: "exames", label: "Exames", icon: FileText },
]

function formatArchivedAt(value: string | null) {
  if (!value) return "Data de arquivamento não registrada"
  return `Arquivado em: ${new Date(value).toLocaleString("pt-BR")}`
}

export default function ArquivadosPage() {
  const { user, loading, refreshProfile } = useAuth()
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  const [activeTab, setActiveTab] = useState<Tab>("pets")
  const [pets, setPets] = useState<AdminPet[]>([])
  const [consultas, setConsultas] = useState<AdminConsultation[]>([])
  const [vacinas, setVacinas] = useState<AdminVaccine[]>([])
  const [exames, setExames] = useState<AdminExam[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function loadArchived() {
    if (!user) return

    setIsLoadingData(true)
    setErrorMessage(null)
    await refreshProfile(user.id)

    try {
      const [petsResult, consultasResult, vacinasResult, examesResult] = await Promise.all([
        getArchivedAdminPets(supabase),
        getArchivedAdminConsultations(supabase),
        getArchivedAdminVaccines(supabase),
        getArchivedAdminExams(supabase),
      ])
      setPets(petsResult)
      setConsultas(consultasResult)
      setVacinas(vacinasResult)
      setExames(examesResult)
    } catch {
      setErrorMessage("Não foi possível carregar os registros arquivados.")
    } finally {
      setIsLoadingData(false)
    }
  }

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace("/login?redirect=/arquivados")
      return
    }

    loadArchived()
  }, [loading, router, user])

  async function restore(type: Tab, id: string) {
    try {
      if (type === "pets") await restoreAdminPet(supabase, id)
      if (type === "consultas") await restoreAdminConsultation(supabase, id)
      if (type === "vacinas") await restoreAdminVaccine(supabase, id)
      if (type === "exames") await restoreAdminExam(supabase, id)
      await loadArchived()
    } catch {
      setErrorMessage("Não foi possível restaurar o registro.")
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
        <h1 className="font-serif text-3xl font-bold text-foreground">Arquivados</h1>
        <p className="mt-1 text-muted-foreground">Registros removidos das listagens principais sem apagar dados clínicos.</p>
        {errorMessage && <p className="mt-2 text-sm text-destructive">{errorMessage}</p>}
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors sm:flex-none ${
                isActive ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-card-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {activeTab === "pets" && (
        <ArchivedGrid emptyText="Nenhum pet arquivado.">
          {pets.map((pet) => (
            <ArchivedItem
              key={pet.id}
              title={pet.nome}
              lines={[`Tutor: ${pet.tutorProfileName || pet.tutor}`, `Espécie: ${pet.especie}`, `Raça: ${pet.raca}`, formatArchivedAt(pet.archivedAt)]}
              onRestore={() => restore("pets", pet.id)}
            />
          ))}
        </ArchivedGrid>
      )}

      {activeTab === "consultas" && (
        <ArchivedGrid emptyText="Nenhuma consulta arquivada.">
          {consultas.map((consulta) => (
            <ArchivedItem
              key={consulta.id}
              title={`${consulta.petNome} - ${consulta.data}`}
              lines={[`Tutor: ${consulta.tutorDisplayName}`, `Veterinário: ${consulta.veterinarianDisplayName}`, `Status: ${consulta.status}`, consulta.motivo, formatArchivedAt(consulta.archivedAt)]}
              onRestore={() => restore("consultas", consulta.id)}
            />
          ))}
        </ArchivedGrid>
      )}

      {activeTab === "vacinas" && (
        <ArchivedGrid emptyText="Nenhuma vacina arquivada.">
          {vacinas.map((vacina) => (
            <ArchivedItem
              key={vacina.id}
              title={`${vacina.petNome} - ${vacina.vacina}`}
              lines={[`Tutor: ${vacina.tutorDisplayName}`, `Veterinário: ${vacina.veterinarianDisplayName}`, `Status: ${vacina.status}`, formatArchivedAt(vacina.archivedAt)]}
              onRestore={() => restore("vacinas", vacina.id)}
            />
          ))}
        </ArchivedGrid>
      )}

      {activeTab === "exames" && (
        <ArchivedGrid emptyText="Nenhum exame arquivado.">
          {exames.map((exame) => (
            <ArchivedItem
              key={exame.id}
              title={`${exame.petNome} - ${exame.examDisplayName}`}
              lines={[`Tutor: ${exame.tutorDisplayName}`, `Veterinário: ${exame.veterinarianDisplayName}`, `Categoria: ${exame.categoria}`, `Status: ${exame.status}`, formatArchivedAt(exame.archivedAt)]}
              onRestore={() => restore("exames", exame.id)}
            />
          ))}
        </ArchivedGrid>
      )}
    </div>
  )
}

function ArchivedGrid({ children, emptyText }: { children: React.ReactNode; emptyText: string }) {
  const items = Array.isArray(children) ? children.filter(Boolean) : children
  if (Array.isArray(items) && items.length === 0) {
    return <div className="rounded-xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">{emptyText}</div>
  }
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{children}</div>
}

function ArchivedItem({ title, lines, onRestore }: { title: string; lines: string[]; onRestore: () => void }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="break-words font-semibold text-card-foreground">{title}</h2>
      <div className="mt-2 space-y-1">
        {lines.map((line) => (
          <p key={line} className="break-words text-sm text-muted-foreground">{line}</p>
        ))}
      </div>
      <button
        type="button"
        onClick={onRestore}
        className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-muted sm:w-auto"
      >
        <ArchiveRestore className="h-4 w-4" />
        Restaurar
      </button>
    </div>
  )
}
