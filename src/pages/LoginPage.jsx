import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import NavbarApp from '../components/NavbarApp';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const handleChange = (field, value) => {
    if (errors[field] || loginError) {
      setErrors({ ...errors, [field]: '' });
      setLoginError('');
    }

    if (field === 'email') setEmail(value);
    else if (field === 'password') setPassword(value);
  };

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const res = await axios.post(
        'https://rainflowweb.com/demo/react_test/login.php',
        formData
      );

      if (res.data.success) {
        dispatch(setUser(res.data.data));
        navigate('/home');
      } else {
        setLoginError(res.data.message || 'Login failed');
      }
    } catch (err) {
      setLoginError('Something went wrong. Try again later.');
    }
  };

  return (
    <>
     <NavbarApp/>

      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2>Login</h2>
            {loginError && <Alert variant="danger">{loginError}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  isInvalid={!!errors.email}
                  
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  maxLength={6}
                  value={password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
