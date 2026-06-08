export function getTodayDateInputValue(referenceDate = new Date()) {
  return referenceDate.toISOString().split("T")[0]
}

export function getMaxFutureDateInputValue(months = 3, referenceDate = new Date()) {
  const date = new Date(referenceDate)
  date.setMonth(date.getMonth() + months)
  return date.toISOString().split("T")[0]
}

export function validateFutureSchedulingDate(dateValue: string, referenceDate = new Date()) {
  if (!dateValue) return null

  const today = getTodayDateInputValue(referenceDate)
  const maxDate = getMaxFutureDateInputValue(3, referenceDate)

  if (dateValue < today) return "A data não pode ser anterior a hoje."
  if (dateValue > maxDate) return "A data não pode ultrapassar o limite de 3 meses."
  return null
}
