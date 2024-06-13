import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import Colors from "../../constants/Color";
import { useNavigate } from "react-router";
import { getAllCategory } from "../../services/api/Category";
import { createBook } from "../../services/api/Book";

const CategoryComponent = (props) => {
    const [allCategory, setAllCategory] = useState([]);
    const [categoryIds, setcategoryIds] = useState([]);

    const Categories = ({ categoryIds }) => {
        return (
            <List>
                {categoryIds.map((item, index) => {
                    return (
                        <Category>{item}</Category>
                    );
                })}
            </List>
        );
    }
    const handleSelectionChange = (event) => {
        const selectedValue = event.target.value;
        if (categoryIds.includes(selectedValue)) {
            return;
        }

        const selectedText = event.target.options[event.target.selectedIndex].text;
        setcategoryIds([...categoryIds, selectedText]);
        props.setcategoryIds([...props.categoryIds, selectedValue]);
    };

    const getCategory = async () => {
        const response = await getAllCategory();
        setAllCategory(response.data);
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <>
            <BoxFlex>
                <p>Thể loại:</p>
                <Categories categoryIds={categoryIds}></Categories>
            </BoxFlex>
            <BoxFlex>
                <Selection className="collection" onChange={handleSelectionChange}>
                    <option value="" selected disabled hidden>
                        Chọn thể loại sách
                    </option>
                    {allCategory.map((item) => {
                        return <option value={item.id}>{item.name}</option>;
                    })}
                </Selection>
            </BoxFlex>
        </>
    );
};

const ChageThumbnail = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]));
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
    const [categoryIds, setcategoryIds] = useState([]);

    const addBook = async (book) => {
        const response = await createBook('eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjAzODU0Mjc2NTYiLCJzdWIiOiIwMzg1NDI3NjU2IiwiZXhwIjoxNzIwODgxMDAxfQ.nxe1jUKhB5VcEdrWm8WDk1qQaBFruhbkRMz82DiwJi0'
            , book, 1);

        return response;
    }

    const handleAddBook = () => {
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
        console.log(book);
        addBook(book);
        // done
    };

    return (
        <Box className="body">
            <Col1>
                <ChageThumbnail></ChageThumbnail>
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
                    <Button className="btn">Hủy bỏ</Button>
                </div>

                <div>
                    <BoxFlex>
                        <p>Tên sách:</p>
                        <Collection
                            type="text"
                            className="collection"
                            placeholder="Nhập tên sách"
                            onChange={(event) => setTitle(event.target.value)}
                        ></Collection>
                    </BoxFlex>

                    <BoxFlex>
                        <p>Tác giả:</p>
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
                            type="text"
                            className="collection"
                            placeholder="Nhập năm xuất bản"
                            onChange={(event) => setPublishingYear(event.target.value)}
                        ></Collection>
                    </BoxFlex>

                    <BoxFlex>
                        <p>Loại sách:</p>
                        <Selection
                            className="collection"
                            onChange={(event) => setTypeOfBook(event.target.value)}
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
                            <p>Giá:</p>
                            <Collection
                                type="number"
                                className="collection"
                                placeholder="Nhập giá"
                                onChange={(event) => setPrice(event.target.value)}
                            ></Collection>
                        </BoxFlex>
                    )}

                    <CategoryComponent categoryIds={categoryIds} setcategoryIds={setcategoryIds}></CategoryComponent>

                    <div>
                        <p>Mô tả:</p>
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
