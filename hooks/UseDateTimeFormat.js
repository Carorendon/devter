import { DEFAULT_LANGUAGE } from "../constants/locale"

const isDateTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.DateTimeFormat

export const formatDate = (timestamp, { language = DEFAULT_LANGUAGE } = {}) => {
  // ✅ Validar timestamp
  if (!timestamp || typeof timestamp !== 'number' || !isFinite(timestamp)) {
    console.warn('formatDate received invalid timestamp:', timestamp)
    return 'Fecha inválida'
  }

  // ✅ Validar que el timestamp esté en un rango razonable
  if (timestamp < 0 || timestamp > Date.now() + (365 * 24 * 60 * 60 * 1000)) {
    console.warn('formatDate received timestamp out of range:', timestamp)
    return 'Fecha inválida'
  }

  let date
  try {
    date = new Date(timestamp)
    
    // ✅ Verificar que la fecha sea válida
    if (isNaN(date.getTime())) {
      console.warn('formatDate: Invalid Date object created from timestamp:', timestamp)
      return 'Fecha inválida'
    }
  } catch (error) {
    console.error('formatDate: Error creating Date object:', error)
    return 'Fecha inválida'
  }

  if (!isDateTimeFormatSupported) {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }

    try {
      return date.toLocaleDateString(language, options)
    } catch (error) {
      console.error('formatDate: Error with toLocaleDateString:', error)
      return date.toString()
    }
  }

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }

  try {
    return new Intl.DateTimeFormat(language, options).format(date)
  } catch (error) {
    console.error('formatDate: Error with Intl.DateTimeFormat:', error)
    return date.toString()
  }
}

export default function useDateTimeFormat(timestamp) {
  // ✅ Validar timestamp antes de usar formatDate
  if (!timestamp || typeof timestamp !== 'number' || !isFinite(timestamp)) {
    console.warn('useDateTimeFormat received invalid timestamp:', timestamp)
    return 'Fecha inválida'
  }

  try {
    return formatDate(timestamp, { language: DEFAULT_LANGUAGE })
  } catch (error) {
    console.error('useDateTimeFormat error:', error)
    return 'Fecha inválida'
  }
}