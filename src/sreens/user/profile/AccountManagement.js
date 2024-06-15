import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Colors from "../../../constants/Color";
import Avatar from "../../../components/common/Avatar";
import { getUserDetails, updateUserDetails } from "../../../services/api/User";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListAccounts from "../../../components/search/ListAccounts";

const ChageAvatar = () => {
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
        "myavt"
      ).style.backgroundImage = `url(${selectedFile})`;
    }
  }, [selectedFile]);

  return (
    <>
      <Avatar id="myDiv"></Avatar>
      <input
        type="file"
        id="myFile"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <ButtonEditAvatar className="button" onClick={handleClick}>
        Thay ảnh <i class="fa-regular fa-pen-to-square"></i>
      </ButtonEditAvatar>
    </>
  );
};

const AccountManagement = () => {
  const [reload, setReload] = useState(false);
  const [activeElement, setActiveElement] = useState("p1");
  const [isVisible, setIsVisible] = useState(false);
  const [isUnHidden, setIsUnHidden] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [date, setDate] = useState("2000-01-01");
  const [fullname, setFullname] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isShowFollower, setIsShowFollower] = useState(false);
  const stateAccount = useSelector((state) => state.auth);

  const follower = () => {
    setIsShowFollower(!isShowFollower);
  }

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  const changePassword = async () => {
    if (oldPassword === "" || password === "" || retypePassword === "") {
      alert("Không được để trống");
      return;
    } else if (oldPassword !== "123456") {
      alert("Mật khẩu cũ không đúng");
      return;
    } else if (password !== retypePassword) {
      alert("Mật khẩu mới không trùng khớp");
      return;
    }

    const response = await updateUserDetails(
      stateAccount.token,
      {
        password: password,
        retype_password: retypePassword,
      },
      1
    );

    if (response.status === "OK") {
      alert("Đổi mật khẩu thành công");
      setIsVisible(false);
    }
  };

  const changeInformation = async () => {
    const response = await updateUserDetails(
      stateAccount.token,
      {
        fullname: fullname,
        date_of_birth: date,
      },
      1
    );

    if (response.status === "OK") {
      alert("Cập nhật thông tin thành công");
      setReload(!reload);
      setIsUnHidden(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserDetails(stateAccount.token);
      if (response.status === "OK") {
        setDataUser(response.data);
        setFullname(response.data?.fullname);
        setDate(new Date(response.data.date_of_birth).toISOString().split('T')[0]);
      }
    };

    fetchData();
  }, [reload]);

  function renderChangePassword() {
    return (
      <div>
        {isVisible ? (
          <>
            <div>
              <BoxOrther>
                <p>Mật khẩu hiện tại:</p>
                <InputPassword
                  type="text"
                  placeholder="Nhập mật khẩu hiện tại"
                  className="bgTransparent boxInfor"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </BoxOrther>
              <BoxOrther>
                <p>Mật khẩu mới:</p>
                <InputPassword
                  type="text"
                  placeholder="Nhập mật khẩu mới"
                  className="bgTransparent boxInfor"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </BoxOrther>
              <BoxOrther>
                <p>Xác nhận mật khẩu:</p>
                <InputPassword
                  type="text"
                  placeholder="Xác nhận mật khẩu"
                  className="bgTransparent boxInfor"
                  onChange={(e) => setRetypePassword(e.target.value)}
                />
              </BoxOrther>
            </div>
            <Button
              className="button"
              style={{ border: "none", fontSize: "15px" }}
              onClick={changePassword}
            >
              Đổi mật khẩu
            </Button>
            <Button
              className="btn bgTransparent"
              style={{ border: "1px solid #4e4e4e", fontSize: "15px" }}
              onClick={() => setIsVisible(false)}
            >
              Hủy
            </Button>
          </>
        ) : (
          <Button
            id="changePassword"
            className="button"
            style={{ border: "none", fontSize: "15px" }}
            onClick={() => setIsVisible(true)}
          >
            Đổi mật khẩu
          </Button>
        )}
      </div>
    );
  }

  function renderChangeInfor() {
    return (
      <div>
        {isUnHidden ? (
          <>
            <BoxOrther>
              <BoxFlex>
                <p>Họ và tên:</p>
                <Collection
                  type="text"
                  className="collection"
                  value={fullname ? fullname : "Chưa có"}
                  onChange={(e) => setFullname(e.target.value)}
                ></Collection>
              </BoxFlex>
              <BoxFlex>
                <p className="textSmokyGrey">Ngày sinh:</p>
                <Collection type="date" value={date} onChange={handleChange} />
              </BoxFlex>
            </BoxOrther>
            <Button
              className="button"
              style={{ border: "none", fontSize: "15px" }}
              onClick={changeInformation}
            >
              Cập nhật
            </Button>
            <Button
              className="btnTransparent"
              onClick={() => setIsUnHidden(false)}
            >
              Hủy bỏ
            </Button>
          </>
        ) : (
          <Button
            id="changeInfor"
            className="button"
            style={{ border: "none", fontSize: "15px" }}
            onClick={() => setIsUnHidden(true)}
          >
            Cập nhật
          </Button>
        )}
      </div>
    );
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function renderContent() {
    return (
      <div>
        <BoxOption>
          <p
            id="p1"
            className={
              activeElement === "p1"
                ? "optionProfile cursor iconColor"
                : "optionProfile cursor"
            }
            onClick={() => setActiveElement("p1")}
          >
            Thông tin cá nhân
          </p>

          <p
            id="p2"
            className={
              activeElement === "p2"
                ? "optionProfile cursor iconColor"
                : "optionProfile cursor"
            }
            onClick={() => setActiveElement("p2")}
          >
            Tài khoản và bảo mật
          </p>
        </BoxOption>
        {activeElement === "p1" && (
          <div id="infor">
            <BoxOrther>
              <BoxInfor className="bgGrey profile" style={{ width: "80%" }}>
                <p className="textDarkGrey">ID tài khoản:</p>
                <p>{dataUser.id}</p>
              </BoxInfor>

              <BoxFlex className="flex">
                <BoxInfor className="bgGrey boxInfor">
                  <div className="profile">
                    <p className="textSmokyGrey">Họ và tên:</p>
                    <p>{dataUser.fullname ? dataUser.fullname : "Chưa có"}</p>
                  </div>
                </BoxInfor>
                <BoxInfor className="bgGrey boxInfor">
                  <div className="profile">
                    <p className="textSmokyGrey">Ngày sinh:</p>
                    <p>
                      {dataUser.date_of_birth
                        ? formatDate(dataUser.date_of_birth)
                        : "Chưa có"}
                    </p>
                  </div>
                </BoxInfor>
              </BoxFlex>
              {renderChangeInfor()}
            </BoxOrther>
          </div>
        )}

        {activeElement === "p2" && (
          <div id="account">
            <BoxOrther>
              <BoxInfor className="bgGrey profile" style={{ width: "80%" }}>
                <p className="textDarkGrey">Số điện thoại:</p>
                <p>{dataUser.phone_number}</p>
              </BoxInfor>
            </BoxOrther>
            {renderChangePassword()}
          </div>
        )}
      </div>
    );
  }
  return (
    <div>
      <Box className="body">
        <Col1>
          <BoxAvatar>
            <p style={{ fontSize: "26px" }}>{dataUser.fullname ? dataUser.fullName : ""}</p>
            <Avatar></Avatar>
            <ButtonEditAvatar className="button">
              Thay ảnh <i class="fa-regular fa-pen-to-square"></i>
            </ButtonEditAvatar>
          </BoxAvatar>
          <BoxNav>
            <li>
              <a href="/account_management" className="iconColor">
                <Orther>
                  <i class="fa-solid fa-user"></i>
                </Orther>
                Quản lý tài khoản
              </a>
            </li>
            <li>
              <a href="/library" className="colorWhite">
                <Orther>
                  <i class="fa-solid fa-bookmark"></i>
                </Orther>
                Thư viện cá nhân
              </a>
            </li>
            <li>
              <a href="transaction_history" className="colorWhite">
                <Orther>
                  <i class="fa-solid fa-cart-shopping"></i>
                </Orther>
                Lịch sử giao dịch
              </a>
            </li>
          </BoxNav>
          <Link to='/library'>
            <BoxCenter>
              <H1>5</H1>
              <p>Sách đã đăng</p>
            </BoxCenter>
          </Link>
          <BoxApp className="flex">
            <BoxCenter onClick={follower}>
              <H1>10</H1>
              <p>Đang thẽo dõi</p>
            </BoxCenter>

            <BoxCenter>
              <H1>0</H1>
              <p>Người theo dõi</p>
            </BoxCenter>
          </BoxApp>
        </Col1>

        <Col2>
          <p className="titleProfile">Quản lý tài khoản</p>
          {renderContent()}
        </Col2>
      </Box>

      {isShowFollower ? <div>
        <Cover onClick={follower}></Cover>
        <BoxContent>
          <Header>
            <P>Danh sách đang theo dõi</P>
            <ClosedButton onClick={follower}><i class="fa-solid fa-xmark"></i></ClosedButton>
          </Header>
          <Content>
            <ListAccounts></ListAccounts>
          </Content>
        </BoxContent>
      </div> : <div> </div>}
    </div>
  );
};

export default AccountManagement;

const BoxContent = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 600px;
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

const Content = styled.div`
    margin: 30px;
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
  width: 300px;
  margin: 20px;
  flex-shrink: 0;
`;

const Col2 = styled.div`
  flex-grow: 1;
  padding: 15px 0 20px 40px;
  margin: 40px 20px;
  border-left: 1px solid ${Colors.bg_dark};
`;

const BoxAvatar = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  align-items: center;
  gap: 20px;
`;

const ButtonEditAvatar = styled.button`
  height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  border: none;
`;
const BoxNav = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${Colors.more};

  :hover {
    background-color: ${Colors.bg_dark};
  }

  > li {
    padding: 5px 20px;
    border-radius: 10px;

    > a {
      font-size: 17px;
      display: inline-flex;
      align-items: center;
      gap: 20px;
    }
  }
`;

const Orther = styled.div`
  display: flex;
  width: 20px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

const BoxOption = styled.div`
  display: flex;
  gap: 70px;
  margin: 20px 0;
  padding: 15px 0;
  border-bottom: 1px solid ${Colors.bg_dark};
`;

const BoxInfor = styled.div`
  display: flex;
  border: 1px solid ${Colors.dark_grey};
  border-radius: 20px;
  height: 66px;
  padding: 0 30px;
`;

const BoxOrther = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const BoxFlex = styled.div`
  display: flex;
  width: 80%;
  gap: 20px;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
`;

const Button = styled.button`
  border-radius: 20px;
  height: 40px;
  padding: 0 20px;
  margin-right: 20px;
`;

const H1 = styled.p`
  font-size: 26px;
  font-weight: bold;
`;

const BoxApp = styled.div`
  justify-content: center;
  gap: 40px;
`;

const BoxCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: ${Colors.white};
`;

const InputPassword = styled.input`
  display: flex;
  border: 1px solid ${Colors.dark_grey};
  border-radius: 10px;
  background-color: transparent;
  height: 40px;
  padding: 0 30px;
  width: 80%;
  color: ${Colors.white};
`;

const Collection = styled.input`
  flex: 1;
  height: 35px;
  padding: 0 10px;
  border-radius: 5px;
  background-color: ${Colors.white};
  border: none;
  color: ${Colors.black};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
`;
