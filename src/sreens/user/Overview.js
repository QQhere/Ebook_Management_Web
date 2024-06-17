import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Book from "../../components/common/Book";
import Colors from "../../constants/Color";
import "../../components/styles/StyledHeader.css";
import Comment from "../../components/common/Comment";
import TabletOfContents from "../../components/common/TabletOfContents";
import { Link, useParams } from "react-router-dom";
import { getBookById } from "../../services/api/Book";
import { getUserByUBId } from "../../services/api/User";
import { useSelector } from "react-redux";
import { getAllChapterByBook } from "../../services/api/Chapter";
import {
  createRating,
  getAllRatingByBookId,
  updateRating,
} from "../../services/api/Rating";

const Categories = ({ categories }) => {
  return (
    <List>
      {categories?.map((item, index) => {
        return <Category>{item.name}</Category>;
      })}
    </List>
  );
};

const renderStars = (rating) => {
  let fullStars = Math.floor(rating);
  let emptyStars = 5 - fullStars;
  let stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<i class="fas fa-star"></i>); // Thẻ icon ngôi sao tô màu vàng
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i class="far fa-star"></i>); // Thẻ icon ngôi sao không tô màu
  }

  return stars;
};

const Rating = ({ rating }) => {
  return <List>{renderStars(rating)}</List>;
};

const Overview = () => {
  const [data, setData] = useState({});
  const [listChapter, setListChapter] = useState([]);
  const [owner, setOwner] = useState("");
  const { bookId } = useParams();
  const stateAccount = useSelector((state) => state.auth);
  const [allRating, setAllRating] = useState([]);

  const [stateRating, setStateRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [isShowRating, setIsShowRating] = useState(false);

  const handleShowRating = () => {
    setIsShowRating(!isShowRating);
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchDataBook();
      await fetchDataChapter();
      await fetchRating();
    };

    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const handleRating = async () => {
    if (stateRating) {
      const response = await updateRating(
        stateAccount.token,
        allRating.find((item) => item.id === stateAccount.userId).id,
        {
          score: rating,
        }
      );
      if (response.status === "OK") {
        alert("Cập nhật đánh giá thành công");
      }
    } else {
      const response = await createRating(stateAccount.token, {
        book_id: bookId,
        user_id: stateAccount.userId,
        score: rating,
      });

      if (response.status === "CREATED") {
        alert("Đánh giá thành công");
      }
    }
    window.location.reload();
  };

  const fetchRating = async () => {
    getAllRatingByBookId(bookId)
      .then((response) => {
        if (response.status === "OK") {
          console.log(response.data);
          setAllRating(response.data);
          console.log(allRating);
          calculateRating(response.data);
        }
      })
  };

  const fetchDataBook = async () => {
    const response = await getBookById(bookId);
    if (response.status === "OK") {
      setData(response.data);
      const responseUser = await getUserByUBId(
        response.data.user_book.find((user) => user.status === "owner").id
      );
      if (responseUser.status === "OK") {
        setOwner(responseUser.data);
      }
    }
  };

  const fetchDataChapter = async () => {
    const response = await getAllChapterByBook(stateAccount.token, bookId);
    if (response.status === "OK") {
      setListChapter(response.data);
    }
  };

  const { time_dmy } = require("../../function/time");

  const calculateRating = async (allRating) => {
    let totalRating = 0;
    allRating?.map((item) => {
      totalRating += item.score;
      if (item.id === stateAccount.userId) {
        setStateRating(true);
      }
    });
    console.log(allRating);
    setAvgRating(allRating.length !== 0 ? totalRating / allRating.length : 0);
  };

  return (
    <div className="body">
      <BoxLinks>
        <Link className="nav" to="/">
          Trang chủ
        </Link>
        <i class="fa-solid fa-angle-right navIcon"></i>
        <Link className="nav" to="#">
          {data.title}
        </Link>
      </BoxLinks>
      <Box>
        <Col1>
          <Book
            type={data.type_of_book}
            src={data.image}
            isClickable={false}
          ></Book>
        </Col1>
        <Col2>
          <h3>{data.title}</h3>
          <div>
            <Categories categories={data.categories}></Categories>
            <P>
              <Span>Tác giả: </Span> {data.author}
            </P>
            <P>
              <Span>Họa sĩ: </Span>
              {data.painter}
            </P>
            <P>
              <Span>Người đăng: </Span>{" "}
              <Link to={`/${owner.id}/inforAccount`}>{owner.fullname}</Link>
            </P>
            <P>
              <Span>Tình trạng: </Span>{" "}
              {data.status === "process"
                ? "Đang tiến hành"
                : data.status === "pause"
                  ? "Tạm ngưng"
                  : "Đã hoàn thành"}
            </P>
            <P>
              <Span>Cập nhật gần nhất: </Span>
              {time_dmy(data.updated_at)}
            </P>
            <P>
              <Span>Số chương: </Span> {listChapter.length}
            </P>
            <P>
              <Span>Đánh giá: </Span> <Rating rating={avgRating}></Rating>
              {`${avgRating}/${allRating.length} đánh giá`}
            </P>
            <P>
              <Span>Lượt đọc: </Span>{" "}
              {data.number_reads ? data.number_reads : 0}
            </P>
            <StyledBox>
              <StyledButton className="button">
                <i class="fa-solid fa-book-open"></i> Đọc sách
              </StyledButton>
              {stateAccount.userId === owner.id ? (
                <Link
                  to={{
                    pathname: `/${data.id}/editBook`,
                    state: { isPermission: true },
                  }}
                >
                  {" "}
                  <StyledButton className="btn">Chỉnh sửa sách</StyledButton>
                </Link>
              ) : null}
              {stateAccount.userId === owner.id ? null : (
                <>
                  <i class="fa-regular fa-star iconColor btn icon" onClick={handleShowRating}></i>

                </>
              )}
            </StyledBox>
            <Span>Mô tả:</Span>
            <Pre>{data.summary}</Pre>
          </div>

          <TextTitle>Mục lục</TextTitle>
          <div>
            <TabletOfContents
              data={listChapter}
              bookId={bookId}
              type="overview"
            />
            <BoxSelect>
              <select>
                <option value="1">Trang 1</option>
                <option value="2">Trang 2</option>
                <option value="3">Trang 3</option>
                <option value="4">Trang 4</option>
              </select>

              <StyledBoxSelect className="button">Đến</StyledBoxSelect>
            </BoxSelect>
          </div>
        </Col2>
      </Box>

      {isShowRating ? <div>
        <Cover onClick={handleShowRating}></Cover>
        <BoxContent>
          <Header>
            <Pbox>{stateRating ? "Bạn đã đánh giá" : "Đánh giá"}</Pbox>
            <ClosedButton onClick={handleShowRating}><i class="fa-solid fa-xmark"></i></ClosedButton>
          </Header>
          <Content>
            <BoxSelect onChange={(e) => setRating(e.target.value)}>
              <select>
                <option value="1">1 sao</option>
                <option value="2">2 sao</option>
                <option value="3">3 sao</option>
                <option value="4">4 sao</option>
                <option value="5">5 sao</option>
              </select>

              <StyledBoxSelect className="button" onClick={handleRating}>
                Đến
              </StyledBoxSelect>
            </BoxSelect>
          </Content>
        </BoxContent>
      </div> : <div> </div>}
      {/* <TextTitle>Bình luận</TextTitle>
      <Comment haha="hhh"></Comment>
      <Comment haha="jjj"></Comment> */}
    </div>
  );
};

export default Overview;

const Cover = styled.div`
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${Colors.dark_grey};
    opacity: 0.7;
    z-index: 10;
`;

const BoxContent = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    background-color: transparent;
    color: ${Colors.white};
    font-size: 18px;
`;

const Pbox = styled.p`
    font-size: 15px;
    margin-left: 30px;
`;

const Content = styled.div`
    margin: 30px;
`;

const BoxLinks = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const Box = styled.div`
  display: flex;
`;

const Col1 = styled.div`
  width: 260px;
  margin: 20px;
  flex-shrink: 0;
`;

const Col2 = styled.div`
  flex-grow: 1;
  padding: 20px 20px 20px 50px;
`;

const Category = styled.div`
  display: flex;
  padding: 5px 10px;
  background-color: ${Colors.white};
  border-radius: 20px;
  font-size: 12px;
  color: ${Colors.black};
`;

const List = styled.div`
  display: flex;
  gap: 10px;
  color: ${Colors.yellow};
`;

const P = styled.p`
  display: inline-flex;
  color: ${Colors.white};
  margin-top: 10px;
  width: 100%;
  word-wrap: break-word;
  gap: 20px;
  align-items: center;
  text-align: justify;
  font-size: 17px;
`;

const Pre = styled.pre`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  margin-top: 20px;
  width: 80%;
  white-space: break-spaces;
  text-align: justify;
`;

const Span = styled.span`
  color: ${Colors.white};
  font-weight: 600;
  font-size: 17px;
`;

const StyledButton = styled.button`
  height: 50px;
  padding: 0 30px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
`;

const StyledBox = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
  align-items: center;
`;

const TextTitle = styled.h3`
  margin: 40px 0;
`;

const BoxSelect = styled.div`
  display: flex;
  height: 30px;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const StyledBoxSelect = styled.button`
  border-radius: 5px;
  border: none;
  padding: 0 10px;
  font-size: 14px;
`;
