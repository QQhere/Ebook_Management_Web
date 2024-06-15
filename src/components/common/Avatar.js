import React from 'react';
import { styled } from 'styled-components'

const Avatar = () => {
    return (
        <Avt></Avt>
    );
};

export default Avatar;

const Avt = styled.div`
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    border-radius: 100%;
    background-image: url(/assets/images/avatar.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    cursor: pointer;
`;