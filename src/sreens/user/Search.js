import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Colors from "../../constants/Color";
import ListBooks from "../../components/search/ListBooks";
import ListAccounts from "../../components/search/ListAccounts";
import { getAllCategory } from "../../services/api/Category";
import { searchBook } from "../../services/api/Book";

const Box = styled.div`
  display: flex;
`;

const Col1 = styled.div`
  width: 280px;
  margin: 20px;
  flex-shrink: 0;
`;

const Col2 = styled.div`
  flex-grow: 1;
  padding: 15px 0 20px 40px;
  margin: 20px;
  border-left: 1px solid ${Colors.bg_dark};
`;

const BoxH1 = styled.div`
  padding: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid ${Colors.bg_dark};
`;

const H1 = styled.p`
  font-size: 17px;
  color: ${Colors.white};
`;

const BoxFlex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: 15px;
  gap: 12px;
`;

const Selection = styled.select`
  flex: 1;
  height: 30px;
  padding: 0 5px;
  border-radius: 5px;
`;

const SearchBox = styled.input`
  height: 40px;
  flex: 1;
  border-radius: 5px;
  padding: 0 10px;
  border: 1px solid ${Colors.green_button};
`;

const ButtonSearch = styled.button`
  height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  border: none;
  font-size: 15px;
  margin-left: 25px;
`;

const StyledBoxSelect = styled.button`
  border-radius: 5px;
  height: 100%;
  border: none;
  padding: 0 10px;
  font-size: 14px;
`;

const BoxSelect = styled.div`
  display: flex;
  height: 30px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const Search = () => {
  const [activeElement, setActiveElement] = useState("book");
  const [allCategory, setAllCategory] = useState([]);
  const [dataSearchBook, setDataSearchBook] = useState([]);

  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectCategory, setSelectCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(1);

  const fetchAllCategory = async () => {
    const response = await getAllCategory();
    if (response.status === "OK") {
      setAllCategory(response.data);
    }
  };

  const fetchSearchBook = async () => {
    const data = {
      status: status,
      type_of_book: type,
      keyword: keyword,
      category: selectCategory,
    };
    const response = await searchBook(data, page, size);
    if (response.status === "OK") {
      setDataSearchBook(response.data);
    }
  };

  const handleSearch = () => {
    if (activeElement === "book") {
      fetchSearchBook();
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  function renderContent() {
    return (
      <div>
        <BoxFlex style={{ gap: "30px", borderBottom: "1px solid #343434" }}>
          <p
            id="book"
            className={
              activeElement === "book"
                ? "optionProfile cursor iconColor"
                : "optionProfile cursor"
            }
            onClick={() => setActiveElement("book")}
          >
            Sách
          </p>
          <p
            id="account"
            className={
              activeElement === "account"
                ? "optionProfile cursor iconColor"
                : "optionProfile cursor"
            }
            onClick={() => setActiveElement("account")}
          >
            Tài khoản
          </p>
        </BoxFlex>
        {activeElement === "book" && (
          <div>
            <div style={{ margin: "20px 0" }}>
              <ListBooks data={dataSearchBook.content}></ListBooks>
            </div>
          </div>
        )}
        {activeElement === "account" && (
          <div>
            <div style={{ margin: "20px 0" }}>
              <ListAccounts></ListAccounts>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Box className="body">
      <Col1>
        <BoxH1>
          <H1>
            Bộ lọc <i class="fa-solid fa-filter"></i>
          </H1>
        </BoxH1>
        <div>
          <BoxFlex>
            <p>Tình trạng:</p>
            <Selection
              className="collection"
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="" selected disabled hidden>
                Chọn tình trạng sách
              </option>
              <option value="process">Đang tiến hành</option>
              <option value="complete">Đã hoàn thành</option>
              <option value="pause">Tạm ngưng</option>
            </Selection>
          </BoxFlex>

          <BoxFlex>
            <p>Loại sách:</p>
            <Selection
              className="collection"
              onChange={(event) => setType(event.target.value)}
            >
              <option value="" selected disabled hidden>
                Chọn loại sách
              </option>
              <option value="Free">Miễn phí</option>
              <option value="Follow">Theo dõi</option>
              <option value="Fee">Trả phí</option>
            </Selection>
          </BoxFlex>

          <BoxFlex>
            <p>Thể loại:</p>
            <Selection
              className="collection"
              onChange={(event) => {
                const selectedValue = event.target.value;
                setSelectCategory((prevCategories) => [
                  ...prevCategories,
                  selectedValue,
                ]);
              }}
            >
              <option value="" selected disabled hidden>
                Thể loại sách
              </option>
              {allCategory.map((item, index) => {
                return <option value={item.id}>{item.name}</option>;
              })}
              ;
            </Selection>
          </BoxFlex>
        </div>
      </Col1>

      <Col2>
        <BoxFlex>
          <SearchBox
            type="text"
            placeholder="Tìm theo tên sách, tên tài khoản"
            onChange={(event) => setKeyword(event.target.value)}
          ></SearchBox>
          <ButtonSearch className="button" onClick={handleSearch}>
            Tìm kiếm
          </ButtonSearch>
        </BoxFlex>
        {renderContent()}
        <BoxSelect
          onChange={(event) => {
            setPage(event.target.value);
            handleSearch();
          }}
        >
          <select style={{ height: "100%" }}>
            {Array.from({ length: dataSearchBook.totalPages }, (_, index) => (
              <option value={index + 1}>Trang {index + 1}</option>
            ))}
          </select>

          <p>{`Hiển thị ${
            dataSearchBook.numberOfElements
              ? dataSearchBook.numberOfElements
              : 0
          } kết quả từ ${(page-1) * size + 1}-${
            (page-1) * size +
            (dataSearchBook.numberOfElements
              ? dataSearchBook.numberOfElements
              : 0)
          } trên tổng số ${
            dataSearchBook.totalElements ? dataSearchBook.totalElements : 0
          } kết quả`}</p>
        </BoxSelect>
      </Col2>
    </Box>
  );
};

export default Search;
