import type { createClient } from "@/lib/supabase"
import type { ApprovalStatus, UserRole } from "@/lib/auth-routes"

type SupabaseBrowserClient = ReturnType<typeof createClient>

export type Especie = "cao" | "gato" | "aves" | "roedores" | "coelhos" | "outro"
export type AgendamentoStatus = "agendado" | "confirmado" | "realizado" | "cancelado"
export type AppointmentStatus = AgendamentoStatus
export type ConsultaStatus = "agendada" | "realizada" | "cancelada"
export type HistoricoTipo = "consulta" | "vacina" | "exame"
export type VaccineStatus = "recommended" | "scheduled" | "confirmed" | "applied" | "cancelled"
export type ExamCategory = "imagem" | "laboratorial"
export type ExamStatus = "recommended" | "scheduled" | "confirmed" | "cancelled"
export type FinancialEntryStatus = "active" | "cancelled"

export interface ProfileSummary {
  id: string
  fullName: string | null
  role: "tutor" | "veterinario" | "admin"
}

interface PetRow {
  id: string
  user_id: string
  nome: string
  especie: Especie
  raca: string
  data_nascimento: string | null
  peso: number | null
  tutor: string
  telefone_tutor: string | null
  foto: string | null
  arquivado: boolean
  created_at: string
}

interface AgendamentoRow {
  id: string
  pet_id: string
  user_id: string
  tutor: string
  data: string
  horario_inicio: string
  horario_fim: string
  veterinario: string
  tipo: string
  status?: AgendamentoStatus | null
  veterinario_id?: string | null
  tutor_archived_at?: string | null
  veterinario_archived_at?: string | null
  preco_estimado?: number | null
  is_archived?: boolean | null
  archived_at?: string | null
  archived_by?: string | null
  created_at: string
}

interface ConsultaRow {
  id: string
  pet_id: string
  user_id: string
  tutor: string
  data: string
  horario: string
  veterinario: string
  motivo: string
  status: ConsultaStatus
  agendamento_id?: string | null
  veterinario_id?: string | null
  valor?: number | null
  is_archived?: boolean | null
  archived_at?: string | null
  archived_by?: string | null
  created_at: string
}

interface HistoricoRow {
  id: string
  pet_id: string
  user_id: string
  data: string
  tipo: HistoricoTipo
  descricao: string
  veterinario: string
  consulta_id?: string | null
  agendamento_id?: string | null
  created_at: string
}

interface VacinaRow {
  id: string
  pet_id: string
  user_id: string
  vacina: string
  data_aplicacao: string | null
  proxima_dose: string | null
  veterinario_id?: string | null
  valor?: number | null
  status?: VaccineStatus | null
  data_recomendada?: string | null
  data_agendada?: string | null
  horario_agendado?: string | null
  tutor_resposta?: string | null
  tutor_respondeu_em?: string | null
  tutor_motivo_cancelamento?: string | null
  is_archived?: boolean | null
  archived_at?: string | null
  archived_by?: string | null
  created_at: string
}

interface ExameRow {
  id: string
  pet_id: string
  user_id: string
  veterinario_id: string
  categoria: ExamCategory
  tipo: string
  nome_personalizado?: string | null
  observacoes?: string | null
  valor: number
  data_recomendada: string
  data_agendada?: string | null
  horario_agendado?: string | null
  status?: ExamStatus | null
  tutor_resposta?: string | null
  tutor_respondeu_em?: string | null
  tutor_motivo_cancelamento?: string | null
  consulta_id?: string | null
  is_archived?: boolean | null
  archived_at?: string | null
  archived_by?: string | null
  created_at: string
}

interface LancamentoRow {
  id: string
  user_id: string
  descricao: string
  tipo: FinancialEntryType
  valor: number
  data: string
  categoria: string
  origem_tipo?: string | null
  origem_id?: string | null
  status?: FinancialEntryStatus | null
  created_at: string
}

interface ProfileRow {
  id: string
  full_name: string | null
  role: UserRole
  crmv?: string | null
}

interface ApprovalProfileRow {
  id: string
  full_name: string | null
  email: string | null
  role: UserRole
  approval_status: ApprovalStatus
  created_at: string
}

export type FinancialEntryType = "entrada" | "saida"

export type VeterinarianOption = {
  id: string
  full_name: string | null
  crmv: string
}

export interface AdminConsultationWeekdayStat {
  name: string
  consultas: number
}

export interface AdminFinancialEntry {
  id: string
  userId: string
  descricao: string
  tipo: FinancialEntryType
  valor: number
  data: string
  categoria: string
  origemTipo: string | null
  origemId: string | null
  status: FinancialEntryStatus
  createdAt: string
}

export interface CreateFinancialEntryInput {
  userId: string
  descricao: string
  tipo: FinancialEntryType
  valor: number
  data: string
  categoria: string
}

export interface FinancialSummary {
  receitaMes: number
  despesasMes: number
  lucroLiquido: number
}

export interface PendingProfile {
  id: string
  fullName: string | null
  email: string | null
  role: UserRole
  approvalStatus: ApprovalStatus
  createdAt: string
}

export interface AdminPet {
  id: string
  userId: string
  nome: string
  especie: Especie
  raca: string
  dataNascimento: string | null
  peso: number | null
  tutor: string
  tutorProfileName: string | null
  telefoneTutor: string | null
  foto: string | null
  arquivado: boolean
  createdAt: string
}

export interface AdminAppointment {
  id: string
  petId: string
  userId: string
  petNome: string
  tutor: string
  tutorProfileName: string | null
  data: string
  horarioInicio: string
  horarioFim: string
  veterinario: string
  veterinarioId: string | null
  tipo: string
  status: AgendamentoStatus
  tutorArchivedAt: string | null
  veterinarianArchivedAt: string | null
  isArchived: boolean
  archivedAt: string | null
  precoEstimado: number | null
  createdAt: string
}

export interface ClinicAppointment extends AdminAppointment {
  tutorDisplayName: string
  veterinarianDisplayName: string
}

export interface ClinicAppointmentDetail extends ClinicAppointment {
  pet: {
    id: string
    nome: string
    especie: Especie
    raca: string
    dataNascimento: string | null
    peso: number | null
  }
  tutorProfileName: string | null
  tutorEmail: string | null
  veterinarianProfileName: string | null
  consultation: AdminConsultation | null
  historyEntry: AdminHistoryEntry | null
}

export interface AdminConsultation {
  id: string
  petId: string
  userId: string
  petNome: string
  tutor: string
  tutorProfileName: string | null
  tutorDisplayName: string
  data: string
  horario: string
  veterinario: string
  veterinarioId: string | null
  veterinarianProfileName: string | null
  veterinarianDisplayName: string
  motivo: string
  status: ConsultaStatus
  agendamentoId: string | null
  appointmentDate: string | null
  appointmentStartTime: string | null
  appointmentEndTime: string | null
  valor: number | null
  isArchived: boolean
  archivedAt: string | null
  createdAt: string
}

export interface AdminHistoryEntry {
  id: string
  petId: string
  userId: string
  petNome: string
  tutor: string
  tutorProfileName: string | null
  tutorDisplayName: string
  data: string
  tipo: HistoricoTipo
  descricao: string
  veterinario: string
  consultaId: string | null
  agendamentoId: string | null
  consultationReason: string | null
  consultationVeterinarianId: string | null
  consultationStatus: ConsultaStatus | null
  consultationTime: string | null
  veterinarianProfileName: string | null
  veterinarianDisplayName: string
  createdAt: string
}

export interface TutorConsultationFeedback {
  id: string
  petId: string
  petNome: string
  data: string
  horario: string
  veterinarianDisplayName: string
  feedback: string
  appointmentDate: string | null
  appointmentStartTime: string | null
  agendamentoId: string | null
  valor: number | null
}

export interface ClinicPetOption {
  id: string
  userId: string
  nome: string
  tutorDisplayName: string
}

export interface AdminVaccine {
  id: string
  petId: string
  userId: string
  petNome: string
  tutorDisplayName: string
  tutorEmail: string | null
  vacina: string
  dataAplicacao: string | null
  proximaDose: string | null
  status: VaccineStatus
  dataRecomendada: string | null
  dataAgendada: string | null
  horarioAgendado: string | null
  tutorResposta: string | null
  tutorRespondeuEm: string | null
  tutorMotivoCancelamento: string | null
  veterinarioId: string | null
  veterinarianDisplayName: string
  valor: number | null
  isArchived: boolean
  archivedAt: string | null
  createdAt: string
}

export interface AdminExam {
  id: string
  petId: string
  userId: string
  petNome: string
  tutorDisplayName: string
  categoria: ExamCategory
  tipo: string
  nomePersonalizado: string | null
  examDisplayName: string
  observacoes: string | null
  valor: number
  dataRecomendada: string
  dataAgendada: string | null
  horarioAgendado: string | null
  status: ExamStatus
  tutorResposta: string | null
  tutorRespondeuEm: string | null
  tutorMotivoCancelamento: string | null
  veterinarioId: string
  veterinarianDisplayName: string
  consultaId: string | null
  isArchived: boolean
  archivedAt: string | null
  createdAt: string
}

export interface SaveAdminPetInput {
  userId: string
  nome: string
  especie: Especie
  raca: string
  dataNascimento: string | null
  peso: number | null
  tutor: string
  telefoneTutor: string | null
}

export interface CreateAdminAppointmentInput {
  petId: string
  data: string
  horarioInicio: string
  horarioFim: string
  veterinario: string
  veterinarioId: string | null
  tipo: string
}

export interface CreateTutorAppointmentInput {
  petId: string
  userId: string
  tutor: string
  data: string
  horarioInicio: string
  horarioFim: string
  veterinario?: string
  veterinarioId?: string | null
  tipo: string
}

export interface CreateClinicalFeedbackInput {
  appointment: ClinicAppointment
  veterinarianId: string
  veterinarianName: string
  feedback: string
  historyDescription: string
  historyType: HistoricoTipo
  historyDate: string
  valor?: number | null
}

export interface CreateVaccineRecordInput {
  petId: string
  userId: string
  vacina: string
  dataAplicacao?: string | null
  proximaDose: string | null
  dataAgendada?: string | null
  horarioAgendado?: string | null
  veterinarioId: string
  valor?: number | null
  status?: VaccineStatus
}

export interface CreateExamRecordInput {
  petId: string
  userId: string
  categoria: ExamCategory
  tipo: string
  nomePersonalizado?: string | null
  observacoes?: string | null
  valor: number
  dataAgendada?: string | null
  horarioAgendado?: string | null
  veterinarioId: string
  status?: ExamStatus
  consultaId?: string | null
}

export interface SafeDeleteResult {
  deleted: boolean
  reason?: string
}

export interface TutorVaccineResponseInput {
  vaccineId: string
  userId: string
  reason?: string
}

export interface TutorExamResponseInput {
  examId: string
  userId: string
  reason?: string
}

const defaultConsultationPrice = 180
const defaultVaccinePrice = 95
const defaultExamPrice = 160

function getDefaultAppointmentPrice(tipo: string) {
  const normalizedType = tipo.toLowerCase()
  if (normalizedType.includes("vacina")) return defaultVaccinePrice
  if (normalizedType.includes("consulta")) return defaultConsultationPrice
  return defaultConsultationPrice
}

function getFictitiousCrmv(profileId: string) {
  const numericSeed = profileId.replace(/\D/g, "").slice(-5)
  const suffix = numericSeed.padStart(5, "0")
  return `CRMV-SP ${suffix}`
}

function clinicDataError(error: unknown) {
  if (error instanceof Error) return error
  if (typeof error === "object" && error !== null) return new Error(JSON.stringify(error))
  return new Error(String(error))
}

function profileMap(profiles: ProfileRow[]) {
  return profiles.reduce<Record<string, ProfileRow>>((acc, profile) => {
    acc[profile.id] = profile
    return acc
  }, {})
}

function mapPet(row: PetRow, profilesById: Record<string, ProfileRow>): AdminPet {
  return {
    id: row.id,
    userId: row.user_id,
    nome: row.nome,
    especie: row.especie,
    raca: row.raca,
    dataNascimento: row.data_nascimento,
    peso: row.peso,
    tutor: row.tutor,
    tutorProfileName: profilesById[row.user_id]?.full_name || null,
    telefoneTutor: row.telefone_tutor,
    foto: row.foto,
    arquivado: row.arquivado,
    createdAt: row.created_at,
  }
}

function mapAppointment(
  row: AgendamentoRow,
  petsById: Record<string, PetRow>,
  profilesById: Record<string, ProfileRow>,
): AdminAppointment {
  return {
    id: row.id,
    petId: row.pet_id,
    userId: row.user_id,
    petNome: petsById[row.pet_id]?.nome || "Pet sem nome",
    tutor: row.tutor,
    tutorProfileName: profilesById[row.user_id]?.full_name || null,
    data: row.data,
    horarioInicio: row.horario_inicio,
    horarioFim: row.horario_fim,
    veterinario: row.veterinario,
    veterinarioId: row.veterinario_id || null,
    tipo: row.tipo,
    status: row.status || "agendado",
    tutorArchivedAt: row.tutor_archived_at || null,
    veterinarianArchivedAt: row.veterinario_archived_at || null,
    isArchived: Boolean(row.is_archived),
    archivedAt: row.archived_at || null,
    precoEstimado: row.preco_estimado == null ? null : Number(row.preco_estimado),
    createdAt: row.created_at,
  }
}

const blockedDeleteReason =
  "Este registro possui vínculos clínicos ou financeiros. Para preservar a integridade do sistema, use Arquivar."

async function hasAnyRows(client: SupabaseBrowserClient, table: string, column: string, value: string) {
  const { data, error } = await client
    .from(table)
    .select("id")
    .eq(column, value)
    .limit(1)

  if (error) throw clinicDataError(error)
  return Boolean(data?.length)
}

async function hasFinanceLink(client: SupabaseBrowserClient, origemTipo: string, origemId: string) {
  const { data, error } = await client
    .from("lancamentos")
    .select("id")
    .eq("origem_tipo", origemTipo)
    .eq("origem_id", origemId)
    .neq("status", "cancelled")
    .limit(1)

  if (error) throw clinicDataError(error)
  return Boolean(data?.length)
}

function mapClinicAppointment(
  row: AgendamentoRow,
  petsById: Record<string, PetRow>,
  profilesById: Record<string, ProfileRow>,
): ClinicAppointment {
  const appointment = mapAppointment(row, petsById, profilesById)
  const veterinarianProfileName = row.veterinario_id ? profilesById[row.veterinario_id]?.full_name || null : null

  return {
    ...appointment,
    tutorDisplayName: appointment.tutorProfileName || appointment.tutor,
    veterinarianDisplayName: veterinarianProfileName || appointment.veterinario || "A definir",
  }
}

function mapClinicAppointmentDetail(
  appointment: ClinicAppointment,
  pet: PetRow | null,
  profilesById: Record<string, ProfileRow>,
  consultation: AdminConsultation | null,
  historyEntry: AdminHistoryEntry | null,
): ClinicAppointmentDetail {
  const veterinarianProfileName = appointment.veterinarioId
    ? profilesById[appointment.veterinarioId]?.full_name || null
    : null

  return {
    ...appointment,
    pet: {
      id: pet?.id || appointment.petId,
      nome: pet?.nome || appointment.petNome,
      especie: pet?.especie || "outro",
      raca: pet?.raca || "Não informada",
      dataNascimento: pet?.data_nascimento || null,
      peso: pet?.peso || null,
    },
    tutorProfileName: appointment.tutorProfileName,
    tutorEmail: null,
    veterinarianProfileName,
    consultation,
    historyEntry,
  }
}

function mapConsultation(
  row: ConsultaRow,
  petsById: Record<string, PetRow>,
  profilesById: Record<string, ProfileRow>,
  appointmentsById: Record<string, AgendamentoRow>,
): AdminConsultation {
  const appointment = row.agendamento_id ? appointmentsById[row.agendamento_id] : null
  const tutorProfileName = profilesById[row.user_id]?.full_name || null
  const veterinarianProfileName = row.veterinario_id ? profilesById[row.veterinario_id]?.full_name || null : null

  return {
    id: row.id,
    petId: row.pet_id,
    userId: row.user_id,
    petNome: petsById[row.pet_id]?.nome || "Pet sem nome",
    tutor: row.tutor,
    tutorProfileName,
    tutorDisplayName: tutorProfileName || row.tutor,
    data: row.data,
    horario: row.horario,
    veterinario: row.veterinario,
    veterinarioId: row.veterinario_id || null,
    veterinarianProfileName,
    veterinarianDisplayName: veterinarianProfileName || row.veterinario,
    motivo: row.motivo,
    status: row.status,
    agendamentoId: row.agendamento_id || null,
    appointmentDate: appointment?.data || null,
    appointmentStartTime: appointment?.horario_inicio || null,
    appointmentEndTime: appointment?.horario_fim || null,
    valor: row.valor == null ? null : Number(row.valor),
    isArchived: Boolean(row.is_archived),
    archivedAt: row.archived_at || null,
    createdAt: row.created_at,
  }
}

function mapHistoryEntry(
  row: HistoricoRow,
  petsById: Record<string, PetRow>,
  profilesById: Record<string, ProfileRow>,
  consultationsById: Record<string, ConsultaRow>,
): AdminHistoryEntry {
  const consultation = row.consulta_id ? consultationsById[row.consulta_id] : null
  const tutorProfileName = profilesById[row.user_id]?.full_name || null
  const veterinarianId = consultation?.veterinario_id || null
  const veterinarianProfileName = veterinarianId ? profilesById[veterinarianId]?.full_name || null : null

  return {
    id: row.id,
    petId: row.pet_id,
    userId: row.user_id,
    petNome: petsById[row.pet_id]?.nome || "Pet sem nome",
    tutor: petsById[row.pet_id]?.tutor || tutorProfileName || "Tutor não identificado",
    tutorProfileName,
    tutorDisplayName: tutorProfileName || petsById[row.pet_id]?.tutor || "Tutor não identificado",
    data: row.data,
    tipo: row.tipo,
    descricao: row.descricao,
    veterinario: row.veterinario,
    consultaId: row.consulta_id || null,
    agendamentoId: row.agendamento_id || null,
    consultationReason: consultation?.motivo || null,
    consultationVeterinarianId: veterinarianId,
    consultationStatus: consultation?.status || null,
    consultationTime: consultation?.horario || null,
    veterinarianProfileName,
    veterinarianDisplayName: veterinarianProfileName || row.veterinario,
    createdAt: row.created_at,
  }
}

function mapConsultationHistoryEntry(
  row: ConsultaRow,
  petsById: Record<string, PetRow>,
  profilesById: Record<string, ProfileRow>,
): AdminHistoryEntry {
  const pet = petsById[row.pet_id]
  const tutorProfileName = profilesById[row.user_id]?.full_name || null
  const veterinarianProfileName = row.veterinario_id ? profilesById[row.veterinario_id]?.full_name || null : null

  return {
    id: `consulta-${row.id}`,
    petId: row.pet_id,
    userId: row.user_id,
    petNome: pet?.nome || "Pet sem nome",
    tutor: pet?.tutor || tutorProfileName || row.tutor || "Tutor não identificado",
    tutorProfileName,
    tutorDisplayName: tutorProfileName || pet?.tutor || row.tutor || "Tutor não identificado",
    data: row.data,
    tipo: "consulta",
    descricao: "Retorno médico registrado",
    veterinario: row.veterinario,
    consultaId: row.id,
    agendamentoId: row.agendamento_id || null,
    consultationReason: row.motivo || null,
    consultationVeterinarianId: row.veterinario_id || null,
    consultationStatus: row.status,
    consultationTime: row.horario || null,
    veterinarianProfileName,
    veterinarianDisplayName: veterinarianProfileName || row.veterinario,
    createdAt: row.created_at,
  }
}

function mapVaccineHistoryEntry(
  row: VacinaRow,
  petsById: Record<string, PetRow>,
  profilesById: Record<string, ProfileRow>,
): AdminHistoryEntry {
  const pet = petsById[row.pet_id]
  const tutorProfileName = profilesById[row.user_id]?.full_name || null
  const veterinarianProfileName = row.veterinario_id ? profilesById[row.veterinario_id]?.full_name || null : null
  const date = row.data_aplicacao || row.data_agendada || row.data_recomendada || row.proxima_dose || row.created_at.split("T")[0]

  return {
    id: `vacina-${row.id}`,
    petId: row.pet_id,
    userId: row.user_id,
    petNome: pet?.nome || "Pet sem nome",
    tutor: pet?.tutor || tutorProfileName || "Tutor não identificado",
    tutorProfileName,
    tutorDisplayName: tutorProfileName || pet?.tutor || "Tutor não identificado",
    data: date,
    tipo: "vacina",
    descricao: `Vacina: ${row.vacina}`,
    veterinario: veterinarianProfileName || "A definir",
    consultaId: null,
    agendamentoId: null,
    consultationReason: null,
    consultationVeterinarianId: null,
    consultationStatus: null,
    consultationTime: row.horario_agendado || null,
    veterinarianProfileName,
    veterinarianDisplayName: veterinarianProfileName || "A definir",
    createdAt: row.created_at,
  }
}

function mapExamHistoryEntry(
  row: ExameRow,
  petsById: Record<string, PetRow>,
  profilesById: Record<string, ProfileRow>,
): AdminHistoryEntry {
  const pet = petsById[row.pet_id]
  const tutorProfileName = profilesById[row.user_id]?.full_name || null
  const veterinarianProfileName = profilesById[row.veterinario_id]?.full_name || null
  const date = row.data_agendada || row.data_recomendada || row.created_at.split("T")[0]
  const categoryLabel = row.categoria === "imagem" ? "Exame de imagem" : "Exame laboratorial"

  return {
    id: `exame-${row.id}`,
    petId: row.pet_id,
    userId: row.user_id,
    petNome: pet?.nome || "Pet sem nome",
    tutor: pet?.tutor || tutorProfileName || "Tutor não identificado",
    tutorProfileName,
    tutorDisplayName: tutorProfileName || pet?.tutor || "Tutor não identificado",
    data: date,
    tipo: "exame",
    descricao: `${categoryLabel}: ${getExamDisplayName(row)}`,
    veterinario: veterinarianProfileName || "A definir",
    consultaId: row.consulta_id || null,
    agendamentoId: null,
    consultationReason: null,
    consultationVeterinarianId: null,
    consultationStatus: null,
    consultationTime: row.horario_agendado || null,
    veterinarianProfileName,
    veterinarianDisplayName: veterinarianProfileName || "A definir",
    createdAt: row.created_at,
  }
}

function mapVaccine(
  row: VacinaRow,
  petsById: Record<string, PetRow>,
  profilesById: Record<string, ProfileRow>,
): AdminVaccine {
  const pet = petsById[row.pet_id]
  const tutorProfileName = profilesById[row.user_id]?.full_name || null
  const veterinarianProfileName = row.veterinario_id ? profilesById[row.veterinario_id]?.full_name || null : null

  return {
    id: row.id,
    petId: row.pet_id,
    userId: row.user_id,
    petNome: pet?.nome || "Pet sem nome",
    tutorDisplayName: tutorProfileName || pet?.tutor || "Tutor não identificado",
    tutorEmail: null,
    vacina: row.vacina,
    dataAplicacao: row.data_aplicacao,
    proximaDose: row.proxima_dose,
    status: row.status || "recommended",
    dataRecomendada: row.data_recomendada || null,
    dataAgendada: row.data_agendada || null,
    horarioAgendado: row.horario_agendado || null,
    tutorResposta: row.tutor_resposta || null,
    tutorRespondeuEm: row.tutor_respondeu_em || null,
    tutorMotivoCancelamento: row.tutor_motivo_cancelamento || null,
    veterinarioId: row.veterinario_id || null,
    veterinarianDisplayName: veterinarianProfileName || "A definir",
    valor: row.valor == null ? null : Number(row.valor),
    isArchived: Boolean(row.is_archived),
    archivedAt: row.archived_at || null,
    createdAt: row.created_at,
  }
}

function getExamDisplayName(row: Pick<ExameRow, "tipo" | "nome_personalizado">) {
  return row.tipo === "Outro" && row.nome_personalizado ? row.nome_personalizado : row.tipo
}

function mapExam(
  row: ExameRow,
  petsById: Record<string, PetRow>,
  profilesById: Record<string, ProfileRow>,
): AdminExam {
  const pet = petsById[row.pet_id]
  const tutorProfileName = profilesById[row.user_id]?.full_name || null
  const veterinarianProfileName = profilesById[row.veterinario_id]?.full_name || null

  return {
    id: row.id,
    petId: row.pet_id,
    userId: row.user_id,
    petNome: pet?.nome || "Pet sem nome",
    tutorDisplayName: tutorProfileName || pet?.tutor || "Tutor não identificado",
    categoria: row.categoria,
    tipo: row.tipo,
    nomePersonalizado: row.nome_personalizado || null,
    examDisplayName: getExamDisplayName(row),
    observacoes: row.observacoes || null,
    valor: Number(row.valor || 0),
    dataRecomendada: row.data_recomendada,
    dataAgendada: row.data_agendada || null,
    horarioAgendado: row.horario_agendado || null,
    status: row.status || "recommended",
    tutorResposta: row.tutor_resposta || null,
    tutorRespondeuEm: row.tutor_respondeu_em || null,
    tutorMotivoCancelamento: row.tutor_motivo_cancelamento || null,
    veterinarioId: row.veterinario_id,
    veterinarianDisplayName: veterinarianProfileName || "A definir",
    consultaId: row.consulta_id || null,
    isArchived: Boolean(row.is_archived),
    archivedAt: row.archived_at || null,
    createdAt: row.created_at,
  }
}

function mapFinancialEntry(row: LancamentoRow): AdminFinancialEntry {
  return {
    id: row.id,
    userId: row.user_id,
    descricao: row.descricao,
    tipo: row.tipo,
    valor: Number(row.valor),
    data: row.data,
    categoria: row.categoria,
    origemTipo: row.origem_tipo || null,
    origemId: row.origem_id || null,
    status: row.status || "active",
    createdAt: row.created_at,
  }
}

function mapPendingProfile(row: ApprovalProfileRow): PendingProfile {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    role: row.role,
    approvalStatus: row.approval_status,
    createdAt: row.created_at,
  }
}

async function getProfilesByIds(client: SupabaseBrowserClient, ids: string[]) {
  const uniqueIds = [...new Set(ids)].filter(Boolean)
  if (uniqueIds.length === 0) return {}

  const { data, error } = await client
    .from("profiles")
    .select("id,full_name,role")
    .in("id", uniqueIds)

  if (error) throw clinicDataError(error)
  return profileMap((data || []) as ProfileRow[])
}

export async function getClinicProfiles(client: SupabaseBrowserClient) {
  const { data, error } = await client
    .from("profiles")
    .select("id,full_name,role")
    .order("full_name", { ascending: true })

  if (error) throw clinicDataError(error)

  return ((data || []) as ProfileRow[]).map<ProfileSummary>((profile) => ({
    id: profile.id,
    fullName: profile.full_name,
    role: profile.role,
  }))
}

export async function getApprovedVeterinarians(client: SupabaseBrowserClient): Promise<VeterinarianOption[]> {
  const { data, error } = await client
    .from("profiles")
    .select("id,full_name,crmv")
    .eq("role", "veterinario")
    .eq("approval_status", "approved")
    .order("full_name", { ascending: true })

  if (error) throw clinicDataError(error)

  return ((data || []) as VeterinarianOption[]).map((profile) => ({
    id: profile.id,
    full_name: profile.full_name,
    crmv: profile.crmv || getFictitiousCrmv(profile.id),
  }))
}

export async function getPendingProfiles(client: SupabaseBrowserClient) {
  const { data, error } = await client
    .from("profiles")
    .select("id,full_name,email,role,approval_status,created_at")
    .eq("approval_status", "pending")
    .order("created_at", { ascending: true })

  if (error) throw clinicDataError(error)

  return ((data || []) as ApprovalProfileRow[]).map(mapPendingProfile)
}

export async function approveProfile(client: SupabaseBrowserClient, profileId: string, adminId: string) {
  const { error } = await client
    .from("profiles")
    .update({
      approval_status: "approved",
      approved_at: new Date().toISOString(),
      approved_by: adminId,
      rejected_at: null,
      rejected_by: null,
      rejection_reason: null,
    })
    .eq("id", profileId)

  if (error) throw clinicDataError(error)
}

export async function rejectProfile(
  client: SupabaseBrowserClient,
  profileId: string,
  adminId: string,
  reason?: string,
) {
  const { error } = await client
    .from("profiles")
    .update({
      approval_status: "rejected",
      rejected_at: new Date().toISOString(),
      rejected_by: adminId,
      rejection_reason: reason?.trim() || null,
      approved_at: null,
      approved_by: null,
    })
    .eq("id", profileId)

  if (error) throw clinicDataError(error)
}

export async function getProfileApprovalStatus(client: SupabaseBrowserClient, userId: string) {
  const { data, error } = await client
    .from("profiles")
    .select("approval_status")
    .eq("id", userId)
    .single()

  if (error) throw clinicDataError(error)

  return (data.approval_status || "pending") as ApprovalStatus
}

export async function getAdminPets(client: SupabaseBrowserClient) {
  const { data, error } = await client
    .from("pets")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw clinicDataError(error)

  const rows = (data || []) as PetRow[]
  const profilesById = await getProfilesByIds(client, rows.map((pet) => pet.user_id))
  return rows.map((pet) => mapPet(pet, profilesById))
}

export async function getArchivedAdminPets(client: SupabaseBrowserClient) {
  const { data, error } = await client
    .from("pets")
    .select("*")
    .eq("arquivado", true)
    .order("created_at", { ascending: false })

  if (error) throw clinicDataError(error)

  const rows = (data || []) as PetRow[]
  const profilesById = await getProfilesByIds(client, rows.map((pet) => pet.user_id))
  return rows.map((pet) => mapPet(pet, profilesById))
}

export async function createAdminPet(client: SupabaseBrowserClient, input: SaveAdminPetInput) {
  const { data, error } = await client
    .from("pets")
    .insert({
      user_id: input.userId,
      nome: input.nome,
      especie: input.especie,
      raca: input.raca,
      data_nascimento: input.dataNascimento,
      peso: input.peso,
      tutor: input.tutor,
      telefone_tutor: input.telefoneTutor,
    })
    .select("*")
    .single()

  if (error) throw clinicDataError(error)

  const row = data as PetRow
  const profilesById = await getProfilesByIds(client, [row.user_id])
  return mapPet(row, profilesById)
}

export async function updateAdminPet(client: SupabaseBrowserClient, petId: string, input: SaveAdminPetInput) {
  const { data, error } = await client
    .from("pets")
    .update({
      user_id: input.userId,
      nome: input.nome,
      especie: input.especie,
      raca: input.raca,
      data_nascimento: input.dataNascimento,
      peso: input.peso,
      tutor: input.tutor,
      telefone_tutor: input.telefoneTutor,
    })
    .eq("id", petId)
    .select("*")
    .single()

  if (error) throw clinicDataError(error)

  const row = data as PetRow
  const profilesById = await getProfilesByIds(client, [row.user_id])
  return mapPet(row, profilesById)
}

export async function archiveAdminPet(client: SupabaseBrowserClient, petId: string) {
  const { error } = await client
    .from("pets")
    .update({ arquivado: true })
    .eq("id", petId)

  if (error) throw clinicDataError(error)
}

export async function getPetsForVeterinarianWorkflow(
  client: SupabaseBrowserClient,
  veterinarianId?: string,
): Promise<ClinicPetOption[]> {
  let query = client
    .from("agendamentos")
    .select("*")
    .eq("is_archived", false)
    .order("data", { ascending: true })
    .order("horario_inicio", { ascending: true })

  if (veterinarianId) {
    query = query.eq("veterinario_id", veterinarianId)
  }

  const { data, error } = await query
  if (error) throw clinicDataError(error)

  const rows = (data || []) as AgendamentoRow[]
  const petIds = rows.map((appointment) => appointment.pet_id)
  const userIds = rows.map((appointment) => appointment.user_id)

  const [{ data: petData, error: petError }, profilesById] = await Promise.all([
    petIds.length > 0
      ? client.from("pets").select("*").in("id", [...new Set(petIds)])
      : Promise.resolve({ data: [], error: null }),
    getProfilesByIds(client, userIds),
  ])

  if (petError) throw clinicDataError(petError)

  const petsById = ((petData || []) as PetRow[]).reduce<Record<string, PetRow>>((acc, pet) => {
    acc[pet.id] = pet
    return acc
  }, {})

  return rows.reduce<ClinicPetOption[]>((acc, appointment) => {
    if (acc.some((pet) => pet.id === appointment.pet_id)) return acc
    const pet = petsById[appointment.pet_id]
    if (!pet || pet.arquivado) return acc

    acc.push({
      id: pet.id,
      userId: pet.user_id,
      nome: pet.nome,
      tutorDisplayName: profilesById[pet.user_id]?.full_name || pet.tutor,
    })
    return acc
  }, [])
}

export async function getAdminAppointments(client: SupabaseBrowserClient) {
  const { data, error } = await client
    .from("agendamentos")
    .select("*")
    .eq("is_archived", false)
    .order("data", { ascending: true })
    .order("horario_inicio", { ascending: true })

  if (error) throw clinicDataError(error)

  const rows = (data || []) as AgendamentoRow[]
  const petIds = rows.map((appointment) => appointment.pet_id)
  const userIds = rows.map((appointment) => appointment.user_id)

  const [{ data: petData, error: petError }, profilesById] = await Promise.all([
    petIds.length > 0
      ? client.from("pets").select("*").in("id", [...new Set(petIds)])
      : Promise.resolve({ data: [], error: null }),
    getProfilesByIds(client, userIds),
  ])

  if (petError) throw clinicDataError(petError)

  const petsById = ((petData || []) as PetRow[]).reduce<Record<string, PetRow>>((acc, pet) => {
    acc[pet.id] = pet
    return acc
  }, {})

  return rows.map((appointment) => mapAppointment(appointment, petsById, profilesById))
}

export async function getArchivedAdminAppointments(client: SupabaseBrowserClient) {
  const { data, error } = await client
    .from("agendamentos")
    .select("*")
    .eq("is_archived", true)
    .order("archived_at", { ascending: false, nullsFirst: false })

  if (error) throw clinicDataError(error)

  const rows = (data || []) as AgendamentoRow[]
  const petIds = rows.map((appointment) => appointment.pet_id)
  const userIds = rows.map((appointment) => appointment.user_id)

  const [{ data: petData, error: petError }, profilesById] = await Promise.all([
    petIds.length > 0
      ? client.from("pets").select("*").in("id", [...new Set(petIds)])
      : Promise.resolve({ data: [], error: null }),
    getProfilesByIds(client, userIds),
  ])

  if (petError) throw clinicDataError(petError)

  const petsById = ((petData || []) as PetRow[]).reduce<Record<string, PetRow>>((acc, pet) => {
    acc[pet.id] = pet
    return acc
  }, {})

  return rows.map((appointment) => mapAppointment(appointment, petsById, profilesById))
}

export async function archiveAdminAppointment(client: SupabaseBrowserClient, appointmentId: string, adminId: string) {
  const { error } = await client
    .from("agendamentos")
    .update({ is_archived: true, archived_at: new Date().toISOString(), archived_by: adminId })
    .eq("id", appointmentId)

  if (error) throw clinicDataError(error)
}

export async function restoreAdminAppointment(client: SupabaseBrowserClient, appointmentId: string) {
  const { error } = await client
    .from("agendamentos")
    .update({ is_archived: false, archived_at: null, archived_by: null })
    .eq("id", appointmentId)

  if (error) throw clinicDataError(error)
}

export async function safeDeleteAdminAppointment(
  client: SupabaseBrowserClient,
  appointmentId: string,
): Promise<SafeDeleteResult> {
  const linked =
    (await hasAnyRows(client, "consultas", "agendamento_id", appointmentId)) ||
    (await hasAnyRows(client, "historico", "agendamento_id", appointmentId)) ||
    (await hasFinanceLink(client, "appointment", appointmentId))

  if (linked) return { deleted: false, reason: blockedDeleteReason }

  const { error } = await client.from("agendamentos").delete().eq("id", appointmentId)
  if (error) throw clinicDataError(error)
  return { deleted: true }
}

async function getAppointmentsWithRelations(client: SupabaseBrowserClient, rows: AgendamentoRow[]) {
  const petIds = rows.map((appointment) => appointment.pet_id)
  const profileIds = rows.flatMap((appointment) => [appointment.user_id, appointment.veterinario_id || ""])

  const [{ data: petData, error: petError }, profilesById] = await Promise.all([
    petIds.length > 0
      ? client.from("pets").select("*").in("id", [...new Set(petIds)])
      : Promise.resolve({ data: [], error: null }),
    getProfilesByIds(client, profileIds),
  ])

  if (petError) throw clinicDataError(petError)

  const petsById = ((petData || []) as PetRow[]).reduce<Record<string, PetRow>>((acc, pet) => {
    acc[pet.id] = pet
    return acc
  }, {})

  return rows.map((appointment) => mapClinicAppointment(appointment, petsById, profilesById))
}

async function getAppointmentDetailsFromRows(client: SupabaseBrowserClient, rows: AgendamentoRow[]) {
  const appointments = await getAppointmentsWithRelations(client, rows)
  const petIds = rows.map((appointment) => appointment.pet_id)
  const profileIds = rows.flatMap((appointment) => [appointment.user_id, appointment.veterinario_id || ""])
  const appointmentIds = rows.map((appointment) => appointment.id)

  const [
    { data: petData, error: petError },
    profilesById,
    { data: consultationData, error: consultationError },
  ] = await Promise.all([
    petIds.length > 0
      ? client.from("pets").select("*").in("id", [...new Set(petIds)])
      : Promise.resolve({ data: [], error: null }),
    getProfilesByIds(client, profileIds),
    appointmentIds.length > 0
      ? client.from("consultas").select("*").in("agendamento_id", appointmentIds)
      : Promise.resolve({ data: [], error: null }),
  ])

  if (petError) throw clinicDataError(petError)
  if (consultationError) throw clinicDataError(consultationError)

  const petsById = ((petData || []) as PetRow[]).reduce<Record<string, PetRow>>((acc, pet) => {
    acc[pet.id] = pet
    return acc
  }, {})
  const consultationRows = (consultationData || []) as ConsultaRow[]
  const consultationsByAppointmentId = consultationRows.reduce<Record<string, ConsultaRow>>((acc, consultation) => {
    if (consultation.agendamento_id && !acc[consultation.agendamento_id]) {
      acc[consultation.agendamento_id] = consultation
    }
    return acc
  }, {})
  const consultationIds = consultationRows.map((consultation) => consultation.id)
  const [
    { data: historyByConsultationData, error: historyByConsultationError },
    { data: historyByAppointmentData, error: historyByAppointmentError },
  ] = await Promise.all([
    consultationIds.length > 0
      ? client.from("historico").select("*").in("consulta_id", consultationIds)
      : Promise.resolve({ data: [], error: null }),
    appointmentIds.length > 0
      ? client.from("historico").select("*").in("agendamento_id", appointmentIds)
      : Promise.resolve({ data: [], error: null }),
  ])

  if (historyByConsultationError) throw clinicDataError(historyByConsultationError)
  if (historyByAppointmentError) throw clinicDataError(historyByAppointmentError)

  const historyRows = [
    ...((historyByConsultationData || []) as HistoricoRow[]),
    ...((historyByAppointmentData || []) as HistoricoRow[]),
  ].filter((entry, index, entries) => entries.findIndex((item) => item.id === entry.id) === index)
  const historyByConsultationId = historyRows.reduce<Record<string, HistoricoRow>>((acc, entry) => {
    if (entry.consulta_id && !acc[entry.consulta_id]) {
      acc[entry.consulta_id] = entry
    }
    return acc
  }, {})
  const historyByAppointmentId = historyRows.reduce<Record<string, HistoricoRow>>((acc, entry) => {
    if (entry.agendamento_id && !acc[entry.agendamento_id]) {
      acc[entry.agendamento_id] = entry
    }
    return acc
  }, {})
  const appointmentRowsById = rows.reduce<Record<string, AgendamentoRow>>((acc, appointment) => {
    acc[appointment.id] = appointment
    return acc
  }, {})
  const consultationsById = consultationRows.reduce<Record<string, ConsultaRow>>((acc, consultation) => {
    acc[consultation.id] = consultation
    return acc
  }, {})

  return appointments.map((appointment) => {
    const consultationRow = consultationsByAppointmentId[appointment.id] || null
    const historyRow = consultationRow
      ? historyByConsultationId[consultationRow.id] || historyByAppointmentId[appointment.id] || null
      : historyByAppointmentId[appointment.id] || null
    const consultation = consultationRow
      ? mapConsultation(consultationRow, petsById, profilesById, appointmentRowsById)
      : null
    const historyEntry = historyRow
      ? mapHistoryEntry(historyRow, petsById, profilesById, consultationsById)
      : null

    return mapClinicAppointmentDetail(
      appointment,
      petsById[appointment.petId] || null,
      profilesById,
      consultation,
      historyEntry,
    )
  })
}

export async function getVeterinarianAppointments(client: SupabaseBrowserClient, veterinarianId?: string) {
  let query = client
    .from("agendamentos")
    .select("*")
    .order("data", { ascending: true })
    .order("horario_inicio", { ascending: true })

  if (veterinarianId) {
    query = query.eq("veterinario_id", veterinarianId)
  }

  const { data, error } = await query
  if (error) throw clinicDataError(error)

  return getAppointmentDetailsFromRows(client, (data || []) as AgendamentoRow[])
}

export async function archiveVeterinarianAppointment(
  client: SupabaseBrowserClient,
  appointmentId: string,
  veterinarianId: string,
) {
  const { error } = await client
    .from("agendamentos")
    .update({ veterinario_archived_at: new Date().toISOString() })
    .eq("id", appointmentId)
    .eq("veterinario_id", veterinarianId)

  if (error) throw clinicDataError(error)
}

export async function restoreVeterinarianAppointment(
  client: SupabaseBrowserClient,
  appointmentId: string,
  veterinarianId: string,
) {
  const { error } = await client
    .from("agendamentos")
    .update({ veterinario_archived_at: null })
    .eq("id", appointmentId)
    .eq("veterinario_id", veterinarianId)

  if (error) throw clinicDataError(error)
}

export async function getAppointmentDetails(client: SupabaseBrowserClient, appointmentId: string) {
  const { data, error } = await client
    .from("agendamentos")
    .select("*")
    .eq("id", appointmentId)
    .single()

  if (error) throw clinicDataError(error)

  const [detail] = await getAppointmentDetailsFromRows(client, [data as AgendamentoRow])
  return detail
}

export async function getConsultationByAppointmentId(client: SupabaseBrowserClient, appointmentId: string) {
  const { data, error } = await client
    .from("consultas")
    .select("*")
    .eq("agendamento_id", appointmentId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle()

  if (error) throw clinicDataError(error)
  return (data || null) as ConsultaRow | null
}

export async function getTutorAppointments(client: SupabaseBrowserClient, userId: string) {
  const { data, error } = await client
    .from("agendamentos")
    .select("*")
    .eq("user_id", userId)
    .eq("is_archived", false)
    .order("data", { ascending: true })
    .order("horario_inicio", { ascending: true })

  if (error) throw clinicDataError(error)

  return getAppointmentsWithRelations(client, (data || []) as AgendamentoRow[])
}

export async function archiveTutorAppointment(
  client: SupabaseBrowserClient,
  appointmentId: string,
  userId: string,
) {
  const { error } = await client
    .from("agendamentos")
    .update({ tutor_archived_at: new Date().toISOString() })
    .eq("id", appointmentId)
    .eq("user_id", userId)

  if (error) throw clinicDataError(error)
}

export async function restoreTutorAppointment(
  client: SupabaseBrowserClient,
  appointmentId: string,
  userId: string,
) {
  const { error } = await client
    .from("agendamentos")
    .update({ tutor_archived_at: null })
    .eq("id", appointmentId)
    .eq("user_id", userId)

  if (error) throw clinicDataError(error)
}

export async function getTutorConsultationFeedback(
  client: SupabaseBrowserClient,
  userId: string,
): Promise<TutorConsultationFeedback[]> {
  const { data, error } = await client
    .from("consultas")
    .select("*")
    .eq("user_id", userId)
    .order("data", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) throw clinicDataError(error)

  const rows = (data || []) as ConsultaRow[]
  const petIds = rows.map((consultation) => consultation.pet_id)
  const profileIds = rows.map((consultation) => consultation.veterinario_id || "")
  const appointmentIds = [...new Set(rows.map((consultation) => consultation.agendamento_id).filter(Boolean))] as string[]

  const [
    { data: petData, error: petError },
    profilesById,
    { data: appointmentData, error: appointmentError },
  ] = await Promise.all([
    petIds.length > 0
      ? client.from("pets").select("*").in("id", [...new Set(petIds)])
      : Promise.resolve({ data: [], error: null }),
    getProfilesByIds(client, profileIds),
    appointmentIds.length > 0
      ? client.from("agendamentos").select("*").in("id", appointmentIds)
      : Promise.resolve({ data: [], error: null }),
  ])

  if (petError) throw clinicDataError(petError)
  if (appointmentError) throw clinicDataError(appointmentError)

  const petsById = ((petData || []) as PetRow[]).reduce<Record<string, PetRow>>((acc, pet) => {
    acc[pet.id] = pet
    return acc
  }, {})
  const appointmentsById = ((appointmentData || []) as AgendamentoRow[]).reduce<Record<string, AgendamentoRow>>(
    (acc, appointment) => {
      acc[appointment.id] = appointment
      return acc
    },
    {},
  )

  return rows.map((consultation) => {
    const appointment = consultation.agendamento_id ? appointmentsById[consultation.agendamento_id] : null
    const veterinarianProfileName = consultation.veterinario_id
      ? profilesById[consultation.veterinario_id]?.full_name || null
      : null

    return {
      id: consultation.id,
      petId: consultation.pet_id,
      petNome: petsById[consultation.pet_id]?.nome || "Pet sem nome",
      data: consultation.data,
      horario: consultation.horario,
      veterinarianDisplayName: veterinarianProfileName || consultation.veterinario,
      feedback: consultation.motivo,
      appointmentDate: appointment?.data || null,
      appointmentStartTime: appointment?.horario_inicio || null,
      agendamentoId: consultation.agendamento_id || null,
      valor: consultation.valor == null ? null : Number(consultation.valor),
    }
  })
}

export async function getTutorPetHistory(client: SupabaseBrowserClient, userId: string) {
  const entries = await getAdminHistoryEntries(client)
  return entries.filter((entry) => entry.userId === userId)
}

export async function createAdminAppointment(client: SupabaseBrowserClient, input: CreateAdminAppointmentInput) {
  const { data: petData, error: petError } = await client
    .from("pets")
    .select("*")
    .eq("id", input.petId)
    .single()

  if (petError) throw clinicDataError(petError)

  const pet = petData as PetRow
  const { data, error } = await client
    .from("agendamentos")
    .insert({
      pet_id: input.petId,
      user_id: pet.user_id,
      tutor: pet.tutor,
      data: input.data,
      horario_inicio: input.horarioInicio,
      horario_fim: input.horarioFim,
      veterinario: input.veterinario,
      veterinario_id: input.veterinarioId,
      tipo: input.tipo,
      status: "agendado",
      preco_estimado: getDefaultAppointmentPrice(input.tipo),
    })
    .select("*")
    .single()

  if (error) throw clinicDataError(error)

  const row = data as AgendamentoRow
  const profilesById = await getProfilesByIds(client, [row.user_id])
  return mapAppointment(row, { [pet.id]: pet }, profilesById)
}

export async function createTutorAppointment(client: SupabaseBrowserClient, input: CreateTutorAppointmentInput) {
  if (!input.veterinarioId) {
    throw new Error("Veterinarian selection is required for tutor appointments.")
  }

  const { data: petData, error: petError } = await client
    .from("pets")
    .select("*")
    .eq("id", input.petId)
    .eq("user_id", input.userId)
    .single()

  if (petError) throw clinicDataError(petError)

  const pet = petData as PetRow
  let veterinarianName = input.veterinario || "Veterinário"

  if (input.veterinarioId) {
    const { data: veterinarianData, error: veterinarianError } = await client
      .from("profiles")
      .select("id,full_name")
      .eq("id", input.veterinarioId)
      .eq("role", "veterinario")
      .eq("approval_status", "approved")
      .single()

    if (veterinarianError) throw clinicDataError(veterinarianError)
    veterinarianName = veterinarianData.full_name || "Veterinário"
  }

  const { data, error } = await client
    .from("agendamentos")
    .insert({
      pet_id: input.petId,
      user_id: input.userId,
      tutor: input.tutor,
      data: input.data,
      horario_inicio: input.horarioInicio,
      horario_fim: input.horarioFim,
      veterinario: veterinarianName,
      veterinario_id: input.veterinarioId || null,
      tipo: input.tipo,
      status: "agendado",
      preco_estimado: getDefaultAppointmentPrice(input.tipo),
    })
    .select("*")
    .single()

  if (error) throw clinicDataError(error)

  const row = data as AgendamentoRow
  const profilesById = await getProfilesByIds(client, [row.user_id])
  const appointment = mapClinicAppointment(row, { [pet.id]: pet }, profilesById)
  await createOrUpdateFinanceEntryFromAppointment(client, appointment)
  return appointment
}

export async function updateAppointmentStatus(
  client: SupabaseBrowserClient,
  appointmentId: string,
  status: AgendamentoStatus,
) {
  const { error } = await client
    .from("agendamentos")
    .update({ status })
    .eq("id", appointmentId)

  if (error) throw clinicDataError(error)
}

async function mapVaccineRows(client: SupabaseBrowserClient, rows: VacinaRow[]) {
  const petIds = rows.map((vaccine) => vaccine.pet_id)
  const profileIds = rows.flatMap((vaccine) => [vaccine.user_id, vaccine.veterinario_id || ""])

  const [{ data: petData, error: petError }, profilesById] = await Promise.all([
    petIds.length > 0
      ? client.from("pets").select("*").in("id", [...new Set(petIds)])
      : Promise.resolve({ data: [], error: null }),
    getProfilesByIds(client, profileIds),
  ])

  if (petError) throw clinicDataError(petError)

  const petsById = ((petData || []) as PetRow[]).reduce<Record<string, PetRow>>((acc, pet) => {
    acc[pet.id] = pet
    return acc
  }, {})

  return rows.map((vaccine) => mapVaccine(vaccine, petsById, profilesById))
}

async function mapExamRows(client: SupabaseBrowserClient, rows: ExameRow[]) {
  const petIds = rows.map((exam) => exam.pet_id)
  const profileIds = rows.flatMap((exam) => [exam.user_id, exam.veterinario_id])

  const [{ data: petData, error: petError }, profilesById] = await Promise.all([
    petIds.length > 0
      ? client.from("pets").select("*").in("id", [...new Set(petIds)])
      : Promise.resolve({ data: [], error: null }),
    getProfilesByIds(client, profileIds),
  ])

  if (petError) throw clinicDataError(petError)

  const petsById = ((petData || []) as PetRow[]).reduce<Record<string, PetRow>>((acc, pet) => {
    acc[pet.id] = pet
    return acc
  }, {})

  return rows.map((exam) => mapExam(exam, petsById, profilesById))
}

export async function getAdminVaccines(client: SupabaseBrowserClient) {
  const { data, error } = await client
    .from("vacinas")
    .select("*")
    .eq("is_archived", false)
    .order("proxima_dose", { ascending: true, nullsFirst: false })
    .order("data_aplicacao", { ascending: false })

  if (error) throw clinicDataError(error)

  return mapVaccineRows(client, (data || []) as VacinaRow[])
}

export async function getArchivedAdminVaccines(client: SupabaseBrowserClient) {
  const { data, error } = await client
    .from("vacinas")
    .select("*")
    .eq("is_archived", true)
    .order("archived_at", { ascending: false, nullsFirst: false })

  if (error) throw clinicDataError(error)

  return mapVaccineRows(client, (data || []) as VacinaRow[])
}

export async function archiveAdminVaccine(client: SupabaseBrowserClient, vaccineId: string, adminId: string) {
  const { error } = await client
    .from("vacinas")
    .update({ is_archived: true, archived_at: new Date().toISOString(), archived_by: adminId })
    .eq("id", vaccineId)

  if (error) throw clinicDataError(error)
}

export async function restoreAdminVaccine(client: SupabaseBrowserClient, vaccineId: string) {
  const { error } = await client
    .from("vacinas")
    .update({ is_archived: false, archived_at: null, archived_by: null })
    .eq("id", vaccineId)

  if (error) throw clinicDataError(error)
}

export async function safeDeleteAdminVaccine(client: SupabaseBrowserClient, vaccineId: string): Promise<SafeDeleteResult> {
  if (await hasFinanceLink(client, "vaccine", vaccineId)) {
    return { deleted: false, reason: blockedDeleteReason }
  }

  const { error } = await client.from("vacinas").delete().eq("id", vaccineId)
  if (error) throw clinicDataError(error)
  return { deleted: true }
}

export async function getTutorVaccines(client: SupabaseBrowserClient, userId: string) {
  const { data, error } = await client
    .from("vacinas")
    .select("*")
    .eq("user_id", userId)
    .eq("is_archived", false)
    .order("proxima_dose", { ascending: true, nullsFirst: false })
    .order("data_aplicacao", { ascending: false })

  if (error) throw clinicDataError(error)

  return mapVaccineRows(client, (data || []) as VacinaRow[])
}

export async function getVeterinarianExams(client: SupabaseBrowserClient, veterinarianId?: string) {
  let query = client
    .from("exames")
    .select("*")
    .eq("is_archived", false)
    .order("data_agendada", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })

  if (veterinarianId) {
    query = query.eq("veterinario_id", veterinarianId)
  }

  const { data, error } = await query
  if (error) throw clinicDataError(error)

  return mapExamRows(client, (data || []) as ExameRow[])
}

export async function getTutorExams(client: SupabaseBrowserClient, userId: string) {
  const { data, error } = await client
    .from("exames")
    .select("*")
    .eq("user_id", userId)
    .eq("is_archived", false)
    .order("data_agendada", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })

  if (error) throw clinicDataError(error)

  return mapExamRows(client, (data || []) as ExameRow[])
}

export async function getArchivedAdminExams(client: SupabaseBrowserClient) {
  const { data, error } = await client
    .from("exames")
    .select("*")
    .eq("is_archived", true)
    .order("archived_at", { ascending: false, nullsFirst: false })

  if (error) throw clinicDataError(error)

  return mapExamRows(client, (data || []) as ExameRow[])
}

export async function archiveAdminExam(client: SupabaseBrowserClient, examId: string, adminId: string) {
  const { error } = await client
    .from("exames")
    .update({ is_archived: true, archived_at: new Date().toISOString(), archived_by: adminId })
    .eq("id", examId)

  if (error) throw clinicDataError(error)
}

export async function restoreAdminExam(client: SupabaseBrowserClient, examId: string) {
  const { error } = await client
    .from("exames")
    .update({ is_archived: false, archived_at: null, archived_by: null })
    .eq("id", examId)

  if (error) throw clinicDataError(error)
}

export async function safeDeleteAdminExam(client: SupabaseBrowserClient, examId: string): Promise<SafeDeleteResult> {
  if (await hasFinanceLink(client, "exam", examId)) return { deleted: false, reason: blockedDeleteReason }

  const { error } = await client.from("exames").delete().eq("id", examId)
  if (error) throw clinicDataError(error)
  return { deleted: true }
}

export async function getTutorFinancialSummary(client: SupabaseBrowserClient, userId: string) {
  const { data, error } = await client
    .from("lancamentos")
    .select("id,tipo,valor,categoria,status")
    .eq("user_id", userId)
    .eq("tipo", "entrada")
    .neq("status", "cancelled")

  if (error) throw clinicDataError(error)

  const rows = (data || []) as Pick<LancamentoRow, "id" | "tipo" | "valor" | "categoria" | "status">[]
  const consultationTotal = rows
    .filter((entry) => entry.categoria === "Consultas")
    .reduce((total, entry) => total + Number(entry.valor || 0), 0)
  const vaccineTotal = rows
    .filter((entry) => entry.categoria === "Vacinas")
    .reduce((total, entry) => total + Number(entry.valor || 0), 0)
  const examTotal = rows
    .filter((entry) => entry.categoria === "Exames")
    .reduce((total, entry) => total + Number(entry.valor || 0), 0)

  return {
    consultationTotal,
    vaccineTotal,
    examTotal,
    total: consultationTotal + vaccineTotal + examTotal,
  }
}

async function createOrUpdateFinanceEntryFromSource(
  client: SupabaseBrowserClient,
  input: {
    userId: string
    descricao: string
    categoria: "Consultas" | "Vacinas" | "Exames"
    valor: number
    data: string
    origemTipo: "appointment" | "vaccine" | "exam"
    origemId: string
  },
) {
  const { data: existingData, error: existingError } = await client
    .from("lancamentos")
    .select("id")
    .eq("origem_tipo", input.origemTipo)
    .eq("origem_id", input.origemId)
    .maybeSingle()

  if (existingError) throw clinicDataError(existingError)

  const payload = {
    user_id: input.userId,
    descricao: input.descricao,
    tipo: "entrada" as FinancialEntryType,
    valor: input.valor,
    data: input.data,
    categoria: input.categoria,
    origem_tipo: input.origemTipo,
    origem_id: input.origemId,
    status: "active" as FinancialEntryStatus,
  }

  if (existingData?.id) {
    const { error } = await client
      .from("lancamentos")
      .update(payload)
      .eq("id", existingData.id)

    if (error) throw clinicDataError(error)
    return
  }

  const { error } = await client
    .from("lancamentos")
    .insert(payload)

  if (error) throw clinicDataError(error)
}

export async function createOrUpdateFinanceEntryFromAppointment(
  client: SupabaseBrowserClient,
  appointment: ClinicAppointment,
) {
  await createOrUpdateFinanceEntryFromSource(client, {
    userId: appointment.userId,
    descricao: `Consulta - ${appointment.petNome}`,
    categoria: "Consultas",
    valor: appointment.precoEstimado ?? defaultConsultationPrice,
    data: appointment.data,
    origemTipo: "appointment",
    origemId: appointment.id,
  })
}

export async function createOrUpdateFinanceEntryFromVaccine(
  client: SupabaseBrowserClient,
  vaccine: AdminVaccine,
) {
  if (vaccine.status !== "confirmed" && vaccine.status !== "applied") {
    return
  }

  await createOrUpdateFinanceEntryFromSource(client, {
    userId: vaccine.userId,
    descricao: `Vacina - ${vaccine.petNome} - ${vaccine.vacina}`,
    categoria: "Vacinas",
    valor: vaccine.valor ?? defaultVaccinePrice,
    data: vaccine.dataAgendada || vaccine.dataRecomendada || new Date().toISOString().split("T")[0],
    origemTipo: "vaccine",
    origemId: vaccine.id,
  })
}

export async function createOrUpdateFinanceEntryFromExam(
  client: SupabaseBrowserClient,
  exam: AdminExam,
) {
  if (exam.status !== "confirmed") {
    return
  }

  await createOrUpdateFinanceEntryFromSource(client, {
    userId: exam.userId,
    descricao: `Exame - ${exam.petNome} - ${exam.examDisplayName}`,
    categoria: "Exames",
    valor: exam.valor ?? defaultExamPrice,
    data: exam.dataAgendada || exam.dataRecomendada || new Date().toISOString().split("T")[0],
    origemTipo: "exam",
    origemId: exam.id,
  })
}

export async function cancelFinanceEntryFromVaccine(client: SupabaseBrowserClient, vaccineId: string, userId: string) {
  const { error } = await client
    .from("lancamentos")
    .update({ status: "cancelled" as FinancialEntryStatus })
    .eq("origem_tipo", "vaccine")
    .eq("origem_id", vaccineId)
    .eq("user_id", userId)

  if (error) throw clinicDataError(error)
}

export async function restoreAdminPet(client: SupabaseBrowserClient, petId: string) {
  const { error } = await client
    .from("pets")
    .update({ arquivado: false })
    .eq("id", petId)

  if (error) throw clinicDataError(error)
}

export async function safeDeleteAdminPet(client: SupabaseBrowserClient, petId: string): Promise<SafeDeleteResult> {
  const linked =
    (await hasAnyRows(client, "agendamentos", "pet_id", petId)) ||
    (await hasAnyRows(client, "consultas", "pet_id", petId)) ||
    (await hasAnyRows(client, "vacinas", "pet_id", petId)) ||
    (await hasAnyRows(client, "exames", "pet_id", petId)) ||
    (await hasAnyRows(client, "historico", "pet_id", petId))

  if (linked) return { deleted: false, reason: blockedDeleteReason }

  const { error } = await client.from("pets").delete().eq("id", petId)
  if (error) throw clinicDataError(error)
  return { deleted: true }
}

export async function cancelFinanceEntryFromExam(client: SupabaseBrowserClient, examId: string, userId: string) {
  const { error } = await client
    .from("lancamentos")
    .update({ status: "cancelled" as FinancialEntryStatus })
    .eq("origem_tipo", "exam")
    .eq("origem_id", examId)
    .eq("user_id", userId)

  if (error) throw clinicDataError(error)
}

export async function getVeterinarianVaccines(client: SupabaseBrowserClient, veterinarianId?: string) {
  let query = client
    .from("vacinas")
    .select("*")
    .eq("is_archived", false)
    .order("data_aplicacao", { ascending: false })
    .order("created_at", { ascending: false })

  if (veterinarianId) {
    query = query.eq("veterinario_id", veterinarianId)
  }

  const { data, error } = await query
  if (error) throw clinicDataError(error)

  return mapVaccineRows(client, (data || []) as VacinaRow[])
}

export async function createVaccineRecord(client: SupabaseBrowserClient, input: CreateVaccineRecordInput) {
  const { data: petData, error: petError } = await client
    .from("pets")
    .select("*")
    .eq("id", input.petId)
    .eq("user_id", input.userId)
    .single()

  if (petError) throw clinicDataError(petError)

  const { data, error } = await client
    .from("vacinas")
    .insert({
      pet_id: input.petId,
      user_id: input.userId,
      vacina: input.vacina,
      data_aplicacao: input.status === "applied" ? input.dataAplicacao || new Date().toISOString().split("T")[0] : null,
      proxima_dose: input.proximaDose,
      data_agendada: input.dataAgendada || null,
      horario_agendado: input.horarioAgendado || null,
      veterinario_id: input.veterinarioId,
      valor: input.valor ?? defaultVaccinePrice,
      status: input.status || (input.dataAgendada && input.horarioAgendado ? "scheduled" : "recommended"),
      data_recomendada: new Date().toISOString().split("T")[0],
    })
    .select("*")
    .single()

  if (error) throw clinicDataError(error)

  const row = data as VacinaRow
  const profilesById = await getProfilesByIds(client, [row.user_id, row.veterinario_id || ""])
  return mapVaccine(row, { [input.petId]: petData as PetRow }, profilesById)
}

export async function confirmTutorVaccine(client: SupabaseBrowserClient, input: TutorVaccineResponseInput) {
  const { data, error } = await client
    .from("vacinas")
    .update({
      status: "confirmed",
      tutor_resposta: "confirmada",
      tutor_respondeu_em: new Date().toISOString(),
      tutor_motivo_cancelamento: null,
    })
    .eq("id", input.vaccineId)
    .eq("user_id", input.userId)
    .select("*")
    .single()

  if (error) throw clinicDataError(error)

  const row = data as VacinaRow
  const [vaccine] = await mapVaccineRows(client, [row])
  await createOrUpdateFinanceEntryFromVaccine(client, vaccine)
  return vaccine
}

export async function cancelTutorVaccine(client: SupabaseBrowserClient, input: TutorVaccineResponseInput) {
  const reason = input.reason?.trim()
  if (!reason) {
    throw new Error("Cancellation reason is required.")
  }

  const { data, error } = await client
    .from("vacinas")
    .update({
      status: "cancelled",
      tutor_resposta: "cancelada",
      tutor_respondeu_em: new Date().toISOString(),
      tutor_motivo_cancelamento: reason,
    })
    .eq("id", input.vaccineId)
    .eq("user_id", input.userId)
    .select("*")
    .single()

  if (error) throw clinicDataError(error)

  const row = data as VacinaRow
  const [vaccine] = await mapVaccineRows(client, [row])
  await cancelFinanceEntryFromVaccine(client, input.vaccineId, input.userId)
  return vaccine
}

export async function createExamRecord(client: SupabaseBrowserClient, input: CreateExamRecordInput) {
  const customName = input.nomePersonalizado?.trim() || null
  if (input.tipo === "Outro" && !customName) {
    throw new Error("Custom exam name is required.")
  }
  if (!Number.isFinite(input.valor) || input.valor < 0) {
    throw new Error("Exam value must be a positive number.")
  }

  const { data: petData, error: petError } = await client
    .from("pets")
    .select("*")
    .eq("id", input.petId)
    .eq("user_id", input.userId)
    .single()

  if (petError) throw clinicDataError(petError)

  const { data, error } = await client
    .from("exames")
    .insert({
      pet_id: input.petId,
      user_id: input.userId,
      veterinario_id: input.veterinarioId,
      categoria: input.categoria,
      tipo: input.tipo,
      nome_personalizado: input.tipo === "Outro" ? customName : null,
      observacoes: input.observacoes?.trim() || null,
      valor: input.valor,
      data_agendada: input.dataAgendada || null,
      horario_agendado: input.horarioAgendado || null,
      status: input.status || (input.dataAgendada && input.horarioAgendado ? "scheduled" : "recommended"),
      data_recomendada: new Date().toISOString().split("T")[0],
      consulta_id: input.consultaId || null,
    })
    .select("*")
    .single()

  if (error) throw clinicDataError(error)

  const row = data as ExameRow
  const profilesById = await getProfilesByIds(client, [row.user_id, row.veterinario_id])
  return mapExam(row, { [input.petId]: petData as PetRow }, profilesById)
}

export async function confirmTutorExam(client: SupabaseBrowserClient, input: TutorExamResponseInput) {
  const { data, error } = await client
    .from("exames")
    .update({
      status: "confirmed",
      tutor_resposta: "confirmada",
      tutor_respondeu_em: new Date().toISOString(),
      tutor_motivo_cancelamento: null,
    })
    .eq("id", input.examId)
    .eq("user_id", input.userId)
    .select("*")
    .single()

  if (error) throw clinicDataError(error)

  const row = data as ExameRow
  const [exam] = await mapExamRows(client, [row])
  await createOrUpdateFinanceEntryFromExam(client, exam)
  return exam
}

export async function cancelTutorExam(client: SupabaseBrowserClient, input: TutorExamResponseInput) {
  const reason = input.reason?.trim()
  if (!reason) {
    throw new Error("Cancellation reason is required.")
  }

  const { data, error } = await client
    .from("exames")
    .update({
      status: "cancelled",
      tutor_resposta: "cancelada",
      tutor_respondeu_em: new Date().toISOString(),
      tutor_motivo_cancelamento: reason,
    })
    .eq("id", input.examId)
    .eq("user_id", input.userId)
    .select("*")
    .single()

  if (error) throw clinicDataError(error)

  const row = data as ExameRow
  const [exam] = await mapExamRows(client, [row])
  await cancelFinanceEntryFromExam(client, input.examId, input.userId)
  return exam
}

export async function getAdminUpcomingAppointments(client: SupabaseBrowserClient) {
  const today = new Date().toISOString().split("T")[0]
  const { data, error } = await client
    .from("agendamentos")
    .select("*")
    .gte("data", today)
    .in("status", ["agendado", "confirmado"])
    .order("data", { ascending: true })
    .order("horario_inicio", { ascending: true })
    .limit(5)

  if (error) throw clinicDataError(error)

  const rows = (data || []) as AgendamentoRow[]
  const petIds = rows.map((appointment) => appointment.pet_id)
  const userIds = rows.map((appointment) => appointment.user_id)

  const [{ data: petData, error: petError }, profilesById] = await Promise.all([
    petIds.length > 0
      ? client.from("pets").select("*").in("id", [...new Set(petIds)])
      : Promise.resolve({ data: [], error: null }),
    getProfilesByIds(client, userIds),
  ])

  if (petError) throw clinicDataError(petError)

  const petsById = ((petData || []) as PetRow[]).reduce<Record<string, PetRow>>((acc, pet) => {
    acc[pet.id] = pet
    return acc
  }, {})

  return rows.map((appointment) => mapAppointment(appointment, petsById, profilesById))
}

export async function assignVeterinarianToAppointment(
  client: SupabaseBrowserClient,
  appointmentId: string,
  veterinarianId: string | null,
  veterinarianName: string,
) {
  const { error } = await client
    .from("agendamentos")
    .update({
      veterinario_id: veterinarianId,
      veterinario: veterinarianName,
    })
    .eq("id", appointmentId)

  if (error) throw clinicDataError(error)
}

export async function createConsultationWithHistory(client: SupabaseBrowserClient, input: CreateClinicalFeedbackInput) {
  const feedback = input.feedback.trim()
  const historyDescription = input.historyDescription.trim()

  if (!feedback && !historyDescription) {
    throw new Error("Feedback or history description is required.")
  }

  let consulta: ConsultaRow | null = await getConsultationByAppointmentId(client, input.appointment.id)

  if (feedback && !consulta) {
    const { data: consultaData, error: consultaError } = await client
      .from("consultas")
      .insert({
        pet_id: input.appointment.petId,
        user_id: input.appointment.userId,
        tutor: input.appointment.tutorDisplayName,
        data: input.historyDate,
        horario: input.appointment.horarioInicio,
        veterinario: input.veterinarianName,
        veterinario_id: input.veterinarianId,
        agendamento_id: input.appointment.id,
        motivo: feedback,
        status: "realizada",
        valor: input.valor ?? input.appointment.precoEstimado ?? defaultConsultationPrice,
      })
      .select("*")
      .single()

    if (consultaError) throw clinicDataError(consultaError)
    consulta = consultaData as ConsultaRow
  }

  if (historyDescription) {
    let existingHistoryQuery = client
      .from("historico")
      .select("id")
      .limit(1)

    if (consulta) {
      existingHistoryQuery = existingHistoryQuery.or(`agendamento_id.eq.${input.appointment.id},consulta_id.eq.${consulta.id}`)
    } else {
      existingHistoryQuery = existingHistoryQuery.eq("agendamento_id", input.appointment.id)
    }

    const { data: existingHistory, error: existingHistoryError } = await existingHistoryQuery.maybeSingle()

    if (existingHistoryError) throw clinicDataError(existingHistoryError)

    if (!existingHistory) {
      const { error: historicoError } = await client.from("historico").insert({
        pet_id: input.appointment.petId,
        user_id: input.appointment.userId,
        data: input.historyDate,
        tipo: input.historyType,
        descricao: historyDescription,
        veterinario: input.veterinarianName,
        consulta_id: consulta?.id || null,
        agendamento_id: input.appointment.id,
      })

      if (historicoError) throw clinicDataError(historicoError)
    }
  }

  await updateAppointmentStatus(client, input.appointment.id, "realizado")

  return { consultation: consulta }
}

export async function getAdminConsultations(client: SupabaseBrowserClient) {
  const { data, error } = await client
    .from("consultas")
    .select("*")
    .eq("is_archived", false)
    .order("data", { ascending: false })
    .order("horario", { ascending: true })

  if (error) throw clinicDataError(error)

  const rows = (data || []) as ConsultaRow[]
  const petIds = rows.map((consultation) => consultation.pet_id)
  const profileIds = rows.flatMap((consultation) => [consultation.user_id, consultation.veterinario_id || ""])
  const appointmentIds = [...new Set(rows.map((consultation) => consultation.agendamento_id).filter(Boolean))] as string[]

  const [{ data: petData, error: petError }, profilesById, { data: appointmentData, error: appointmentError }] =
    await Promise.all([
      petIds.length > 0
        ? client.from("pets").select("*").in("id", [...new Set(petIds)])
        : Promise.resolve({ data: [], error: null }),
      getProfilesByIds(client, profileIds),
      appointmentIds.length > 0
        ? client.from("agendamentos").select("*").in("id", appointmentIds)
        : Promise.resolve({ data: [], error: null }),
    ])

  if (petError) throw clinicDataError(petError)
  if (appointmentError) throw clinicDataError(appointmentError)

  const petsById = ((petData || []) as PetRow[]).reduce<Record<string, PetRow>>((acc, pet) => {
    acc[pet.id] = pet
    return acc
  }, {})
  const appointmentsById = ((appointmentData || []) as AgendamentoRow[]).reduce<Record<string, AgendamentoRow>>(
    (acc, appointment) => {
      acc[appointment.id] = appointment
      return acc
    },
    {},
  )

  return rows.map((consultation) => mapConsultation(consultation, petsById, profilesById, appointmentsById))
}

export async function getArchivedAdminConsultations(client: SupabaseBrowserClient) {
  const { data, error } = await client
    .from("consultas")
    .select("*")
    .eq("is_archived", true)
    .order("archived_at", { ascending: false, nullsFirst: false })

  if (error) throw clinicDataError(error)

  const rows = (data || []) as ConsultaRow[]
  const petIds = rows.map((consultation) => consultation.pet_id)
  const profileIds = rows.flatMap((consultation) => [consultation.user_id, consultation.veterinario_id || ""])
  const appointmentIds = [...new Set(rows.map((consultation) => consultation.agendamento_id).filter(Boolean))] as string[]

  const [{ data: petData, error: petError }, profilesById, { data: appointmentData, error: appointmentError }] =
    await Promise.all([
      petIds.length > 0
        ? client.from("pets").select("*").in("id", [...new Set(petIds)])
        : Promise.resolve({ data: [], error: null }),
      getProfilesByIds(client, profileIds),
      appointmentIds.length > 0
        ? client.from("agendamentos").select("*").in("id", appointmentIds)
        : Promise.resolve({ data: [], error: null }),
    ])

  if (petError) throw clinicDataError(petError)
  if (appointmentError) throw clinicDataError(appointmentError)

  const petsById = ((petData || []) as PetRow[]).reduce<Record<string, PetRow>>((acc, pet) => {
    acc[pet.id] = pet
    return acc
  }, {})
  const appointmentsById = ((appointmentData || []) as AgendamentoRow[]).reduce<Record<string, AgendamentoRow>>(
    (acc, appointment) => {
      acc[appointment.id] = appointment
      return acc
    },
    {},
  )

  return rows.map((consultation) => mapConsultation(consultation, petsById, profilesById, appointmentsById))
}

export async function archiveAdminConsultation(client: SupabaseBrowserClient, consultationId: string, adminId: string) {
  const { error } = await client
    .from("consultas")
    .update({ is_archived: true, archived_at: new Date().toISOString(), archived_by: adminId })
    .eq("id", consultationId)

  if (error) throw clinicDataError(error)
}

export async function restoreAdminConsultation(client: SupabaseBrowserClient, consultationId: string) {
  const { error } = await client
    .from("consultas")
    .update({ is_archived: false, archived_at: null, archived_by: null })
    .eq("id", consultationId)

  if (error) throw clinicDataError(error)
}

export async function safeDeleteAdminConsultation(
  client: SupabaseBrowserClient,
  consultationId: string,
): Promise<SafeDeleteResult> {
  const linked =
    (await hasAnyRows(client, "historico", "consulta_id", consultationId)) ||
    (await hasFinanceLink(client, "appointment", consultationId))

  if (linked) return { deleted: false, reason: blockedDeleteReason }

  const { error } = await client.from("consultas").delete().eq("id", consultationId)
  if (error) throw clinicDataError(error)
  return { deleted: true }
}

export async function getAdminConsultationWeekdayStats(client: SupabaseBrowserClient) {
  const weekdayStats: AdminConsultationWeekdayStat[] = [
    { name: "Seg", consultas: 0 },
    { name: "Ter", consultas: 0 },
    { name: "Qua", consultas: 0 },
    { name: "Qui", consultas: 0 },
    { name: "Sex", consultas: 0 },
    { name: "Sab", consultas: 0 },
    { name: "Dom", consultas: 0 },
  ]

  const { data, error } = await client
    .from("consultas")
    .select("id,data,status")
    .eq("status", "realizada")

  if (error) throw clinicDataError(error)

  ;((data || []) as Pick<ConsultaRow, "id" | "data" | "status">[]).forEach((consultation) => {
    const date = new Date(`${consultation.data}T00:00:00`)
    const weekdayIndex = (date.getDay() + 6) % 7
    weekdayStats[weekdayIndex].consultas += 1
  })

  return weekdayStats
}

export async function getAdminHistoryEntries(client: SupabaseBrowserClient) {
  const [
    { data: historyData, error: historyError },
    { data: consultationData, error: consultationError },
    { data: vaccineData, error: vaccineError },
    { data: examData, error: examError },
  ] = await Promise.all([
    client
      .from("historico")
      .select("*")
      .order("data", { ascending: false })
      .order("created_at", { ascending: false }),
    client
      .from("consultas")
      .select("*")
      .order("data", { ascending: false })
      .order("created_at", { ascending: false }),
    client
      .from("vacinas")
      .select("*")
      .order("data_aplicacao", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false }),
    client
      .from("exames")
      .select("*")
      .eq("status", "confirmed")
      .order("data_agendada", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false }),
  ])

  if (historyError) throw clinicDataError(historyError)
  if (consultationError) throw clinicDataError(consultationError)
  if (vaccineError) throw clinicDataError(vaccineError)
  if (examError) throw clinicDataError(examError)

  const rows = (historyData || []) as HistoricoRow[]
  const consultations = (consultationData || []) as ConsultaRow[]
  const vaccines = (vaccineData || []) as VacinaRow[]
  const exams = (examData || []) as ExameRow[]
  const petIds = [
    ...rows.map((entry) => entry.pet_id),
    ...consultations.map((consultation) => consultation.pet_id),
    ...vaccines.map((vaccine) => vaccine.pet_id),
    ...exams.map((exam) => exam.pet_id),
  ]
  const profileIds = [
    ...rows.map((entry) => entry.user_id),
    ...consultations.flatMap((consultation) => [consultation.user_id, consultation.veterinario_id || ""]),
    ...vaccines.flatMap((vaccine) => [vaccine.user_id, vaccine.veterinario_id || ""]),
    ...exams.flatMap((exam) => [exam.user_id, exam.veterinario_id]),
  ]
  const linkedConsultationIds = rows.map((entry) => entry.consulta_id).filter(Boolean) as string[]
  const missingLinkedConsultationIds = linkedConsultationIds.filter(
    (id) => !consultations.some((consultation) => consultation.id === id),
  )

  const [{ data: petData, error: petError }, { data: linkedConsultationData, error: linkedConsultationError }, profilesById] =
    await Promise.all([
      petIds.length > 0
        ? client.from("pets").select("*").in("id", [...new Set(petIds)])
        : Promise.resolve({ data: [], error: null }),
      missingLinkedConsultationIds.length > 0
        ? client.from("consultas").select("*").in("id", [...new Set(missingLinkedConsultationIds)])
        : Promise.resolve({ data: [], error: null }),
      getProfilesByIds(client, profileIds),
    ])

  if (petError) throw clinicDataError(petError)
  if (linkedConsultationError) throw clinicDataError(linkedConsultationError)

  const allConsultations = [...consultations, ...((linkedConsultationData || []) as ConsultaRow[])].filter(
    (consultation, index, items) => items.findIndex((item) => item.id === consultation.id) === index,
  )
  const petsById = ((petData || []) as PetRow[]).reduce<Record<string, PetRow>>((acc, pet) => {
    acc[pet.id] = pet
    return acc
  }, {})
  const consultationsById = allConsultations.reduce<Record<string, ConsultaRow>>((acc, consultation) => {
    acc[consultation.id] = consultation
    return acc
  }, {})

  const historyEntries = rows.map((entry) => mapHistoryEntry(entry, petsById, profilesById, consultationsById))
  const historyConsultationIds = new Set(historyEntries.map((entry) => entry.consultaId).filter(Boolean))
  const historyAppointmentIds = new Set(historyEntries.map((entry) => entry.agendamentoId).filter(Boolean))

  const consultationEntries = consultations
    .filter((consultation) => {
      if (historyConsultationIds.has(consultation.id)) return false
      if (consultation.agendamento_id && historyAppointmentIds.has(consultation.agendamento_id)) return false
      return true
    })
    .map((consultation) => mapConsultationHistoryEntry(consultation, petsById, profilesById))

  const normalizedHistoryVaccineKeys = new Set(
    historyEntries
      .filter((entry) => entry.tipo === "vacina")
      .map((entry) => `${entry.petId}|${entry.data}|${entry.descricao.toLowerCase()}`),
  )
  const vaccineEntries = vaccines
    .map((vaccine) => mapVaccineHistoryEntry(vaccine, petsById, profilesById))
    .filter((entry) => {
      const exactKey = `${entry.petId}|${entry.data}|${entry.descricao.toLowerCase()}`
      const fuzzyKey = `${entry.petId}|${entry.data}|${entry.descricao.replace(/^Vacina:\s*/i, "").toLowerCase()}`
      return !normalizedHistoryVaccineKeys.has(exactKey) && !normalizedHistoryVaccineKeys.has(fuzzyKey)
    })
  const normalizedHistoryExamKeys = new Set(
    historyEntries
      .filter((entry) => entry.tipo === "exame")
      .map((entry) => `${entry.petId}|${entry.data}|${entry.descricao.toLowerCase()}`),
  )
  const examEntries = exams
    .map((exam) => mapExamHistoryEntry(exam, petsById, profilesById))
    .filter((entry) => !normalizedHistoryExamKeys.has(`${entry.petId}|${entry.data}|${entry.descricao.toLowerCase()}`))

  return [...historyEntries, ...consultationEntries, ...vaccineEntries, ...examEntries].sort((a, b) => {
    const dateComparison = new Date(b.data).getTime() - new Date(a.data).getTime()
    if (dateComparison !== 0) return dateComparison
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

export async function getAdminFinancialEntries(client: SupabaseBrowserClient) {
  const { data, error } = await client
    .from("lancamentos")
    .select("id,user_id,descricao,tipo,valor,data,categoria,origem_tipo,origem_id,status,created_at")
    .order("data", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) throw clinicDataError(error)

  return ((data || []) as LancamentoRow[]).map(mapFinancialEntry)
}

export async function createFinancialEntry(client: SupabaseBrowserClient, input: CreateFinancialEntryInput) {
  const { data, error } = await client
    .from("lancamentos")
    .insert({
      user_id: input.userId,
      descricao: input.descricao,
      tipo: input.tipo,
      valor: input.valor,
      data: input.data,
      categoria: input.categoria,
      origem_tipo: "manual",
      status: "active",
    })
    .select("id,user_id,descricao,tipo,valor,data,categoria,origem_tipo,origem_id,status,created_at")
    .single()

  if (error) throw clinicDataError(error)

  return mapFinancialEntry(data as LancamentoRow)
}

export function calculateFinancialSummary(entries: AdminFinancialEntry[], referenceDate = new Date()): FinancialSummary {
  const referenceMonth = referenceDate.getMonth()
  const referenceYear = referenceDate.getFullYear()
  const currentMonthEntries = entries.filter((entry) => {
    const entryDate = new Date(`${entry.data}T00:00:00`)
    return entry.status !== "cancelled" && entryDate.getMonth() === referenceMonth && entryDate.getFullYear() === referenceYear
  })

  const receitaMes = currentMonthEntries
    .filter((entry) => entry.tipo === "entrada")
    .reduce((total, entry) => total + entry.valor, 0)
  const despesasMes = currentMonthEntries
    .filter((entry) => entry.tipo === "saida")
    .reduce((total, entry) => total + entry.valor, 0)

  return {
    receitaMes,
    despesasMes,
    lucroLiquido: receitaMes - despesasMes,
  }
}
