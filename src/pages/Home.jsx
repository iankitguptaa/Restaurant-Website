import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight } from 'react-icons/fi';
import { fetchFoodItems } from '../services/data';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeatured = async () => {
      try {
        const data = await fetchFoodItems();
        setFeatured(data.filter(item => item.isPopular).slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured items", error);
      } finally {
        setLoading(false);
      }
    };
    getFeatured();
  }, []);

  return (
    <div className="pt-20">
      <Helmet>
        <title>CraveBite | Food Delivery & Restaurant</title>
        <meta name="description" content="Order the best food from CraveBite. Fast delivery, fresh ingredients." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="z-10"
            >
              <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                Fastest <span className="text-primary-600">Delivery</span> & Easy Pickup
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
                Experience the best food from top chefs right at your home. Hot, fresh, and on time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/menu" className="inline-flex justify-center items-center px-8 py-4 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-full shadow-lg hover:shadow-primary-600/30 transition-all duration-300">
                  Order Now <FiArrowRight className="ml-2" />
                </Link>
                <Link to="/menu" className="inline-flex justify-center items-center px-8 py-4 text-base font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-dark-surfaceHover rounded-full transition-all duration-300">
                  Explore Menu
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-full w-full max-w-lg mx-auto aspect-square overflow-hidden border-8 border-white dark:border-dark-surface shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Delicious food bowl" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/4 -left-8 bg-white dark:bg-dark-surface p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce">
                <span className="text-4xl">🚀</span>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Fast Delivery</p>
                  <p className="text-xs text-gray-500">Under 30 mins</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-surface/30 border-y border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Our Popular Dishes</h2>
              <p className="text-gray-600 dark:text-gray-400">Hand-picked by our master chefs.</p>
            </div>
            <Link to="/menu" className="hidden sm:flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors">
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              Array(4).fill(0).map((_, i) => <Skeleton key={i} />)
            ) : (
              featured.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card item={item} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div whileHover={{ y: -10 }} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full flex items-center justify-center text-3xl mb-6">📱</div>
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3">1. Order</h3>
              <p className="text-gray-600 dark:text-gray-400">Choose your favorite meals and place an order through our app or website.</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full flex items-center justify-center text-3xl mb-6">👨‍🍳</div>
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3">2. We Cook</h3>
              <p className="text-gray-600 dark:text-gray-400">Our master chefs prepare your food with the freshest ingredients.</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full flex items-center justify-center text-3xl mb-6">🚚</div>
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3">3. We Deliver</h3>
              <p className="text-gray-600 dark:text-gray-400">Your food is delivered to your doorstep hot and fresh within minutes.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Promo Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-white">
              <h2 className="text-4xl font-display font-bold mb-6">Get more with our App!</h2>
              <p className="text-lg text-primary-100 mb-8 max-w-md">
                Download the CraveBite app now and get ₹100 off your first order. Available on iOS and Android.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors border border-black dark:border-white/20">
                  <span className="text-2xl">🍎</span> App Store
                </button>
                <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors border border-black dark:border-white/20">
                  <span className="text-2xl">▶️</span> Google Play
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-96 bg-white dark:bg-dark-surface rounded-3xl border-8 border-gray-900 shadow-2xl flex flex-col items-center justify-center overflow-hidden rotate-6">
                <div className="text-6xl mb-4 text-primary-600">🍔</div>
                <div className="text-2xl font-bold font-display text-gray-900 dark:text-white">CraveBite</div>
                <div className="mt-8 px-6 py-2 bg-primary-600 text-white rounded-full font-bold">Order Now</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
