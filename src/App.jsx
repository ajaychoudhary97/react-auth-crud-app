import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UserPage';

const App = () => {
  const user = useSelector((state) => state.user.userData);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/login" />}
         />
      <Route path="/users" element={ user && user.is_admin === '1' ? ( <UsersPage /> ) : 
        ( <Navigate to="/home" />)} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
