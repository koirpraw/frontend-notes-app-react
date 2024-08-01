
import './App.css';
import { Route, Routes } from 'react-router-dom';
import CreateCard from './pages/createCardPage';
import Navbar from './components/navbar';
import HomePage from './pages/HomePage';

import React from 'react'
import CardDetailPage from './pages/CardDetailPage';
import EditCard from './pages/EditCardPage';

function Page3() {
  return (
    <div>This is Page3</div>
  )
}


function App() {
  const cards = [
    { "id": 1, "term": "Apple", "definition": "A Technology Company" },
    { "id": 2, "term": "Boeing", "definition": "An Amerian Aviantion Giant, that supplies airplanes around the world" },
    { "id": 3, "term": "Caterpiller", "definition": "American Heavy equipment manufacturer" },
    { "id": 4, "term": "DutchBros", "definition": "American Coffe Chain Company- localish. Most people like coffee from Dutch bros coffee" },

  ]


  return (
    <>

      <div className='main'>
        <Navbar />

        {/* <HomePage /> */}

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/HomePage' element={<HomePage />} />
          <Route path='/createCard' element={<CreateCard />} />
          <Route path='/CardDetailPage/:id' element={<CardDetailPage />} />
          <Route path="/EditCard/:id" element={<EditCard />} />
        </Routes>




      </div>

    </>

  );
}

export default App;
