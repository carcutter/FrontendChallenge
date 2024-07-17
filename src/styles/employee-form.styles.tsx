import styled from "styled-components";

export const Typography = styled.p<{ size: number }>`
  font-size: ${(props) => props.size}px;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 300px; /* Adjust width as needed */
`;

export const FormElement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

export const StyledInput = styled.input`
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: #0056b3;
    outline: none;
  }
`;

export const SubmitButton = styled.button<{ disabled: boolean }>`
  padding: 10px 15px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #003580;
  }
`;
