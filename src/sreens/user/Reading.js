import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Colors from "../../constants/Color";
import "../../components/styles/reading.css";
import { useParams } from "react-router";
import { getChapterById } from "../../services/api/Chapter";
import { useSelector } from "react-redux";
import { getFileContent } from "../../services/api/Upload";
import { updateNumberRead } from "../../services/api/Book";

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
  const { bookId, chapterId } = useParams();
  const stateAccount = useSelector((state) => state.auth);

  const [dataChapter, setDataChapter] = useState({});
  const [contentChapter, setContentChapter] = useState("");

  const DivBody = styled.div`
    background-color: ${BgColor};
  `;
  const PBody = styled.p`
    color: ${TextColor};
    font-size: ${FontSize}px;
    font-family: ${FontFamily};
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
      console.log("Update number read successfully");
    } else {
      console.log("Update number read failed");
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataChapter();
    handleUpdateNumberRead();
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

  return (
    <div>
      <div className="fixed header">
        {/* <p className='title'>{data.title}</p> */}
        <div className="list1">
          <div className={iconColorC ? "iconColor" : ""} onClick={handleClickC}>
            <i class="fa-regular fa-rectangle-list"></i>
          </div>
          <div className={iconColorD ? "iconColor" : ""} onClick={handleClickD}>
            <i class="fa-solid fa-palette"></i>
          </div>
        </div>
      </div>
      <DivBody className="bodyReading">
        <h3 style={{ textAlign: "center", color: TextColor }}>
          {dataChapter.name}
        </h3>
        <div className="contents">
          <PBody className="content">{contentChapter}</PBody>
        </div>
      </DivBody>
      <div className="fixed footer">
        <p className="title">Chương 1: Cuộc gọi lúc nửa đêm</p>
      </div>

      <div
        id="tableOfContent"
        className="fixed sidebar"
        style={{ display: showTabletOfContents ? "block" : "none" }}
      >
        <p className="title">Mục lục</p>
        <select className="select collection">
          <option value="" selected disabled hidden>
            Chọn trang
          </option>
          <option value="1">Trang 1</option>
          <option value="2">Trang 2</option>
          <option value="3">Trang 3</option>
        </select>
        <ul className="menu">
          <li>
            <a href="/chuong1">Chương 1: Cuộc gọi lúc nửa đêm</a>
          </li>
          <li>
            <a href="/chuong1">Chương 1: Cuộc gọi lúc nửa đêm</a>
          </li>
          <li>
            <a href="/chuong1">Chương 1: Cuộc gọi lúc nửa đêm</a>
          </li>
          <li className="liChoice">
            <a href="/chuong1">Chương 1: Cuộc gọi lúc nửa đêm</a>
          </li>
          <li>
            <a href="/chuong1">Chương 1: Cuộc gọi lúc nửa đêm</a>
          </li>
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
