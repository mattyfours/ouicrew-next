import { styled } from 'styled-components'
import { t } from '@/languages/languages'
import { useEffect, useState } from 'react'
import ResponsiveTable from '@/components/displayElements/ResponsiveTable'
import { getNowTimeInTimezone, timeToHhMmSsMs } from '@/helpers/dateFormater'
import Button from '../formElements/Button'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledDashboardResultDisplay = styled.nav`
  position: relative;
  text-align: left;
  max-width: var(--width-modal);
  width: calc(100vw - 32px);
  left: 50%;
  transform: translateX(-50%);
  margin: 12px auto 0;
  border-top: 1px solid var(--text-color);

  &.wide {
    max-width: var(--container-width);
  }

  h2 {
    margin: 12px 0 8px;
  }

  .percent-change {
    display: inline-flex;
    align-items: baseline;
    justify-content: space-between;
    margin: 0 0 0 8px;
    font-size: 1.2rem;

    &.negative {
      color: var(--error-color);
    }

    &.positive {
      color: var(--success-color);
    }

    svg {
      position: relative;
      top: 1px;
      font-size: 1.1rem;
      margin: 0 3px 0 0;
    }
  }
`

const StyledTopResults = styled.div`
  margin: 12px auto 0px;
  border-top: 1px solid var(--text-color);
  text-align: center;
  padding: 12px 0 0;
`

export default function RaceResults ({
  data,
  refetch
}) {
  const [nowTime, setNowTime] = useState(getNowTimeInTimezone())
  const [ongoingResults, setOngoingResults] = useState([])
  const [finishedResults, setFinishedResults] = useState([])
  const [sets, setSets] = useState(0)

  console.log(data)

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
      <StyledTopResults>
        <Button
          size='small'
          onClick={refetch}
        >
          {t('dashboard.refresh_results')}
        </Button>
      </StyledTopResults>

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
          .map((_, index) => finishedResults
            .filter(result => result.set === index + 1).length > 0 && (
              <StyledDashboardResultDisplay className='wide' key={`${data.race.id}--set-${index}`}>
                <h2 className='heading-small'>{t('dashboard.set')} {index + 1}</h2>

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
                      .map(result => (
                        <ResultRow
                          key={`${data.race.id}--${result.id}`}
                          result={result}
                          finishedResults={finishedResults}
                          set={index + 1}
                        />
                      ))
                    }
                </ResponsiveTable>
              </StyledDashboardResultDisplay>
          ))
      }
    </>
  )
}

function ResultRow ({ result, finishedResults, set }) {
  const [totalTime, setTotalTime] = useState(0)
  const [standardPercentageChange, setStandardPercentageChange] = useState(null)

  useEffect(() => {
    setTotalTime(
      result.total_time === null
        ? t('forms.dns')
        : Number(result.total_time) === 0
          ? t('forms.dnf')
          : timeToHhMmSsMs(result.total_time)
    )

    const previousResult = finishedResults.find(finishedResult => (
      finishedResult.entry.id === result.entry.id &&
        finishedResult.set === set - 1
    ))

    setStandardPercentageChange(
      (
        typeof previousResult?.racing_standard_percentage === 'undefined' ||
        previousResult.racing_standard_percentage === null ||
        result.racing_standard_percentage === null
      )
        ? null
        : (
            Number(result.racing_standard_percentage) -
            Number(previousResult.racing_standard_percentage)
          ).toFixed(2)
    )
  }, [
    finishedResults,
    result,
    set
  ])

  return (
    <ResponsiveTable.Row>
      <ResponsiveTable.Item>
        {result.entry.name} ({result.standard.name})
      </ResponsiveTable.Item>

      <ResponsiveTable.Item>
        {
          result.racing_standard_percentage === null
            ? t('general.na')
            : `${result.racing_standard_percentage}%`
        }

        {
          standardPercentageChange !== null && (
            standardPercentageChange >= 0
              ? (
                <span className='percent-change positive'>
                  <FontAwesomeIcon icon={faArrowUp} />
                  {standardPercentageChange}%
                </span>
                )
              : (
                <span className='percent-change negative'>
                  <FontAwesomeIcon icon={faArrowDown} />
                  {standardPercentageChange * -1}%
                </span>
                )
          )
        }
      </ResponsiveTable.Item>

      <ResponsiveTable.Item>
        {totalTime}
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
  )
}
