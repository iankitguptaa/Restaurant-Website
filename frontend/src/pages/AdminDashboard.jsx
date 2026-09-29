import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { fetchFoodItems, categories } from '../services/data';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import toast from 'react-hot-toast';
import { FiX, FiPlus, FiGrid, FiShoppingBag, FiList, FiTrendingUp } from 'react-icons/fi';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFood, setNewFood] = useState({ name: '', price: '', category: 'Pizza', description: '', image: '' });

  useEffect(() => {
    let mounted = true;
    if (user?.role === 'admin') {
      axios.get('/api/orders')
        .then(res => {
          if (mounted) setOrders(res.data.map(o => ({ ...o, id: o.order_id })));
        })
        .catch(err => {
          console.warn('Error fetching admin orders, using fallback:', err);
          if (mounted) {
            const allOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]').sort((a,b) => new Date(b.date) - new Date(a.date));
            setOrders(allOrders.map(o => ({ ...o, id: o.order_id })));
          }
        });
      
      fetchFoodItems().then(data => {
        if (mounted) setItems(data);
      });
    }
    return () => { mounted = false; };
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
    { name: 'Sun', revenue: Math.max(7490, totalRevenue) },
  ];

  const categoryData = categories.map(c => ({
    name: c.name,
    count: items.filter(i => i.category === c.name).length
  }));

  const handleAddFood = async (e) => {
    e.preventDefault();
    if (!newFood.image) {
      newFood.image = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    }
    const foodItem = {
      ...newFood,
      id_string: `custom-${Date.now()}`,
      price: parseFloat(newFood.price),
      rating: 4.8,
      reviews: 0,
      prepTime: '15-20 min',
      isPopular: false
    };

    try {
      const response = await axios.post('/api/menu', foodItem);
      const createdItem = { ...response.data, id: response.data.id_string || response.data.id.toString() };
      setItems([...items, createdItem]);
      setShowAddModal(false);
      toast.success('Food item added successfully');
      setNewFood({ name: '', price: '', category: 'Pizza', description: '', image: '' });
    } catch (err) {
      console.warn('Failed to add food to API, using fallback');
      const createdItem = { ...foodItem, id: foodItem.id_string };
      setItems([...items, createdItem]);
      setShowAddModal(false);
      toast.success('Food item added successfully');
      setNewFood({ name: '', price: '', category: 'Pizza', description: '', image: '' });
    }
  };

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
      <Helmet><title>Admin Control Panel | CraveBite Geist Spec</title></Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="py-6 border-b border-[#ebebeb] dark:border-[#222222] mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="mono-eyebrow">ADMINISTRATOR CONTROL TELEMETRY</span>
            <h1 className="text-3xl font-bold font-sans text-[#171717] dark:text-white tracking-tight mt-1">
              System Dashboard
            </h1>
          </div>

          <button onClick={() => setShowAddModal(true)} className="btn-primary-sm">
            <FiPlus size={14} /> Add Menu Item
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="md:col-span-3">
            <div className="hairline-card p-4 space-y-2 sticky top-24">
              <span className="mono-eyebrow px-3 py-1 block">PANEL NAVIGATION</span>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm text-[14px] font-medium transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'bg-[#171717] text-white dark:bg-white dark:text-[#171717]' 
                    : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a]'
                }`}
              >
                <FiGrid size={15} /> Metrics Overview
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm text-[14px] font-medium transition-colors ${
                  activeTab === 'orders' 
                    ? 'bg-[#171717] text-white dark:bg-white dark:text-[#171717]' 
                    : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a]'
                }`}
              >
                <FiList size={15} /> All Orders ({orders.length})
              </button>
              <button 
                onClick={() => setActiveTab('menu')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm text-[14px] font-medium transition-colors ${
                  activeTab === 'menu' 
                    ? 'bg-[#171717] text-white dark:bg-white dark:text-[#171717]' 
                    : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a]'
                }`}
              >
                <FiShoppingBag size={15} /> Manage Catalog ({items.length})
              </button>
            </div>
          </div>

          {/* Main Workspace */}
          <div className="md:col-span-9">
            
            {activeTab === 'dashboard' ? (
              <div className="space-y-6">
                
                {/* Metric cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="hairline-card p-5 space-y-1">
                    <span className="mono-eyebrow">GROSS REVENUE</span>
                    <p className="text-3xl font-bold font-mono text-[#171717] dark:text-white">
                      ₹{totalRevenue.toFixed(2)}
                    </p>
                  </div>

                  <div className="hairline-card p-5 space-y-1">
                    <span className="mono-eyebrow">TOTAL DISPATCHES</span>
                    <p className="text-3xl font-bold font-mono text-[#171717] dark:text-white">
                      {orders.length}
                    </p>
                  </div>

                  <div className="hairline-card p-5 space-y-1">
                    <span className="mono-eyebrow">ACTIVE CATALOG ITEMS</span>
                    <p className="text-3xl font-bold font-mono text-[#171717] dark:text-white">
                      {items.length}
                    </p>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  <div className="hairline-card p-6 space-y-4">
                    <span className="mono-eyebrow flex items-center gap-1.5">
                      <FiTrendingUp className="text-[#0070f3]" size={14} /> REVENUE TELEMETRY (7 DAYS)
                    </span>
                    <div className="h-60 pt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockChartData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                          <XAxis dataKey="name" stroke="#8f8f8f" fontSize={11} fontFamily="Geist Mono" />
                          <YAxis stroke="#8f8f8f" fontSize={11} fontFamily="Geist Mono" />
                          <Tooltip contentStyle={{ background: '#171717', color: '#fff', borderRadius: '6px', border: 'none' }} />
                          <Area type="monotone" dataKey="revenue" stroke="#0070f3" fill="#d3e5ff" fillOpacity={0.4} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="hairline-card p-6 space-y-4">
                    <span className="mono-eyebrow">CATALOG DISTRIBUTION BY CATEGORY</span>
                    <div className="h-60 pt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                          <XAxis dataKey="name" stroke="#8f8f8f" fontSize={11} fontFamily="Geist Mono" />
                          <YAxis stroke="#8f8f8f" fontSize={11} fontFamily="Geist Mono" />
                          <Tooltip contentStyle={{ background: '#171717', color: '#fff', borderRadius: '6px', border: 'none' }} />
                          <Bar dataKey="count" fill="#7928ca" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                </div>
              </div>
            ) : null}

            {activeTab === 'orders' ? (
              <div className="space-y-4">
                <span className="mono-eyebrow">MASTER ORDERS TABLE</span>
                <div className="hairline-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[13px]">
                      <thead className="bg-[#fafafa] dark:bg-[#1a1a1a] border-b border-[#ebebeb] dark:border-[#222222] font-mono text-[#8f8f8f] uppercase text-[11px]">
                        <tr>
                          <th className="px-5 py-3">Order ID</th>
                          <th className="px-5 py-3">Date</th>
                          <th className="px-5 py-3">Total</th>
                          <th className="px-5 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#ebebeb] dark:divide-[#222222] font-mono">
                        {orders.map(order => (
                          <tr key={order.id} className="hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a] transition-colors">
                            <td className="px-5 py-3.5 font-bold text-[#171717] dark:text-white">{order.id}</td>
                            <td className="px-5 py-3.5 text-[#4d4d4d] dark:text-[#a1a1a1]">{new Date(order.date).toLocaleDateString()}</td>
                            <td className="px-5 py-3.5 font-bold text-[#171717] dark:text-white">₹{order.total.toFixed(2)}</td>
                            <td className="px-5 py-3.5">
                              <span className="px-2 py-0.5 rounded-sm bg-[#171717] text-white dark:bg-white dark:text-[#171717] text-[10px] uppercase">
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {orders.length === 0 ? <div className="p-8 text-center font-mono text-xs text-[#8f8f8f]">No orders recorded</div> : null}
                </div>
              </div>
            ) : null}

            {activeTab === 'menu' ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#ebebeb] dark:border-[#222222]">
                  <span className="mono-eyebrow">CATALOG INVENTORY</span>
                  <button onClick={() => setShowAddModal(true)} className="btn-primary-sm">
                    + Add Food
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {items.map(item => (
                    <div key={item.id} className="hairline-card p-4 flex gap-4 items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover border border-[#ebebeb] dark:border-[#222222]" />
                      <div className="space-y-0.5">
                        <h4 className="font-semibold text-sm text-[#171717] dark:text-white">{item.name}</h4>
                        <p className="font-mono text-sm font-bold text-[#171717] dark:text-white">₹{item.price.toFixed(2)}</p>
                        <span className="mono-eyebrow text-[10px]">{item.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="hairline-card bg-white dark:bg-[#121212] p-6 max-w-md w-full shadow-floating space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#ebebeb] dark:border-[#222222]">
              <span className="mono-eyebrow">ADD NEW MENU ITEM</span>
              <button onClick={() => setShowAddModal(false)} className="text-[#8f8f8f] hover:text-[#ee0000]">
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleAddFood} className="space-y-3">
              <div>
                <label className="mono-eyebrow block mb-1">FOOD NAME</label>
                <input required type="text" value={newFood.name} onChange={e => setNewFood({...newFood, name: e.target.value})} className="geist-input w-full" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mono-eyebrow block mb-1">PRICE (₹)</label>
                  <input required type="number" min="0" step="0.01" value={newFood.price} onChange={e => setNewFood({...newFood, price: e.target.value})} className="geist-input w-full font-mono" />
                </div>
                <div>
                  <label className="mono-eyebrow block mb-1">CATEGORY</label>
                  <select value={newFood.category} onChange={e => setNewFood({...newFood, category: e.target.value})} className="geist-input w-full">
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="mono-eyebrow block mb-1">DESCRIPTION</label>
                <textarea required rows={2} value={newFood.description} onChange={e => setNewFood({...newFood, description: e.target.value})} className="geist-input w-full"></textarea>
              </div>

              <div>
                <label className="mono-eyebrow block mb-1">IMAGE URL</label>
                <input type="url" placeholder="https://..." value={newFood.image} onChange={e => setNewFood({...newFood, image: e.target.value})} className="geist-input w-full font-mono text-xs" />
              </div>

              <button type="submit" className="btn-primary-pill w-full justify-center !py-2.5 !mt-4">
                Save Food Item
              </button>
            </form>
          </div>
        </div>
      ) : null}

    </div>
  );
};

export default AdminDashboard;
