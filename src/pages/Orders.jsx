import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiTruck, FiHome } from 'react-icons/fi';
import axios from 'axios';

const TrackingTimeline = ({ status }) => {
  const steps = [
    { label: 'Order Placed', icon: <FiCheckCircle /> },
    { label: 'Preparing', icon: <FiClock /> },
    { label: 'Out for Delivery', icon: <FiTruck /> },
    { label: 'Delivered', icon: <FiHome /> }
  ];

  const getCurrentStep = () => {
    switch(status) {
      case 'Order Placed': return 0;
      case 'Preparing': return 1;
      case 'Out for Delivery': return 2;
      case 'Delivered': return 3;
      default: return 1;
    }
  };
  const currentStep = getCurrentStep();

  return (
    <div className="py-6 mt-2 mb-6 border-y border-gray-100 dark:border-white/10 hidden sm:block">
      <div className="flex justify-between items-center relative px-4">
        <div className="absolute left-6 right-6 top-5 -translate-y-1/2 h-1 bg-gray-200 dark:bg-gray-800 rounded-full z-0"></div>
        <div 
          className="absolute left-6 top-5 -translate-y-1/2 h-1 bg-primary-500 rounded-full z-0 transition-all duration-1000"
          style={{ width: `calc(${(currentStep / (steps.length - 1)) * 100}% - 3rem)` }}
        ></div>
        
        {steps.map((step, idx) => {
          const isActive = idx <= currentStep;
          return (
            <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors duration-500 ${isActive ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' : 'bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                {step.icon}
              </div>
              <span className={`text-xs font-bold ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`http://${window.location.hostname}:5000/api/orders?userId=${user.id}`)
        .then(res => setOrders(res.data.map(o => ({ ...o, id: o.order_id }))))
        .catch(err => console.error('Error fetching orders:', err));
    }
  }, [user]);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Helmet><title>My Orders | CraveBite</title></Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-dark-surface rounded-3xl shadow-sm">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-gray-500">Your recent orders will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={order.id} 
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 p-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <div>
                    <h3 className="font-bold font-display text-lg text-gray-900 dark:text-white">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-sm font-bold sm:hidden">
                    {order.status}
                  </div>
                </div>

                <TrackingTimeline status={order.status} />

                {order.status !== 'Delivered' && (
                  <div className="mb-6 rounded-xl overflow-hidden border border-gray-100 dark:border-white/10 relative h-48 sm:h-64">
                    <img src="/map.png" alt="Live tracking map" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <p className="text-white font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Live tracking active
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-white/10">
                  <span className="font-bold text-gray-600 dark:text-gray-400">Total Amount</span>
                  <span className="text-xl font-bold font-display text-primary-600">₹{order.total.toFixed(2)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
