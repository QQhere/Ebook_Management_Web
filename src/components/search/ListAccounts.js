import React from 'react';
import { DataUser } from '../../dataUser';
import Account from '../common/Account';
import styled from 'styled-components';

const ListAccounts = (props) => {
    return (
        <div>
            {props.children}
            {props.data?.map((item, index) => {
                return (
                    <div>
                        <Account
                            key={item.id}
                            user_name={item.fullname}
                            avatar={item.link_avatar === null ? "https://i.docln.net/lightnovel/covers/s12096-4622c0c2-0e3d-455f-8200-58b2fc537cb4-m.jpg" : item.link_avatar}
                        ></Account> 
                    </div>
                               
                );
            })}
        </div>
    );
};

export default ListAccounts;
