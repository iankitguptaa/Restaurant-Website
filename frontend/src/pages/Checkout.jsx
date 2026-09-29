import { useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FiCreditCard, FiCheckCircle, FiShield, FiTruck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const discount = location.state?.discount || 0;

  if (!user) return <Navigate to="/login" />;
  if (cart.length === 0) return <Navigate to="/menu" />;

  const tax = cartTotal * 0.05;
  const deliveryFee = 50;
  const finalTotal = cartTotal + deliveryFee + tax - discount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post('/api/orders', {
        userId: user.id,
        total: finalTotal,
        items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity, image: item.image }))
      });
      
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      console.warn('API order failed, using local storage fallback');
      const orders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
      const newOrder = {
        order_id: `ORD-${Date.now()}`,
        userId: user.id,
        total: finalTotal,
        items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity, image: item.image })),
        status: 'Preparing',
        date: new Date().toISOString()
      };
      orders.push(newOrder);
      localStorage.setItem('mockOrders', JSON.stringify(orders));
      
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
      <Helmet><title>Checkout | CraveBite Geist Spec</title></Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="py-6 border-b border-[#ebebeb] dark:border-[#222222] mb-8 text-center">
          <span className="mono-eyebrow">FINAL STEP // DISPATCH AUTHORIZATION</span>
          <h1 className="text-3xl font-bold font-sans text-[#171717] dark:text-white tracking-tight mt-1">
            Order Confirmation & Payment
          </h1>
        </div>

        <div className="hairline-card p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Delivery Specifications */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#ebebeb] dark:border-[#222222]">
                <FiTruck className="text-[#0070f3]" size={18} />
                <span className="mono-eyebrow text-[#171717] dark:text-white">01. SHIPPING & TELEMETRY ADDRESS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mono-eyebrow block mb-1.5">FULL NAME</label>
                  <input 
                    required 
                    type="text" 
                    defaultValue={user.name} 
                    className="geist-input w-full" 
                  />
                </div>
                <div>
                  <label className="mono-eyebrow block mb-1.5">PHONE CONTACT</label>
                  <input 
                    required 
                    type="tel" 
                    defaultValue="+91 9990285721" 
                    className="geist-input w-full font-mono" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mono-eyebrow block mb-1.5">DELIVERY ADDRESS</label>
                  <textarea 
                    required 
                    rows={2} 
                    defaultValue="Ghaziabad, Uttar Pradesh, 201002" 
                    className="geist-input w-full"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#ebebeb] dark:border-[#222222]">
                <FiCreditCard className="text-[#7928ca]" size={18} />
                <span className="mono-eyebrow text-[#171717] dark:text-white">02. PAYMENT METHOD</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="border-2 border-[#171717] dark:border-white bg-white dark:bg-[#121212] p-4 rounded-xl cursor-pointer flex items-center gap-3">
                  <input type="radio" name="payment" defaultChecked className="accent-[#171717] dark:accent-white" />
                  <div>
                    <span className="font-semibold text-sm block">Instant Online Payment</span>
                    <span className="text-xs text-[#8f8f8f] font-mono">Credit/Debit, UPI, Netbanking</span>
                  </div>
                </label>

                <label className="border border-[#ebebeb] dark:border-[#222222] bg-white dark:bg-[#121212] p-4 rounded-xl cursor-pointer flex items-center gap-3">
                  <input type="radio" name="payment" className="accent-[#171717] dark:accent-white" />
                  <div>
                    <span className="font-semibold text-sm block">Pay on Delivery</span>
                    <span className="text-xs text-[#8f8f8f] font-mono">Cash/UPI at doorstep</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Summary Notice */}
            <div className="p-4 bg-[#fafafa] dark:bg-[#1a1a1a] rounded-xl border border-[#ebebeb] dark:border-[#222222] flex justify-between items-center font-mono text-sm">
              <span className="text-[#8f8f8f]">AUTHORIZED AMOUNT TO PAY:</span>
              <span className="text-xl font-bold text-[#171717] dark:text-white">₹{finalTotal.toFixed(2)}</span>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary-pill w-full justify-center !py-3.5 !text-[16px]"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white dark:border-[#171717] border-t-transparent"></div>
              ) : (
                <>
                  <FiShield size={16} /> Authorize Order — ₹{finalTotal.toFixed(2)}
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
