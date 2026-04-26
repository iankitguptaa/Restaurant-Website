import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { fetchFoodItems, categories } from '../services/data';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFood, setNewFood] = useState({ name: '', price: '', category: 'Pizza', description: '', image: '' });

  useEffect(() => {
    if (user?.role === 'admin') {
      axios.get('/api/orders')
        .then(res => setOrders(res.data.map(o => ({ ...o, id: o.order_id }))))
        .catch(err => {
          console.warn('Error fetching admin orders, using fallback:', err);
          const allOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]').sort((a,b) => new Date(b.date) - new Date(a.date));
          setOrders(allOrders.map(o => ({ ...o, id: o.order_id })));
        });
      
      fetchFoodItems().then(data => setItems(data));
    }
  }, [user]);

  if (!user || user.role !== 'admin') return <Navigate to="/" />;

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const mockChartData = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 5000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 6890 },
    { name: 'Sat', revenue: 8390 },
    { name: 'Sun', revenue: Math.max(7490, totalRevenue) }, // Just to show some active data
  ];

  const categoryData = categories.map(c => ({
    name: c.name,
    count: items.filter(i => i.category === c.name).length
  }));

  const handleAddFood = async (e) => {
    e.preventDefault();
    if (!newFood.image) {
      newFood.image = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; // fallback
    }
    const foodItem = {
      ...newFood,
      id_string: `custom-${Date.now()}`,
      price: parseFloat(newFood.price),
      rating: 4.5,
      reviews: 0,
      prepTime: '15-20 min',
      isPopular: false
    };

    try {
      const response = await axios.post('/api/menu', foodItem);
      // Map id_string to id for frontend
      const createdItem = { ...response.data, id: response.data.id_string || response.data.id.toString() };
      setItems([...items, createdItem]);
      setShowAddModal(false);
      toast.success('Food item added successfully!');
      setNewFood({ name: '', price: '', category: 'Pizza', description: '', image: '' });
    } catch (err) {
      console.warn('Failed to add food to API, using fallback');
      const createdItem = { ...foodItem, id: foodItem.id_string };
      setItems([...items, createdItem]);
      setShowAddModal(false);
      toast.success('Food item added successfully! (Offline Mode)');
      setNewFood({ name: '', price: '', category: 'Pizza', description: '', image: '' });
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Helmet><title>Admin Dashboard | CraveBite</title></Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 p-4 sticky top-28">
              <div className="font-bold font-display text-xl mb-6 px-4 py-2 border-b border-gray-100 dark:border-white/10">
                Admin Panel
              </div>
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'dashboard' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'hover:bg-gray-100 dark:hover:bg-dark-surfaceHover'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'orders' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'hover:bg-gray-100 dark:hover:bg-dark-surfaceHover'}`}
                >
                  Orders
                </button>
                <button 
                  onClick={() => setActiveTab('menu')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'menu' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'hover:bg-gray-100 dark:hover:bg-dark-surfaceHover'}`}
                >
                  Manage Menu
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-display">Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                    <p className="text-gray-500 text-sm font-medium mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold font-display text-primary-600">₹{totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                    <p className="text-gray-500 text-sm font-medium mb-1">Total Orders</p>
                    <p className="text-3xl font-bold font-display">{orders.length}</p>
                  </div>
                  <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                    <p className="text-gray-500 text-sm font-medium mb-1">Menu Items</p>
                    <p className="text-3xl font-bold font-display">{items.length}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                    <h3 className="font-bold mb-4">Revenue (Last 7 Days)</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockChartData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <XAxis dataKey="name" stroke="#8884d8" />
                          <YAxis stroke="#8884d8" />
                          <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                          <Area type="monotone" dataKey="revenue" stroke="#f97316" fill="#ffedd5" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                    <h3 className="font-bold mb-4">Items by Category</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <XAxis dataKey="name" stroke="#8884d8" />
                          <YAxis stroke="#8884d8" />
                          <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                          <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-display">All Orders</h2>
                <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 dark:bg-dark-surfaceHover">
                      <tr>
                        <th className="px-6 py-4 font-bold">Order ID</th>
                        <th className="px-6 py-4 font-bold">Date</th>
                        <th className="px-6 py-4 font-bold">Total</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-dark-surfaceHover transition-colors">
                          <td className="px-6 py-4 font-medium">{order.id}</td>
                          <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 font-bold">₹{order.total.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-bold">{order.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {orders.length === 0 && <div className="p-8 text-center text-gray-500">No orders found</div>}
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold font-display">Manage Menu</h2>
                  <button onClick={() => setShowAddModal(true)} className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                    + Add Item
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {items.map(item => (
                    <div key={item.id} className="bg-white dark:bg-dark-surface p-4 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-primary-600 font-bold">₹{item.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Food Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-dark-surface rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-display">Add New Food</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-red-500"><FiX size={24} /></button>
            </div>
            <form onSubmit={handleAddFood} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Food Name</label>
                <input required type="text" value={newFood.name} onChange={e => setNewFood({...newFood, name: e.target.value})} className="w-full px-4 py-2 border rounded-xl dark:bg-dark-bg dark:border-white/10" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price (₹)</label>
                  <input required type="number" min="0" step="0.01" value={newFood.price} onChange={e => setNewFood({...newFood, price: e.target.value})} className="w-full px-4 py-2 border rounded-xl dark:bg-dark-bg dark:border-white/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select value={newFood.category} onChange={e => setNewFood({...newFood, category: e.target.value})} className="w-full px-4 py-2 border rounded-xl dark:bg-dark-bg dark:border-white/10">
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required rows="2" value={newFood.description} onChange={e => setNewFood({...newFood, description: e.target.value})} className="w-full px-4 py-2 border rounded-xl dark:bg-dark-bg dark:border-white/10"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input type="url" placeholder="https://..." value={newFood.image} onChange={e => setNewFood({...newFood, image: e.target.value})} className="w-full px-4 py-2 border rounded-xl dark:bg-dark-bg dark:border-white/10" />
              </div>
              <button type="submit" className="w-full bg-primary-600 text-white font-bold py-3 rounded-xl hover:bg-primary-700 transition-colors mt-4">
                Save Food Item
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
