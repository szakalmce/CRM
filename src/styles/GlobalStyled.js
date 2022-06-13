import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap');
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }

    a {
      text-decoration: none;
      color: rgba(0,0,0, .8);
      font-weight: bold;

      &.active {
        color: blue;
      }
    }
`;

export const Container = styled.div`
  width: 80%;
  margin: ${(props) => (props.marginV ? `${props.marginV} auto` : '0 auto')};
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  gap: ${(props) => (props.gap ? props.gap : '0')};
  flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
`;

export const Title = styled.h1`
  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `};
  ${(props) =>
    props.small &&
    css`
      font-size: 1.25rem;
    `};
  margin-bottom: ${(props) => (props.mb ? props.mb : '0')};
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

export const Textarea = styled.textarea`
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

export const SelectInput = styled.select`
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
  width: ${(props) => (props.width ? props.width : '100%')};
  margin: 0rem auto;
  padding: 0.5rem;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
`;
