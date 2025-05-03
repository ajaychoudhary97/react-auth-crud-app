import axios from 'axios';

const API_BASE = 'https://rainflowweb.com/demo/react_test';

export const registerUser = (formData) => axios.post(`${API_BASE}/new_user.php`, formData, { headers: {} });
export const loginUser = (formData) => axios.post(`${API_BASE}/login.php`, formData, { headers: {} });
export const logoutUser = () => axios.get(`${API_BASE}/logout.php`);
export const getUsers = () => axios.get(`${API_BASE}/user_list.php`);
export const updateUser = (formData) => axios.post(`${API_BASE}/update_user.php`, formData, { headers: {} });
export const deleteUser = (userId) => axios.get(`${API_BASE}/delete_user.php?user_id=${userId}`);