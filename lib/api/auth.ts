import API from './axios';

// Register
export const register = async (data: object) => {
  const response = await API.post('/api/auth/register', data);
  return response.data;
};

// Login
export const login = async (data: object) => {
  const response = await API.post('/api/auth/login', data);
  return response.data;
};