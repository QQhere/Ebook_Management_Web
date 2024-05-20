import React, { useState }from 'react';
import '../styles/StyledHeader.css';
import { styled } from 'styled-components' 
import Avatar from '../common/Avatar';

// const Avatar = styled.div`
//     height: 35px;
//     width: 35px;
//     border-radius: 35px;
//     background-image: url(/assets/images/avatar.jpg);
//     background-repeat: no-repeat;
//     background-size: cover;
//     background-position: center;
//     cursor: pointer;
// `;

const Box = styled.div`
    height: 35px;
    width: 35px;
`;

const Header = () => {
    const [showSubNav, setShowSubNav] = useState(false);
    const handleClick = () => {
        setShowSubNav(!showSubNav);
    }
    return (
        <div id='header'>
            <div id='headerCommon'>
                <a href="/"><img src='/assets/Elogo.svg' alt='logo'></img></a>
                
                <ul id="nav">
                    <li><a href="#freeBooks">Sách miễn phí</a></li>
                    <li><a href="#followBooks">Sách theo dõi</a></li>
                    <li><a href="#paidBooks">Sách trả phí</a></li>
                </ul>
            </div>
            
            <div id ="headerUser">
                <a className='btn icon' href='/search'>
                    <i class="fa-solid fa-magnifying-glass link"></i>
                </a>
                <div onClick={handleClick} style={{cursor: 'pointer' }}>
                    <Box> <Avatar id='avatar'></Avatar> </Box>
                    <h4 style={{color: '#FAFCFC'}}>Quỳnh Phạm</h4>
                    <i class="fa-solid fa-sort-down" style={{color: '#ffffff'}}></i>
                </div>
                <div style={{ display: showSubNav ? 'block' : 'none'}}>
                    <ul id="subnav">
                        <li><a href="/account_management">
                            <div>
                                <i class="fa-solid fa-user"></i>
                            </div>
                            Quản lý tài khoản</a></li>
                        <li><a href="/library">
                            <div>
                                <i class="fa-solid fa-bookmark"></i>
                            </div>
                            Thư viện cá nhân</a></li>
                        <li><a href="transaction_history">
                            <div>
                            <i class="fa-solid fa-cart-shopping"></i>
                            </div>
                            Lịch sử giao dịch</a></li>
                        <li><a href='/'>
                            <div>
                                <i class="fa-solid fa-right-from-bracket"></i>
                            </div>
                            Đăng xuất</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;