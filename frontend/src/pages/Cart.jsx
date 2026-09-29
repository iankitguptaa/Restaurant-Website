import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingBag, FiTag } from 'react-icons/fi';
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
      toast.success('WELCOME50 applied (-50%)');
    } else if (promoCode === 'CRAVE20') {
      if (cartTotal > 500) {
        setDiscount(cartTotal * 0.2);
        toast.success('CRAVE20 applied (-20%)');
      } else {
        toast.error('Minimum order of ₹500 required');
      }
    } else if (promoCode === 'FREEDEL') {
      if (cartTotal > 300) {
        setDiscount(50);
        toast.success('Free Delivery applied');
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
      <div className="pt-24 pb-20 min-h-screen flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#0a0a0a] px-4">
        <Helmet><title>Cart | CraveBite Geist Spec</title></Helmet>
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="hairline-card p-12 text-center max-w-md w-full space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-[#f2f2f2] dark:bg-[#1a1a1a] flex items-center justify-center mx-auto text-[#8f8f8f]">
            <FiShoppingBag size={28} />
          </div>
          <span className="mono-eyebrow">ORDER MANIFEST EMPTY</span>
          <h2 className="text-2xl font-bold font-sans text-[#171717] dark:text-white">Your cart is empty</h2>
          <p className="text-[14px] text-[#4d4d4d] dark:text-[#a1a1a1] leading-relaxed">
            You haven't added any culinary items to your manifest yet. Explore our catalog to get started.
          </p>
          <Link to="/menu" className="btn-primary-pill w-full justify-center">
            Explore Menu Catalog
          </Link>
        </motion.div>
      </div>
    );
  }

  const tax = cartTotal * 0.05;
  const deliveryFee = 50;
  const finalTotal = cartTotal + deliveryFee + tax - discount;

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
      <Helmet><title>Order Cart | CraveBite Geist Spec</title></Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="py-6 border-b border-[#ebebeb] dark:border-[#222222] mb-8">
          <span className="mono-eyebrow">CHECKOUT DISPATCH // STEP 01</span>
          <h1 className="text-3xl font-bold font-sans text-[#171717] dark:text-white tracking-tight mt-1">
            Order Manifest ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cart Items Table List */}
          <div className="lg:col-span-8 space-y-3">
            {cart.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={item.id} 
                className="hairline-card p-4 flex flex-col sm:flex-row items-center gap-4"
              >
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md border border-[#ebebeb] dark:border-[#222222]" />
                
                <div className="flex-grow text-center sm:text-left space-y-1">
                  <h3 className="font-semibold text-[15px] text-[#171717] dark:text-white">{item.name}</h3>
                  <p className="font-mono text-sm font-bold text-[#171717] dark:text-[#ededed]">
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-[#ebebeb] dark:border-[#222222] bg-[#fafafa] dark:bg-[#1a1a1a] rounded-sm p-0.5">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 flex items-center justify-center text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white"
                      aria-label="Decrease item quantity"
                    >
                      <FiMinus size={13} />
                    </button>
                    <span className="w-8 text-center font-mono font-medium text-xs">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 flex items-center justify-center text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white"
                      aria-label="Increase item quantity"
                    >
                      <FiPlus size={13} />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-[#8f8f8f] hover:text-[#ee0000] transition-colors"
                    aria-label="Remove item"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary Spec */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="hairline-card p-6 space-y-5 sticky top-24"
            >
              <span className="mono-eyebrow block pb-2 border-b border-[#ebebeb] dark:border-[#222222]">
                FINANCIAL BREAKDOWN
              </span>
              
              <div className="space-y-2">
                <label className="mono-eyebrow text-[11px] block">PROMO CODE</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. WELCOME50" 
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value.toUpperCase())}
                    className="geist-input flex-grow uppercase font-mono text-xs"
                  />
                  <button 
                    onClick={handleApplyPromo}
                    className="btn-ghost-sm"
                  >
                    <FiTag size={13} /> Apply
                  </button>
                </div>
              </div>

              <div className="space-y-2.5 text-[14px] pt-2">
                <div className="flex justify-between text-[#4d4d4d] dark:text-[#a1a1a1]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#171717] dark:text-white">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#4d4d4d] dark:text-[#a1a1a1]">
                  <span>Delivery Dispatch</span>
                  <span className="font-mono text-[#171717] dark:text-white">₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#4d4d4d] dark:text-[#a1a1a1]">
                  <span>GST Taxes (5%)</span>
                  <span className="font-mono text-[#171717] dark:text-white">₹{tax.toFixed(2)}</span>
                </div>
                {discount > 0 ? (
                  <div className="flex justify-between text-[#50e3c2] font-mono font-medium">
                    <span>Discount Code Applied</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                ) : null}
              </div>
              
              <div className="border-t border-[#ebebeb] dark:border-[#222222] pt-4">
                <div className="flex justify-between text-[16px] font-bold text-[#171717] dark:text-white">
                  <span>Total Amount</span>
                  <span className="font-mono text-xl">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link 
                to="/checkout" 
                state={{ discount }}
                className="btn-primary-pill w-full justify-center !py-3"
              >
                Proceed to Checkout <FiArrowRight size={15} />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
