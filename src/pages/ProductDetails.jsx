import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
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
    const getProduct = async () => {
      try {
        const data = await fetchFoodItemById(id);
        setProduct(data);
      } catch (error) {
        toast.error('Product not found');
        navigate('/menu');
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    for(let i=0; i<quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-dark-bg">
      <Helmet>
        <title>{product.name} | CraveBite</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Menu
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl overflow-hidden shadow-2xl aspect-square"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-4 flex items-center gap-4">
              <span className="bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 text-sm font-bold px-3 py-1 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center text-yellow-500 font-bold">
                ★ {product.rating} <span className="text-gray-500 text-sm ml-1">({product.reviews} reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-gray-900 dark:text-white mb-4">
              {product.name}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-8">
              ₹{product.price.toFixed(2)}
            </div>

            <div className="flex items-center gap-6 mb-8 border-y border-gray-200 dark:border-white/10 py-6">
              <div className="flex items-center border border-gray-300 dark:border-white/20 rounded-full bg-white dark:bg-dark-surface p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-dark-surfaceHover transition-colors"
                >
                  <FiMinus />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-dark-surfaceHover transition-colors"
                >
                  <FiPlus />
                </button>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Preparation time:</p>
                <p className="font-bold text-gray-900 dark:text-white">{product.prepTime}</p>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <FiShoppingBag /> Add to Cart - ₹{(product.price * quantity).toFixed(2)}
            </button>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
