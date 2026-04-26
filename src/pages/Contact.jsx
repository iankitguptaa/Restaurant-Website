import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
    e.target.reset();
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Helmet><title>Contact Us | CraveBite</title></Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you. Reach out to us using the details below or fill out the form.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-dark-surface p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5">
              <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-full text-primary-600 dark:text-primary-400">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Our Address</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Ghaziabad<br />Uttar Pradesh, 201002</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-full text-primary-600 dark:text-primary-400">
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Phone Number</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">+91 9990285721</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-full text-primary-600 dark:text-primary-400">
                    <FiMail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Email Address</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">support@cravebite.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-surface p-2 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 h-80 overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112028.98634860474!2d77.3486337854659!3d28.66531362796191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1a4666d9c61%3A0xc0d718a221fdd086!2sGhaziabad%2C%20Uttar%20Pradesh%20201002!5e0!3m2!1sen!2sin!4v1703448496464!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '1.25rem' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Ghaziabad"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-dark-surface p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5"
          >
            <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border dark:bg-dark-bg dark:border-white/10 focus:ring-2 focus:ring-primary-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input required type="email" className="w-full px-4 py-3 rounded-xl border dark:bg-dark-bg dark:border-white/10 focus:ring-2 focus:ring-primary-500" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea required rows="6" className="w-full px-4 py-3 rounded-xl border dark:bg-dark-bg dark:border-white/10 focus:ring-2 focus:ring-primary-500" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
