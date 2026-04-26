const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
  role: { type: Sequelize.STRING, defaultValue: 'user' }
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
  isPopular: { type: Sequelize.BOOLEAN }
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

module.exports = { sequelize, User, FoodItem, Order };
