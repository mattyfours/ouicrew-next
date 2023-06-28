import { useState } from 'react'
import ResponsiveTable from '../displayElements/ResponsiveTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

export default function RaceRecordTableRow ({ race, entries, record }) {
  console.log(entries)

  const raceStart = Number(race.start_time)
  const [diffTime, setDiffTime] = useState(record.time - raceStart)

  const [hours, setHours] = useState(parseInt((diffTime / (1000 * 60 * 60)) % 24))
  const [minutes, setMinutes] = useState(parseInt((diffTime / (1000 * 60)) % 60))
  const [seconds, setSeconds] = useState(parseInt((diffTime / 1000) % 60))
  const [milliseconds, setMilliseconds] = useState(parseInt((diffTime % 1000) / 100))

  return (
    <ResponsiveTable.Row>
      <ResponsiveTable.Item>
        <p>fd</p>
      </ResponsiveTable.Item>

      <ResponsiveTable.Item>
        {record.checkpoint}
      </ResponsiveTable.Item>

      <ResponsiveTable.Item>
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
