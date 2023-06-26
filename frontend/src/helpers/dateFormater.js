import { t } from '@/languages/languages'

const monthNames = t('dates.monthList')
  .replace(/ /g, '')
  .split(',')

export const serverDateTimeToReadable = (dateString) => {
  const date = new Date(dateString)

  const amOrPm = date.getHours() < 12 ? 'am' : 'pm'
  const hour12Format = date.getHours() % 12 || 12
  const oBeforeTime = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
  const time = `${hour12Format}:${oBeforeTime}${amOrPm}`

  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} @ ${time}`
}
