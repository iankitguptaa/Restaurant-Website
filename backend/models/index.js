const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
  role: { type: Sequelize.STRING, defaultValue: 'user' }
});

const Restaurant = sequelize.define('Restaurant', {
  name: { type: Sequelize.STRING, allowNull: false },
  cuisine: { type: Sequelize.STRING, allowNull: false },
  rating: { type: Sequelize.FLOAT, defaultValue: 4.5 },
  reviewsCount: { type: Sequelize.INTEGER, defaultValue: 150 },
  prepTime: { type: Sequelize.STRING, defaultValue: '20-25 min' },
  costForTwo: { type: Sequelize.STRING, defaultValue: '₹400 for two' },
  location: { type: Sequelize.STRING, defaultValue: 'Connaught Place, New Delhi' },
  image: { type: Sequelize.STRING },
  bannerImage: { type: Sequelize.STRING },
  discount: { type: Sequelize.STRING },
  isFeatured: { type: Sequelize.BOOLEAN, defaultValue: true },
  isPureVeg: { type: Sequelize.BOOLEAN, defaultValue: false }
});

const FoodItem = sequelize.define('FoodItem', {
  id_string: { type: Sequelize.STRING, unique: true }, // like 'pizza-margherita'
  name: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT },
  price: { type: Sequelize.FLOAT, allowNull: false },
  category: { type: Sequelize.STRING },
  image: { type: Sequelize.STRING },
  rating: { type: Sequelize.FLOAT },
  reviews: { type: Sequelize.INTEGER },
  prepTime: { type: Sequelize.STRING },
  isPopular: { type: Sequelize.BOOLEAN },
  isVeg: { type: Sequelize.BOOLEAN, defaultValue: true },
  restaurantId: { type: Sequelize.INTEGER }
});

const Order = sequelize.define('Order', {
  order_id: { type: Sequelize.STRING },
  total: { type: Sequelize.FLOAT },
  status: { type: Sequelize.STRING, defaultValue: 'Preparing' },
  items: { type: Sequelize.TEXT }, // JSON string of items array
  date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
});

User.hasMany(Order);
Order.belongsTo(User);

Restaurant.hasMany(FoodItem, { foreignKey: 'restaurantId', as: 'dishes' });
FoodItem.belongsTo(Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' });

module.exports = { sequelize, User, Restaurant, FoodItem, Order };

