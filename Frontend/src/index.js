import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <div> {/* Parent container for Nav and Routes */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/profile/:userId" element={<App />} /> {/* Corrected Route for profile page */}
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
