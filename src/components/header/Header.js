import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/StyledHeader.css";
import { styled } from "styled-components";
import Avatar from "../common/Avatar";
import { routes } from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions";
import { getUserDetails } from "../../services/api/User";

const Header = () => {
  const [showSubNav, setShowSubNav] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateAccount = useSelector((state) => state.auth);

  const handleClick = () => {
    setShowSubNav(!showSubNav);
  };

  const handleLogOut = () => {
    setIsSignIn(false);
    dispatch(logout());
    localStorage.removeItem("persistantState");
    navigate(routes[0].path);
  };

  const fetchDataUser = async () => {
    const response = await getUserDetails(stateAccount.token);
    if (response.status === "OK") {
      setDataUser(response.data);
    }
  }

  useEffect(() => {
    if (stateAccount.token) {
      setIsSignIn(true);
    } else {
      setIsSignIn(false);
    }
    fetchDataUser();
  }, [stateAccount]);

  function showHeader() {
    if (isSignIn) {
      return (
        <div id="headerUser">
          <a className="btn icon" href="/search">
            <i class="fa-solid fa-magnifying-glass link"></i>
          </a>
          <div onClick={handleClick} style={{ cursor: "pointer" }}>
            <Box>
              {" "}
              <Avatar id="avatar" avatar={dataUser.link_avatar} ></Avatar>{" "}
            </Box>
            <h4 style={{ color: "#FAFCFC" }}>{dataUser.fullname}</h4>
            <i class="fa-solid fa-sort-down" style={{ color: "#ffffff" }}></i>
          </div>
          <div style={{ display: showSubNav ? "block" : "none" }}>
            <ul id="subnav">
              <li>
                <Link to="/account_management" onClick={handleClick}>
                  <div>
                    <i class="fa-solid fa-user"></i>
                  </div>
                  Quản lý tài khoản
                </Link>
              </li>
              <li>
                <Link to="/library" onClick={handleClick}>
                  <div>
                    <i class="fa-solid fa-bookmark"></i>
                  </div>
                  Thư viện cá nhân
                </Link>
              </li>
              {/* <li>
                <Link to="/transaction_history" onClick={handleClick}>
                  <div>
                    <i class="fa-solid fa-cart-shopping"></i>
                  </div>
                  Lịch sử giao dịch
                </Link>
              </li> */}
              <li>
                <a onClick={handleLogOut}>
                  <div>
                    <i class="fa-solid fa-right-from-bracket"></i>
                  </div>
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div id="headerClient">
          <Link className="btn icon" to="/search">
            <i class="fa-solid fa-magnifying-glass iconColor"></i>
          </Link>

          <Link to="/signin_signup">
            <button className="button btnLink">Đăng nhập</button>
          </Link>
        </div>
      );
    }
  }

  return (
    <div id="header">
      <div id="headerCommon">
        <a href="/">
          <img src="/assets/Elogo.svg" alt="logo"></img>
        </a>

        <ul id="nav">
          <li>
            <a href="/free">Sách miễn phí</a>
          </li>
          <li>
            <a href="/follow">Sách theo dõi</a>
          </li>
          {/* <li>
            <a href="/#paidBooks">Sách trả phí</a>
          </li> */}
        </ul>
      </div>
      {showHeader()}
    </div>
  );
};

export default Header;

const Box = styled.div`
  height: 35px;
  width: 35px;
`;