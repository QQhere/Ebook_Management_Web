import React from 'react';
import { styled } from 'styled-components'
import Colors from '../../../constants/Color';
import ListBooks from '../../../components/hompage/ListBooks'
import Avatar from '../../../components/common/Avatar';

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
    gap: 20px
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
            gap: 20px
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
    gap: 70px;
    margin: 20px 0;
    padding: 15px 0;
    border-bottom: 1px solid ${Colors.bg_dark};
`;

const BoxInfor = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid var(--dark_grey);
    background-color: var(--bg_dark);
    border-radius: 20px;
    height: 66px;
    justify-content: center;
    padding: 0 30px;
    width: 80%;
`;

const BoxOrther = styled.div`
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const AccountManagement = () => {
    return (
        <Box className='body'>
            <Col1>
                <BoxAvatar>
                    <p style={{fontSize: '26px'}}>Quỳnh Phạm</p>
                    <Avatar></Avatar>
                    <ButtonEditAvatar className='button'>Thay ảnh <i class="fa-regular fa-pen-to-square"></i></ButtonEditAvatar>
                </BoxAvatar>
                <BoxNav>
                    <li><a href="/account_management" className='iconColor'>
                        <Orther>
                            <i class="fa-solid fa-user"></i>
                        </Orther>
                        Quản lý tài khoản</a></li>
                    <li><a href="/library" className='colorWhite'>
                        <Orther>
                            <i class="fa-solid fa-bookmark"></i>
                        </Orther>
                        Thư viện cá nhân</a></li>
                    <li><a href="transaction_history" className='colorWhite'>
                        <Orther>
                            <i class="fa-solid fa-cart-shopping"></i>
                        </Orther>
                        Lịch sử giao dịch</a></li>
                </BoxNav>
            </Col1>

            <Col2>
                <p className='titleProfile'>Quản lý tài khoản</p>
                <BoxOption>
                    <p className='optionProfile'>Thông tin cá nhân</p>
                    <p className='optionProfile'>Tài khoản và bảo mật</p>
                </BoxOption>

                <BoxOrther>
                    <BoxInfor>
                        <p className='colorGey'>Tên đăng nhập:</p>
                        <p>hahhahahah</p>
                    </BoxInfor>
                    <BoxInfor>
                        <p className='colorGey'>ID tài khoản:</p>
                        <p>59484348</p>
                    </BoxInfor>
                </BoxOrther>

                
            </Col2>
        </Box>
    );
};

export default AccountManagement;