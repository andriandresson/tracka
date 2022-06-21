import styled from 'styled-components';

/* eslint-disable-next-line */
export interface TrackaContextProps {}

const StyledTrackaContext = styled.div`
  color: pink;
`;

export function TrackaContext(props: TrackaContextProps) {
  return (
    <StyledTrackaContext>
      <h1>Welcome to TrackaContext!</h1>
    </StyledTrackaContext>
  );
}

export default TrackaContext;
