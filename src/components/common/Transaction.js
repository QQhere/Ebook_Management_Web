import React from 'react';
import { styled } from 'styled-components';
import Colors from '../../constants/Color';

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border: 1px solid ${Colors.dark_grey};
    background-color: ${Colors.bg_dark};
    border-radius: 10px;
    padding: 15px;
`;

const StyledImage = styled.div`
    width: 80px;
    height: 140px;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
`;

const Box = styled.div`
    display: flex;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 15px;
    font-size: 15px;
    justify-content: space-between;
`;

const Span = styled.span`
    text-transform: uppercase;
`;

const Transaction = (props) => {
    console.log(props);
    return (
        <Container>
            <Box>
                <StyledImage src={props.src}></StyledImage>
                <List>
                    <p>Mã đơn hàng: <Span className='textBold'>{props.code}</Span></p>
                    <p>Tên sách: <span>{props.title}</span></p>
                    <p>Tác giả: <span >{props.author}</span></p>
                    <p>Tài khoản: <span >{props.account}</span></p>
                </List>
            </Box>
            <List style={{textAlign: 'right'}}>
                <p>Thành tiền: <span style={{color: '#F2C49B', fontWeight: 'bold'}}>{props.money} đ</span></p>
                <p>Hình thức thanh toán: <span>{props.payments}</span></p>
                <p>Trạng thái giao dịch: <span style={{color: '#73D99F'}}>{props.state}</span></p>
                <p>Thời gian: <span >{props.time}</span></p>
            </List>
        </Container>
    );
};

export default Transaction;