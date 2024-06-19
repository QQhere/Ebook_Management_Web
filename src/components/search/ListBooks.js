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
                            src={item.image === "" ? "/assets/images/ImageDefault.jpg" : item.image}
                            type={item.type_of_book}
                            price={item.price}
                        ></Book>
                        <P>{item.title}</P>
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

const P = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Số dòng muốn hiển thị */
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 700;
    font-size: 15px;
    margin-top: 10px;
`;