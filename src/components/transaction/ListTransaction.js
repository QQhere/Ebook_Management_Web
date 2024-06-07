import React from 'react';
import { Data } from '../../data';
import { styled } from 'styled-components';
import Transaction from '../common/Transaction';
import { TransactionData } from '../../transactionData';

const StyledBox = styled.div`
    width: 100%;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
`;

const ListTransaction = (props) => {
    return (
        <Container>
            {props.children}
            {TransactionData.map((item, index) => {
                return (
                    <StyledBox>
                        <Transaction
                            code={item.code}
                            src={item.src}
                            money={item.money}
                            author={item.author}
                            time={item.time}
                            state={item.state}
                            payments={item.payments}
                            account={item.account}
                            title={item.title}
                        ></Transaction>
                    </StyledBox>             
                );
            })}
        </Container>
    );
};

export default ListTransaction;