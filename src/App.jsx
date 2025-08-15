import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Principal from './pages/Principal';
import TelaLed from './pages/TelaLed';


export default function App() {
  return (
   <Router>
      <Routes>

      {/*  Todas as rotas internas ficam dentro do layout Principal*/}
        <Route path ="/*" element={<Principal />} />
      </Routes>
   </Router>
  )
}
