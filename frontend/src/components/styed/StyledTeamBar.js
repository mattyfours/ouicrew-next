import { styled } from 'styled-components'

const StyledTeamBar = styled.div`
  border-bottom: 2px solid var(--text-color);
  padding: 0 0 4px;
  text-align: left;

  h2 {
    font-size: 1.6rem;
  }

  span::after,
  span::before {
    content: ' ';
  }

`
export default StyledTeamBar
