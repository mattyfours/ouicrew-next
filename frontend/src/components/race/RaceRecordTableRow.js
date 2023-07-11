import { useCallback, useEffect, useState } from 'react'
import ResponsiveTable from '../displayElements/ResponsiveTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSave } from '@fortawesome/free-solid-svg-icons'
import Select from '../formElements/Select'
import { t } from '@/languages/languages'
import { timeToHhMmSsMs } from '@/helpers/dateFormater'
import { useParams } from 'next/navigation'
import axios from 'axios'

export default function RaceRecordTableRow ({
  record: propsRecord,
  data,
  setErrorMessage,
  setSuccessMessage
}) {
  const { userId, teamId, raceId } = useParams()

  const record = propsRecord
  const raceStart = Number(data.race.start_time)
  const diffTime = record.time - raceStart

  const [hasBeenSaved, setHasBeenSaved] = useState(false)
  const [recordId, setRecordId] = useState('')
  const [resultName, setResultName] = useState('')
  const [createNew, setCreateNew] = useState(
    record.checkpoint === 'start' ||
    record.checkpoint === 'dns'
  )

  const entryOrResultList = (
    record.checkpoint === 'start' ||
    record.checkpoint === 'dns'
  )
    ? data.non_started_entries.map(entry => ({
      value: entry.id,
      label: entry.name
    }))
    : data.pending_results.map(result => ({
      value: result.result.id,
      label: result.entry?.name
    }))

  // Save Result
  const handleRecordSave = useCallback(async () => {
    try {
      const url = [
        process.env.NEXT_PUBLIC_SERVER_URL_BASE,
        `/user/${userId}`,
        `/teams/${teamId}`,
        `/race/${raceId}`,
        `/results/${createNew ? '' : recordId}`
      ].join('')

      const { data } = await axios.post(url,
        {
          recordedTimeFromStart: diffTime,
          checkpoint: record.checkpoint,
          recordId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ouicrew-timestamp': Date.now(),
            'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
          }
        }
      )

      setCreateNew(false)
      setHasBeenSaved(true)
      setRecordId(data.result.id)
      setResultName(data.entry.name)

      setHasBeenSaved(true)
      if (typeof setErrorMessage !== 'undefined') {
        setErrorMessage('')
      }

      if (typeof setSuccessMessage !== 'undefined') {
        setSuccessMessage(data.message)
      }
    } catch (err) {
      console.error(err)

      if (typeof setSuccessMessage !== 'undefined') {
        setSuccessMessage('')
      }

      if (typeof setErrorMessage !== 'undefined') {
        setErrorMessage(
          typeof err.response?.data?.error?.[0] === 'undefined'
            ? t('general.unexpected_error')
            : err.response.data.error[0].message
        )
      }
    }
  }, [
    data,
    record,
    createNew,
    recordId,
    setErrorMessage,
    setSuccessMessage,
    setResultName,
    setCreateNew
  ])

  // TODO: add way to detect non aved results

  return (
    <ResponsiveTable.Row>
      <ResponsiveTable.Item>
        {
          hasBeenSaved
            ? resultName
            : (
              <Select
                label={t('forms.select_entry')}
                value={recordId}
                setter={setRecordId}
                variation='inline'
                options={[
                  { value: '', label: '' },
                  ...entryOrResultList
                ]}
              />
              )
        }
      </ResponsiveTable.Item>

      <ResponsiveTable.Item>
        {record.checkpoint} @<br />
        {timeToHhMmSsMs(diffTime)}
      </ResponsiveTable.Item>

      <ResponsiveTable.Item>
        {
          hasBeenSaved
            ? (
              <span className='icon-link'>
                <FontAwesomeIcon icon={faCheck} />
                {t('forms.saved')}
              </span>
              )
            : (
              <button
                className='icon-link'
                onClick={handleRecordSave}
              >
                <FontAwesomeIcon icon={faSave} />
                {t('forms.save')}
              </button>
              )
        }
      </ResponsiveTable.Item>
    </ResponsiveTable.Row>
  )
}
