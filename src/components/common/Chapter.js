import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../../constants/Color";
import { Link, useNavigate } from "react-router-dom";
import { deleteChapter, updateChapter } from "../../services/api/Chapter";
import { useSelector } from "react-redux";
import { uploadFile } from "../../services/api/Upload";

const Chapter = (props) => {
  const dataChapter = props.data;
  const bookId = props.bookId;
  const stateAccount = useSelector((state) => state.auth);

  const [editChapter, setEditChapter] = useState(false);
  const [nameChapter, setNameChapter] = useState(dataChapter.name);
  const [file, setFile] = useState(null);
  const [ordinalNumber, setOrdinalNumber] = useState(1);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await deleteChapter(stateAccount.token, dataChapter.id);
    if (response.status === "OK") {
      alert("Xóa chương thành công");
      window.location.reload();
    } else {
      alert("Xóa chương thất bại");
    }
  };

  const handleUpdate = async () => {
    const urlFile = await uploadFile(file);
    const newChapter = {
      name: nameChapter,
      original_number: ordinalNumber,
      thumbnail: urlFile ? urlFile : dataChapter.thumbnail,
      book_id: bookId,
    };
    const response = await updateChapter(
      stateAccount.token,
      dataChapter.id,
      newChapter
    );
    if (response.status === "OK") {
      alert("Cập nhật chương thành công");
      window.location.reload();
    } else {
      alert("Cập nhật chương thất bại");
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  function confirmDelete() {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (isConfirmed) {
      handleDelete();
    }
  }

  const handleClick = () => {
    setEditChapter(!editChapter);
  };

  const handleRead = () => {
    if (props.status === true) {
      alert("Bạn cần theo dõi người đăng để đọc chương này");
      return;
    }
    console.log(1)
    navigate(`/${bookId}/${dataChapter.id}/reading`);
  }

  const renderContent = () => {
    switch (props.type) {
      case "edit":
        return (
          <BoxIcon>
            <div onClick={handleClick}>
              <i class="fa-regular fa-pen-to-square iconColor"></i>
            </div>
            <div onClick={confirmDelete}>
              <i class="fa-solid fa-trash-can iconRed"></i>
            </div>
            {editChapter ? (
              <div>
                <Cover onClick={handleClick}></Cover>
                <BoxAddChapter>
                  <Header>
                    <Pheader>Cập nhật chương</Pheader>
                    <ClosedButton onClick={handleClick}>
                      <i class="fa-solid fa-xmark"></i>
                    </ClosedButton>
                  </Header>
                  <Content>
                    <BoxFlex>
                      <p>Tên chương:</p>
                      <Collection
                        type="text"
                        className="collection"
                        value={nameChapter ? nameChapter : "Nhập tên chương"}
                        onChange={(e) => setNameChapter(e.target.value)}
                      ></Collection>

                      <input
                        type="file"
                        accept=".doc,.docx"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </BoxFlex>
                    <Button className="button" onClick={handleUploadClick}>
                      Upload file {file ? `(${file.name})` : ""}
                    </Button>

                    <Button className="button" onClick={handleUpdate}>
                      Cập nhật nội dung
                    </Button>
                  </Content>
                </BoxAddChapter>
              </div>
            ) : (
              <div> </div>
            )}
          </BoxIcon>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <StyledChapter>
        <P onClick={handleRead}>{dataChapter.name}</P>
      <List>{renderContent(props.type)}</List>
    </StyledChapter>
  );
};

export default Chapter;

const Button = styled.button`
  height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  border: none;
  font-size: 15px;
`;

const Collection = styled.input`
  flex: 1;
  height: 35px;
  padding: 0 10px;
  border-radius: 5px;
`;

const BoxFlex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: 15px;
  gap: 12px;
`;

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

const Pheader = styled.p`
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

const StyledChapter = styled.div`
  display: flex;
  width: 100%;
  background-color: ${Colors.white};
  padding: 10px 20px;
  border-radius: 10px;
  justify-content: space-between;
  gap: 20px;
`;

const P = styled.p`
  color: ${Colors.black};
  cursor: pointer;
`;

const List = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

const BoxIcon = styled.div`
  display: flex;
  gap: 10px;
`;
