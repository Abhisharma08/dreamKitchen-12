
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import HelloBar from './components/HelloBar.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <Router>
      <HelloBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
