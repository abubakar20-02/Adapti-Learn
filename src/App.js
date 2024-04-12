import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import About from './components/About';
import ContactUs from './components/ContactUsPage/ContactUs';
import LandingNavBar from './components/LandingPage/LandingNavBar/navbar';
import Footer from './components/Footer/footer';

function App() {
  const location = useLocation();

  const shouldRenderNavBarAndFooter = !['/homepage'].includes(location.pathname);

  return (
    <div className='maincontainer'>
      {shouldRenderNavBarAndFooter && <LandingNavBar />}
      <Routes>
        <Route path='*' element={<LandingPage />} />
        <Route path="/" element={<LandingPage/>} />
        <Route path="/homepage" element={<HomePage/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      {shouldRenderNavBarAndFooter && <Footer />}
    </div>
  );
}
 
export default App;
