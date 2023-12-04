import AddForm from "components/AddForm";
import Header from "components/Header";
import LetterList from "components/LetterList";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { signIn } from "redux/modules/authSlice";

export default function Home() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //  처음 마운트 되었을 때 , 로컬스토리지에 있는 accessToken 가져와줘
  useEffect(() => {
    const accessTokenFromLocalStorage = localStorage.getItem("accessToken");

    if (accessTokenFromLocalStorage) {
      // 로컬스토리지 getItem -> json형식으로 받아와서 Json.parse로 해야함!
      dispatch(signIn(accessTokenFromLocalStorage));
    }
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
