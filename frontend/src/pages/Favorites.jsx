import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useFavorites } from '../context/FavoritesContext';
import Card from '../components/Card';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
      <Helmet><title>Saved Favorites | CraveBite Geist Spec</title></Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="py-6 border-b border-[#ebebeb] dark:border-[#222222] mb-8">
          <span className="mono-eyebrow">SAVED CATALOG DISPATCH</span>
          <h1 className="text-3xl font-bold font-sans text-[#171717] dark:text-white tracking-tight mt-1">
            Bookmarked Favorites ({favorites.length})
          </h1>
        </div>

        {favorites.length === 0 ? (
          <div className="hairline-card p-12 text-center max-w-md mx-auto my-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#f2f2f2] dark:bg-[#1a1a1a] flex items-center justify-center mx-auto text-[#ee0000]">
              <FiHeart size={26} />
            </div>
            <span className="mono-eyebrow">NO BOOKMARKS</span>
            <h2 className="text-xl font-bold text-[#171717] dark:text-white">No favorite items saved</h2>
            <p className="text-[13px] text-[#4d4d4d] dark:text-[#a1a1a1] leading-relaxed">
              Click the heart icon on any menu item card to save it to your bookmarks for quick access.
            </p>
            <Link to="/menu" className="btn-primary-pill w-full justify-center">
              Explore Menu Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
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
