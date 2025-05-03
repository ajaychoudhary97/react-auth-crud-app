import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';
import NavbarApp from '../components/NavbarApp';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '', email: '', number: '', gender: 'Male', is_admin: '0', password: '', confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear field-specific error and form-level error if exists
    if (errors[name] || errors.form) {
      setErrors({ ...errors, [name]: '', form: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.number) {
      newErrors.number = 'Phone number is required';
    } else if (!/^\d{10}$/.test(form.number)) {
      newErrors.number = 'Number must be 10 digits';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!form.confirm_password) {
      newErrors.confirm_password = 'Confirm your password';
    } else if (form.password !== form.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));

    try {
      const res = await registerUser(formData);
      if (res.data.success) {
        navigate('/login');
      } else {
        setErrors({ form: res.data.message || 'Registration failed' });
      }
    } catch {
      setErrors({ form: 'Registration failed. Try again later.' });
    }
  };

  return (
    <>
      <NavbarApp />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <h2 className="text-center">Register</h2>
            {errors.form && <Alert variant="danger">{errors.form}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Number</Form.Label>
                    <Form.Control
                      name="number"
                      value={form.number}
                      onChange={handleChange}
                      
                      maxLength={10}
                      isInvalid={!!errors.number}
                    />
                    <Form.Control.Feedback type="invalid">{errors.number}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <div>
                      <Form.Check
                        inline type="radio" label="Male" name="gender" value="Male"
                        checked={form.gender === 'Male'} onChange={handleChange}
                      />
                      <Form.Check
                        inline type="radio" label="Female" name="gender" value="Female"
                        checked={form.gender === 'Female'} onChange={handleChange}
                      />
                    </div>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      name="is_admin"
                      value={form.is_admin}
                      onChange={handleChange}
                    >
                      <option value="0">User</option>
                      <option value="1">Admin</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      maxLength={6}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirm_password"
                      value={form.confirm_password}
                      onChange={handleChange}
                      maxLength={6}
                      isInvalid={!!errors.confirm_password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.confirm_password}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit" variant="success" className="w-100">Register</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;
