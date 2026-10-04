const express = require('express');
const cors = require('cors');
const { sequelize, User, Restaurant, FoodItem, Order } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ error: 'User already exists' });

    user = await User.create({ name, email, password });
    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Restaurant Routes
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [{ model: FoodItem, as: 'dishes' }]
    });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id, {
      include: [{ model: FoodItem, as: 'dishes' }]
    });
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Menu Routes
app.get('/api/menu', async (req, res) => {
  try {
    const items = await FoodItem.findAll({
      include: [{ model: Restaurant, as: 'restaurant' }]
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/menu', async (req, res) => {
  try {
    const item = await FoodItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Order Routes
app.get('/api/orders', async (req, res) => {
  try {
    const { userId } = req.query;
    let orders;

    if (userId) {
      orders = await Order.findAll({ where: { UserId: userId }, order: [['date', 'DESC']] });
    } else {
      orders = await Order.findAll({ order: [['date', 'DESC']] });
    }

    const parsedOrders = orders.map(o => {
      const plain = o.get({ plain: true });
      plain.items = JSON.parse(plain.items || '[]');
      return plain;
    });

    res.json(parsedOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { userId, total, items } = req.body;
    const order = await Order.create({
      order_id: `ORD-${Date.now()}`,
      total,
      items: JSON.stringify(items),
      UserId: userId
    });

    const parsed = order.get({ plain: true });
    parsed.items = JSON.parse(parsed.items);

    res.status(201).json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const seedDatabase = async () => {
  const rCount = await Restaurant.count();
  if (rCount === 0) {
    console.log('Seeding initial restaurant & menu data...');
    
    const sampleRestaurants = [
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
        isPureVeg: false
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
        isPureVeg: false
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
        isPureVeg: false
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
        isPureVeg: true
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
        isPureVeg: true
      }
    ];

    await Restaurant.bulkCreate(sampleRestaurants);

    const hardcodedData = [
      { id_string: 'pizza-margherita', name: 'Margherita Pizza', description: 'Classic Italian pizza with fresh tomatoes, mozzarella, and basil.', price: 299, category: 'Pizza', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=600&q=75', rating: 4.8, reviews: 342, prepTime: '20-25 min', isPopular: true, isVeg: true, restaurantId: 1 },
      { id_string: 'burger-classic', name: 'Classic Cheeseburger', description: 'Juicy patty with melted cheese, lettuce, tomato, and secret sauce.', price: 199, category: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=75', rating: 4.7, reviews: 256, prepTime: '15-20 min', isPopular: true, isVeg: false, restaurantId: 2 },
      { id_string: 'sushi-roll', name: 'Dragon Sushi Roll', description: 'Fresh eel and cucumber topped with avocado and sweet eel sauce.', price: 449, category: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=75', rating: 4.9, reviews: 189, prepTime: '25-30 min', isPopular: true, isVeg: false, restaurantId: 3 },
      { id_string: 'salad-caesar', name: 'Caesar Salad', description: 'Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing.', price: 149, category: 'Salad', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=75', rating: 4.5, reviews: 124, prepTime: '10-15 min', isPopular: false, isVeg: true, restaurantId: 4 },
      { id_string: 'pasta-carbonara', name: 'Spaghetti Carbonara', description: 'Authentic Italian pasta with eggs, cheese, pancetta, and black pepper.', price: 349, category: 'Healthy', image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?auto=format&fit=crop&w=600&q=75', rating: 4.8, reviews: 412, prepTime: '20-25 min', isPopular: true, isVeg: true, restaurantId: 4 },
      { id_string: 'dessert-brownie', name: 'Chocolate Fudge Brownie', description: 'Warm, gooey chocolate brownie served with vanilla bean ice cream.', price: 129, category: 'Dessert', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=75', rating: 4.9, reviews: 531, prepTime: '5-10 min', isPopular: true, isVeg: true, restaurantId: 5 },
      { id_string: 'pizza-pepperoni', name: 'Pepperoni Pizza', description: 'Spicy pepperoni slices over melted mozzarella and a rich tomato sauce base.', price: 349, category: 'Pizza', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=75', rating: 4.7, reviews: 420, prepTime: '20-25 min', isPopular: true, isVeg: false, restaurantId: 1 },
      { id_string: 'drink-cola', name: 'Classic Cola', description: 'Chilled, refreshing cola served with ice.', price: 60, category: 'Drink', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=75', rating: 4.2, reviews: 150, prepTime: '2-5 min', isPopular: false, isVeg: true, restaurantId: 2 },
      { id_string: 'drink-lemonade', name: 'Fresh Lemonade', description: 'Freshly squeezed lemons with a hint of mint.', price: 80, category: 'Drink', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=75', rating: 4.8, reviews: 220, prepTime: '5-10 min', isPopular: true, isVeg: true, restaurantId: 4 },
      { id_string: 'dessert-cheesecake', name: 'New York Cheesecake', description: 'Rich, creamy cheesecake with a graham cracker crust and berry compote.', price: 199, category: 'Dessert', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=75', rating: 4.9, reviews: 380, prepTime: '5-10 min', isPopular: true, isVeg: true, restaurantId: 5 },
      { id_string: 'burger-veg', name: 'Spicy Veggie Burger', description: 'Crispy vegetable patty with jalapenos, fresh veggies, and spicy mayo.', price: 179, category: 'Burger', image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=75', rating: 4.4, reviews: 190, prepTime: '15-20 min', isPopular: false, isVeg: true, restaurantId: 2 },
      { id_string: 'pizza-veg', name: 'Veggie Supreme Pizza', description: 'Loaded with bell peppers, onions, mushrooms, olives, and sweet corn.', price: 319, category: 'Pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=75', rating: 4.5, reviews: 275, prepTime: '20-25 min', isPopular: false, isVeg: true, restaurantId: 1 }
    ];
    await FoodItem.bulkCreate(hardcodedData);

    await User.create({ name: 'Admin User', email: 'admin@admin.com', password: 'password', role: 'admin' });
    await User.create({ name: 'John Doe', email: 'user@user.com', password: 'password', role: 'user' });
  }
};

const PORT = process.env.PORT || 5000;

// Always start as a regular HTTP server (works on Render, Railway, etc.)
// On Vercel, module.exports = app is used as serverless function
sequelize.sync({ force: false }).then(async () => {
  console.log('Database synced');
  await seedDatabase();
  if (!process.env.VERCEL) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
}).catch(err => console.error('Error syncing DB:', err));

module.exports = app;
