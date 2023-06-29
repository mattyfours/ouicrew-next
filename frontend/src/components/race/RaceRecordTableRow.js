import { useCallback, useState } from 'react'
import ResponsiveTable from '../displayElements/ResponsiveTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import Select from '../formElements/Select'
import { t } from '@/languages/languages'
import { timeToHhMmSsMs } from '@/helpers/dateFormater'
import { useParams } from 'next/navigation'
import axios from 'axios'

export default function RaceRecordTableRow ({
  record,
  data,
  setErrorMessage,
  setSuccessMessage
}) {
  const { userId, teamId, raceId } = useParams()

  const raceStart = Number(data.race.start_time)
  const diffTime = record.time - raceStart

  const [hasBeenSaved, setHasBeenSaved] = useState(false)
  const [createNew, setCreateNew] = useState(record.checkpoint === 'start')
  const [recordId, setRecordId] = useState('')

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

      console.log(url)
      const { data } = await axios.post(url,
        {
          recordedTimeFromStart: diffTime,
          checkpoint: record.checkpoint,
          recordId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
          }
        }
      )

      setCreateNew(false)
      setHasBeenSaved(true)

      setRecordId(data.result.id)

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
    setCreateNew
  ])

  console.log(data)
  return (
    <ResponsiveTable.Row>
      <ResponsiveTable.Item>
        {
          (
            record.checkpoint === 'start' &&
            hasBeenSaved === false
          )
            ? (
              <Select
                label={t('forms.select_entry')}
                value={recordId}
                setter={setRecordId}
                options={[
                  {
                    value: '',
                    label: ''
                  },
                  ...data.non_started_entries.map(entry => ({
                    value: entry.id,
                    label: entry.name
                  }))
                ]}
              />
              )
            : (
              <Select
                label={t('forms.select_entry')}
                value={recordId}
                setter={setRecordId}
                options={[
                  {
                    value: '',
                    label: ''
                  },
                  ...data.pending_results.map(result => ({
                    value: result.result.id,
                    label: result.entry?.name
                  }))
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
        <button
          className='icon-link'
          onClick={handleRecordSave}
        >
          <FontAwesomeIcon icon={faSave} />
          {
            hasBeenSaved
              ? t('forms.update')
              : t('forms.save')
          }
        </button>
      </ResponsiveTable.Item>
    </ResponsiveTable.Row>
  )
}
