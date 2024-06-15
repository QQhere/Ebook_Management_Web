import React from 'react';
import { Data } from '../../data';
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
                            src={item.image ? item.image : "https://i.docln.net/lightnovel/covers/s12096-4622c0c2-0e3d-455f-8200-58b2fc537cb4-m.jpg"}
                            type={item.type_of_book}
                        ></Book>
                        <p className='textBold'>{item.title}</p>
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
