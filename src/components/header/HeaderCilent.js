import React from 'react';
import '../styles/StyledHeader.css';

const HeaderCilent = () => {
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
            
            <div id ="headerCilent">
                <a className='btn icon' href='/search'>
                    <i class="fa-solid fa-magnifying-glass iconColor"></i>
                </a>           
                <button className='button'><a href='/signin'>Đăng nhập</a></button>
                <button className='btn'><a href='/signin'>Đăng ký</a></button>
            </div>
        </div>
    );
};

export default HeaderCilent;