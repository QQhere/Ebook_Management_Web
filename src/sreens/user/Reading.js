import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Colors from "../../constants/Color";
import "../../components/styles/reading.css";
import { useNavigate, useParams } from "react-router";
import {
  getAllChapterByBook,
  getChapterById,
} from "../../services/api/Chapter";
import { useSelector } from "react-redux";
import { getFileContent } from "../../services/api/Upload";
import { updateNumberRead } from "../../services/api/Book";
import {
  createHistoryReading,
  getAllHistoryReadingByUser,
  updateHistoryReading,
} from "../../services/api/HistoryReading";
import { Link } from "react-router-dom";

const Reading = () => {
  const [BgColor, setBgColor] = useState(Colors.black);
  const [TextColor, setTextColor] = useState(Colors.white);
  const [BorderColor, setBorderColor] = useState(Colors.nude);
  const [FontSize, setFontSize] = useState("19");
  const [FontFamily, setFontFamily] = useState();
  const [showTabletOfContents, setShowTabletOfContents] = useState(false);
  const [showSellect, setShowSellect] = useState(false);
  const [iconColorC, setIconColorC] = useState(false);
  const [iconColorD, setIconColorD] = useState(false);
  const [bookData, setBookData] = useState("");
  const { bookId, chapterId } = useParams();
  const stateAccount = useSelector((state) => state.auth);

  const [dataChapter, setDataChapter] = useState({});
  const [allChapter, setAllChapter] = useState([]);
  const [contentChapter, setContentChapter] = useState("");
  const navigate = useNavigate();

  const DivBody = styled.div`
    background-color: ${BgColor};
  `;
  const PBody = styled.pre`
    color: ${TextColor};
    font-size: ${FontSize}px;
    font-family: ${FontFamily};
    white-space: break-spaces;
    text-align: justify;
  `;

  const fetchDataChapter = async () => {
    const response = await getChapterById(stateAccount.token, chapterId);
    if (response.status === "OK") {
      setDataChapter(response.data);
      const content = await getFileContent(response.data.thumbnail);
      setContentChapter(content);
    }
  };

  const handleUpdateNumberRead = async () => {
    const response = await updateNumberRead(stateAccount.token, bookId);
    if (response.status === "OK") {
      setBookData(response.data);
      console.log("Update number read successfully");
    } else {
      console.log("Update number read failed");
    }
  };

  const fetchAllChapter = async () => {
    const response = await getAllChapterByBook(stateAccount.token, bookId);
    if (response.status === "OK") {
      setAllChapter(response.data);
      console.log("Get all chapter successfully");
    } else {
      console.log("Get all chapter failed");
    }
  };

  const handleCreateHistoryReading = async () => {
    const response = await createHistoryReading(stateAccount.token, {
      chapter_id: chapterId,
      book_id: bookId,
      user_id: stateAccount.userId,
    });
    if (response.status === "CREATED") {
      console.log("Create history reading successfully");
    } else {
      console.log("Create history reading failed");
    }
  };

  const handleUpdateHistoryReading = async (historyId) => {
    const response = await updateHistoryReading(stateAccount.token, historyId, chapterId);
    if (response.status === "OK") {
      console.log("Update history reading successfully");
    } else {
      console.log("Update history reading failed");
    }
  }

  const fetchHistory = async () => {
    const response = await getAllHistoryReadingByUser(
      stateAccount.token,
      stateAccount.userId
    );
    if (response.status === "OK") {
      const history = response.data.filter((history) => history.book.id == bookId && history.user.id == stateAccount.userId)[0];
      if (history?.id !== undefined) {
        handleUpdateHistoryReading(history.id);
      } else {
        handleCreateHistoryReading();
      }

    } else {
      console.log("Get all history reading failed");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataChapter();
    fetchAllChapter();
    handleUpdateNumberRead();
    fetchHistory();
  }, []);

  const changeColors = (newBgColor, newTextColor, newBorderColor) => {
    setBgColor(newBgColor);
    setTextColor(newTextColor);
    setBorderColor(newBorderColor);
  };

  const decreaseFontSize = () => {
    if (FontSize > 15) {
      setFontSize(parseInt(FontSize) - 2);
    }
  };

  const increaseFontSize = () => {
    if (FontSize < 33) {
      setFontSize(parseInt(FontSize) + 2);
    }
  };

  const handleClickC = () => {
    setShowTabletOfContents(!showTabletOfContents);
    setShowSellect(false);
    setIconColorC(!iconColorC);
    if (iconColorD) setIconColorD(false);
  };

  const handleClickD = () => {
    setShowSellect(!showSellect);
    setShowTabletOfContents(false);
    setIconColorD(!iconColorD);
    if (iconColorC) setIconColorC(false);
  };

  const ColorBody = () => {
    return (
      <div className="list2">
        <div
          class="toggle toggleBlack"
          style={{ borderColor: BorderColor }}
          onClick={() =>
            changeColors(Colors.black, Colors.white, Colors.green_more)
          }
        ></div>
        <div
          class="toggle toggleGrey"
          style={{ borderColor: BorderColor }}
          onClick={() =>
            changeColors(Colors.bg_dark, Colors.white, Colors.green_more)
          }
        ></div>
        <div
          class="toggle toggleWhite"
          style={{ borderColor: BorderColor }}
          onClick={() =>
            changeColors(Colors.white, Colors.black, Colors.green_more)
          }
        ></div>
      </div>
    );
  };

  const changeFont = (font) => {
    setFontFamily(font);
  };

  const prevChapter = () => {
    const targetIndex = allChapter.findIndex((chapter) => chapter.id === chapterId);
    if (targetIndex > 0) {
      const prevId = allChapter[targetIndex - 1]?.id;
      navigate(`/${bookId}/${prevId}`);
    } else {
      alert("Đây là chương đầu tiên của sách");
    }
  }

  const nextChapter = () => {
    const targetIndex = allChapter.findIndex((chapter) => chapter.id === chapterId);
    console.log(targetIndex);
    if (targetIndex < allChapter.length - 1) {
      const nextId = allChapter[targetIndex + 1]?.id;
      console.log(nextId);
      navigate(`/${bookId}/${nextId}`);
    } else {
      alert("Đây là chương mới nhất của sách");
    }
  }

  return (
    <div>
      <div className="fixed header">
        <Link to={`/${bookId}/overview`}><p className="title">{bookData.title}</p></Link>
        <Box>
          <div className={iconColorC ? "iconColor" : ""} onClick={handleClickC}>
            <i class="fa-regular fa-rectangle-list"></i>
          </div>
          <div className={iconColorD ? "iconColor" : ""} onClick={handleClickD}>
            <i class="fa-solid fa-palette"></i>
          </div>
        </Box>
      </div>
      <DivBody className="bodyReading">
        <h3 style={{ textAlign: "center", color: TextColor, margin: "50px" }}>
          {dataChapter.name}
        </h3>
        <div className="contents">
          <PBody className="content">{contentChapter}</PBody>
        </div>
      </DivBody>
      <div className="fixed footer">
        <Link className="title" onClick={prevChapter}><p><i class="fa-solid fa-angles-left"></i> Chương trước</p></Link>
        <Link className="title" onClick={nextChapter}><p>Chương sau <i class="fa-solid fa-angles-right"></i></p></Link>
      </div>

      <div
        id="tableOfContent"
        className="fixed sidebar"
        style={{ display: showTabletOfContents ? "block" : "none" }}
      >
        <p className="title">Mục lục</p>
        <ul className="menu">
          {allChapter.map((chapter) => (
            <li key={chapter.id}
              className={chapter.id == chapterId ? 'liChoice' : ''}
            >
              <a href={`/${bookId}/${chapter.id}/reading`}>{chapter.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <div
        id="select"
        class="fixed sidebar"
        style={{ display: showSellect ? "block" : "none" }}
      >
        <div>
          <p className="title">Nền</p>
          <ColorBody></ColorBody>
        </div>
        <div>
          <p className="title">Cỡ và kiểu chữ</p>
          <div class="list2">
            <div className="sizeOption" onClick={increaseFontSize}>
              A+
            </div>
            <div className="sizeOption" onClick={decreaseFontSize}>
              A-
            </div>
          </div>
        </div>
        <div>
          <ul id="fontOptions" className="menu">
            <li
              style={{ fontFamily: "Segoe UI" }}
              onClick={() => changeFont("Segoe UI")}
            >
              Segoe UI
            </li>
            <li
              style={{ fontFamily: "Arial" }}
              onClick={() => changeFont("Arial")}
            >
              Arial
            </li>
            <li
              style={{ fontFamily: "Times New Roman" }}
              onClick={() => changeFont("Times New Roman")}
            >
              Times New Roman
            </li>
            <li
              style={{ fontFamily: "Courier New" }}
              onClick={() => changeFont("Courier New")}
            >
              Belgrano
            </li>
            <li
              style={{ fontFamily: "Verdana" }}
              onClick={() => changeFont("Verdana")}
            >
              Verdana
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reading;

const Box = styled.div`
  display: flex;
  gap: 30px;
  font-size: 20px;
  justify-content: flex-start;
`;
