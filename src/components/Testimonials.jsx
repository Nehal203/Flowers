import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "niraj",
      role: "CEO, Flora"
    },
    {
      id: 2,
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      author: "sachin",
      role: "Marketing Director"
    },
    {
      id: 3,
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      author: "rohit",
      role: "Product Manager"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getCardWidth = () => {
    if (isMobile) return 'w-full';
    if (window.innerWidth < 1024) return 'w-1/2';
    return 'w-1/3';
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const slideIn = {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <motion.section 
      className="py-20 bg-gray-50 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          variants={item}
        >
          <motion.h2 
            className="text-4xl font-bold text-gray-800 mb-4 relative inline-block"
          >
            What Our Clients Say
            <motion.span 
              className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-pink-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            variants={item}
          >
            Read the success stories and heartfelt words from the people we've worked with.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="relative"
          variants={container}
        >
          <motion.button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-pink-500 hover:text-white transition-all duration-300 -ml-6"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronLeft className="text-xl" />
          </motion.button>
          
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide}
                className="flex"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideIn}
                transition={{ duration: 0.5 }}
              >
                {testimonials.slice(currentSlide, currentSlide + (isMobile ? 1 : 3)).map((testimonial, index) => (
                  <motion.div 
                    key={testimonial.id} 
                    className={`${getCardWidth()} px-4`}
                    variants={item}
                  >
                    <motion.div 
                      className="bg-white p-8 rounded-lg shadow-md h-full flex flex-col"
                      whileHover={{ 
                        y: -5,
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <motion.div 
                        className="text-pink-500 text-3xl mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <FaQuoteLeft />
                      </motion.div>
                      <motion.p 
                        className="text-gray-600 italic mb-6 leading-relaxed flex-grow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {testimonial.text}
                      </motion.p>
                      <motion.div 
                        className="flex gap-1 mb-3 text-yellow-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </motion.div>
                      <motion.div 
                        className="border-t border-gray-100 pt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <motion.button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-pink-500 hover:text-white transition-all duration-300 -mr-6"
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronRight className="text-xl" />
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="flex justify-center mt-8 space-x-2"
          variants={container}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-pink-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              initial={{ width: '0.75rem' }}
              animate={{ 
                width: currentSlide === index ? '2rem' : '0.75rem',
                backgroundColor: currentSlide === index ? '#ec4899' : '#e5e7eb'
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Testimonials;