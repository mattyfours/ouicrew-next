'use client'

import { useId } from 'react'
import { styled } from 'styled-components'

const StyledResponsiveTable = styled.div`
  width: 100%;
  overflow: auto;

  table {
    width: fit-content;
    min-width: 100%;
  }

  th, td {
    padding: 8px 16px;
    border: 1px solid var(--text-color);
    font-size: 1.4rem;
  }

  th {
    background-color: var(--primary-color-light);
    font-weight: 700;
  }

  tr:hover td {
    background-color: var(--light-grey-color);
  }
`

function ResponsiveTable ({ children, headings }) {
  const tableId = useId()

  return (
    <StyledResponsiveTable>
      <table>
        <thead>
          <tr>
            {
              headings
                .filter(heading => heading !== null)
                .map((heading, index) => (
                  <th key={`table-heading-${tableId}-${index}`}>
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
