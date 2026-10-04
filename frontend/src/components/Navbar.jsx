import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  FiSearch, FiShoppingBag, FiUser, FiLogOut,
  FiMapPin, FiChevronDown, FiMenu, FiX, FiPackage
} from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdown, setUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    setUserDropdown(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/menu' },
    { name: 'Offers', path: '/offers' },
    { name: 'Track Order', path: '/orders' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1C1C1C] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-[#E8232A] rounded-full flex items-center justify-center shadow-md">
              <FaUtensils size={14} className="text-white" />
            </div>
            <div>
              <span className="text-white font-extrabold text-lg leading-none">BiteRoute</span>
              <p className="text-[#9E9E9E] text-[10px] leading-none mt-0.5">Good food delivered</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-white bg-white/10'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Location Selector */}
          <button className="hidden md:flex items-center gap-2 text-[#B0B0B0] hover:text-white transition-colors text-sm shrink-0">
            <FiMapPin size={15} className="text-[#E8232A]" />
            <span className="max-w-[120px] truncate">New Delhi, IND</span>
            <FiChevronDown size={14} />
          </button>

          {/* Search (center) */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:flex relative">
            <FiSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E9E9E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search restaurants, dishes..."
              className="w-full bg-[#2C2C2C] border border-[#3A3A3A] text-white placeholder-[#6E6E6E] text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#E8232A] transition-colors"
            />
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#B0B0B0] hover:text-white transition-colors"
            >
              <FiShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E8232A] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#B0B0B0] hover:text-white transition-colors"
                aria-label="User menu"
              >
                <div className="w-7 h-7 rounded-full bg-[#E8232A] flex items-center justify-center">
                  <FiUser size={14} className="text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-[#B0B0B0]">
                  {user ? user.name.split(' ')[0] : 'Login'}
                </span>
                <FiChevronDown size={14} className="hidden sm:block" />
              </button>

              {userDropdown && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#E8E0D8] overflow-hidden z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-[#F0EBE5]">
                        <p className="text-sm font-bold text-[#1C1C1C]">{user.name}</p>
                        <p className="text-xs text-[#6E6E6E]">{user.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setUserDropdown(false)} className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#1C1C1C] hover:bg-[#F8F3EE] transition-colors">
                        <FiUser size={15} className="text-[#E8232A]" /> My Profile
                      </Link>
                      <Link to="/orders" onClick={() => setUserDropdown(false)} className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#1C1C1C] hover:bg-[#F8F3EE] transition-colors">
                        <FiPackage size={15} className="text-[#E8232A]" /> My Orders
                      </Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setUserDropdown(false)} className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#1C1C1C] hover:bg-[#F8F3EE] transition-colors font-semibold">
                          🛠 Admin Panel
                        </Link>
                      )}
                      <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-[#E8232A] hover:bg-[#FFF0F0] transition-colors border-t border-[#F0EBE5]">
                        <FiLogOut size={15} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setUserDropdown(false)} className="block px-4 py-3 text-sm font-semibold text-[#1C1C1C] hover:bg-[#F8F3EE] transition-colors">
                        Sign In
                      </Link>
                      <Link to="/login" onClick={() => setUserDropdown(false)} className="block px-4 py-3 text-sm text-[#6E6E6E] hover:bg-[#F8F3EE] transition-colors border-t border-[#F0EBE5]">
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#B0B0B0] hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-1 border-t border-[#2C2C2C] pt-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-3">
              <FiSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E9E9E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search restaurants, dishes..."
                className="w-full bg-[#2C2C2C] border border-[#3A3A3A] text-white placeholder-[#6E6E6E] text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#E8232A]"
              />
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-white bg-white/10'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
