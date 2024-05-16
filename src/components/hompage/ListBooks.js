import React from 'react';
import { Data } from '../../data';
import Book from '../common/Book';
import { styled } from 'styled-components';

const StyledBox = styled.div`
    width: 208px;
`;

const ListBooks = (props) => {
    return (
        <div className="list">
            {props.children}
            {Data.map((item, index) => {
                return (
                    <StyledBox>
                        <Book
                            key={item.id}
                            src={item.src}
                            type={item.type}
                        ></Book>
                        <p className='textBold'>{item.title} - {item.author}</p>
                    </StyledBox>             
                );
            })}
        </div>
    );
};

export default ListBooks;