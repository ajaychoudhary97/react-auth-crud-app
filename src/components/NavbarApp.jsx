import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { clearUser } from '../redux/userSlice';

const NavbarApp = () => {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
          ReactApp
        </Navbar.Brand>
        <Nav className="ms-auto">
          {user ? (
            <>
              <Nav.Link onClick={() => navigate('/home')}>Home</Nav.Link>

              {user.is_admin === 1 || user.is_admin === "1" ? (
                <Nav.Link onClick={() => navigate('/users')}>Users</Nav.Link>
              ) : null}

              <Navbar.Text className="mx-3">
                Signed in As: <strong>{user.is_admin === 1 || user.is_admin === "1" ? 'Admin' : 'User'}</strong>
              </Navbar.Text>

              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarApp;
