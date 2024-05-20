import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SignIn from './sreens/user/SignIn';
import Search from './sreens/user/Search';
import NotFound from './sreens/NotFound';
import Homepage from './sreens/user/Homepage';
import AccountManagement from './sreens/user/profile/AccountManagement';

const Book1 = {
  id: 1,
  title: "Điều bí mật",
  author: "Hân Như",
  src: "/assets/images/anh1.jpg",
  type: "Miễn phí",
  categories: ['Ngôn tình', 'abc', 'cdf'],
  progress: "Đã hoàn thành",
  chapters: '50',
  rating: '4.01',
  reading: '123',
  description: `Câu chuyện xoay quanh khu ký túc xá của một trường đại học y nổi tiếng ở Trung Quốc, hằng năm cứ vào nửa đêm ngày 16 tháng 6 là lại có một nữ sinh trèo lên cửa sổ phòng 405, khu nhà 13  và nhảy xuống chết. Sự kiện này kéo dài lên đến 12 năm nhưng vẫn không một ai có thể tìm được lý do những cô gái đó lại chết mặc dù đã cố tìm mọi cách để ngăn cản nhưng vẫn có người chết.
  
  Và có hai điều đặc biệt trùng hợp với các cô gái trước khi nhảy lầu chết, một là các nữ sinh này luôn lẩm bẩm một câu đó là : "Ánh trăng là gì?" và hai là những nữ sinh này đều đã từng đi qua khu phòng phẫu thuật của trường vào ban đêm. Vậy ánh trăng có phải là nguyên nhân gây ra những cái chết rùng rợn này? Khu phòng phẫu thuật của trường đã gì bí mật? Hãy cùng theo dõi cuốn tiểu thuyết trinh thám này để hiểu rõ nhé!`,
  listChapter: [
    {
      index: 1,
      name: 'Chương 1: Cuộc gọi lúc nửa đêm bla blabalancdsvegfffffffffffffffff ffffffff',
    },
    {
      index: 2,
      name: 'Chương 1',
    },
    {
      index: 3,
      name: 'Chương 1',
    },
    {
      index: 4,
      name: 'Chương 1',
    },
    {
      index: 5,
      name: 'Chương 1',
    },
  ]
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App isLoggedIn='1'/>}>
        <Route index element={<Homepage></Homepage>} />
        <Route path='/signin' element={<SignIn state='true'></SignIn>} />
        <Route path='/signup' element={<SignIn state=''></SignIn>} />
        <Route path='/search' element={<Search></Search>} />
        <Route path='/account_management' element={<AccountManagement></AccountManagement>}/>
        <Route path='*' element={<NotFound></NotFound>} />
      </Route>
    </Routes>
    </BrowserRouter> 
  </React.StrictMode>
);
reportWebVitals();
