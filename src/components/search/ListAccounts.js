import React from 'react';
import Account from '../common/Account';

const ListAccounts = (props) => {
    return (
        <div>
            {props.children}
            {props.data?.map((item, index) => {
                return (
                    <div>
                        <Account
                            id={item.id}
                            user_name={item.fullname}
                            avatar={item.link_avatar === null ? "/assets/images/avatar.jpg" : item.link_avatar}
                        ></Account> 
                    </div>
                               
                );
            })}
        </div>
    );
};

export default ListAccounts;
