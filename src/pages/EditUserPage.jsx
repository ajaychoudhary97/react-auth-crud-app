import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateUser } from '../api/api';

const EditUserModal = ({ user, onHide, onSave }) => {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    number: user.number,
    gender: user.gender
  });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.number || !form.gender) return setError('All fields are required');
    if (form.number.length !== 10) return setError('Number must be 10 digits');

    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('number', form.number);
    formData.append('gender', form.gender);

    const res = await updateUser(formData);
    if (res.data.success) {
      onSave();
      onHide();
    } else {
      setError('Update failed');
    }
  };

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton><Modal.Title>Edit User</Modal.Title></Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control value={form.email} disabled />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Number</Form.Label>
            <Form.Control name="number" value={form.number} onChange={handleChange} required maxLength={10} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Gender</Form.Label>
            <div>
              <Form.Check inline label="Male" type="radio" name="gender" value="Male" checked={form.gender === 'Male'} onChange={handleChange} />
              <Form.Check inline label="Female" type="radio" name="gender" value="Female" checked={form.gender === 'Female'} onChange={handleChange} />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;