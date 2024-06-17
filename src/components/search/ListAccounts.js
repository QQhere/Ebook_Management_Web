import React from "react";
import Account from "../common/Account";
import { useSelector } from "react-redux";

const ListAccounts = (props) => {
  const stateAccount = useSelector((state) => state.auth);

  return (
    <div>
      {props.children}
      {props.data
        ?.filter((item) => item.id !== stateAccount.userId)
        .map((item, index) => {
          return (
            <div key={item.id}>
              <Account
                id={item.id}
                user_name={item.fullname}
                avatar={
                  item.link_avatar === null
                    ? "/assets/images/avatar.jpg"
                    : item.link_avatar
                }
              ></Account>
            </div>
          );
        })}
    </div>
  );
};

export default ListAccounts;
