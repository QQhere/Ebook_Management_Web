import React from 'react';
import { styled } from 'styled-components';
import Colors from '../../constants/Color';
import Avatar from './Avatar';


const Box = styled.div`
    display: flex;
`;

const BoxAvatar = styled.div`
    width: 35px;
    margin-right: 10px;
`;

const Col2 = styled.div`
    flex-grow: 1;
`;

const Line = styled.div`
    display: flex;
    height: 35px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    word-wrap: break-word;
`;

const StyledComment = styled.div`
    display: flex;
    background-color: ${Colors.white};
    color: ${Colors.black};
    border-radius: 20px;
    padding: 20px 10%;
    margin: 0 10%;
    width: 100%;
    justify-content: center;
`;

const ReplayComment = styled.div`
    color: ${Colors.white};
    background-color: ${Colors.bg_dark};
    border-radius: 20px;
    padding: 20px 10%;
`;

const Content = styled.p`
    color: ${Colors.white};
    margin-top: 10px;
    width: 100%;
    word-wrap: break-word;
    gap: 12px;
    align-items: center;
    text-align: justify;
`;

const Comment = () => {
    return (
        <Box>
            <StyledComment>
                <Line>
                    <div className='inline'>
                        <BoxAvatar>
                            <Avatar></Avatar>
                        </BoxAvatar>
                        <p style={{fontWeight: '500'}}>Hà Na Na</p>
                    </div>
                    <p>1 tháng trước</p>
                </Line>

                <Box>
                    <Content></Content>
                </Box>
                        
            </StyledComment>
            
        </Box>
    );
};

export default Comment;