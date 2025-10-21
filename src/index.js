import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import {store} from './redux/store'
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Allusers from './Components/Allusers';
import Show from './Components/Show';
import Createuser from './Components/Createuser';
import Navbar from './Components/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <BrowserRouter>
      <Navbar/> 
      
      <Routes>
     <Route path='/' element={<App/>}/>
     <Route path='/show' element={<Show/>}> </Route>
      <Route path='/Createuser' element={<Createuser/>}/>
      
      <Route path='/Allusers' element={<Allusers/>}/>
     </Routes>
     </BrowserRouter>
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
