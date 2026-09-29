import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FiShoppingCart, FiUser, FiMoon, FiSun, FiMenu, FiX, FiHeart, FiPackage, FiLogOut } from 'react-icons/fi';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    setUserDropdown(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-full liquid-glass transition-all duration-300">
      <div className="px-4 sm:px-6">
        <div className="flex justify-between items-center h-14">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-full flex items-center justify-center font-mono font-bold text-xs shadow-whisper transition-transform duration-200 group-hover:scale-105">
              C
            </div>
            <span className="text-lg font-bold font-sans tracking-tight text-[#171717] dark:text-white">
              CraveBite
            </span>
            <span className="mono-eyebrow text-[9px] px-2 py-0.5 border border-white/40 dark:border-white/10 rounded-full bg-white/40 dark:bg-white/10 ml-0.5">
              GLASS
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                isActive('/') 
                  ? 'text-[#171717] dark:text-white bg-white/60 dark:bg-white/15 shadow-whisper' 
                  : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                isActive('/menu') 
                  ? 'text-[#171717] dark:text-white bg-white/60 dark:bg-white/15 shadow-whisper' 
                  : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10'
              }`}
            >
              Menu
            </Link>
            <Link 
              to="/offers" 
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                isActive('/offers') 
                  ? 'text-[#171717] dark:text-white bg-white/60 dark:bg-white/15 shadow-whisper' 
                  : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10'
              }`}
            >
              Offers
            </Link>
            <Link 
              to="/about" 
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                isActive('/about') 
                  ? 'text-[#171717] dark:text-white bg-white/60 dark:bg-white/15 shadow-whisper' 
                  : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                isActive('/contact') 
                  ? 'text-[#171717] dark:text-white bg-white/60 dark:bg-white/15 shadow-whisper' 
                  : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10'
              }`}
            >
              Contact
            </Link>
            {user ? (
              <Link 
                to="/orders" 
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                  isActive('/orders') 
                    ? 'text-[#171717] dark:text-white bg-white/60 dark:bg-white/15 shadow-whisper' 
                    : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10'
                }`}
              >
                Orders
              </Link>
            ) : null}
            {user?.role === 'admin' ? (
              <Link 
                to="/admin" 
                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-[#0070f3] dark:text-[#50e3c2] hover:bg-[#0070f3]/10 transition-colors"
              >
                Admin Panel
              </Link>
            ) : null}
          </nav>

          {/* Desktop Right Controls */}
          <div className="hidden md:flex items-center space-x-2.5">
            <button 
              onClick={toggleTheme} 
              aria-label="Toggle dark mode"
              className="p-2 rounded-full border border-white/40 dark:border-white/10 bg-white/40 dark:bg-white/10 text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white transition-colors"
            >
              {theme === 'light' ? <FiMoon size={15} /> : <FiSun size={15} />}
            </button>

            <Link 
              to="/cart" 
              className="relative p-2 rounded-full border border-white/40 dark:border-white/10 bg-white/40 dark:bg-white/10 text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white transition-colors"
            >
              <FiShoppingCart size={15} />
              {cartCount > 0 ? (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-[#171717] dark:bg-white dark:text-[#171717] rounded-full shadow-whisper">
                  {cartCount}
                </span>
              ) : null}
            </Link>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="btn-ghost-sm !rounded-full !px-3 !bg-white/50 dark:!bg-white/10 !border-white/40 dark:!border-white/10"
                >
                  <FiUser size={14} />
                  <span className="text-[13px] font-medium">{user.name}</span>
                </button>
                {userDropdown ? (
                  <div className="absolute right-0 top-full mt-3 w-48 liquid-glass-dropdown rounded-2xl p-1.5 z-50">
                    <Link 
                      to="/profile" 
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-[13px] text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
                    >
                      <FiUser size={14} /> Profile
                    </Link>
                    <Link 
                      to="/favorites" 
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-[13px] text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
                    >
                      <FiHeart size={14} /> Favorites
                    </Link>
                    <Link 
                      to="/orders" 
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-[13px] text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
                    >
                      <FiPackage size={14} /> Orders
                    </Link>
                    <div className="my-1 border-t border-white/20 dark:border-white/10"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-[13px] text-[#ee0000] hover:bg-[#ee0000]/10 transition-colors"
                    >
                      <FiLogOut size={14} /> Logout
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-ghost-sm !rounded-full !px-4 !bg-white/50 dark:!bg-white/10 !border-white/40 dark:!border-white/10">
                  Log In
                </Link>
                <Link to="/login" className="btn-primary-sm !rounded-full !px-4">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-2">
            <Link to="/cart" className="relative p-2 text-[#171717] dark:text-white">
              <FiShoppingCart size={18} />
              {cartCount > 0 ? (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-[10px] rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              ) : null}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 text-[#171717] dark:text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Liquid Glass Dropdown Menu */}
      {isMenuOpen ? (
        <div className="md:hidden mt-2 liquid-glass-dropdown rounded-3xl p-4 space-y-2">
          <Link 
            to="/" 
            onClick={() => setIsMenuOpen(false)} 
            className="block py-2 px-3 rounded-xl text-[14px] font-medium text-[#171717] dark:text-white hover:bg-white/40 dark:hover:bg-white/10"
          >
            Home
          </Link>
          <Link 
            to="/menu" 
            onClick={() => setIsMenuOpen(false)} 
            className="block py-2 px-3 rounded-xl text-[14px] font-medium text-[#171717] dark:text-white hover:bg-white/40 dark:hover:bg-white/10"
          >
            Menu
          </Link>
          <Link 
            to="/offers" 
            onClick={() => setIsMenuOpen(false)} 
            className="block py-2 px-3 rounded-xl text-[14px] font-medium text-[#171717] dark:text-white hover:bg-white/40 dark:hover:bg-white/10"
          >
            Offers
          </Link>
          <Link 
            to="/about" 
            onClick={() => setIsMenuOpen(false)} 
            className="block py-2 px-3 rounded-xl text-[14px] font-medium text-[#171717] dark:text-white hover:bg-white/40 dark:hover:bg-white/10"
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setIsMenuOpen(false)} 
            className="block py-2 px-3 rounded-xl text-[14px] font-medium text-[#171717] dark:text-white hover:bg-white/40 dark:hover:bg-white/10"
          >
            Contact
          </Link>
          {user ? (
            <>
              <Link 
                to="/orders" 
                onClick={() => setIsMenuOpen(false)} 
                className="block py-2 px-3 rounded-xl text-[14px] font-medium text-[#171717] dark:text-white hover:bg-white/40 dark:hover:bg-white/10"
              >
                Orders
              </Link>
              <Link 
                to="/favorites" 
                onClick={() => setIsMenuOpen(false)} 
                className="block py-2 px-3 rounded-xl text-[14px] font-medium text-[#171717] dark:text-white hover:bg-white/40 dark:hover:bg-white/10"
              >
                Favorites
              </Link>
              <Link 
                to="/profile" 
                onClick={() => setIsMenuOpen(false)} 
                className="block py-2 px-3 rounded-xl text-[14px] font-medium text-[#171717] dark:text-white hover:bg-white/40 dark:hover:bg-white/10"
              >
                Profile ({user.name})
              </Link>
              <button 
                onClick={handleLogout} 
                className="w-full text-left py-2 px-3 rounded-xl text-[14px] font-medium text-[#ee0000]"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-2 flex gap-3">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn-primary-sm flex-1 text-center !rounded-full">
                Log In
              </Link>
            </div>
          )}
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
