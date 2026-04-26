import { useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post('/api/orders', {
        userId: user.id,
        total: cartTotal + 50 + (cartTotal * 0.05) - discount,
        items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity, image: item.image }))
      });
      
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Helmet><title>Checkout | CraveBite</title></Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 text-center">Secure Checkout</h1>

        <div className="bg-white dark:bg-dark-surface rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h2 className="text-xl font-bold font-display mb-4">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input required type="text" defaultValue={user.name} className="w-full px-4 py-2 border rounded-xl dark:bg-dark-bg dark:border-white/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <input required type="tel" defaultValue="9990285721" className="w-full px-4 py-2 border rounded-xl dark:bg-dark-bg dark:border-white/10" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Address</label>
                  <textarea required rows="3" defaultValue="Ghaziabad, 201002" className="w-full px-4 py-2 border rounded-xl dark:bg-dark-bg dark:border-white/10"></textarea>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold font-display mb-4">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="border border-primary-500 bg-primary-50 dark:bg-primary-900/20 p-4 rounded-xl cursor-pointer flex items-center gap-3">
                  <input type="radio" name="payment" defaultChecked className="text-primary-600" />
                  <span className="font-medium">Credit/Debit Card</span>
                </label>
                <label className="border border-gray-200 dark:border-white/10 p-4 rounded-xl cursor-pointer flex items-center gap-3">
                  <input type="radio" name="payment" className="text-primary-600" />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
              ) : (
                `Place Order - ₹${(cartTotal + 50 + (cartTotal * 0.05) - discount).toFixed(2)}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
