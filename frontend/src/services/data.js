import axios from 'axios';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const categories = [
  { id: 1, name: 'Pizza', icon: '🍕' },
  { id: 2, name: 'Burger', icon: '🍔' },
  { id: 3, name: 'Sushi', icon: '🍣' },
  { id: 4, name: 'Dessert', icon: '🍰' },
  { id: 5, name: 'Drink', icon: '🥤' },
  { id: 6, name: 'Salad', icon: '🥗' },
];

export const fallbackRestaurants = [
  {
    id: 1,
    name: "La Pino'z Pizza",
    cuisine: "Pizza, Italian, Fast Food",
    rating: 4.6,
    reviewsCount: 1420,
    prepTime: "20-25 min",
    costForTwo: "₹400 for two",
    location: "Connaught Place, New Delhi",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=75",
    bannerImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
    discount: "50% OFF up to ₹100",
    isFeatured: true,
    isPureVeg: false,
    dishesCount: 4
  },
  {
    id: 2,
    name: "Burger King",
    cuisine: "Burger, Fast Food, Beverages",
    rating: 4.5,
    reviewsCount: 2150,
    prepTime: "15-20 min",
    costForTwo: "₹300 for two",
    location: "Sector 18, Noida",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=75",
    bannerImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    discount: "40% OFF on ₹199+",
    isFeatured: true,
    isPureVeg: false,
    dishesCount: 3
  },
  {
    id: 3,
    name: "Asian Wok & Sushi Bar",
    cuisine: "Japanese, Asian, Sushi, Noodles",
    rating: 4.8,
    reviewsCount: 890,
    prepTime: "25-30 min",
    costForTwo: "₹650 for two",
    location: "Cyber Hub, Gurugram",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=75",
    bannerImage: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
    discount: "FLAT ₹120 OFF",
    isFeatured: true,
    isPureVeg: false,
    dishesCount: 2
  },
  {
    id: 4,
    name: "The Green Bistro",
    cuisine: "Healthy Food, Salads, Italian",
    rating: 4.7,
    reviewsCount: 640,
    prepTime: "15-25 min",
    costForTwo: "₹350 for two",
    location: "Saket, New Delhi",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=75",
    bannerImage: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=1200&q=80",
    discount: "20% OFF on Combos",
    isFeatured: true,
    isPureVeg: true,
    dishesCount: 3
  },
  {
    id: 5,
    name: "Sweet Tooth Bakery & Desserts",
    cuisine: "Desserts, Bakery, Ice Cream",
    rating: 4.9,
    reviewsCount: 1980,
    prepTime: "10-15 min",
    costForTwo: "₹250 for two",
    location: "Hauz Khas, New Delhi",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=75",
    bannerImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80",
    discount: "BUY 1 GET 1 FREE",
    isFeatured: true,
    isPureVeg: true,
    dishesCount: 2
  }
];

export const fallbackData = [
  { id: 'pizza-margherita', restaurantId: 1, restaurantName: "La Pino'z Pizza", name: 'Margherita Pizza', description: 'Classic Italian pizza with fresh tomatoes, mozzarella, and basil.', price: 299, category: 'Pizza', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=600&q=75', rating: 4.8, reviews: 342, prepTime: '20-25 min', isPopular: true, isVeg: true },
  { id: 'burger-classic', restaurantId: 2, restaurantName: 'Burger King', name: 'Classic Cheeseburger', description: 'Juicy beef patty with melted cheese, lettuce, tomato, and secret sauce.', price: 199, category: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=75', rating: 4.7, reviews: 256, prepTime: '15-20 min', isPopular: true, isVeg: false },
  { id: 'sushi-roll', restaurantId: 3, restaurantName: 'Asian Wok & Sushi Bar', name: 'Dragon Sushi Roll', description: 'Fresh eel and cucumber topped with avocado and sweet eel sauce.', price: 449, category: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=75', rating: 4.9, reviews: 189, prepTime: '25-30 min', isPopular: true, isVeg: false },
  { id: 'salad-caesar', restaurantId: 4, restaurantName: 'The Green Bistro', name: 'Caesar Salad', description: 'Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing.', price: 149, category: 'Salad', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=75', rating: 4.5, reviews: 124, prepTime: '10-15 min', isPopular: false, isVeg: true },
  { id: 'pasta-carbonara', restaurantId: 4, restaurantName: 'The Green Bistro', name: 'Spaghetti Carbonara', description: 'Authentic Italian pasta with eggs, cheese, pancetta, and black pepper.', price: 349, category: 'Healthy', image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?auto=format&fit=crop&w=600&q=75', rating: 4.8, reviews: 412, prepTime: '20-25 min', isPopular: true, isVeg: true },
  { id: 'dessert-brownie', restaurantId: 5, restaurantName: 'Sweet Tooth Bakery', name: 'Chocolate Fudge Brownie', description: 'Warm, gooey chocolate brownie served with vanilla bean ice cream.', price: 129, category: 'Dessert', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=75', rating: 4.9, reviews: 531, prepTime: '5-10 min', isPopular: true, isVeg: true },
  { id: 'pizza-pepperoni', restaurantId: 1, restaurantName: "La Pino'z Pizza", name: 'Pepperoni Pizza', description: 'Spicy pepperoni slices over melted mozzarella and a rich tomato sauce base.', price: 349, category: 'Pizza', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=75', rating: 4.7, reviews: 420, prepTime: '20-25 min', isPopular: true, isVeg: false },
  { id: 'drink-cola', restaurantId: 2, restaurantName: 'Burger King', name: 'Classic Cola', description: 'Chilled, refreshing cola served with ice.', price: 60, category: 'Drink', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=75', rating: 4.2, reviews: 150, prepTime: '2-5 min', isPopular: false, isVeg: true },
  { id: 'drink-lemonade', restaurantId: 4, restaurantName: 'The Green Bistro', name: 'Fresh Lemonade', description: 'Freshly squeezed lemons with a hint of mint.', price: 80, category: 'Drink', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=75', rating: 4.8, reviews: 220, prepTime: '5-10 min', isPopular: true, isVeg: true },
  { id: 'dessert-cheesecake', restaurantId: 5, restaurantName: 'Sweet Tooth Bakery', name: 'New York Cheesecake', description: 'Rich, creamy cheesecake with a graham cracker crust and berry compote.', price: 199, category: 'Dessert', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=75', rating: 4.9, reviews: 380, prepTime: '5-10 min', isPopular: true, isVeg: true },
  { id: 'burger-veg', restaurantId: 2, restaurantName: 'Burger King', name: 'Spicy Veggie Burger', description: 'Crispy vegetable patty with jalapenos, fresh veggies, and spicy mayo.', price: 179, category: 'Burger', image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=75', rating: 4.4, reviews: 190, prepTime: '15-20 min', isPopular: false, isVeg: true },
  { id: 'pizza-veg', restaurantId: 1, restaurantName: "La Pino'z Pizza", name: 'Veggie Supreme Pizza', description: 'Loaded with bell peppers, onions, mushrooms, olives, and sweet corn.', price: 319, category: 'Pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=75', rating: 4.5, reviews: 275, prepTime: '20-25 min', isPopular: false, isVeg: true }
];

export const fetchRestaurants = async () => {
  try {
    const response = await axios.get(`${API_URL}/restaurants`);
    if (response.data && response.data.length > 0) {
      return response.data.map(r => ({
        ...r,
        image: getOptimizedImageUrl(r.image, 600, 75),
        bannerImage: getOptimizedImageUrl(r.bannerImage, 1200, 80)
      }));
    }
    return fallbackRestaurants;
  } catch (err) {
    console.warn('API fetch failed, using fallback restaurants data:', err.message);
    return fallbackRestaurants;
  }
};

export const fetchRestaurantById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/restaurants/${id}`);
    if (response.data) {
      const r = response.data;
      const dishes = (r.dishes || []).map(d => ({
        ...d,
        id: d.id_string || d.id.toString(),
        image: getOptimizedImageUrl(d.image, 600, 75)
      }));
      return {
        ...r,
        image: getOptimizedImageUrl(r.image, 600, 75),
        bannerImage: getOptimizedImageUrl(r.bannerImage, 1200, 80),
        dishes: dishes.length > 0 ? dishes : fallbackData.filter(item => item.restaurantId === Number(id))
      };
    }
  } catch (err) {
    console.warn('API fetch failed, using fallback restaurant details:', err.message);
  }

  const r = fallbackRestaurants.find(item => item.id === Number(id));
  if (r) {
    const dishes = fallbackData.filter(item => item.restaurantId === Number(id));
    return {
      ...r,
      dishes
    };
  }
  throw new Error('Restaurant not found');
};

export const fetchFoodItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/menu`);
    if (response.data && response.data.length > 0) {
      return response.data.map(item => ({
        ...item,
        id: item.id_string || item.id.toString(),
        restaurantName: item.restaurant?.name || 'Gourmet Kitchen',
        image: getOptimizedImageUrl(item.image, 600, 75)
      }));
    }
    return fallbackData;
  } catch (err) {
    console.warn('API fetch failed, using fallback food data:', err.message);
    return fallbackData;
  }
};

export const fetchFoodItemById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/menu`);
    const allItems = response.data.map(item => ({
      ...item,
      id: item.id_string || item.id.toString(),
      restaurantName: item.restaurant?.name || 'Gourmet Kitchen',
      image: getOptimizedImageUrl(item.image, 800, 80)
    }));
    const item = allItems.find(f => f.id === id);
    if (item) return item;
  } catch (err) {
    console.warn('API fetch failed, using fallback data:', err.message);
  }
  const item = fallbackData.find(f => f.id === id);
  if (item) return item;
  throw new Error('Food item not found');
};


