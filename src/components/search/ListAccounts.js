import React from 'react';
import { DataUser } from '../../dataUser';
import Account from '../common/Account';
import styled from 'styled-components';

const ListAccounts = (props) => {
    return (
        <div>
            {props.children}
            {DataUser.map((item, index) => {
                return (
                    <div>
                        <Account
                            key={item.id}
                            user_name={item.user_name}
                            avatar={item.avatar}
                        ></Account> 
                    </div>
                               
                );
            })}
        </div>
    );
};

export default ListAccounts;
