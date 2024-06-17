import React from 'react';
import Book from '../common/Book';
import { styled } from 'styled-components';

const ListBooks = (props) => {
    return (
        <div className="list1">
            {props.children}
            {props.data?.map((item, index) => {
                return (
                    <StyledBox>
                        <Book
                            id={item.id}
                            src={item.image === "" ? "/assets/images/ImageDefault.jpg" : item.image}
                            type={item.type_of_book}
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
    width: 160px;
`;
