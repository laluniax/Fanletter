import axios from "axios";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "redux/modules/authSlice";
import { changeBooleanState } from "redux/modules/login";
import { styled } from "styled-components";

function Login() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  //  처음 마운트 되었을 때 , 로컬스토리지에 있는 accessToken 가져와줘

  //회원가입
  const onClickRegisterHandler = async () => {
    try {
      const signUp = await axios
        .post("https://moneyfulpublicpolicy.co.kr/register", {
          id: idValue,
          password: passWordValue,
          nickname: nickNameValue,
        })
        .then((response) => {
          // 만약 response.data의 success가 true면 로그인으로 토글되게
          if (response.data.success) {
            alert("회원가입이 완료되었습니다.");
            changeLoginToggle();
          }
        });
    } catch (error) {
      // 만약 에러가 있으면 브라우저에서 에러가 뜨는 것이 아닌 콘솔로 띄우게 해주는 역할
      console.log(error);
    }
  };

  // 로그인
  const onClickLoginHandler = async () => {
    try {
      await axios
        .post("https://moneyfulpublicpolicy.co.kr/login", {
          id: idValue,
          password: passWordValue,
        })
        .then((response) => {
          if (response.data.success) {
            dispatch(signIn(response.data));
            localStorage.setItem("accessToken", response.data.accessToken);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // // 로그인 정보 저장
  // const [loginInfo, setLoginInfo] = useState("");
  // const saveLoginInfo = async () => {
  //   try {
  //     const loginData = await axios.get(
  //       "https://moneyfulpublicpolicy.co.kr/user"
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // // 컴포넌트가 처음 나타났을 때만 실행
  // useEffect(() => {
  //   saveLoginInfo();
  // }, []);

  // 로그인 인풋 값 가져오기
  const [idValue, setId] = useState("");
  const [passWordValue, setPassWord] = useState("");
  const [nickNameValue, setNickName] = useState("");

  // 로그인 토글
  const openLoginToggle = useSelector((state) => state.openLoginToggle);

  const changeRegisterToggle = (event) => {
    dispatch(changeBooleanState(false));
  };

  const changeLoginToggle = (event) => {
    dispatch(changeBooleanState(true));
  };

  //정규식
  const regex =
    /^(?=.*[`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?])(?=.*[a-zA-Z])(?=.*[0-9]).{10,20}$/g;

  //로그인 인풋 값 저장
  const idInputChange = (event) => {
    setId(event.target.value);
  };

  const passWordInputChange = (event) => {
    setPassWord(event.target.value);
  };

  const nickNameInputChange = (event) => {
    setNickName(event.target.value);
  };

  return (
    <LoginForm
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      {/* 로그인 div가 보이면, 회원가입 Div 보여주지 않도록 */}
      <LoginDiv style={{ display: openLoginToggle ? "block" : "none" }}>
        <LoginTitle>로그인</LoginTitle>
        <></>
        <LoginText>아이디 :</LoginText>
        <LoginInput
          value={idValue}
          onChange={idInputChange}
          placeholder="아이디 (4~10글자)"
        />
        <LoginText>비밀번호 :</LoginText>
        <LoginInput
          type="password"
          value={passWordValue}
          onChange={passWordInputChange}
          placeholder="비밀번호 (4~15글자)"
        />

        <LoginBtnBox>
          <LoginBtn onClick={onClickLoginHandler}>로그인</LoginBtn>
        </LoginBtnBox>
        <RegisterChangeBtn onClick={changeRegisterToggle}>
          회원가입
        </RegisterChangeBtn>
      </LoginDiv>

      <></>
      <RegisterDiv style={{ display: openLoginToggle ? "none" : "block" }}>
        <RegisterTitle>회원가입</RegisterTitle>
        <></>
        <RegisterText>아이디 :</RegisterText>
        <RegisterInput
          value={idValue}
          onChange={idInputChange}
          placeholder="아이디 (4~10글자)"
        />
        <RegisterText>비밀번호 :</RegisterText>
        <RegisterInput
          type="password"
          value={passWordValue}
          onChange={passWordInputChange}
          placeholder="비밀번호 (4~15글자)"
        />
        <RegisterText>닉네임:</RegisterText>
        <RegisterInput
          value={nickNameValue}
          onChange={nickNameInputChange}
          type="text"
          placeholder="닉네임 (1~10글자)"
        />

        <RegisterBtnBox>
          <RegisterBtn onClick={onClickRegisterHandler}>회원가입</RegisterBtn>
        </RegisterBtnBox>
        <LoginChangeBtn onClick={changeLoginToggle}>로그인</LoginChangeBtn>
      </RegisterDiv>
    </LoginForm>
  );
}

export default Login;

const LoginForm = styled.form`
  width: 60%;
  display: flex;
  justify-content: center;
  height: 26rem;
  left: 50%;
  top: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
  background-color: #7ddcff;
  padding: 3.5rem 6rem;
`;

const LoginDiv = styled.div`
  margin-top: 2rem;
  width: 20rem;
`;
const LoginTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const LoginText = styled.p`
  margin-top: 10px;
`;
const LoginInput = styled.input`
  all: unset;
  width: 20rem;
  padding: 0.3rem;
  color: #000;
  margin-top: 10px;
  border-radius: 1rem;
  background-color: #fff;
`;

const LoginBtnBox = styled.div`
  width: 20rem;
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const LoginBtn = styled.button`
  width: 100%;
  font-size: 1rem;
  margin-top: 1rem;
  padding: 0.6rem;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  border-radius: 15px;

  &:hover {
    cursor: pointer;
    background-color: #000;
    color: #fff;
  }
`;

const RegisterChangeBtn = styled.button`
  all: unset;
  margin-top: 10px;
  margin-left: 8.3rem;

  &:hover {
    cursor: pointer;
  }
`;

// --------

const RegisterDiv = styled.div`
  width: 20rem;
`;
const RegisterTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const RegisterText = styled.p`
  margin-top: 10px;
`;
const RegisterInput = styled.input`
  all: unset;
  width: 20rem;
  padding: 0.3rem;
  color: #000;
  margin-top: 10px;
  border-radius: 1rem;
  background-color: #fff;
`;

const RegisterBtnBox = styled.div`
  width: 20rem;
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const RegisterBtn = styled.button`
  width: 100%;
  font-size: 1rem;
  margin-top: 1rem;
  padding: 0.6rem;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  border-radius: 15px;

  &:hover {
    cursor: pointer;
    background-color: #000;
    color: #fff;
  }
`;

const LoginChangeBtn = styled.button`
  all: unset;
  margin-top: 10px;
  margin-left: 8.6rem;

  &:hover {
    cursor: pointer;
  }
`;
