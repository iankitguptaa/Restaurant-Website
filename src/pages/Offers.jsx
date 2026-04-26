import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const Offers = () => {
  const offersList = [
    { id: 1, code: 'WELCOME50', discount: '50% OFF', desc: 'On your first order up to ₹150', valid: 'Valid for new users only' },
    { id: 2, code: 'CRAVE20', discount: '20% OFF', desc: 'On all orders above ₹500', valid: 'Valid till end of month' },
    { id: 3, code: 'FREEDEL', discount: 'FREE DELIVERY', desc: 'On orders above ₹300', valid: 'Unlimited uses' }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Helmet><title>Offers | CraveBite</title></Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4 text-center">Special Offers</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Grab these amazing deals and enjoy delicious food at unbeatable prices!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offersList.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-dark-surface rounded-3xl p-8 border border-primary-100 dark:border-primary-500/20 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              
              <div className="text-primary-600 dark:text-primary-400 font-extrabold text-3xl mb-2">{offer.discount}</div>
              <p className="text-gray-900 dark:text-white font-medium mb-6 h-12">{offer.desc}</p>
              
              <div className="bg-white dark:bg-dark-bg border-2 border-dashed border-primary-200 dark:border-primary-500/30 rounded-xl p-4 text-center mb-4 cursor-copy hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors">
                <span className="font-mono font-bold text-lg tracking-wider text-gray-900 dark:text-white">{offer.code}</span>
              </div>
              
              <p className="text-xs text-gray-500 text-center">{offer.valid}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
