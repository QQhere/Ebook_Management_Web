import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/StyledHeader.css';

const HeaderClient = () => {
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
            
            <div id ="headerClient">
                <Link className='btn icon' to='/search'>
                    <i class="fa-solid fa-magnifying-glass iconColor"></i>
                </Link>           
                <button className='button'><Link to="/signin">Đăng nhập</Link></button>
                <button className='btn'><Link to="/signup">Đăng ký</Link></button>
            </div>
        </div>
    );
};

export default HeaderClient;