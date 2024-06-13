import React, { useEffect } from 'react';
import { styled } from "styled-components";
import Colors from '../../constants/Color';
import '../styles/main.css';

const StyledInput = styled.input`
    position: relative;
    display: flex;
    align-items: center;
    width: 384px;
    height: 48px;
    padding: 15px;
    margin: 11px 0px;
    border: 1px solid ${Colors.green_button};
    border-radius: 10px;
`;

const InputLogin = ({text, placeholder, setValue}) => {
    return (
        <div>
            <StyledInput 
                type="text" 
                placeholder={placeholder ? placeholder : text}  
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export default InputLogin;