import React from 'react';
import Book from '../common/Book';
import { styled } from 'styled-components';

const StyledBox = styled.div`
    width: 160px;
`;

const ListBooks = (props) => {
    return (
        <div className="list1">
            {props.children}
            {props.data?.map((item, index) => {
                return (
                    <StyledBox>
                        <Book
                            key={item.id}
                            src={item.image === "" ? "https://i.docln.net/lightnovel/covers/s12096-4622c0c2-0e3d-455f-8200-58b2fc537cb4-m.jpg" : item.image}
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