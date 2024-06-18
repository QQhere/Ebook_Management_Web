import React from "react";
import styled from "styled-components";
import Colors from "../../constants/Color";
import { Link } from "react-router-dom";
import { deleteChapter } from "../../services/api/Chapter";
import { useSelector } from "react-redux";

const Chapter = (props) => {
    const dataChapter = props.data;
    const bookId = props.bookId;
    const stateAccount = useSelector((state) => state.auth);

    const handleDelete = async () => {
      const response = await deleteChapter(stateAccount.token, dataChapter.id);
      if (response.status === "OK") {
        alert("Xóa chương thành công");
        window.location.reload();
      } else {
        alert("Xóa chương thất bại");
      }
    }

    
  function confirmDelete() {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (isConfirmed) {
      handleDelete();
    }
  }

  const renderContent = () => {
    switch (props.type) {
      // case "overview":
      //   return (
      //     <BoxIcon>
      //       <i class="fa-solid fa-comment iconColor"></i>
      //     </BoxIcon>
      //   );
      case "edit":
        return (
          <BoxIcon>
            {/* <div>
              <i class="fa-regular fa-pen-to-square iconColor"></i>
            </div> */}
            <div onClick={confirmDelete}>
              <i class="fa-solid fa-trash-can iconRed"></i>
            </div>
          </BoxIcon>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <StyledChapter>
      <Link to={`/${bookId}/${dataChapter.id}/reading`}>
        <P>{dataChapter.name}</P>
      </Link>

      <List>{renderContent(props.type)}</List>
    </StyledChapter>
  );
};

export default Chapter;

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
