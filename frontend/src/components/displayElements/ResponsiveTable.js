'use client'

import { useEffect, useId, useRef } from 'react'
import { styled } from 'styled-components'

const StyledResponsiveTable = styled.div`
  width: 100%;
  padding-bottom: ${props => props.autoScroll ? '100px' : 0};

  .table-container {
    width: 100%;
    overflow: auto;
    max-height: ${props => props.maxheight || 'none'};
    border: 1px solid var(--text-color);
  }

  table {
    width: fit-content;
    min-width: 100%;
  }

  thead {
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

    th {
      position: relative;
      background-color: var(--primary-color-light);
      font-weight: 700;
      border-bottom: none;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: var(--text-color);
      }
    }
  }


  &.even-cells {
    th, td {
      min-width: 155px;
    }
  }

  th, td {
    padding: 12px 12px;
    border: 1px solid var(--text-color);
    font-size: 1.4rem;
    white-space: nowrap;

    &:first-child {
      border-left: none;
    }

    &:last-child {
      border-right: none;
    }
  }

  th {
    padding: 8px 12px;
  }

  tr:first-child td,
  tr:first-child th {
    border-top: none;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background-color: var(--light-grey-color);
  }
`

function ResponsiveTable ({
  children,
  headings,
  maxheight,
  autoScroll,
  evenCells
}) {
  const tableId = useId()
  const holderRef = useRef()

  useEffect(() => {
    if (!autoScroll) { return }
    const holder = holderRef.current
    holder.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [children])

  return (
    <StyledResponsiveTable
      maxheight={maxheight}
      ref={holderRef}
      className={`${evenCells && 'even-cells'}`}
      autoScroll={autoScroll}
    >
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              {
                headings
                  .filter(heading => heading !== null)
                  .map((heading, index) => (
                    <th
                      key={`table-heading-${tableId}-${index}`}
                      style={{ width: evenCells ? `${100 / headings.length}%` : 'initial' }}
                      span={evenCells ? headings.length : 'auto'}
                    >
                      {heading}
                    </th>
                  ))
              }
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </StyledResponsiveTable>
  )
}

function ResponsiveTableRow ({ children }) {
  return (
    <tr>
      {children}
    </tr>
  )
}

function ResponsiveTableItem ({ children }) {
  return (
    <td>
      {children}
    </td>
  )
}

ResponsiveTable.Row = ResponsiveTableRow
ResponsiveTable.Item = ResponsiveTableItem

export default ResponsiveTable
