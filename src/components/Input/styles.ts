import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  color: #3b3b3b;
  font-size: 1rem;
  margin-bottom: 0.2rem;
`;

export const Input = styled.input<{ hasError: boolean }>`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #d1d1d1;

  &:focus {
    outline: none;
    border-color: #639b0b;
  }

  &::placeholder {
    color: #3b3b3b;
  }

  ${({ hasError }) =>
    hasError &&
    `
      border-color: #ff0000;
    `}
`;

export const Select = styled.select<{ hasError: boolean }>`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #d1d1d1;

  &:focus {
    outline: none;
    border-color: #639b0b;
  }

  &::placeholder {
    color: #3b3b3b;
  }

  ${({ hasError }) =>
    hasError &&
    `
      border-color: #ff0000;
    `}
`;

export const HelperText = styled.p`
  color: #ff0000;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;
