import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMapPin, FiCreditCard, FiEdit2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('details');

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  if (!user) {
    return <div className="pt-24 text-center">Please login to view profile.</div>;
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Helmet><title>My Profile | CraveBite</title></Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white dark:bg-dark-surface rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
              <div className="flex flex-col items-center mb-8 text-center">
                <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full flex items-center justify-center text-4xl mb-4 relative">
                  {user.name.charAt(0).toUpperCase()}
                  <button className="absolute bottom-0 right-0 bg-white dark:bg-dark-surface p-2 rounded-full shadow-md text-gray-500 hover:text-primary-600">
                    <FiEdit2 size={14} />
                  </button>
                </div>
                <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'details' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-surfaceHover'}`}
                >
                  <FiUser /> Personal Details
                </button>
                <button 
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'addresses' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-surfaceHover'}`}
                >
                  <FiMapPin /> Saved Addresses
                </button>
                <button 
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'payments' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-surfaceHover'}`}
                >
                  <FiCreditCard /> Payment Methods
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white dark:bg-dark-surface rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-white/5">
              {activeTab === 'details' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">Personal Details</h3>
                  <form onSubmit={handleSave} className="space-y-6 max-w-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                      <input type="text" defaultValue={user.name} className="w-full px-4 py-3 rounded-xl border dark:bg-dark-bg dark:border-white/10 focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                      <input type="email" defaultValue={user.email} disabled className="w-full px-4 py-3 rounded-xl border dark:bg-dark-bg dark:border-white/10 bg-gray-50 dark:bg-dark-bg opacity-70 cursor-not-allowed" />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                      <input type="tel" defaultValue="9990285721" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 rounded-xl border dark:bg-dark-bg dark:border-white/10 focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <button type="submit" className="px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors">
                      Save Changes
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Saved Addresses</h3>
                    <button className="text-primary-600 font-medium hover:text-primary-700">+ Add New</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-primary-200 dark:border-primary-900/50 bg-primary-50/50 dark:bg-primary-900/10 rounded-2xl p-6 relative">
                      <span className="absolute top-4 right-4 bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 text-xs font-bold px-2 py-1 rounded">Default</span>
                      <h4 className="font-bold flex items-center gap-2 mb-2"><FiMapPin /> Home</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Ghaziabad</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Uttar Pradesh, 201002</p>
                      <div className="flex gap-4">
                        <button className="text-sm font-medium text-primary-600">Edit</button>
                        <button className="text-sm font-medium text-red-500">Delete</button>
                      </div>
                    </div>
                    <div className="border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                      <h4 className="font-bold flex items-center gap-2 mb-2"><FiMapPin /> Work</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Tech Park, Tower B</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Gurugram, 122001</p>
                      <div className="flex gap-4">
                        <button className="text-sm font-medium text-primary-600">Edit</button>
                        <button className="text-sm font-medium text-red-500">Delete</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'payments' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                   <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Payment Methods</h3>
                    <button className="text-primary-600 font-medium hover:text-primary-700">+ Add Card</button>
                  </div>
                  <div className="border border-gray-200 dark:border-white/10 rounded-2xl p-6 max-w-md flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                        <p className="text-xs text-gray-500">Expires 12/28</p>
                      </div>
                    </div>
                    <button className="text-red-500 hover:text-red-600">Remove</button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
