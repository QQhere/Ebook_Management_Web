import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Colors from "../../constants/Color";
import { getAllBookByType } from "../../services/api/Book";
import { Link, useParams } from "react-router-dom";
import "../../components/styles/StyledHeader.css";
import ListBooks from "../../components/hompage/ListBooks";

const BooksOfType = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { typeOfBook } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchBookByType = async (type) => {
    const response = await getAllBookByType(type, 1, 25);
    if (response.status === "OK") {
      setData(response.data);
    }
  };

  useEffect(() => {
    fetchBookByType(typeOfBook);
  }, []);

  return (
    <div>
      <div>
        <StyledSlider>
          <Shadow></Shadow>
        </StyledSlider>

        <StyledBox>
          <StyledBoxTitle>
            <h3>
              {typeOfBook === "free"
                ? "Sách miễn phí"
                : typeOfBook === "follow"
                ? "Sách theo dõi"
                : "Sách mất phí"}
            </h3>
          </StyledBoxTitle>

          <StyledBoxList>
            <ListBooks data={data}></ListBooks>
          </StyledBoxList>
        </StyledBox>
      </div>
    </div>
  );
};

export default BooksOfType;

const StyledSlider = styled.div`
  position: relative;
  height: 470px;
  width: 100%;
  background-image: url(/assets/images/anhbia.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const StyledBox = styled.div`
  background-color: ${Colors.black};
  padding: 20px 90px 90px 90px;
  justify-content: center;
  align-items: center;
`;

const StyledBoxList = styled.div`
  display: flex;
`;

const StyledBoxTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
`;

const Shadow = styled.div`
  position: absolute;
  height: 7.5rem;
  width: 100%;
  background: linear-gradient(180deg, rgba(18, 18, 20, 0), ${Colors.black});
  bottom: 0;
`;
