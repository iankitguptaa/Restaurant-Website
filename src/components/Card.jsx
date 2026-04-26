import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Card = ({ item }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isFav = isFavorite(item.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-white/5 flex flex-col h-full"
    >
      <Link to={`/product/${item.id}`} className="block relative h-48 overflow-hidden group">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {item.isPopular && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            Popular
          </div>
        )}
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(item); }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-colors z-10 ${isFav ? 'bg-red-50 text-red-500 dark:bg-red-900/40' : 'bg-white/80 text-gray-400 dark:bg-dark-surface/80 hover:text-red-500'}`}
        >
          <svg className="w-5 h-5" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${item.id}`} className="hover:text-primary-600 transition-colors">
            <h3 className="text-lg font-bold font-display line-clamp-1">{item.name}</h3>
          </Link>
          <div className="flex items-center gap-1 bg-gray-50 dark:bg-dark-bg px-2 py-1 rounded-md text-sm font-medium">
            <span className="text-yellow-500">★</span>
            {item.rating}
          </div>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold font-display text-gray-900 dark:text-white">
            ₹{item.price.toFixed(2)}
          </span>
          <button 
            onClick={handleAdd}
            className="bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 p-2.5 rounded-full hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-colors"
          >
            <FiPlus size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
