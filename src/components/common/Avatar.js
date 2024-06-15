import React from "react";
import styled from "styled-components";

const Avatar = (props) => {
  return (
    <Avt>
      <img
        src={props.avatar ? props.avatar : "/assets/images/avatar.jpg"}
        alt="avatar"
      />
    </Avt>
  );
};

export default Avatar;

const Avt = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  cursor: pointer;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
