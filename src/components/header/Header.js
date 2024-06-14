import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/StyledHeader.css';
import { styled } from 'styled-components'
import Avatar from '../common/Avatar';

const Box = styled.div`
    height: 35px;
    width: 35px;
`;

const Header = () => {
    const [showSubNav, setShowSubNav] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);

    const handleClick = () => {
        setShowSubNav(!showSubNav);
    }

    const logout = () => {
        setIsSignIn(false);
    }
    function showHeader() {
        if (isSignIn) {
            return (
                <div id="headerUser">
                    <a className='btn icon' href='/search'>
                        <i class="fa-solid fa-magnifying-glass link"></i>
                    </a>
                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                        <Box> <Avatar id='avatar'></Avatar> </Box>
                        <h4 style={{ color: '#FAFCFC' }}>Quỳnh Phạm</h4>
                        <i class="fa-solid fa-sort-down" style={{ color: '#ffffff' }}></i>
                    </div>
                    <div style={{ display: showSubNav ? 'block' : 'none' }}>
                        <ul id="subnav">
                            <li><Link to="/account_management">
                                <div>
                                    <i class="fa-solid fa-user"></i>
                                </div>
                                Quản lý tài khoản</Link></li>
                            <li><Link to="/library">
                                <div>
                                    <i class="fa-solid fa-bookmark"></i>
                                </div>
                                Thư viện cá nhân</Link></li>
                            <li><Link to="/transaction_history">
                                <div>
                                    <i class="fa-solid fa-cart-shopping"></i>
                                </div>
                                Lịch sử giao dịch</Link></li>
                            <li><a onClick={logout} >
                                <div>
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                </div>
                                Đăng xuất</a></li>
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div id="headerClient">
                    <Link className='btn icon' to='/search'>
                        <i class="fa-solid fa-magnifying-glass iconColor"></i>
                    </Link>

                    <Link to="/signin_signup">
                        <button className='button btnLink'>Đăng nhập</button>
                    </Link>
                    <Link to="/signin_signup">
                        <button className='btn btnLink'>Đăng ký</button>
                    </Link>

                </div>
            )
        }
    }

    return (
        <div id='header'>
            <div id='headerCommon'>
                <a href="/"><img src='/assets/Elogo.svg' alt='logo'></img></a>

                <ul id="nav">
                    <li><a href="/#freeBooks">Sách miễn phí</a></li>
                    <li><a href="/#followBooks">Sách theo dõi</a></li>
                    <li><a href="/#paidBooks">Sách trả phí</a></li>
                </ul>
            </div>
            {showHeader()}
        </div>
    );
};

export default Header;