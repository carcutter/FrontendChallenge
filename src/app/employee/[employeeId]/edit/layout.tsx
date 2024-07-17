"use client";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import styled from "styled-components";

const EditEmployeeLayout = ({ children }: { children: React.ReactNode }) => {
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
  padding-top: 100px;
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

export default EditEmployeeLayout;
