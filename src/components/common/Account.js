import React from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Color';

const Account = (props) => {
    return (
        <a href='/inforAccount'>
            <Container>
                <BoxAvatar imgSrc={props.avatar}></BoxAvatar>
                <UserName>{props.user_name}</UserName>
            </Container>
        </a> 
    );
};

export default Account;

const BoxAvatar = styled.div`
    height: 70px;
    width: 70px;
    border-radius: 50px;
    background-image: url(${props => props.imgSrc});
    background-size: cover;
    background-position: center;
`;

const UserName = styled.p`
    margin-left: 20px;
    font-size: 16px;
    color: ${Colors.white};
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 30px 0;
    align-items: center;
    cursor: pointer;
`;