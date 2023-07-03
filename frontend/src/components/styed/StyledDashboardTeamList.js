import { styled } from 'styled-components'

const StyledDashboardTeamList = styled.nav`
  position: relative;
  text-align: left;
  max-width: var(--width-modal);
  margin: 12px auto 0;
  padding: 12px 0 0;
  border-top: 1px solid var(--text-color);

  h2 {
    margin: 0 0 8px;
  }

  .new-team-button {
    display: flex;
    margin: 10px 0 0 auto;
  }

  .action-buttons {
    margin: 10px 0 0 auto;
    display: grid;
    width: fit-content;
    grid-auto-flow: column;
    gap: 16px;
  }

  .no-team-notice {
    border: 1px solid var(--text-color);
    padding: 16px;
    margin: 0;
  }

  .team-list-race-details {
    margin: 0;
    display: grid;
    gap: 8px;
    grid-auto-flow: row;

    li {
      margin: 0;
      font-size: 1.4rem;
      text-align: left;
    }

    button {
      display: inline-flex;
      word-break: break-all;
      white-space: pre-line;
      text-align: left;
    }
  }
`
export default StyledDashboardTeamList
