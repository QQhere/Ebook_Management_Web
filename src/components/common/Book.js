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
    return (
        <div>
            <div className='boxRelative'>
                <StyledImage src={props.src}></StyledImage>
                <StyledType className='textBold'>
                  {props.type}
                </StyledType>
            </div>           
        </div>
    );
};

export default Book;