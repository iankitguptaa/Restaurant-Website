import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  FiSearch, 
  FiHeart, 
  FiShoppingBag, 
  FiUser, 
  FiMoon, 
  FiSun, 
  FiMenu, 
  FiLogOut,
  FiPackage
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const Navbar = ({ onOpenSidebar }) => {
  const { cartCount, cartTotal } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    setUserDropdown(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FFF9F2]/90 dark:bg-[#12100E]/90 backdrop-blur-md border-b border-[#F0E8DF] dark:border-[#2A2520] py-3.5 px-4 sm:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Mobile Menu Trigger & Logo fallback */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-xl bg-white dark:bg-[#1E1B18] border border-[#F0E8DF] dark:border-[#2A2520] text-[#1F1F1F] dark:text-white"
            aria-label="Open navigation sidebar"
          >
            <FiMenu size={20} />
          </button>

          {/* Mobile brand text */}
          <Link to="/" className="lg:hidden flex items-center gap-2">
            <span className="font-extrabold text-lg text-[#FF5E1B]">TasteHouse</span>
          </Link>
        </div>

        {/* Center Global Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for dishes, cuisines, restaurants..."
            className="search-input"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#FF5E1B] hover:bg-[#E04B0E] text-white rounded-full flex items-center justify-center transition-colors shadow-warm-sm"
            aria-label="Search button"
          >
            <FiSearch size={15} />
          </button>
        </form>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-white dark:bg-[#1E1B18] border border-[#EAE3DA] dark:border-[#2A2520] text-[#5E5854] dark:text-[#B0A8A0] hover:text-[#FF5E1B] transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
          </button>

          {/* Favorites */}
          <Link
            to="/favorites"
            className="relative p-2.5 rounded-full bg-white dark:bg-[#1E1B18] border border-[#EAE3DA] dark:border-[#2A2520] text-[#5E5854] dark:text-[#B0A8A0] hover:text-[#FF5E1B] transition-colors hidden sm:flex items-center justify-center"
            title="Favorites"
          >
            <FiHeart size={18} />
          </Link>

          {/* Cart Bag */}
          <Link
            to="/cart"
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-[#1E1B18] border border-[#EAE3DA] dark:border-[#2A2520] text-[#1F1F1F] dark:text-white hover:border-[#FF5E1B] transition-all shadow-warm-sm"
          >
            <div className="relative">
              <FiShoppingBag size={18} className="text-[#FF5E1B]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] px-1 bg-[#FF5E1B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[13px] font-bold hidden sm:inline-block">
              ₹{cartTotal.toFixed(0)}
            </span>
          </Link>

          {/* Account Profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 p-2 rounded-full bg-white dark:bg-[#1E1B18] border border-[#EAE3DA] dark:border-[#2A2520] text-[#1F1F1F] dark:text-white hover:border-[#FF5E1B] transition-all"
              >
                <div className="w-7 h-7 bg-[#FF5E1B]/10 text-[#FF5E1B] rounded-full flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <span className="text-[13px] font-semibold hidden md:inline-block pr-1">
                  {user.name.split(' ')[0]}
                </span>
              </button>

              {userDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#1E1B18] border border-[#EAE3DA] dark:border-[#2A2520] rounded-2xl p-2 shadow-warm-lg z-50">
                  <Link
                    to="/profile"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-[#5E5854] dark:text-[#B0A8A0] hover:text-[#FF5E1B] hover:bg-[#FFF5EB] dark:hover:bg-[#26221F]"
                  >
                    <FiUser size={15} /> Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-[#5E5854] dark:text-[#B0A8A0] hover:text-[#FF5E1B] hover:bg-[#FFF5EB] dark:hover:bg-[#26221F]"
                  >
                    <FiPackage size={15} /> Orders
                  </Link>
                  <div className="my-1 border-t border-[#F0E8DF] dark:border-[#2A2520]"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <FiLogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-orange-pill !py-2 !px-4 !text-xs">
              Account
            </Link>
          )}

        </div>

      </div>
    </header>
  );
};

export default Navbar;
