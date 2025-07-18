import React, { useContext } from 'react'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LogIn from './components/LogIn'
import { AppContext } from './context/AppContext'


const App = () => {
  const {showLogin , setShowLogin} = useContext(AppContext)
  return (
    <>
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <Navbar/>
      { showLogin &&  <LogIn/>}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/result" element={<Result />} />
      <Route path="/buy-credit" element={<BuyCredit />} />

    </Routes>
    <Footer/>
    </div>
 
    </>
  )
}

export default App