import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import InputLogin from "../../components/common/InputLogin";
import Colors from "../../constants/Color";
import "../../components/styles/main.css";
import { logIn } from "../../services/api/User";
import { signUp } from "../../services/api/User";
import { useDispatch, useSelector } from "react-redux";
import { logInSl } from "../../redux/slices/logInSlice";
import { signUpSl } from "../../redux/slices/signUpSlice";

const StyledView = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100vh;
  background-color: ${Colors.white};
  color: ${Colors.black};
`;

const StyledBoxImage = styled.div`
  position: fixed;
  height: 100vh;
  width: 50%;
  transform: translateX(${(props) => (props.move ? "100%" : "0")});
  transition: 1s;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyleFlex = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const P1 = styled.p`
  margin-bottom: 9px;
  color: ${Colors.nude};
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 1.6px;
`;

const StyledMiniBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledButton = styled.button`
  width: 384px;
  height: 48px;
  border: none;
  border-radius: 10px;
`;

const StyledBox2 = styled.div`
  display: flex;
  width: 384px;
  justify-content: space-between;
  margin: 10px;
`;

const SignIn = () => {
  const [move, setMove] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let logInState = useSelector(state => state.logIn);
  const logInmessage = logInState.message;
  const logInstatus = logInState.status;
  let signUpState = useSelector(state => state.signUp);
  const signUpmessage = signUpState.message;
  const signUpstatus = signUpState.status;

  const handleMove = () => {
    setMove(!move);
  };

const handleLogIn = async () => {
  console.log("Sign in");
    try {
      await dispatch(logInSl({ phoneNumber, password }));
      if (logInstatus === "OK") {
        alert(logInstatus + "! " + logInmessage);
        navigate(-1);
      }
      else if (logInstatus) {
        alert(logInstatus + "! " + logInmessage + "\nTry again!");
      }
    } catch (err) {
      const message = err.message;
      alert(message + "\nTry again!");
      console.log(err);
    }
  };

  useEffect(() => {
    
  }, [logInState, signUpState]);

  const handleSignUp = async () => {
    try {
      await dispatch(signUpSl({fullName, phoneNumber, password, confirmPassword}));
      if (signUpstatus === "CREATED") {
        alert(signUpstatus + "! " + signUpmessage + "\nLog in now");
        handleReset();
      }
      else alert(signUpstatus + "! " + signUpmessage + "\nTry again!");
    } catch (error) {
      const message = error.message;
      alert(message + "\nTry again!");
    }
  };

  const handleReset = () => {
    setMove(true);
    setFullName("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <StyledView>
      <StyledBox>
        <StyleFlex>
          <div>
            <img
              src="/assets/Elogo.svg"
              alt="logo"
              style={{ marginBottom: "26px" }}
            ></img>
          </div>
          <P1>Chào mừng trở lại!</P1>
          <p style={{ fontSize: "13px", marginBottom: "26px" }}>
            Đăng nhập để truy cập thư viện của bạn
          </p>
          <InputLogin
            text="Số điện thoại"
            setValue={setPhoneNumber}
          ></InputLogin>
          <InputLogin
            text="Mật khẩu"
            type="password"
            setValue={setPassword}
          ></InputLogin>
          <StyledBox2>
            <StyledMiniBox>
              <input type="checkbox" id="checkbox" />
              <label for="checkbox">Lưu tài khoản</label>
            </StyledMiniBox>
            <a className="link" href="">
              Quên mật khẩu
            </a>
          </StyledBox2>
          <StyledButton className="button" onClick={handleLogIn}>
            Đăng nhập
          </StyledButton>
          <p style={{ marginTop: "20px" }}>
            Bạn chưa có tài khoản?{" "}
            <span className="link" id="signUp" onClick={handleMove}>
              Đăng ký
            </span>
          </p>
          <p style={{ marginTop: "20px" }}>
            Quay lại{" "}
            <a className="link" href="/">
              Trang chủ
            </a>
          </p>
        </StyleFlex>
      </StyledBox>

      <StyledBox>
        <StyleFlex>
          <div>
            <img
              src="/assets/Elogo.svg"
              alt="logo"
              style={{ marginBottom: "26px" }}
            ></img>
          </div>
          <P1>Chào mừng bạn mới!</P1>
          <p style={{ fontSize: "13px", marginBottom: "20px" }}>
            Tạo tài khoản để khám phá nhiều hơn
          </p>
          <InputLogin
            text="Họ và tên"
            setValue={setFullName}
          ></InputLogin>
          <InputLogin
            text="Số điện thoại"
            setValue={setPhoneNumber}
          ></InputLogin>
          <InputLogin
            text="Mật khẩu"
            type="password"
            setValue={setPassword}
          ></InputLogin>
          <InputLogin
            text="Nhập lại mật khẩu"
            type="password"
            setValue={setConfirmPassword}
          ></InputLogin>
          <StyledButton
            style={{ margin: "10px" }}
            className="button"
            onClick={handleSignUp}
          >
            Đăng ký
          </StyledButton>
          <p style={{ marginTop: "20px" }}>
            Bạn đã có tài khoản?{" "}
            <span className="link" id="signIn" onClick={handleReset}>
              Đăng nhập
            </span>
          </p>
          <p style={{ marginTop: "20px" }}>
            Quay lại{" "}
            <a className="link" href="/">
              Trang chủ
            </a>
          </p>
        </StyleFlex>
      </StyledBox>

      <StyledBoxImage move={move}>
        <StyledImage src="/assets/images/anhbia.png" alt="ảnh bìa" />
      </StyledBoxImage>
    </StyledView>
  );
};

export default SignIn;
