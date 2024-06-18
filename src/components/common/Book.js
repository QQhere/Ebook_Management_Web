import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Book = (props) => {
  console.log(props);
  const getTypeBook = (type) => {
    switch (type) {
      case "Free":
        return "Miễn phí";
      case "Fee":
        return "Trả phí";
      case "Follow":
        return "Theo dõi";
      default:
        return "Riêng tư";
    }
  };

  const getClass = (type) => {
    switch (type) {
      case "Free":
        return "free";
      case "Follow":
        return "follow";
      default:
        return "fee";
    }
  };
  const formattedPrice = props.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  const content = (
    <div className="boxRelative">
      <StyledImage
        src={props.src ? props.src : "/assets/images/ImageDefault.jpg"}
      ></StyledImage>
      <StyledType className={getClass(props.type)}>{props.price > 0 ? formattedPrice :getTypeBook(props.type)}</StyledType>
    </div>
  );

  return props.isClickable == false ? (
    content
  ) : (
    <Link to={`/${props.id}/overview`}>{content}</Link>
  );
};

export default Book;

const StyledImage = styled.div`
  width: 100%;
  padding-top: 160%;
  border-radius: 20px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

const StyledType = styled.div`
  position: absolute;
  display: flex;
  right: 0;
  border-radius: 0 20px 0 20px;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  text-transform: uppercase;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 15px;
`;
