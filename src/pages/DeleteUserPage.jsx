import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteUser } from '../api/api';

const DeleteUserModal = ({ userId, onHide, onDelete }) => {
  const handleDelete = async () => {
    await deleteUser(userId);
    onDelete();
    onHide();
  };

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the user records?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
