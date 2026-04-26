import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = () => {
    if (promoCode === 'WELCOME50') {
      const calcDiscount = cartTotal * 0.5;
      setDiscount(Math.min(calcDiscount, 150));
      toast.success('WELCOME50 applied!');
    } else if (promoCode === 'CRAVE20') {
      if (cartTotal > 500) {
        setDiscount(cartTotal * 0.2);
        toast.success('CRAVE20 applied!');
      } else {
        toast.error('Minimum order of ₹500 required');
      }
    } else if (promoCode === 'FREEDEL') {
      if (cartTotal > 300) {
        setDiscount(50);
        toast.success('Free Delivery applied!');
      } else {
        toast.error('Minimum order of ₹300 required');
      }
    } else {
      toast.error('Invalid promo code');
      setDiscount(0);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-bg px-4">
        <Helmet><title>Cart | CraveBite</title></Helmet>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="text-9xl mb-6">🛒</div>
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Explore our delicious menu to get started!
          </p>
          <Link to="/menu" className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-bold rounded-full hover:bg-primary-700 transition-colors">
            Browse Menu
          </Link>
        </motion.div>
      </div>
    );
  }

  const tax = cartTotal * 0.05;
  const deliveryFee = 50;
  const finalTotal = cartTotal + deliveryFee + tax - discount;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Helmet><title>Cart | CraveBite</title></Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={item.id} 
                className="bg-white dark:bg-dark-surface p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-center gap-4"
              >
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-primary-600 font-bold">₹{item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-gray-200 dark:border-white/10 rounded-full p-1 bg-gray-50 dark:bg-dark-bg">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:text-primary-600 transition-colors"
                    >
                      <FiMinus />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:text-primary-600 transition-colors"
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-dark-surface p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 h-fit sticky top-28"
          >
            <h3 className="text-xl font-bold font-display mb-6 border-b border-gray-100 dark:border-white/10 pb-4 text-gray-900 dark:text-white">Order Summary</h3>
            
            <div className="mb-6 flex gap-2">
              <input 
                type="text" 
                placeholder="Promo Code" 
                value={promoCode}
                onChange={e => setPromoCode(e.target.value.toUpperCase())}
                className="flex-grow px-4 py-2 rounded-xl border dark:bg-dark-bg dark:border-white/10 focus:ring-2 focus:ring-primary-500 uppercase"
              />
              <button 
                onClick={handleApplyPromo}
                className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 transition-colors"
              >
                Apply
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (5% GST)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-500 font-bold">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-100 dark:border-white/10 pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link 
              to="/checkout" 
              state={{ discount }}
              className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30"
            >
              Proceed to Checkout <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
