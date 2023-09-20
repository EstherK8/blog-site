import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Posts from './Posts';
import NoPageFound from './NoPageFound';
import AddPosts from './AddPosts';
import Header from './Header';
import Error from './Error';
import { useState } from 'react';
import LogIn from './LogIn';
import LogOut from './LogOut';
import Register from './LogOut';



function App() {
  const [error, setError] = useState();


  return (
    <BrowserRouter>
      <Header />
      <Error error={error} />
      <Routes>
        <Route path='/login' element={<LogIn/>} />
        <Route path='/logout' element={<LogOut />} />
        <Route path="/" element={<Posts />} />
        <Route path="AddPosts" element={<AddPosts setError={setError} />} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
