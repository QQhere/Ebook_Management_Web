import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Colors from "../../../constants/Color";
import Avatar from "../../../components/common/Avatar";
import ListBooks from "../../../components/search/ListBooks";
import { getAllBookByUser } from "../../../services/api/Book";
import { getUserDetails } from "../../../services/api/User";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Library = () => {
  const [dataUser, setDataUser] = useState([]);
  const stateAccount = useSelector((state) => state.auth);

  const [publishedBooks, setPublishedBooks] = useState([]);
  const [followingBooks, setFollowingBooks] = useState([]);
  const [purchasedBooks, setPurchasedBooks] = useState([]);

  const fetchDataBook = async (token, userId) => {
    // const response = await getAllBookByUser(localStorage.getItem('token'), localStorage.getItem('userId'));
    const response = await getAllBookByUser(token, userId);
    setPublishedBooks([]);
    setFollowingBooks([]);
    setPurchasedBooks([]);
    response.data?.map((item) => {
      if (item.status === "follow") {
        setFollowingBooks((followingBooks) => [...followingBooks, item]);
      } else if (item.status === "Fee") {
        setPurchasedBooks((purchasedBooks) => [...purchasedBooks, item]);
      } else {
        setPublishedBooks((publishedBooks) => [...publishedBooks, item]);
      }
    });
  };

  const fetchDataUser = async (token) => {
    const response = await getUserDetails(token);
    setDataUser(response.data);
  };

  useEffect(() => {
    const token = stateAccount.token;
    fetchDataUser(token);
    fetchDataBook(token, stateAccount.userId);
  }, []);

  return (
    <Box className="body">
      <Col1>
        <BoxAvatar>
          <p style={{ fontSize: "26px" }}>
            {dataUser.fullname === null ? "" : dataUser.fullname}
          </p>
          <Avatar avatar={dataUser.link_avatar}></Avatar>
        </BoxAvatar>
        <BoxNav>
          <li>
            <a href="/account_management" className="colorWhite">
              <Orther>
                <i class="fa-solid fa-user"></i>
              </Orther>
              Quản lý tài khoản
            </a>
          </li>
          <li>
            <a href="/library" className="iconColor">
              <Orther>
                <i class="fa-solid fa-bookmark"></i>
              </Orther>
              Thư viện cá nhân
            </a>
          </li>
          <li>
            <a href="transaction_history" className="colorWhite">
              <Orther>
                <i class="fa-solid fa-cart-shopping"></i>
              </Orther>
              Lịch sử giao dịch
            </a>
          </li>
        </BoxNav>

        <BoxCenter>
          <H1>{publishedBooks.length}</H1>
          <p>Sách đã đăng</p>
        </BoxCenter>
        <BoxApp className="flex">
          <BoxCenter>
            <H1>10</H1>
            <p>Đang theo dõi</p>
          </BoxCenter>

          <BoxCenter>
            <H1>0</H1>
            <p>Người theo dõi</p>
          </BoxCenter>
        </BoxApp>
      </Col1>

      <Col2>
        <BoxTitle>
          <p className="titleProfile">Thư viện cá nhân</p>
        </BoxTitle>

        <BoxOption>
          <p className="optionProfile">Sách đã đăng</p>
          <Link to="/new_book">
            <p className="link">
              Thêm mới <i class="fa-solid fa-add"></i>
            </p>
          </Link>
        </BoxOption>

        <div id="library">
          <ListBooks data={publishedBooks}></ListBooks>
        </div>
      </Col2>
    </Box>
  );
};

export default Library;

const Box = styled.div`
  display: flex;
`;

const Col1 = styled.div`
  width: 300px;
  margin: 20px;
  flex-shrink: 0;
`;

const Col2 = styled.div`
  flex-grow: 1;
  padding: 15px 0 20px 40px;
  margin: 40px 20px;
  border-left: 1px solid ${Colors.bg_dark};
`;

const BoxAvatar = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  align-items: center;
  gap: 20px;
`;

const ButtonEditAvatar = styled.button`
  height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  border: none;
`;
const BoxNav = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${Colors.more};

  :hover {
    background-color: ${Colors.bg_dark};
  }

  > li {
    padding: 5px 20px;
    border-radius: 10px;

    > a {
      font-size: 17px;
      display: inline-flex;
      align-items: center;
      gap: 20px;
    }
  }
`;

const Orther = styled.div`
  display: flex;
  width: 20px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

const BoxOption = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding: 15px 0;
  border-bottom: 1px solid ${Colors.bg_dark};
`;

const BoxInfor = styled.div`
  display: flex;
  border: 1px solid ${Colors.dark_grey};
  border-radius: 20px;
  height: 66px;
  padding: 0 30px;
`;

const BoxOrther = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Button = styled.button`
  border-radius: 20px;
  height: 40px;
  padding: 0 20px;
  margin-right: 20px;
`;

const H1 = styled.p`
  font-size: 26px;
  font-weight: bold;
`;

const BoxApp = styled.div`
  justify-content: center;
  gap: 40px;
`;

const BoxCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const BoxTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
