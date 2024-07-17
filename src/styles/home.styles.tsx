import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
 min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
  width: clamp(320px, 50vw, 600px);
`;

export const SortButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  width: clamp(320px, 50vw, 600px);
  align-self: center;
`;

export const SortButton = styled.button<{ $active: any }>`
  padding: 8px 16px;
  border-radius: 5px;
  background-color: ${(props) => (props.$active ? "#934de6" : "#333")};
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
`;
export const Col = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LoadingIndicator = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

export const ErrorIndicator = styled.p`  
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

export const Typography = styled.p<{ size: number }>`
  font-size: ${(props) => props.size}px;
  color: #333;
  font-weight: bold;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 5px 10px;
`;

export const SearchInput = styled.input`
  border: none;
  padding: 8px;
  width: 200px;
  &:focus {
    outline: none;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  gap: 20px;
  background: rgba(25, 113, 221, 0.3);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: clamp(320px, 50vw, 600px);
  margin: 20px auto;
`;

export const EmployeeList = styled.ol`
  width: 100%;
  list-style: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
`;

export const AddButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #934de6;
  color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #7b26d5;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  background: white;
  right: -100px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;

`;

export const DropdownItem = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 50px;
`;

export const IconColumn = styled(Column)`
  flex: none;
  position: relative;
  cursor: pointer;
  background-color: #f4f8f8  ;
  height: 50px;
  border-radius: 50px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;
