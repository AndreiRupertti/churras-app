export const formatMoney = (value: number, currency: string) => {
  const locale = 'pt-br'
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency,
  });
  return formatter.format(value)
}