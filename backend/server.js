const express = require('express');
const cors = require('cors');
const { sequelize, User, FoodItem, Order } = require('./models');

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

// Menu Routes
app.get('/api/menu', async (req, res) => {
  try {
    const items = await FoodItem.findAll();
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
  const count = await FoodItem.count();
  if (count === 0) {
    console.log('Seeding initial menu data...');
    const hardcodedData = [
      { id_string: 'pizza-margherita', name: 'Margherita Pizza', description: 'Classic Italian pizza with fresh tomatoes, mozzarella, and basil.', price: 299, category: 'Pizza', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca', rating: 4.8, reviews: 342, prepTime: '20-25 min', isPopular: true },
      { id_string: 'burger-classic', name: 'Classic Cheeseburger', description: 'Juicy beef patty with melted cheese, lettuce, tomato, and our secret sauce.', price: 199, category: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', rating: 4.7, reviews: 256, prepTime: '15-20 min', isPopular: true },
      { id_string: 'sushi-roll', name: 'Dragon Sushi Roll', description: 'Fresh eel and cucumber topped with avocado and sweet eel sauce.', price: 449, category: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c', rating: 4.9, reviews: 189, prepTime: '25-30 min', isPopular: true },
      { id_string: 'salad-caesar', name: 'Caesar Salad', description: 'Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing.', price: 149, category: 'Salad', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9', rating: 4.5, reviews: 124, prepTime: '10-15 min', isPopular: false },
      { id_string: 'pasta-carbonara', name: 'Spaghetti Carbonara', description: 'Authentic Italian pasta with eggs, cheese, pancetta, and black pepper.', price: 349, category: 'Healthy', image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9', rating: 4.8, reviews: 412, prepTime: '20-25 min', isPopular: true },
      { id_string: 'dessert-brownie', name: 'Chocolate Fudge Brownie', description: 'Warm, gooey chocolate brownie served with vanilla bean ice cream.', price: 129, category: 'Dessert', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c', rating: 4.9, reviews: 531, prepTime: '5-10 min', isPopular: true },
      { id_string: 'pizza-pepperoni', name: 'Pepperoni Pizza', description: 'Spicy pepperoni slices over melted mozzarella and a rich tomato sauce base.', price: 349, category: 'Pizza', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', rating: 4.7, reviews: 420, prepTime: '20-25 min', isPopular: true },
      { id_string: 'drink-cola', name: 'Classic Cola', description: 'Chilled, refreshing cola served with ice.', price: 60, category: 'Drink', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', rating: 4.2, reviews: 150, prepTime: '2-5 min', isPopular: false },
      { id_string: 'drink-lemonade', name: 'Fresh Lemonade', description: 'Freshly squeezed lemons with a hint of mint.', price: 80, category: 'Drink', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', rating: 4.8, reviews: 220, prepTime: '5-10 min', isPopular: true },
      { id_string: 'dessert-cheesecake', name: 'New York Cheesecake', description: 'Rich, creamy cheesecake with a graham cracker crust and berry compote.', price: 199, category: 'Dessert', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', rating: 4.9, reviews: 380, prepTime: '5-10 min', isPopular: true },
      { id_string: 'burger-veg', name: 'Spicy Veggie Burger', description: 'Crispy vegetable patty with jalapenos, fresh veggies, and spicy mayo.', price: 179, category: 'Burger', image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', rating: 4.4, reviews: 190, prepTime: '15-20 min', isPopular: false },
      { id_string: 'pizza-veg', name: 'Veggie Supreme Pizza', description: 'Loaded with bell peppers, onions, mushrooms, olives, and sweet corn.', price: 319, category: 'Pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', rating: 4.5, reviews: 275, prepTime: '20-25 min', isPopular: false }
    ];
    await FoodItem.bulkCreate(hardcodedData);

    await User.create({ name: 'Admin User', email: 'admin@admin.com', password: 'password', role: 'admin' });
    await User.create({ name: 'John Doe', email: 'user@user.com', password: 'password', role: 'user' });
  }
};

const PORT = 5000;

if (process.env.VERCEL) {
  // On Vercel, just sync db and export app for Serverless Function
  sequelize.sync({ force: false }).then(async () => {
    await seedDatabase();
  }).catch(err => console.error('Error syncing DB:', err));
} else {
  // Local development
  sequelize.sync({ force: false }).then(async () => {
    console.log('Database synced');
    await seedDatabase();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }).catch(err => console.error('Error syncing DB:', err));
}

module.exports = app;
