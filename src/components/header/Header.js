import React from 'react';
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
    return (
        <div id='header'>
            <div id='headerCommon'>
                <a href="#"><img src='/assets/Elogo.svg' alt='logo'></img></a>
                
                <ul id="nav">
                    <li><a href="#freeBooks">Sách miễn phí</a></li>
                    <li><a href="#followBooks">Sách theo dõi</a></li>
                    <li><a href="#paidBooks">Sách trả phí</a></li>
                </ul>
            </div>
            
            <div id ="headerUser">
                <div className='btn icon'>
                    <i class="fa-solid fa-magnifying-glass link"></i>
                </div>
                <div>
                    <Box> <Avatar id='avatar'></Avatar> </Box>
                    <h4 style={{color: '#FAFCFC'}}>Quỳnh Phạm</h4>
                    <i class="fa-solid fa-sort-down" style={{color: '#ffffff'}}></i>
                    <ul class="subnav">
                        <li><a href="#">Quản lý tài khoản</a></li>
                        <li><a href="#">Thư viện cá nhân</a></li>
                        <li><a href="#">Lịch sử giao dịch</a></li>
                        <li><a href="#">Hỗ trợ kỹ thuật</a></li>
                        <li><a href="#">Đăng xuất</a></li>
                    </ul>
                </div>
                    
            </div>
        </div>
    );
};

export default Header;