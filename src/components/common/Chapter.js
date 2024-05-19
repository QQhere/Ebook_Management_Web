import React from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Color';

const StyledChapter = styled.div`
    display: flex;
    width: 100%;
    background-color: ${Colors.white};
    padding: 10px 20px;
    border-radius: 10px;
    justify-content: space-between;
    gap: 20px
`;

const P = styled.p`
    color: ${Colors.black};
`;

const List = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
`;


const Chapter = ({data, type}) => {
    const renderContent = () => {
        switch(type) {
            case 'overview':
                return <div>
                    <i class="fa-solid fa-comment iconColor"></i>
                </div>;
            case 'edit':
                return <div>
                    <div><i class="fa-regular fa-pen-to-square iconColor"></i></div>
                    <div><i class="fa-solid fa-trash-can iconRed"></i></div>
                    <div><i class="fa-regular fa-eye iconColor"></i></div>
                </div>;
            case 'show':
                return <div></div>;
            default:
                return null;
        }
    };
    return (
        <StyledChapter>
            <P>{data.name}</P>
            <List>
                {renderContent(type)}
            </List>
        </StyledChapter>
    );
};

export default Chapter;