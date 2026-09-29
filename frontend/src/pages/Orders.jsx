import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiTruck, FiHome, FiPackage, FiExternalLink } from 'react-icons/fi';
import axios from 'axios';

const TrackingTimeline = ({ status }) => {
  const steps = [
    { label: 'Order Placed', icon: <FiCheckCircle size={14} /> },
    { label: 'Kitchen Cooking', icon: <FiClock size={14} /> },
    { label: 'In Transit', icon: <FiTruck size={14} /> },
    { label: 'Delivered', icon: <FiHome size={14} /> }
  ];

  const getCurrentStep = () => {
    switch(status) {
      case 'Order Placed': return 0;
      case 'Preparing': case 'Kitchen Cooking': return 1;
      case 'Out for Delivery': case 'In Transit': return 2;
      case 'Delivered': return 3;
      default: return 1;
    }
  };
  const currentStep = getCurrentStep();

  return (
    <div className="py-4 my-3 border-y border-[#ebebeb] dark:border-[#222222] hidden sm:block font-mono">
      <div className="flex justify-between items-center relative px-4">
        <div className="absolute left-6 right-6 top-4 -translate-y-1/2 h-0.5 bg-[#ebebeb] dark:bg-[#222222] z-0"></div>
        <div 
          className="absolute left-6 top-4 -translate-y-1/2 h-0.5 bg-[#171717] dark:bg-white z-0 transition-all duration-700"
          style={{ width: `calc(${(currentStep / (steps.length - 1)) * 100}% - 3rem)` }}
        ></div>
        
        {steps.map((step, idx) => {
          const isActive = idx <= currentStep;
          return (
            <div key={idx} className="relative z-10 flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors ${
                isActive 
                  ? 'bg-[#171717] text-white dark:bg-white dark:text-[#171717] shadow-whisper' 
                  : 'bg-[#fafafa] dark:bg-[#1a1a1a] border border-[#ebebeb] dark:border-[#222222] text-[#8f8f8f]'
              }`}>
                {step.icon}
              </div>
              <span className={`text-[11px] uppercase tracking-wider ${isActive ? 'font-bold text-[#171717] dark:text-white' : 'text-[#8f8f8f]'}`}>
                {step.label}
              </span>
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (user) {
      axios.get(`/api/orders?userId=${user.id}`)
        .then(res => {
          if (mounted) {
            setOrders(res.data.map(o => ({ ...o, id: o.order_id })));
            setLoading(false);
          }
        })
        .catch(err => {
          console.warn('Error fetching orders, using fallback:', err);
          if (mounted) {
            const allOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
            const userOrders = allOrders.filter(o => o.userId === user.id).sort((a,b) => new Date(b.date) - new Date(a.date));
            setOrders(userOrders.map(o => ({ ...o, id: o.order_id })));
            setLoading(false);
          }
        });
    }
    return () => { mounted = false; };
  }, [user]);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
      <Helmet><title>Order History | CraveBite Geist Spec</title></Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="py-6 border-b border-[#ebebeb] dark:border-[#222222] mb-8">
          <span className="mono-eyebrow">USER TELEMETRY LOGS</span>
          <h1 className="text-3xl font-bold font-sans text-[#171717] dark:text-white tracking-tight mt-1">
            Order Dispatch History
          </h1>
        </div>

        {loading ? (
          <div className="py-16 text-center font-mono text-sm text-[#8f8f8f]">
            LOADING DISPATCH LOGS...
          </div>
        ) : orders.length === 0 ? (
          <div className="hairline-card p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#f2f2f2] dark:bg-[#1a1a1a] flex items-center justify-center mx-auto text-[#8f8f8f]">
              <FiPackage size={26} />
            </div>
            <span className="mono-eyebrow">NO RECORD FOUND</span>
            <h2 className="text-xl font-bold text-[#171717] dark:text-white">No orders placed yet</h2>
            <p className="text-[13px] text-[#4d4d4d] dark:text-[#a1a1a1]">
              Your order dispatches and telemetry will be logged here once placed.
            </p>
            <Link to="/menu" className="btn-primary-pill w-full justify-center">
              Browse Menu Catalog
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={order.id} 
                className="hairline-card p-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                  <div>
                    <span className="mono-eyebrow text-[11px] block">DISPATCH ID</span>
                    <h3 className="font-mono font-bold text-base text-[#171717] dark:text-white">{order.id}</h3>
                    <p className="text-[12px] font-mono text-[#8f8f8f]">
                      {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-medium px-2.5 py-1 rounded-sm bg-[#171717] text-white dark:bg-white dark:text-[#171717] shadow-whisper">
                    STATUS: {order.status}
                  </span>
                </div>

                <TrackingTimeline status={order.status} />

                <div className="space-y-3 my-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-[14px]">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-sm object-cover border border-[#ebebeb] dark:border-[#222222]" />
                        <div>
                          <p className="font-medium text-[#171717] dark:text-white">{item.name}</p>
                          <p className="text-[12px] font-mono text-[#8f8f8f]">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-mono font-medium text-[#171717] dark:text-white">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-[#ebebeb] dark:border-[#222222]">
                  <span className="mono-eyebrow">TOTAL DISPATCH CHARGE</span>
                  <span className="text-lg font-bold font-mono text-[#171717] dark:text-white">₹{order.total.toFixed(2)}</span>
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
