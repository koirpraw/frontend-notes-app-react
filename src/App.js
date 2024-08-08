
import './App.css';
import { Route, Routes } from 'react-router-dom';
import CreateCard from './pages/createCardPage';
import Navbar from './components/navbar';
import HomePage from './pages/HomePage';


import React from 'react'
import CardDetailPage from './pages/CardDetailPage';
import EditCard from './pages/EditCardPage';



function App() {



  return (
    <>

      <div className='main'>
        <Navbar />


        {/* <NoteProvider> */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/HomePage' element={<HomePage />} />
          <Route path='/createCard' element={<CreateCard />} />
          <Route path='/CardDetailPage/:id' element={<CardDetailPage />} />
          <Route path="/EditCard/:id" element={<EditCard />} />
        </Routes>
        {/* </NoteProvider> */}




      </div>

    </>

  );
}

export default App;
