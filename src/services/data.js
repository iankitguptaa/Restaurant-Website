import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const categories = [
  { id: 1, name: 'Pizza', icon: '🍕' },
  { id: 2, name: 'Burger', icon: '🍔' },
  { id: 3, name: 'Dessert', icon: '🍰' },
  { id: 4, name: 'Drink', icon: '🥤' },
];

export const fetchFoodItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/menu`);
    return response.data.map(item => ({ ...item, id: item.id_string || item.id.toString() }));
  } catch (err) {
    console.error('Error fetching menu:', err);
    return [];
  }
};

export const fetchFoodItemById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/menu`);
    const allItems = response.data.map(item => ({ ...item, id: item.id_string || item.id.toString() }));
    const item = allItems.find(f => f.id === id);
    if (item) return item;
    throw new Error('Food item not found');
  } catch (err) {
    throw err;
  }
};
