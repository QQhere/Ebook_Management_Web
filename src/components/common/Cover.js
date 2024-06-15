import React from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Color';

const Cover = () => {
    return (
        <Box>
        </Box>
    );
};

export default Cover;

const Box = styled.div`
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${Colors.dark_grey};
    opacity: 0.7;
    z-index: 10;
`;