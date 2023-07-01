import { styled } from 'styled-components'
import { t } from '@/languages/languages'
import { useEffect, useState } from 'react'
import ResponsiveTable from '@/components/displayElements/ResponsiveTable'
import { getNowTimeInTimezone, timeToHhMmSsMs } from '@/helpers/dateFormater'

const StyledDashboardResultDisplay = styled.nav`
  position: relative;
  text-align: left;
  max-width: var(--width-modal);
  width: calc(100vw - 32px);
  left: 50%;
  transform: translateX(-50%);
  margin: 32px auto 0;
  border-top: 1px solid var(--text-color);

  &.wide {
    max-width: var(--container-width);
  }

  h2 {
    margin: 24px 0 8px;
  }
`

export default function RaceResults ({
  data,
  refetch
}) {
  const [nowTime, setNowTime] = useState(getNowTimeInTimezone())
  const [ongoingResults, setOngoingResults] = useState([])
  const [finishedResults, setFinishedResults] = useState([])
  const [sets, setSets] = useState(0)

  useEffect(() => {
    const [maxSets] = data.results
      .map(result => result.set)
      .sort()
      .reverse()

    setSets(maxSets)

    setNowTime(getNowTimeInTimezone(data.time_zone_offset_ms))

    setOngoingResults(
      data?.results?.filter(result => result.finish_time === null)
    )

    setFinishedResults(
      data?.results?.filter(result => result.finish_time !== null)
    )
  }, [data])

  return (
    <>
      <StyledDashboardResultDisplay className='wide'>
        <h2 className='heading-small'>{t('dashboard.in_progress')}</h2>
        {
          ongoingResults.length === 0
            ? (<p className='no-log-notice'><small>{t('dashboard.no_ongoing_results')}</small></p>)
            : (
              <ResponsiveTable
                evenCells
                headings={[
                  'Entry',
                  'Current Time HH:MM:SS.MS',
                  'Set'
                ]}
              >
                {
                  ongoingResults.map(result => (
                    <ResponsiveTable.Row key={`${data.race.id}--${result.id}`}>
                      <ResponsiveTable.Item>
                        {result.entry.name}
                      </ResponsiveTable.Item>

                      <ResponsiveTable.Item>
                        {
                          timeToHhMmSsMs(
                            nowTime - data.race.start_time - result.start_time

                          )
                        }
                      </ResponsiveTable.Item>
                      <ResponsiveTable.Item>
                        {result.set}
                      </ResponsiveTable.Item>
                    </ResponsiveTable.Row>
                  ))
                }
              </ResponsiveTable>
              )
        }

      </StyledDashboardResultDisplay>

      {
        Array(sets)
          .fill(null)
          .map((_, index) => (
            <StyledDashboardResultDisplay className='wide' key={`${data.race.id}--set-${index}`}>
              <h2 className='heading-small'>{t('dashboard.set')} {index + 1}</h2>
              {
                finishedResults.filter(result => result.set === index + 1).length === 0
                  ? (<p className='no-log-notice'><small>{t('dashboard.no_finished_results')}</small></p>)
                  : (
                    <ResponsiveTable
                      evenCells
                      headings={[
                        'Entry',
                        'GMS',
                        'Total Time HH:MM:SS.MS',
                        'Start Time HH:MM:SS.MS',
                        'Finish Time HH:MM:SS.MS',
                        'Set'
                      ]}
                    >
                      {
                        finishedResults
                          .filter(result => result.set === index + 1)
                          .map((result, index) => (
                            <ResponsiveTable.Row key={`${data.race.id}--${result.id}`}>
                              <ResponsiveTable.Item>
                                {result.entry.name} ({result.standard.name})
                              </ResponsiveTable.Item>

                              <ResponsiveTable.Item>
                                {
                                  result.racing_standard_percentage === null
                                    ? t('general.na')
                                    : `${result.racing_standard_percentage}%`
                                }
                              </ResponsiveTable.Item>

                              <ResponsiveTable.Item>
                                {
                                  result.total_time === null
                                    ? t('forms.dns')
                                    : Number(result.total_time) === 0
                                      ? t('forms.dnf')
                                      : timeToHhMmSsMs(result.total_time)
                                }
                              </ResponsiveTable.Item>

                              <ResponsiveTable.Item>
                                {timeToHhMmSsMs(result.start_time)}
                              </ResponsiveTable.Item>

                              <ResponsiveTable.Item>
                                {timeToHhMmSsMs(result.finish_time)}
                              </ResponsiveTable.Item>

                              <ResponsiveTable.Item>
                                {result.set}
                              </ResponsiveTable.Item>
                            </ResponsiveTable.Row>
                          ))
                      }
                    </ResponsiveTable>
                    )
              }
            </StyledDashboardResultDisplay>
          ))
      }
    </>
  )
}
