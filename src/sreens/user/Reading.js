import React from 'react';
import { styled } from 'styled-components'
import Colors from '../../constants/Color';
import '../../components/styles/reading.css';

const Reading = ({data}) => {
    return (
        <div >
            <div className='fixed header'>
                <p className='title'>{data.title}</p>
                <div className='list1'>
                    <i class="fa-regular fa-rectangle-list iconColor"></i>
                    <i class="fa-solid fa-palette"></i>
                </div>
            </div> 
            <div className='bodyReading'>
                <h3 style={{textAlign: 'center'}}>Chương 1: Cuộc gọi lúc nửa đêm</h3>
                <div className='contents'>
                    <p className='content'>{data.description}</p>
                    <p className='content'>{data.description}</p>
                    <p className='content'>{data.description}</p>
                </div>  
            </div>
            <div className='fixed footer'>
                <p className='title'>Chương 1: Cuộc gọi lúc nửa đêm</p>
            </div>
            <div id='tableOfContent' className='fixed sidebar'>
                <p className='title'>Mục lục</p>
                <select className='select selection'>
                    <option value="" selected disabled hidden>Chọn trang</option>
                    <option value="1">Trang 1</option>
                    <option value="2">Trang 2</option>
                    <option value="3">Trang 3</option>
                </select>
                <ul className='menu'>
                    <li><a href='/chuong1'>Chương 1: Cuộc gọi lúc nửa đêm</a></li>
                    <li><a href='/chuong1'>Chương 1: Cuộc gọi lúc nửa đêm</a></li>
                    <li><a href='/chuong1'>Chương 1: Cuộc gọi lúc nửa đêm</a></li>
                    <li className='liChoice'><a href='/chuong1'>Chương 1: Cuộc gọi lúc nửa đêm</a></li>
                    <li><a href='/chuong1'>Chương 1: Cuộc gọi lúc nửa đêm</a></li>
                </ul>
            </div>

            <div id='select' class="fixed sidebar">
                <div>
                    <p className='title'>Nền</p>
                    <div className='list2'>
                        <div class="toggle toggleBlack toggleChoice">ON</div>
                        <div class="toggle toggleGrey"></div>
                        <div class="toggle toggleWhite"></div>
                    </div>
                    
                </div>
                <div>
                    <p className='title'>Cỡ và kiểu chữ</p>
                    <div class="list2">
                        <div className='sizeOption'>A+</div>
                        <div className='sizeOption'>A-</div>
                    </div>
                </div>
                <div>
                    <ul id="fontOptions" className='menu'>
                        <li>Prompt</li>
                        <li>Inter</li>
                        <li>Space Mono</li>
                        <li>Actor</li>
                        <li>Belgrano</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Reading;