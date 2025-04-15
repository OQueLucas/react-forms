import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem 1rem;
`;

export const Button = styled.button`
  background-color: #00a2ff;
  width: 100%;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 500px;
`;

export const BillContainer = styled.div`
  display: flex;
  gap: 5px;

  & button {
    height: 50px;
  }
`;
