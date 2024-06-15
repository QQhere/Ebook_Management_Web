import React from 'react';
import styled from 'styled-components';
import Cover from '../common/Cover';
import Colors from '../../constants/Color';
import ListAccounts from '../search/ListAccounts'

const ListFollower = () => {
    return (
        <Container>
            <Box>
                <Header>
                    <P>Danh sách đang theo dõi</P>
                    <ClosedButton className='button'><i class="fa-solid fa-xmark"></i></ClosedButton>
                </Header>
                <Content>
                    <ListAccounts></ListAccounts>  
                </Content>
            </Box>
        </Container>
    );
};

export default ListFollower;

const Container = styled.div`
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;

const Box = styled.div`
    width: 500px;
    height: 600px;
    background-color: ${Colors.bg_dark};
    z-index: 1000;
    border-radius: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid ${Colors.dark_grey};
`;

const ClosedButton = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 0 20px 0 0;
`;

const P = styled.p`
    font-size: 15px;
    margin-left: 30px;
`;

const Content = styled.div`
    margin: 30px;
`;