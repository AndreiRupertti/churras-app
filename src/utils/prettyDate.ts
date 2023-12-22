export const prettyDate = (dateString?: string, locale = 'pt-br') => {
  if (!dateString) return 'Sem Data'

  const date = new Date(dateString)
  return date.toLocaleDateString(locale, { month: '2-digit', day: '2-digit' })
}