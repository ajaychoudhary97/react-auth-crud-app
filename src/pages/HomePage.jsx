import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import NavbarApp from '../components/NavbarApp';

const HomePage = () => {
  const user = useSelector((state) => state.user.userData);
  return (
    <>
      <NavbarApp />
      <Container className="text-center mt-5">
        <h2>
          Welcome, {user.name}! 🎉 We're glad to see you. Let’s get started!
        </h2>
      </Container>
    </>
  );
};

export default HomePage;