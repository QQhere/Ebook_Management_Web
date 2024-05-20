import { useLocation, Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import HeaderClient from './components/header/HeaderClient';

function App(props) {
  const location = useLocation();
  const isLoggedIn = props.isLoggedIn;
  console.log(isLoggedIn);
  const noHeaderPaths = ['/signin', '/signup', '/forgot-password',];
  if (noHeaderPaths.includes(location.pathname) || location.pathname.startsWith('/reading')) {
    return <div><Outlet></Outlet></div>;
  } else {
    return (
      <div>
        {isLoggedIn ? <Header /> : <HeaderClient />}
        <Outlet></Outlet>
      </div>
    );
  }
}

export default App;
