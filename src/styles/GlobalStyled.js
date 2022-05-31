import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap');
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }
`;

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const FlexWrapper = styled.div``;

export const Title = styled.h1`
  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `}
`;

export const Input = styled.input`
  width: ${(props) => (props.width ? `${props.width}%` : '100%')};
  padding: 0.75rem;
  border: 1px solid #000;
  background-color: #ddd;

  &:hover,
  &:active,
  &:focus {
    outline: none;
  }
`;
export const FormErrorMessage = styled.p`
  height: 15px;
  color: red;
`;
export const Button = styled.button`
  width: 50%;
  margin: 0rem auto;
  padding: 0.5rem;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
`;
