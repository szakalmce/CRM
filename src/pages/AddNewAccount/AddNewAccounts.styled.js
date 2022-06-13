import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 600px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 0 auto;
`;

export const GridItem = styled.div`
  grid-column-start: ${(props) =>
    props.column_start ? props.column_start : null};
  grid-column-end: ${(props) => (props.column_end ? props.column_end : null)};
  grid-row-start: ${(props) => (props.row_start ? props.row_start : null)};
  grid-row-end: ${(props) => (props.row_end ? props.row_end : null)};
`;
