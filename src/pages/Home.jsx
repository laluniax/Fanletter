import AddForm from "components/AddForm";
import Header from "components/Header";
import LetterList from "components/LetterList";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    const accessTokenFromLocalStorage = JSON.parse(
      localStorage.getItem("accessToken")
    );
    console.log(accessTokenFromLocalStorage);
    // if (accessTokenFromLocalStorage) {
    //   // 로컬스토리지 getItem -> json형식으로 받아와서 Json.parse로 해야함!
    //   dispatch(signIn(accessTokenFromLocalStorage));
    // }
  }, []);

  return (
    <Container>
      <Header />
      <AddForm />
      <LetterList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
