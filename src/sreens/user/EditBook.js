import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import Colors from "../../constants/Color";
import TabletOfContents from "../../components/common/TabletOfContents";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookById, updateBook } from "../../services/api/Book";
import { useSelector } from "react-redux";
import { uploadFile, uploadImage } from "../../services/api/Upload";
import { getAllCategory } from "../../services/api/Category";
import { createChapter, getAllChapterByBook } from "../../services/api/Chapter";

const Categories = (props) => {
  const handleRemove = (id) => {
    const newCategoryIds = props.categoryIds.filter((item) => item.id !== id);
    props.setCategoryIds(newCategoryIds);
  };

  return (
    <List>
      {props.categoryIds?.map((item, index) => {
        return (
          <Category key={item.id} onClick={() => handleRemove(item.id)}>
            {item.name}
          </Category>
        );
      })}
    </List>
  );
};

const CategoryComponent = (props) => {
  const [categoryIds, setCategoryIds] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;
    for (let i = 0; i < categoryIds.length; i++) {
      if (categoryIds[i].id === parseInt(selectedValue)) {
        return;
      }
    }

    const selectedText = event.target.options[event.target.selectedIndex].text;
    setCategoryIds([
      ...categoryIds,
      {
        id: selectedValue,
        name: selectedText,
      },
    ]);
    props.setCategoryIds([
      ...props.categoryIds,
      {
        id: selectedValue,
        name: selectedText,
      },
    ]);
  };

  const getCategory = async () => {
    const response = await getAllCategory();
    setAllCategory(response.data);
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    setCategoryIds(props.categoryIds);
  }, [props.categoryIds]);

  return (
    <>
      <BoxFlex>
        <p>Thể loại: <span style={{ color: '#D93E30', fontWeight: 'bold' }}>*</span></p>
        <Categories
          categoryIds={props.categoryIds}
          setCategoryIds={props.setCategoryIds}
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

const ChangeThumbnail = (props) => {
  const [selectedFile, setSelectedFile] = useState();

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

  useEffect(() => {
    setSelectedFile(props.image);
  }, [props.image]);

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
      <Button className="button" onClick={handleClick}>
        Tải lên ảnh
      </Button>
    </>
  );
};

const EditBook = () => {
  const { bookId } = useParams();
  const [addNewChapter, setAddNewChapter] = useState(false);
  const [dataBook, setDataBook] = useState({});
  const navigate = useNavigate();
  const stateAccount = useSelector((state) => state.auth);

  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [painter, setPainter] = useState();
  const [publishingYear, setPublishingYear] = useState();
  const [status, setStatus] = useState();
  const [typeOfBook, setTypeOfBook] = useState();
  const [summary, setSummary] = useState();
  const [categoryIds, setCategoryIds] = useState([]);
  const [price, setPrice] = useState();
  const [image, setImage] = useState();

  const [listChapter, setListChapter] = useState([]);
  const [nameChapter, setNameChapter] = useState();
  const [file, setFile] = useState(null);
  const [ordinalNumber, setOrdinalNumber] = useState(1);

  const regText = /^[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\\-]*$/; //kiểm tra dữ liệu vào (không trống, không bao gồm toàn space, không chỉ gồm kí tự đặc biệt)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAddChapter = async () => {
    const urlFile = await uploadFile(file);
    if (urlFile != null) {
      const newChapter = {
        name: nameChapter,
        original_number: ordinalNumber,
        thumbnail: urlFile,
        book_id: bookId,
      };

      const response = await createChapter(stateAccount.token, newChapter);
      if (response.status === "CREATED") {
        alert("Thêm chương thành công");
        window.location.reload();
        // setAddNewChapter(false);
      } else {
        alert("Thêm chương thất bại");
      }
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const fetchDataBook = async () => {
    const repsonse = await getBookById(bookId);
    if (repsonse.status === "OK") {
      setDataBook(repsonse.data);
    }
  };

  const fetchDataChapter = async () => {
    const response = await getAllChapterByBook(stateAccount.token, bookId);
    if (response.status === "OK") {
      setListChapter(response.data);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataBook();
    fetchDataChapter();
  }, []);

  const handleUpdate = async () => {
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
      author: author,
      painter: painter,
      publishing_year: publishingYear,
      status: status,
      type_of_book: typeOfBook,
      summary: summary,
      categoryIds: categoryIds.map((item) => parseInt(item.id)),
      price: price,
      image: image,
    };
    const response = await updateBook(stateAccount.token, book, bookId);
    if (response.status === "OK") {
      navigate(-1);
      alert("Cập nhật thành công");
    } else {
      alert("Cập nhật thất bại");
    }
  };

  const handleDelete = async () => {
    const response = await deleteBook(stateAccount.token, bookId);
    if (response.status === "OK") {
      navigate(-2);
      alert("Xóa thành công");
    } else {
      alert("Xóa thất bại");
    }
  };

  useEffect(() => {
    setTitle(dataBook.title);
    setAuthor(dataBook.author);
    setPainter(dataBook.painter);
    setPublishingYear(dataBook.publishing_year);
    setStatus(dataBook.status);
    setTypeOfBook(dataBook.type_of_book);
    setSummary(dataBook.summary);
    setCategoryIds(dataBook.categories);
    setPrice(dataBook.price);
    setImage(dataBook.image);
  }, [dataBook]);

  const newChapter = () => {
    setAddNewChapter(!addNewChapter);
  };

  return (
    <div>
      <Box className="body">
        <Col1>
          <ChangeThumbnail image={image} setImage={setImage}></ChangeThumbnail>
        </Col1>

        <Col2>
          <div
            id="headerCilent"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "25px",
              gap: "20px",
            }}
          >
            <Button className="button" onClick={handleUpdate}>
              Lưu thay đổi
            </Button>
            <Button className="btnRed" onClick={handleDelete}>
              Xóa
            </Button>
            <Button className="btn" onClick={() => navigate(-1)}>
              Hủy bỏ
            </Button>
          </div>
          <div>
            <BoxFlex>
              <p>Tên sách: <span style={{ color: '#D93E30', fontWeight: 'bold' }}>*</span></p>
              <Collection
                type="text"
                className="collection"
                placeholder="Nhập tên sách"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Collection>
            </BoxFlex>

            <BoxFlex>
              <p>Tác giả: <span style={{ color: '#D93E30', fontWeight: 'bold' }}>*</span></p>
              <Collection
                type="text"
                className="collection"
                placeholder="Nhập tên tác giả"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Collection>
            </BoxFlex>

            <BoxFlex>
              <p>Họa sĩ:</p>
              <Collection
                type="text"
                className="collection"
                placeholder="Nhập tên họa sĩ"
                value={painter}
                onChange={(e) => setPainter(e.target.value)}
              ></Collection>
            </BoxFlex>

            <BoxFlex>
              <p>Năm xuất bản:</p>
              <Collection
                type="text"
                className="collection"
                placeholder="Nhập năm xuất bản"
                value={publishingYear}
                onChange={(e) => setPublishingYear(e.target.value)}
              ></Collection>
            </BoxFlex>

            <BoxFlex>
              <p>Tình trạng: <span style={{ color: '#D93E30', fontWeight: 'bold' }}>*</span></p>
              <Selection
                className="collection"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option value="" selected disabled hidden>
                  Chọn tình trạng sách
                </option>
                <option value="Process">Đang tiến hành</option>
                <option value="Pause">Tạm ngưng</option>
                <option value="Complete">Đã hoàn thành</option>
              </Selection>
            </BoxFlex>

            <BoxFlex>
              <p>Loại sách: <span style={{ color: '#D93E30', fontWeight: 'bold' }}>*</span></p>
              <Selection
                className="collection"
                value={typeOfBook}
                onChange={(e) => setTypeOfBook(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Chọn loại sách
                </option>
                <option value="Free">Miễn phí</option>
                <option value="Follow">Theo dõi</option>
                <option value="Fee">Trả phí</option>
                <option value="Private">Riêng tư</option>
              </Selection>
            </BoxFlex>

            {typeOfBook === "Fee" && (
              <BoxFlex>
                <p>Giá tiền: <span style={{ color: '#D93E30', fontWeight: 'bold' }}>*</span></p>
                <Collection
                  type="text"
                  className="collection"
                  placeholder="Nhập giá tiền"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Collection>
              </BoxFlex>
            )}

            <CategoryComponent
              categoryIds={categoryIds}
              setCategoryIds={setCategoryIds}
            ></CategoryComponent>

            <div>
              <p>Mô tả: <span style={{ color: '#D93E30', fontWeight: 'bold' }}>*</span></p>
              <InputDescription
                className="collection"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              ></InputDescription>
            </div>
          </div>

          <div>
            <BoxContent>
              <h3 style={{ margin: "0" }}>Mục lục</h3>
              <div onClick={newChapter}>
                <p className="link">
                  Thêm mới <i class="fa-solid fa-add"></i>
                </p>
              </div>
            </BoxContent>

            <TabletOfContents data={listChapter} type="edit"></TabletOfContents>
          </div>
        </Col2>
      </Box>

      {addNewChapter ? (
        <div>
          <Cover onClick={newChapter}></Cover>
          <BoxAddChapter>
            <Header>
              <P>Thêm mới chương</P>
              <ClosedButton onClick={newChapter}>
                <i class="fa-solid fa-xmark"></i>
              </ClosedButton>
            </Header>
            <Content>
              <BoxFlex>
                <p>Tên chương:</p>
                <Collection
                  type="text"
                  className="collection"
                  placeholder="Nhập tên chương"
                  onChange={(e) => setNameChapter(e.target.value)}
                ></Collection>

                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </BoxFlex>
              <Button className="button" onClick={handleUploadClick}>
                Upload file {file ? `(${file.name})` : ''}
              </Button>

              <Button className="button" onClick={handleAddChapter}>
                Tải lên nội dung
              </Button>
            </Content>
          </BoxAddChapter>
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
};

export default EditBook;

const BoxAddChapter = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  justify-content: center;
  gap: 10px;
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

const P = styled.p`
  font-size: 15px;
  margin-left: 30px;
`;

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

const BoxContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: 15px;
  gap: 12px;
  justify-content: space-between;
  margin: 20px 0;
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

const Button = styled.button`
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
