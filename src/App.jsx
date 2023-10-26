import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Note the use of "BrowserRouter"

import Dashboard from './Components/Login-Signup/Dashboard';
import LoginSignup from './Components/Login-Signup/LoginSignup';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
  );
}

export default App;
