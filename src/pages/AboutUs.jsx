import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Helmet><title>About Us | CraveBite</title></Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-surface rounded-3xl shadow-sm p-8 border border-gray-100 dark:border-white/5"
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-6">Our Story</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Welcome to CraveBite, your number one source for the best food in town. We're dedicated to giving you the very best dining experience, with a focus on freshness, customer service, and uniqueness.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Founded in 2026, CraveBite has come a long way from its beginnings. When our founders first started out, their passion for delivering "Happiness to your doorstep" drove them to do intense research, quit their day jobs, and turn hard work and inspiration into to a booming online food delivery service.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            We hope you enjoy our meals as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
          </p>
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10">
            <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Why Choose Us?</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">✔️ Lightning Fast Delivery</li>
              <li className="flex items-center gap-2">✔️ Fresh and Organic Ingredients</li>
              <li className="flex items-center gap-2">✔️ 24/7 Customer Support</li>
              <li className="flex items-center gap-2">✔️ Best Chefs in the City</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
