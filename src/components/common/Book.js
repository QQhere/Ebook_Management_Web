import React from 'react';
import { styled } from 'styled-components';
import Colors from '../../constants/Color';

const StyledImage = styled.div`
    width: 100%;
    padding-top: 160%;
    border-radius: 20px;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
`;


const StyledType = styled.div`
  position: absolute;
  display: flex;
  right: 0;
  border-radius: 0 20px 0 20px;
  background-color: ${Colors.green};
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  text-transform: uppercase;
`;

const Book = (props) => {
    const getTypeBook = (type) => {
        switch(type) {
            case "Free": return "Miễn phí";
            case "Fee": return "Trả phí";
            case "Follow": return "Theo dõi";
        }
    }

    return (
        <a href='/overview'>
            <div className='boxRelative'>
                <StyledImage src={props.src}></StyledImage>
                <StyledType className='textBold'>
                  {getTypeBook(props.type)}
                </StyledType>
            </div>           
        </a>
    );
};

export default Book;