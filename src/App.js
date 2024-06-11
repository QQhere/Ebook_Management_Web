import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import { routes } from './routes';
import { Fragment } from 'react';
import { Counter } from './counter/Counter';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
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
          {/* <Route path='/' element={<Homepage></Homepage>} />
          <Route path='/signin' element={<SignIn state='true'></SignIn>} />
          <Route path='/signup' element={<SignIn state=''></SignIn>} />
          <Route path='/search' element={<Search></Search>} />
          <Route path='/account_management' element={<AccountManagement></AccountManagement>}/>
          <Route path='/library' element={<Library></Library>}/>
          <Route path='/transaction_history' element={<TransactionHistory></TransactionHistory>} />
          <Route path='/new_book' element={<NewBook></NewBook>} />
          <Route path='/overview' element={<Overview></Overview>} />
          <Route path='*' element={<NotFound></NotFound>} /> */}
      </Routes>
    </BrowserRouter> 
  )
}

export default App;
