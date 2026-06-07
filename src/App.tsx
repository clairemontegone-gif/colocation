import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Taches from './pages/Taches'
import Depenses from './pages/Depenses'
import Navbar from './composants/Navbar'

import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/taches" element={<Taches />} />
        <Route path="/depenses" element={<Depenses />} />
      </Routes>
    </BrowserRouter>
  )
}
  
export default App
