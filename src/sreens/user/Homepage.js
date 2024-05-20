import React from 'react';
import { styled } from 'styled-components';
import Colors from '../../constants/Color';
import Book from '../../components/common/Book';
import ListBooks from '../../components/hompage/ListBooks';
import HeaderCilent from '../../components/header/HeaderClient';
import '../../components/styles/StyledHeader.css';
import Header from '../../components/header/Header';

const StyledSlider = styled.div`
    position: relative;
    height: 470px;
    width: 100%;
    background-image: url(/assets/images/anhbia.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;

const StyledBox = styled.div`
    background-color: ${Colors.black};
    padding: 20px 90px 90px 90px;
    justify-content: center;
    align-items: center;
`;

const StyledBoxList = styled.div`
    display: flex;
`;

const StyledBoxTitle = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 70px;
`;

const Shadow = styled.div`
    position: absolute;
    height: 7.5rem;
    width: 100%;
    background: linear-gradient(180deg, rgba(18, 18, 20, 0), ${Colors.black});
    bottom: 0;
`;

const Homepage = () => {
    return (
        <div>
            <StyledSlider>
                <Shadow></Shadow>
            </StyledSlider>

            <StyledBox>
                <StyledBoxTitle>
                    <h3>Sách miễn phí</h3>
                    <p className='link'>Xem thêm <i class="fa-solid fa-angles-right"></i></p>
                </StyledBoxTitle>
                
                <StyledBoxList id='freeBooks'>                
                    <ListBooks></ListBooks>
                </StyledBoxList>

                <StyledBoxTitle>
                    <h3>Sách theo dõi</h3>
                    <p className='link'>Xem thêm <i class="fa-solid fa-angles-right"></i></p>
                </StyledBoxTitle>
                <StyledBoxList id='followBooks'>             
                    <ListBooks></ListBooks>
                </StyledBoxList>
                
                <StyledBoxTitle>
                    <h3>Sách trả phí</h3>
                    <p className='link'>Xem thêm <i class="fa-solid fa-angles-right"></i></p>
                </StyledBoxTitle>
                <StyledBoxList id='paidBooks'>
                    <ListBooks></ListBooks>
                </StyledBoxList>         
            </StyledBox>
        </div>
    );
};

export default Homepage;