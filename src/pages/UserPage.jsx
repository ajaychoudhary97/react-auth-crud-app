import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { getUsers } from '../api/api';
import EditUserPage from '../pages/EditUserPage';
import DeleteUserPage from '../pages/DeleteUserPage';
import NavbarApp from '../components/NavbarApp';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const fetchUsers = async () => {
    const res = await getUsers('user_list.php');
    if (res.data.success) setUsers(res.data.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <>
      <NavbarApp />
      <Container>
        <h2 className="text-center my-4">All Registered Users</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Gender</th>
              <th>Is Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.number}</td>
                <td>{user.gender}</td>
                <td>{user.is_admin === '1' ? 'Yes' : 'No'}</td>
                <td>
                  <Button size="sm" variant="warning" className="me-2" onClick={() => setEditUser(user)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => setDeleteUserId(user.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {editUser && <EditUserPage user={editUser} onHide={() => setEditUser(null)} onSave={fetchUsers} />}
        {deleteUserId && <DeleteUserPage userId={deleteUserId} onHide={() => setDeleteUserId(null)} onDelete={fetchUsers} />}
      </Container>
    </>
  );
};

export default UsersPage;