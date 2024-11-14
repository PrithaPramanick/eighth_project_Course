import { useState } from 'react';
import './App.css';
import Header from './Header';
import Add_Category from './Components/Add_Category';
import Add_Description from './Components/Add_Description';
import View from './Components/View'; 
import Edit_Category from './Components/Edit_category';
import Home from './Home';
import Courses from './Courses';
import Books from './Books';
import Contact from './Contact';
import View_des from './Components/View_des';
import Edit_des from './Components/Edit_des';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/add_category" element={<Add_Category/>}/>
        <Route path="/book_des" element={<Add_Description/>}/>
        <Route path="/view" element={<View />}/>
        <Route path="/edit_category/:id" element={<Edit_Category/>}/>
        <Route path="/view_des" element={<View_des/>}/>
        <Route path="/edit_des/:id" element={<Edit_des/>}/>
       
      </Routes>
    </Router>
  );
}

export default App;
