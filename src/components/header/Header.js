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
                    <Link className='btn icon' to='/search'>
                        <i class="fa-solid fa-magnifying-glass link"></i>
                    </Link>
                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                        <Box> <Avatar id='avatar'></Avatar> </Box>
                        <h4 style={{ color: '#FAFCFC' }}>Quỳnh Phạm</h4>
                        <i class="fa-solid fa-sort-down" style={{ color: '#ffffff' }}></i>
                    </div>
                    <div style={{ display: showSubNav ? 'block' : 'none' }}>
                        <ul id="subnav">
                            <li><Link to="/account_management" onClick={handleClick}>
                                <div>
                                    <i class="fa-solid fa-user"></i>
                                </div>
                                Quản lý tài khoản</Link></li>
                            <li><Link to="/library" onClick={handleClick}>
                                <div>
                                    <i class="fa-solid fa-bookmark"></i>
                                </div>
                                Thư viện cá nhân</Link></li>
                            <li><Link to="/transaction_history" onClick={handleClick}>
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
                <Link to="/"><img src='/assets/Elogo.svg' alt='logo'></img></Link>

                <ul id="nav">
                    <li><Link to="/#freeBooks">Sách miễn phí</Link></li>
                    <li><Link to="/#followBooks">Sách theo dõi</Link></li>
                    <li><Link to="/#paidBooks">Sách trả phí</Link></li>
                </ul>
            </div>
            {showHeader()}
        </div>
    );
};

export default Header;