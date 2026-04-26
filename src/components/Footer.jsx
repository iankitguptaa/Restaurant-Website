import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <span className="text-3xl font-display font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-4 inline-block">
              CraveBite
            </span>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6">
              Delivering happiness to your doorstep. Experience the best food from top chefs right at your home.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 font-display">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/menu" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Menu</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 font-display">Contact Us</h4>
            <ul className="space-y-3">
              <li className="text-gray-600 dark:text-gray-400">Ghaziabad, Uttar Pradesh 201002</li>
              <li className="text-gray-600 dark:text-gray-400">support@cravebite.com</li>
              <li className="text-gray-600 dark:text-gray-400">+91 9990285721</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-white/10 pt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CraveBite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
