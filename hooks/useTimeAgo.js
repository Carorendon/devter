import { useEffect, useState } from "react"
import { formatDate } from "./useDateTimeFormat"

const isRelativeTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.RelativeTimeFormat

const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getDateDiffs = (timestamp) => {
  // ✅ Validar que timestamp sea un número válido
  if (!timestamp || typeof timestamp !== 'number' || !isFinite(timestamp)) {
    console.warn('Invalid timestamp received:', timestamp)
    return { value: 0, unit: "second" }
  }

  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  // ✅ Validar que elapsed sea finito
  if (!isFinite(elapsed)) {
    console.warn('Invalid elapsed time calculated:', elapsed)
    return { value: 0, unit: "second" }
  }

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.round(elapsed / secondsInUnit)
      
      // ✅ Validar que value sea finito
      if (!isFinite(value)) {
        console.warn('Invalid value calculated:', value)
        return { value: 0, unit: "second" }
      }
      
      return { value, unit }
    }
  }
  
  // ✅ Fallback por si acaso
  return { value: 0, unit: "second" }
}

export default function useTimeAgo(timestamp) {
  // ✅ Validar timestamp al inicio
  if (!timestamp || typeof timestamp !== 'number' || !isFinite(timestamp)) {
    console.warn('useTimeAgo received invalid timestamp:', timestamp)
    return "Fecha inválida"
  }

  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    if (isRelativeTimeFormatSupported && timestamp && isFinite(timestamp)) {
      const interval = setInterval(() => {
        const newTimeAgo = getDateDiffs(timestamp)
        setTimeago(newTimeAgo)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [timestamp])

  if (!isRelativeTimeFormatSupported) {
    return formatDate(timestamp)
  }

  const { value, unit } = timeago

  // ✅ Última validación antes de usar Intl
  if (!isFinite(value)) {
    console.warn('useTimeAgo: value is not finite:', value)
    return formatDate(timestamp)
  }

  try {
    const rtf = new Intl.RelativeTimeFormat("es", { style: "short" })
    return rtf.format(value, unit)
  } catch (error) {
    console.error('Error formatting relative time:', error)
    return formatDate(timestamp)
  }
}