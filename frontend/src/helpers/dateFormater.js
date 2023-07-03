import { t } from '@/languages/languages'

const monthNames = t('dates.monthList')
  .replace(/ /g, '')
  .split(',')

/**
 * Converts a date string from the server to a readable format
 * @param {String} dateString : date string from the server
 * @returns readable string
 */
export const serverDateTimeToReadable = (dateString) => {
  const date = new Date(dateString)

  const amOrPm = date.getHours() < 12 ? 'am' : 'pm'
  const hour12Format = date.getHours() % 12 || 12
  const oBeforeTime = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
  const time = `${hour12Format}:${oBeforeTime}${amOrPm}`

  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} @ ${time}`
}

/**
 * Converts a date to a input date format
 * @param {Object} dateToConvert : date to convert
 * @returns Date string
 */
export const toDateInputFormat = (dateToConvert) => {
  const date = new Date(dateToConvert)
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 16)
}

/**
 * Convert time in milliseconds to HH:MM:SS:MS format
 * @param {Number} time : time in ms
 * @returns HH:MM:SS:MS string
 */
export const timeToHhMmSsMs = (time) => {
  const hours = Math.floor((time / (1000 * 60 * 60)))

  const minutes = Math.floor((time / (1000 * 60)) % 60)
  const minutes0 = minutes < 10
    ? `0${minutes}`
    : minutes

  const seconds = Math.floor((time / 1000) % 60)
  const seconds0 = seconds < 10
    ? `0${seconds}`
    : seconds

  const milliseconds = Math.floor((time % 1000) / 100)

  return `${hours}:${minutes0}:${seconds0}.${milliseconds}`
}

/**
 * Get time in env set timezone
 * @param {Number} serverOffset offset in ms
 * @returns adjusted time in ms
 */
export const getAdjustedNowTime = (clientServerDiffTime = 0) => {
  const nowTime = Date.now()
  const adjustedNowTime = nowTime + clientServerDiffTime

  return adjustedNowTime
}
