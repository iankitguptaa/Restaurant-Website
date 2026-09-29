import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMinus, FiPlus, FiShoppingBag, FiStar, FiClock, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { fetchFoodItemById } from '../services/data';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let mounted = true;
    const getProduct = async () => {
      try {
        const data = await fetchFoodItemById(id);
        if (mounted) setProduct(data);
      } catch (error) {
        toast.error('Product not found');
        navigate('/menu');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    getProduct();
    return () => { mounted = false; };
  }, [id, navigate]);

  const handleAddToCart = () => {
    for(let i=0; i<quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} x ${product.name} added to cart`);
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#171717] dark:border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
      <Helmet>
        <title>{product.name} — CraveBite Geist Spec</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back */}
        <div className="py-4">
          <Link 
            to="/menu"
            className="inline-flex items-center text-[13px] font-mono text-[#8f8f8f] hover:text-[#171717] dark:hover:text-white transition-colors gap-1.5"
          >
            <FiArrowLeft size={14} /> Back to Catalog
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-4">
          
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-6"
          >
            <div className="hairline-card p-2 bg-white dark:bg-[#121212] overflow-hidden">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-[#fafafa] dark:bg-[#1a1a1a]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                {product.isPopular ? (
                  <span className="absolute top-4 left-4 bg-[#171717] text-white dark:bg-white dark:text-[#171717] text-[11px] font-mono font-medium uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-whisper">
                    Master Chef Choice
                  </span>
                ) : null}
              </div>
            </div>
          </motion.div>

          {/* Product Details Spec */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="mono-eyebrow">{product.category}</span>
                <span className="text-[#ebebeb] dark:text-[#333333]">•</span>
                <div className="flex items-center gap-1 font-mono text-xs text-[#171717] dark:text-white font-medium">
                  <FiStar className="text-[#f5a623] fill-current" size={13} />
                  {product.rating} ({product.reviews} verified reviews)
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold font-sans text-[#171717] dark:text-white tracking-tight">
                {product.name}
              </h1>
            </div>

            <p className="text-[15px] text-[#4d4d4d] dark:text-[#a1a1a1] leading-relaxed">
              {product.description}
            </p>

            <div className="p-4 rounded-xl bg-white dark:bg-[#121212] border border-[#ebebeb] dark:border-[#222222] space-y-3">
              <span className="mono-eyebrow block">KITCHEN SPECIFICATIONS</span>
              <div className="grid grid-cols-2 gap-4 text-[13px]">
                <div>
                  <span className="text-[#8f8f8f] block">Prep & Cook Time</span>
                  <span className="font-mono font-medium text-[#171717] dark:text-white flex items-center gap-1.5 mt-0.5">
                    <FiClock size={13} /> {product.prepTime || '15-20 min'}
                  </span>
                </div>
                <div>
                  <span className="text-[#8f8f8f] block">Packaging Guarantee</span>
                  <span className="font-mono font-medium text-[#50e3c2] flex items-center gap-1.5 mt-0.5">
                    <FiCheck size={13} /> Sealed Thermal Lock
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-2 pt-2">
              <span className="mono-eyebrow uppercase">Unit Price:</span>
              <span className="text-3xl font-bold font-mono text-[#171717] dark:text-white">
                ₹{product.price.toFixed(2)}
              </span>
            </div>

            {/* Quantity Selector & Add CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t border-[#ebebeb] dark:border-[#222222]">
              <div className="flex items-center border border-[#ebebeb] dark:border-[#222222] bg-white dark:bg-[#121212] rounded-sm p-1 justify-between sm:justify-start">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-[#171717] dark:text-white hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a] rounded-sm transition-colors"
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={14} />
                </button>
                <span className="w-12 text-center font-mono font-bold text-[15px]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-[#171717] dark:text-white hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a] rounded-sm transition-colors"
                  aria-label="Increase quantity"
                >
                  <FiPlus size={14} />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="btn-primary-pill flex-1 justify-center !py-3"
              >
                <FiShoppingBag size={16} /> Add to Order — ₹{(product.price * quantity).toFixed(2)}
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
