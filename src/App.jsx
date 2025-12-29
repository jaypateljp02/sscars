import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AvailableCars from './pages/Cars';
import Offers from './pages/Offers';
import Accessories from './pages/Accessories';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

import './styles/global.css';
import './styles/Navbar.css';
import './styles/Footer.css';
import './pages/Home.css';
import './pages/Cars.css';
import './pages/Offers.css';
import './pages/Accessories.css';
import './pages/Contact.css';
import './pages/Admin.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<AvailableCars />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
