import React from 'react';
import Book from '../common/Book';
import { styled } from 'styled-components';

const ListBooks = (props) => {
    return (
        <div className="list">
            {props.children}
            {props.data?.map((item, index) => {
                return (
                    <StyledBox>
                        <Book
                            id={item.id}
                            src={item.image ? item.image : "/assets/images/ImageDefault.jpg"}
                            type={item.type_of_book}
                            price={item.price}
                        ></Book>
                        <p className='textBold'>{item.title} - {item.author}</p>
                    </StyledBox>             
                );
            })}
        </div>
    );
};

export default ListBooks;

const StyledBox = styled.div`
    width: 208px;
`;
