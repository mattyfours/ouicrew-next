import { useState } from 'react'
import ResponsiveTable from '../displayElements/ResponsiveTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import Select from '../formElements/Select'
import { t } from '@/languages/languages'

export default function RaceRecordTableRow ({ record, data }) {
  console.log(data)

  const raceStart = Number(data.race.start_time)
  const [diffTime, setDiffTime] = useState(record.time - raceStart)
  const [entryId, setEntryId] = useState('')
  const [resultId, setResultId] = useState('')

  const [hours, setHours] = useState(parseInt((diffTime / (1000 * 60 * 60)) % 24))
  const [minutes, setMinutes] = useState(parseInt((diffTime / (1000 * 60)) % 60))
  const [seconds, setSeconds] = useState(parseInt((diffTime / 1000) % 60))
  const [milliseconds, setMilliseconds] = useState(parseInt((diffTime % 1000) / 100))

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
        {hours}:{minutes}:{seconds}.{milliseconds}
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
