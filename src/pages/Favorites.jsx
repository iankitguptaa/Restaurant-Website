import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useFavorites } from '../context/FavoritesContext';
import Card from '../components/Card';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Helmet><title>Favorites | CraveBite</title></Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-8">Your Favorites ❤️</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-dark-surface rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
            <span className="text-6xl block mb-4">💔</span>
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">No favorites yet</h2>
            <p className="text-gray-500">You haven't liked any food items yet. Go to the menu to find some!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {favorites.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card item={item} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
