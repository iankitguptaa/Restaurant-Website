import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { FiPlus, FiHeart, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import OptimizedImage from './OptimizedImage';

const Card = ({ item }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(item.id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      icon: '🍕',
      style: {
        borderRadius: '16px',
        background: '#1F1F1F',
        color: '#fff',
      },
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-white dark:bg-[#1E1B18] border border-[#F0E8DF] dark:border-[#2A2520] hover:border-[#FF5E1B]/40 rounded-3xl p-4 shadow-warm-sm hover:shadow-warm-md transition-all duration-300 flex flex-col justify-between h-full group relative"
    >
      {/* Top Floating Badge & Favorite Button */}
      <div className="flex justify-between items-center mb-3">
        {item.isPopular ? (
          <span className="bg-[#E8F5E9] dark:bg-[#1E3A24] text-[#2E7D32] dark:text-[#A5D6A7] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Bestseller
          </span>
        ) : (
          <span className="bg-[#FFF0E6] dark:bg-[#3D2517] text-[#FF5E1B] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            15% OFF
          </span>
        )}

        <button 
          onClick={(e) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            toggleFavorite(item); 
          }}
          aria-label="Toggle favorite"
          className={`p-2 rounded-full transition-all ${
            isFav 
              ? 'bg-[#FF5E1B] text-white shadow-orange-glow' 
              : 'bg-[#FFF9F2] dark:bg-[#26221F] text-[#999088] hover:text-[#FF5E1B]'
          }`}
        >
          <FiHeart size={15} className={isFav ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Dish Image Container */}
      <Link to={`/product/${item.id}`} className="block relative my-2 overflow-hidden rounded-2xl bg-[#FFF9F2] dark:bg-[#26221F] p-2 flex items-center justify-center">
        <OptimizedImage 
          src={item.image} 
          alt={item.name}
          width={400}
          quality={75}
          className="w-40 h-40 object-cover rounded-full shadow-warm-sm transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* Dish Details */}
      <div className="mt-2 flex flex-col flex-grow">
        <Link to={`/product/${item.id}`} className="hover:text-[#FF5E1B] transition-colors">
          <h3 className="text-[16px] font-bold text-[#1F1F1F] dark:text-white line-clamp-1 tracking-tight">
            {item.name}
          </h3>
        </Link>

        <p className="text-[12px] text-[#5E5854] dark:text-[#B0A8A0] line-clamp-1 mt-0.5 mb-3 font-medium">
          {item.description}
        </p>

        {/* Bottom Price & Add Action */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#F0E8DF] dark:border-[#2A2520]">
          <div>
            <div className="flex items-center gap-1 text-[12px] text-[#FF5E1B] font-bold">
              <FiStar size={12} className="fill-current" />
              <span>{item.rating || 4.8}</span>
            </div>
            <span className="text-[17px] font-extrabold text-[#1F1F1F] dark:text-white font-sans">
              ₹{item.price.toFixed(2)}
            </span>
          </div>

          <button 
            onClick={handleAdd}
            className="btn-orange-square"
            aria-label="Add to cart"
          >
            <FiPlus size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
