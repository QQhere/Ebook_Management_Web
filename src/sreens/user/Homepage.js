import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Colors from "../../constants/Color";
import ListBooks from "../../components/hompage/ListBooks";
import { getAllBookByType } from "../../services/api/Book";
import { Link } from "react-router-dom";
import "../../components/styles/StyledHeader.css";
import { getAllHistoryReadingByUser } from "../../services/api/HistoryReading";
import { useSelector } from "react-redux";

const Homepage = () => {
  const [bookFree, setBookFree] = useState([]);
  const [bookFollow, setBookFollow] = useState([]);
  const [bookFee, setBookFee] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [bookReding, setBookReading] = useState([]);
  const stateAccount = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchBookByType = async (type) => {
    const response = await getAllBookByType(type, 1, 5);
    if (response.status === "OK") {
      switch (type) {
        case "free":
          setBookFree(response.data);
          break;
        case "follow":
          setBookFollow(response.data);
          break;
        case "fee":
          setBookFee(response.data);
          break;
      }
    }
    return response.data;
  };

  const fetchAllHistory = async () => {
    if (stateAccount === null) return;
    const response = await getAllHistoryReadingByUser(stateAccount.token, stateAccount.userId);
    if (response.status === "OK") {
      setBookReading(response.data
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5)
        .map((item) => item.book)
      );
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(!isLoading); // Đánh dấu là đang tải dữ liệu

        // Gọi các hàm fetchBookByType cùng một lúc và chờ đợi hoàn thành
        const [freeData, followData, feeData] = await Promise.all([
          fetchBookByType("Free"),
          fetchBookByType("Follow"),
          fetchBookByType("Fee"),
          fetchAllHistory()
        ]);

        // Cập nhật state khi tất cả dữ liệu đã được lấy về thành công
        setBookFree(freeData);
        setBookFollow(followData);
        setBookFee(feeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(!isLoading); // Đánh dấu là không còn tải dữ liệu
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <StyledSlider>
            <Shadow></Shadow>
          </StyledSlider>

          <StyledBox>
            {bookReding.length === 0 ? null : (
              <>
                <StyledBoxTitle>
                  <h3>Tiếp tục cho bạn</h3>
                </StyledBoxTitle>

                <StyledBoxList id="freeBooks">
                  <ListBooks data={bookReding}></ListBooks>
                </StyledBoxList>
              </>
            )}

            {bookFree.length === 0 ? null : (
              <>
                <StyledBoxTitle>
                  <h3>Sách miễn phí</h3>
                  <Link className="link" to="/free">
                    Xem thêm <i class="fa-solid fa-angles-right"></i>
                  </Link>
                </StyledBoxTitle>

                <StyledBoxList id="freeBooks">
                  <ListBooks data={bookFree}></ListBooks>
                </StyledBoxList>
              </>
            )}

            {bookFollow.length === 0 ? null : (
              <>
                <StyledBoxTitle>
                  <h3>Sách theo dõi</h3>
                  <Link className="link" to="/follow">
                    Xem thêm <i class="fa-solid fa-angles-right"></i>
                  </Link>
                </StyledBoxTitle>
                <StyledBoxList id="followBooks">
                  <ListBooks data={bookFollow}></ListBooks>
                </StyledBoxList>
              </>
            )}

            {bookFee.length === 0 ? null : (
              <>
                <StyledBoxTitle>
                  <h3>Sách trả phí</h3>
                  <Link className="link" to="/fee">
                    Xem thêm <i class="fa-solid fa-angles-right"></i>
                  </Link>
                </StyledBoxTitle>
                <StyledBoxList id="paidBooks">
                  <ListBooks data={bookFee}></ListBooks>
                </StyledBoxList>
              </>
            )}
          </StyledBox>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Homepage;

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
