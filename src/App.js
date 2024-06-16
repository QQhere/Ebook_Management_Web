import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import { routes } from './routes';
import { Fragment } from 'react';

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        {routes?.map((route) => {
          const Page = route.element;
          const Layout = route.isHiddenHeader ? Fragment : Header;
          return (
            <Route path={route.path} element={
              <>
                <Layout/>
                <Page /> 
              </>                      
            } />
          )
        })}
      </Routes>
    </BrowserRouter> 
  )
}

export default App;
