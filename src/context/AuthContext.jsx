import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      console.warn('API login failed, checking local storage fallback');
      const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      // Allow fallback to hardcoded admin if local mock doesn't have it
      if (email === 'admin@admin.com' && password === 'password') {
        const adminData = { id: 'admin-1', name: 'Admin User', email, role: 'admin' };
        setUser(adminData);
        localStorage.setItem('user', JSON.stringify(adminData));
        return adminData;
      }
      
      if (user) {
        const userData = { id: user.id, name: user.name, email: user.email, role: user.role };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      }
      throw new Error(err.response?.data?.error || 'Login failed. Invalid credentials.');
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      console.warn('API register failed, using local storage fallback');
      const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      if (users.find(u => u.email === email) || email === 'admin@admin.com') {
        throw new Error('User already exists');
      }
      const newUser = { id: Date.now(), name, email, password, role: 'user' };
      users.push(newUser);
      localStorage.setItem('mockUsers', JSON.stringify(users));
      
      const userData = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
