import React, {useState} from 'react';
import { styled } from 'styled-components';
import InputLogin from '../../components/common/InputLogin';
import Colors from '../../constants/Color';
import '../../components/styles/main.css';

const StyledView = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100vh;
`;

const StyledBoxImage = styled.div`
  position: fixed;
  height: 100vh;
  width: 50%;
  transform: translateX(${props => props.move ? '100%' : '0'});
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

const StyledInput = styled.input`
    position: relative;
    display: flex;
    align-items: center;
    width: 384px;
    height: 48px;
    padding: 15px;
    margin: 11px 0px;
    border: 1px solid ${Colors.green_button};
    border-radius: 10px;
`;

const SignIn = () => {
  const [move, setMove] = useState(true);
  const handleMove = () => {
    setMove(false);
  };

  const handleReset = () => {
    setMove(true);
  };
    return (
      <StyledView>
        <StyledBox>
          <StyleFlex>
            <div>
              <img src='/assets/Elogo.svg' alt='logo' style={{marginBottom: '26px'}}></img>
            </div>
            <P1>Chào mừng trở lại!</P1>
            <p style={{fontSize: '13px', marginBottom: '26px'}}>Đăng nhập để truy cập thư viện của bạn</p>
            <InputLogin text="Số điện thoại"></InputLogin>
            <StyledInput type="password" placeholder='Mật khẩu' />
            <StyledBox2>
              <StyledMiniBox>
                  <input type="checkbox" id='checkbox'/>
                  <label for="checkbox">Lưu tài khoản</label>
              </StyledMiniBox>
                <a className='link' href="">Quên mật khẩu</a>
            </StyledBox2>
            <StyledButton className='button'>Đăng nhập</StyledButton>
            <p style={{marginTop: '20px'}}>Bạn chưa có tài khoản? <span className='link' id='signUp' onClick={handleMove}>Đăng ký</span></p>
            <p style={{marginTop: '20px'}}>Quay lại <span className='link' href=''>Trang chủ</span></p>
          </StyleFlex>
        </StyledBox>
        <StyledBox>  
          <StyleFlex>
            <div>
              <img src='/assets/Elogo.svg' alt='logo' style={{marginBottom: '26px'}}></img>
            </div>
            <P1>Chào mừng bạn mới!</P1>
            <p style={{fontSize: '13px', marginBottom: '20px'}}>Tạo tài khoản để khám phá nhiều hơn</p>
            <InputLogin text="Họ và tên"></InputLogin>
            <InputLogin text="Số điện thoại"></InputLogin>
            <StyledInput type="password" placeholder='Mật khẩu' />
            <StyledInput type="password" placeholder='Xác nhận lại mật khẩu' />
            <StyledButton style={{margin: '10px'}} className='button'>Đăng ký</StyledButton>
            <p style={{marginTop: '20px'}}>Bạn đã có tài khoản? <span className='link' id='signIn' onClick={handleReset}>Đăng nhập</span></p>
            <p style={{marginTop: '20px'}}>Quay lại <span className='link' href=''>Trang chủ</span></p>
          </StyleFlex>
        </StyledBox>

        <StyledBoxImage move={move}>
          <StyledImage src='/assets/images/anhbia.png' alt='ảnh bìa' />
        </StyledBoxImage>
      </StyledView>
    );
};

export default SignIn;