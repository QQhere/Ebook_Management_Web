import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components'
import Colors from '../../../constants/Color';
import Avatar from '../../../components/common/Avatar';
import ListTransaction from '../../../components/transaction/ListTransaction';
import { getUserDetails } from "../../../services/api/User";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import ListAccounts from '../../../components/search/ListAccounts';

const TransactionHistory = () => {
  const [isShowFollower, setIsShowFollower] = useState(false);
    const follower = () => {
        setIsShowFollower(!isShowFollower);
    }

    const [dataUser, setDataUser] = useState({});
  const stateAccount = useSelector((state) => state.auth);

  const fetchData = async () => {
    const response = await getUserDetails(stateAccount.token);
    if (response.status === "OK") {
      setDataUser(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
    return (
      <div>
        <Box className='body'>
            <Col1>
            <BoxAvatar>
          <p style={{ fontSize: "26px" }}>Quỳnh Phạm</p>
          <Avatar avatar={dataUser.link_avatar}></Avatar>
        </BoxAvatar>
                <BoxNav>
                    <li><a href="/account_management" className='colorWhite'>
                        <Orther>
                            <i class="fa-solid fa-user"></i>
                        </Orther>
                        Quản lý tài khoản</a></li>
                    <li><a href="/library" className='colorWhite'>
                        <Orther>
                            <i class="fa-solid fa-bookmark"></i>
                        </Orther>
                        Thư viện cá nhân</a></li>
                    <li><a href="transaction_history" className='iconColor'>
                        <Orther>
                            <i class="fa-solid fa-cart-shopping"></i>
                        </Orther>
                        Lịch sử giao dịch</a></li>
                </BoxNav>
                <Link to='/library'>
                  <BoxCenter>
                    <H1>5</H1>
                    <p>Sách đã đăng</p>
                </BoxCenter>
                </Link>
                
                <BoxApp className='flex'>
                    <BoxCenter onClick={follower}>
                        <H1>10</H1>
                        <p>Đang thẽo dõi</p>
                    </BoxCenter>

                    <BoxCenter>
                        <H1>0</H1>
                        <p>Người theo dõi</p>
                    </BoxCenter>
                </BoxApp>

            </Col1>

            <Col2>
                <BoxOption>
                    <p className='titleProfile'>Lịch sử giao dịch</p>    
                </BoxOption>
                <ListTransaction></ListTransaction>
            </Col2>
        </Box>
        {isShowFollower ? <div>
                <Cover onClick={follower}></Cover>
                <BoxContent>
                    <Header>
                        <P>Danh sách đang theo dõi</P>
                        <ClosedButton onClick={follower}><i class="fa-solid fa-xmark"></i></ClosedButton>
                    </Header>
                    <Content>
                        <ListAccounts></ListAccounts>
                    </Content>
                </BoxContent>
            </div> : <div> </div>}
        </div>
    );
};

export default TransactionHistory;

const BoxContent = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 600px;
    background-color: ${Colors.bg_dark};
    z-index: 1000;
    border-radius: 20px;   
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid ${Colors.dark_grey};
`;

const ClosedButton = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 0 20px 0 0;
    background-color: transparent;
    color: ${Colors.white};
    font-size: 18px;
`;

const P = styled.p`
    font-size: 15px;
    margin-left: 30px;
`;

const Content = styled.div`
    margin: 30px;
`;

const Cover = styled.div`
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${Colors.dark_grey};
    opacity: 0.7;
    z-index: 10;
`;

const Box = styled.div`
  display: flex;
`;

const Col1 = styled.div`
  width: 300px;
  margin: 20px;
  flex-shrink: 0;
`;

const Col2 = styled.div`
  flex-grow: 1;
  padding: 15px 0 20px 40px;
  margin: 40px 20px;
  border-left: 1px solid ${Colors.bg_dark};
`;

const BoxAvatar = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  align-items: center;
  gap: 20px;
`;

const ButtonEditAvatar = styled.button`
  height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  border: none;
`;
const BoxNav = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${Colors.more};

  :hover {
    background-color: ${Colors.bg_dark};
  }

  > li {
    padding: 5px 20px;
    border-radius: 10px;

    > a {
      font-size: 17px;
      display: inline-flex;
      align-items: center;
      gap: 20px;
    }
  }
`;

const Orther = styled.div`
  display: flex;
  width: 20px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

const BoxOption = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${Colors.bg_dark};
`;

const BoxInfor = styled.div`
    display: flex;
    border: 1px solid ${Colors.dark_grey};
    border-radius: 20px;
    height: 66px;
    padding: 0 30px;
`;

const BoxOrther = styled.div`
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Button = styled.button`
    border-radius: 20px;
    height: 40px;
    padding: 0 20px;
    margin-right: 20px;
`;

const H1 = styled.p`
  font-size: 26px;
  font-weight: bold;
`;

const BoxApp = styled.div`
  justify-content: center;
  gap: 40px;
`;

const BoxCenter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    color: ${Colors.white};
`;

const BoxTitle = styled.div`
    display: flex;
    align-items: center ;
    justify-content: space-between;
`;
