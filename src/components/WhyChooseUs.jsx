import React from 'react';
import { FaTruck, FaGift, FaLeaf, FaHeadset } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaTruck className="text-4xl text-rose-500 mb-4" />,
      title: "Free Shipping",
      description: "Free shipping on all orders over $50"
    },
    {
      icon: <FaGift className="text-4xl text-rose-500 mb-4" />,
      title: "Special Offer",
      description: "Special offers and gifts for our loyal customers"
    },
    {
      icon: <FaLeaf className="text-4xl text-rose-500 mb-4" />,
      title: "Fresh Flowers",
      description: "100% fresh and beautiful flowers"
    },
    {
      icon: <FaHeadset className="text-4xl text-rose-500 mb-4" />,
      title: "24/7 Support",
      description: "Our support team is always here to help"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <motion.section 
      className="py-16 bg-[#F7F7F7]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Us
          </h2>
          <motion.div 
            className="w-20 h-1 bg-rose-500 mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to providing the best quality flowers and exceptional service
          </p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-all hover:-translate-y-1"
              variants={item}
              whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            >
              <motion.div 
                className="flex justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
