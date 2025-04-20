import React from 'react';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes,Route } from "react-router-dom";


const Main = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>

    <Routes>
      <Route path="/" element={<Home />} />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Main