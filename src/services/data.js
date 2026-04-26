import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const categories = [
  { id: 1, name: 'Pizza', icon: '🍕' },
  { id: 2, name: 'Burger', icon: '🍔' },
  { id: 3, name: 'Dessert', icon: '🍰' },
  { id: 4, name: 'Drink', icon: '🥤' },
];

const fallbackData = [
  { id: 'pizza-margherita', name: 'Margherita Pizza', description: 'Classic Italian pizza with fresh tomatoes, mozzarella, and basil.', price: 299, category: 'Pizza', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca', rating: 4.8, reviews: 342, prepTime: '20-25 min', isPopular: true },
  { id: 'burger-classic', name: 'Classic Cheeseburger', description: 'Juicy beef patty with melted cheese, lettuce, tomato, and our secret sauce.', price: 199, category: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', rating: 4.7, reviews: 256, prepTime: '15-20 min', isPopular: true },
  { id: 'sushi-roll', name: 'Dragon Sushi Roll', description: 'Fresh eel and cucumber topped with avocado and sweet eel sauce.', price: 449, category: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c', rating: 4.9, reviews: 189, prepTime: '25-30 min', isPopular: true },
  { id: 'salad-caesar', name: 'Caesar Salad', description: 'Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing.', price: 149, category: 'Salad', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9', rating: 4.5, reviews: 124, prepTime: '10-15 min', isPopular: false },
  { id: 'pasta-carbonara', name: 'Spaghetti Carbonara', description: 'Authentic Italian pasta with eggs, cheese, pancetta, and black pepper.', price: 349, category: 'Healthy', image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9', rating: 4.8, reviews: 412, prepTime: '20-25 min', isPopular: true },
  { id: 'dessert-brownie', name: 'Chocolate Fudge Brownie', description: 'Warm, gooey chocolate brownie served with vanilla bean ice cream.', price: 129, category: 'Dessert', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c', rating: 4.9, reviews: 531, prepTime: '5-10 min', isPopular: true },
  { id: 'pizza-pepperoni', name: 'Pepperoni Pizza', description: 'Spicy pepperoni slices over melted mozzarella and a rich tomato sauce base.', price: 349, category: 'Pizza', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', rating: 4.7, reviews: 420, prepTime: '20-25 min', isPopular: true },
  { id: 'drink-cola', name: 'Classic Cola', description: 'Chilled, refreshing cola served with ice.', price: 60, category: 'Drink', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', rating: 4.2, reviews: 150, prepTime: '2-5 min', isPopular: false },
  { id: 'drink-lemonade', name: 'Fresh Lemonade', description: 'Freshly squeezed lemons with a hint of mint.', price: 80, category: 'Drink', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', rating: 4.8, reviews: 220, prepTime: '5-10 min', isPopular: true },
  { id: 'dessert-cheesecake', name: 'New York Cheesecake', description: 'Rich, creamy cheesecake with a graham cracker crust and berry compote.', price: 199, category: 'Dessert', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', rating: 4.9, reviews: 380, prepTime: '5-10 min', isPopular: true },
  { id: 'burger-veg', name: 'Spicy Veggie Burger', description: 'Crispy vegetable patty with jalapenos, fresh veggies, and spicy mayo.', price: 179, category: 'Burger', image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', rating: 4.4, reviews: 190, prepTime: '15-20 min', isPopular: false },
  { id: 'pizza-veg', name: 'Veggie Supreme Pizza', description: 'Loaded with bell peppers, onions, mushrooms, olives, and sweet corn.', price: 319, category: 'Pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', rating: 4.5, reviews: 275, prepTime: '20-25 min', isPopular: false }
];

export const fetchFoodItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/menu`);
    return response.data.map(item => ({ ...item, id: item.id_string || item.id.toString() }));
  } catch (err) {
    console.warn('API fetch failed, using fallback data:', err.message);
    return fallbackData;
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
    console.warn('API fetch failed, using fallback data:', err.message);
    const item = fallbackData.find(f => f.id === id);
    if (item) return item;
    throw new Error('Food item not found');
  }
};
