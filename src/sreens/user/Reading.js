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
import { ListFont } from "../../constants/ListFont";
import { Themes } from "../../constants/Themes";

const Reading = () => {
  const [BgColor, setBgColor] = useState(Colors.black);
  const [TextColor, setTextColor] = useState(Colors.white);
  const [FontSize, setFontSize] = useState("19");
  const [FontFamily, setFontFamily] = useState(ListFont[0]);
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
  const index = allChapter.findIndex(chapter => chapter.id == chapterId);
  const nextId = allChapter[index + 1]?.id;
  const prevId = allChapter[index - 1]?.id;

  const [isShowPrev, setIsShowPrev] = useState(false);
  const [isShowNext, setIsShowNext] = useState(false);


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

  const changeColors = (newBgColor, newTextColor) => {
    setBgColor(newBgColor);
    setTextColor(newTextColor);
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
        {Themes.map((theme) => (
          <div
            className={theme.bg == BgColor ? "toggle toggleChoice" : "toggle"}
            style={{ backgroundColor: theme.bg }}
            onClick={() => changeColors(theme.bg, theme.text)}
          >
          </div>
        ))}
      </div>
    );
  };

  const FontFamilyBody = () => {
    return (
      <ul className="menu">
        {ListFont.map((font) => (
          <li
            className={font == FontFamily ? 'liChoice' : ''}
            onClick={() => changeFont(font)}
          >
            {font}
          </li>
        ))}
      </ul>
    )
  }

  const changeFont = (font) => {
    setFontFamily(font);
  };

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
        {prevId === undefined ? <><p></p></> : <a href={`/${bookId}/${prevId}/reading`} className="title" ><p><i class="fa-solid fa-angles-left"></i> Chương trước</p></a>}
        {nextId === undefined ? <><p></p></> : <a href={`/${bookId}/${nextId}/reading`} className="title" ><p>Chương sau <i class="fa-solid fa-angles-right"></i></p></a>}
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
          <FontFamilyBody></FontFamilyBody>
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
