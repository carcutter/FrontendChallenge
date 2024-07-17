"use client";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import styled from "styled-components";

const CreateEmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <MainContainer>
      <BackButton onClick={() => router.back()}>
        <IoMdArrowBack size={30} />
      </BackButton>
      {children}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: rgba(147, 51, 234, 0.1);
  height: 100vh;
  width: 100%;
  padding-top: 100px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const BackButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
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

export default CreateEmployeeLayout;
