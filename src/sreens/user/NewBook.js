import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import Colors from "../../constants/Color";
import { useNavigate } from "react-router";
import { deleteCategory, getAllCategory } from "../../services/api/Category";
import { createBook } from "../../services/api/Book";
import { useSelector } from "react-redux";
import { uploadImage } from "../../services/api/Upload";

const CategoryComponent = (props) => {
  console.log(props);
  const [allCategory, setAllCategory] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  const handleRemove = (value) => {
    const newCategoryIds = categoryIds.filter((item) => item !== value);
    setCategoryIds(newCategoryIds);
    props.setCategoryIds(props.categoryIds.filter((item) => item != allCategory.find((item) => item.name === value).id));
  };

  const Categories = ({ categoryIds }) => {
    return (
      <List>
        {categoryIds.map((item, index) => {
          return <Category onClick={() => handleRemove(item)}>{item}</Category>;
        })}
      </List>
    );
  };
  
  const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;
    if (categoryIds.includes(selectedValue)) {
      return;
    }

    const selectedText = event.target.options[event.target.selectedIndex].text;
    setCategoryIds([...categoryIds, selectedText]);
    props.setCategoryIds([...props.categoryIds, selectedValue]);
  };

  const getCategory = async () => {
    const response = await getAllCategory();
    setAllCategory(response.data);
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    setCategoryIds(categoryIds);
  }, [categoryIds]);

  // 
  return (
    <>
      <BoxFlex>
        <p>Thể loại: <span style={{color: '#D93E30', fontWeight: 'bold'}}>*</span></p>
        <Categories
          categoryIds={categoryIds}
          setCategoryIds={setCategoryIds}
        ></Categories>
      </BoxFlex>
      <BoxFlex>
        <Selection className="collection" onChange={handleSelectionChange}>
          <option value="" selected disabled hidden>
            Chọn thể loại sách
          </option>
          {allCategory.map((item, index) => {
            return <option value={item.id}>{item.name}</option>;
          })}
        </Selection>
      </BoxFlex>
    </>
  );
};

const ChageThumbnail = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      const url = await uploadImage(file);
      props.setImage(url);
    }
  };

  const handleClick = () => {
    document.getElementById("myFile").click();
  };

  useEffect(() => {
    if (selectedFile) {
      document.getElementById(
        "myDiv"
      ).style.backgroundImage = `url(${selectedFile})`;
    }
  }, [selectedFile]);

  return (
    <>
      <Thumbnail id="myDiv"></Thumbnail>
      <input
        type="file"
        id="myFile"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <ButtonThumbnail className="button" onClick={handleClick}>
        Tải lên ảnh
      </ButtonThumbnail>
    </>
  );
};

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const [typeOfBook, setTypeOfBook] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [status, setStatus] = useState("process");
  const [author, setAuthor] = useState("");
  const [painter, setPainter] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryIds, setCategoryIds] = useState([]);

  const regText = /^[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\\-]*$/; //kiểm tra dữ liệu vào (không trống, không bao gồm toàn space, không chỉ gồm kí tự đặc biệt)

  const stateAccount = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addBook = async (book) => {
    const response = await createBook(
      // stateAccount.data.token,
      stateAccount.token,
      book,
      stateAccount.userId
    );

    return response;
  };

  const handleAddBook = async () => {
    if (regText.test(title) || regText.test(summary) || regText.test(author) || !typeOfBook || categoryIds.length === 0) {
      alert("Các mục đánh dấu * là bắt buộc\nHãy nhập lại đúng định dạng")
      return;
    }

    if (typeOfBook === 'Fee' && price <= 0) {
      alert("Giá tiền phải là số nguyên dương\nHãy nhập lại")
      return;
    }
    const book = {
      title: title,
      summary: summary,
      image: image,
      type_of_book: typeOfBook,
      publishing_year: publishingYear,
      status: status,
      author: author,
      painter: painter,
      price: price,
      categoryIds: categoryIds,
    };

    const response = await addBook(book);

    if (response.status === "CREATED") {
      alert("Thêm sách thành công " );
      navigate(-1);
    } else {
      alert("Thêm sách thất bại\n Hãy thử lại");
    }
    // done
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Box className="body">
      <Col1>
        <ChageThumbnail setImage={setImage}></ChageThumbnail>
      </Col1>

      <Col2>
        <div
          id="headerCilent"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "25px",
          }}
        >
          <Button className="button" onClick={handleAddBook}>
            Thêm mới sách
          </Button>
          <Button className="btn" onClick={handleCancel}>
            Hủy bỏ
          </Button>
        </div>

        <div>
          <BoxFlex>
            <p>Tên sách: <span style={{color: '#D93E30', fontWeight: 'bold'}}>*</span></p>
            <Collection
              type="text"
              className="collection"
              placeholder="Nhập tên sách"
              onChange={(event) => setTitle(event.target.value)}
            ></Collection>
          </BoxFlex>

          <BoxFlex>
            <p>Tác giả: <span style={{color: '#D93E30', fontWeight: 'bold'}}>*</span></p>
            <Collection
              type="text"
              className="collection"
              placeholder="Nhập tên tác giả"
              onChange={(event) => setAuthor(event.target.value)}
            ></Collection>
          </BoxFlex>

          <BoxFlex>
            <p>Họa sĩ:</p>
            <Collection
              type="text"
              className="collection"
              placeholder="Nhập tên họa sĩ"
              onChange={(event) => setPainter(event.target.value)}
            ></Collection>
          </BoxFlex>

          <BoxFlex>
            <p>Năm xuất bản:</p>
            <Collection
              type="number"
              className="collection"
              placeholder="Nhập năm xuất bản"
              onChange={(event) => setPublishingYear(event.target.value)}
            ></Collection>
          </BoxFlex>

          <BoxFlex>
            <p>Loại sách: <span style={{color: '#D93E30', fontWeight: 'bold'}}>*</span></p>
            <Selection
              className="collection"
              onChange={(event) => setTypeOfBook(event.target.value)}
            >
              <option value="" selected disabled hidden>
                Chọn loại sách
              </option>
              <option value="Free">Miễn phí</option>
              <option value="Follow">Theo dõi</option>
              {/* <option value="Fee">Trả phí</option> */}
              <option value="Private">Riêng tư</option>
            </Selection>
          </BoxFlex>

          {typeOfBook === "Fee" && (
            <BoxFlex>
              <p>Giá: <span style={{color: '#D93E30', fontWeight: 'bold'}}>*</span></p>
              <Collection
                type="number"
                className="collection"
                placeholder="Nhập giá"
                onChange={(event) => setPrice(event.target.value)}
              ></Collection>
            </BoxFlex>
          )}

          <CategoryComponent
            categoryIds={categoryIds}
            setCategoryIds={setCategoryIds}
          ></CategoryComponent>

          <div>
            <p>Mô tả: <span style={{color: '#D93E30', fontWeight: 'bold'}}>*</span></p>
            <InputDescription
              className="collection"
              onChange={(event) => setSummary(event.target.value)}
            ></InputDescription>
          </div>
        </div>
      </Col2>
    </Box>
  );
};

export default NewBook;

const Box = styled.div`
  display: flex;
`;

const Col1 = styled.div`
  display: flex;
  width: 260px;
  margin: 20px;
  flex-shrink: 0;
  gap: 10px;
  align-items: center;
  flex-direction: column;
`;

const Col2 = styled.div`
  flex-grow: 1;
  padding: 0px 0 20px 40px;
  margin: 20px;
  border-left: 1px solid ${Colors.bg_dark};
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
  height: 35px;
  padding: 0 5px;
  border-radius: 5px;
`;

const Collection = styled.input`
  flex: 1;
  height: 35px;
  padding: 0 10px;
  border-radius: 5px;
`;

const Thumbnail = styled.div`
  height: 430px;
  width: 250px;
  margin: 10px 0;
  border-radius: 10px;
  border: 2px solid ${Colors.bg_dark};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const ButtonThumbnail = styled.button`
  height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  border: none;
  font-size: 15px;
`;

const Category = styled.div`
  display: flex;
  padding: 5px 10px;
  background-color: ${Colors.white};
  border-radius: 20px;
  font-size: 12px;
  color: ${Colors.black};
  cursor: pointer;
`;

const List = styled.div`
  display: flex;
  gap: 10px;
  color: ${Colors.yellow};
`;

const InputDescription = styled.textarea`
  flex: 1;
  height: 300px;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  font-size: 17px;
  font-family: Arial, Helvetica, sans-serif;
`;

const Button = styled.button`
  border-radius: 20px;
  height: 40px;
  padding: 0 20px;
  margin-right: 20px;
  border: none;
`;
