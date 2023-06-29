import { useState } from 'react'
import ResponsiveTable from '../displayElements/ResponsiveTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import Select from '../formElements/Select'
import { t } from '@/languages/languages'
import { timeToHhMmSsMs } from '@/helpers/dateFormater'

export default function RaceRecordTableRow ({ record, data }) {
  // console.log(data)

  console.log(data.race.start_time, record.time)

  const raceStart = Number(data.race.start_time)
  const [diffTime, setDiffTime] = useState(record.time - raceStart)
  const [entryId, setEntryId] = useState('')
  const [resultId, setResultId] = useState('')

  // Submit Handler
  //  const handleFormSubmit = useCallback(async () => {
  //   try {
  //     setIsLoading(true)
  //     const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/${userId}/teams/join`
  //     const { data } = await axios.post(url,
  //       {
  //         teamId: teamIdInput,
  //         accessCode: accessCodeInput
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
  //         }
  //       }
  //     )

  //     setIsLoading(false)
  //     setErrorMessage('')
  //     setTeamIdInput('-')
  //     setAccessCodeInput('')
  //     setSuccessMessage(data.message)

  //     if (typeof refetch !== 'undefined') {
  //       await refetch()
  //     }
  //   } catch (err) {
  //     setIsLoading(false)
  //     console.error(err)
  //     setErrorMessage(
  //       typeof err.response?.data?.error?.[0] === 'undefined'
  //         ? t('general.unexpected_error')
  //         : err.response.data.error[0].message
  //     )
  //   }
  // }, [
  //   errorMessage,
  //   teamIdInput,
  //   accessCodeInput,
  //   setIsLoading
  // ])

  console.log(data.non_started_entries.map(entry => ({
    value: entry.id,
    label: entry.name
  })))
  return (
    <ResponsiveTable.Row>
      <ResponsiveTable.Item>
        <Select
          label={t('forms.select_entry')}
          value={entryId}
          setter={setEntryId}
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
      </ResponsiveTable.Item>

      <ResponsiveTable.Item>
        {record.checkpoint} @<br />
        {timeToHhMmSsMs(diffTime)}
      </ResponsiveTable.Item>

      <ResponsiveTable.Item>
        <button className='icon-link'>
          <FontAwesomeIcon icon={faSave} />
          Save
        </button>
      </ResponsiveTable.Item>
    </ResponsiveTable.Row>
  )
}
