import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './utils/ScrollToTop';

import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import AboutUs from './pages/AboutUs';
import Offers from './pages/Offers';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Contact from './pages/Contact';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF9F2] dark:bg-[#12100E] text-[#1F1F1F] dark:text-[#F5F2EE] flex">
      <ScrollToTop />
      
      {/* Left Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen min-w-0">
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
        
        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
