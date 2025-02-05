import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import ChatbotPage from './pages/ChatbotPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/chatbot' element={<ChatbotPage />} />
      </Routes>
    </Router>
  )
}

export default App