import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from('contact_messages').insert(formData);

        if (!error) {
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSuccess(false), 3000);
        }

        setLoading(false);
    };

    const fadeUp = { 
        hidden: { y: 16, opacity: 0 }, 
        show: { y: 0, opacity: 1, transition: { duration: 0.5 } } 
    };
    
    const container = { 
        hidden: {}, 
        show: { transition: { staggerChildren: 0.08 } } 
    };

    return (
        <motion.div 
            className="min-h-screen bg-gray-50" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.4 }}
        >
            <div
                className="relative h-[400px] bg-cover bg-center flex items-center justify-center text-center"
                style={{
                    backgroundImage: 'url(https://websitedemos.net/florist-04/wp-content/uploads/sites/346/2019/03/bg-09-free-img.jpg)',
                    backgroundPosition: 'center 30%',
                    backgroundSize: 'cover',
                    marginTop: '-80px',
                    paddingTop: '80px',
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <motion.div 
                    className="relative container mx-auto px-4" 
                    variants={container} 
                    initial="hidden" 
                    animate="show"
                >
                    <motion.h1 className="text-md mb-4 text-white" variants={fadeUp}>
                        CONTACT US
                    </motion.h1>
                    <motion.h1 
                        className="text-5xl md:text-7xl font-bold mb-6 text-white" 
                        variants={fadeUp}
                    >
                        We'd love to hear from you
                    </motion.h1>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <motion.h2 
                            className="text-2xl font-bold text-gray-800 mb-6" 
                            variants={fadeUp} 
                            initial="hidden" 
                            whileInView="show" 
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            Get in Touch
                        </motion.h2>
                        <motion.p 
                            className="text-gray-600 mb-8"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            Have a question or special request? Fill out the form and our team will get back to you within 24 hours.
                        </motion.p>

                        <motion.div 
                            className="space-y-6 mb-8" 
                            variants={container} 
                            initial="hidden" 
                            whileInView="show" 
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <motion.div className="flex items-start gap-4" variants={fadeUp}>
                                <div className="bg-rose-100 p-3 rounded-lg">
                                    <MapPin className="text-rose-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                                    <p className="text-gray-600">123 Flower Street, Garden City, India</p>
                                </div>
                            </motion.div>

                            <motion.div className="flex items-start gap-4" variants={fadeUp}>
                                <div className="bg-rose-100 p-3 rounded-lg">
                                    <Phone className="text-rose-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                                    <p className="text-gray-600">+91 1234567890</p>
                                </div>
                            </motion.div>

                            <motion.div className="flex items-start gap-4" variants={fadeUp}>
                                <div className="bg-rose-100 p-3 rounded-lg">
                                    <Mail className="text-rose-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                                    <p className="text-gray-600">hello@flowershop.com</p>
                                </div>
                            </motion.div>

                            <motion.div className="flex items-start gap-4" variants={fadeUp}>
                                <div className="bg-rose-100 p-3 rounded-lg">
                                    <Clock className="text-rose-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Working Hours</h3>
                                    <p className="text-gray-600">Monday - Sunday: 9:00 AM - 8:00 PM</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div 
                        className="bg-white rounded-lg shadow-lg p-8"
                        initial={{ y: 16, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h2 
                            className="text-2xl font-bold text-gray-800 mb-6" 
                            variants={fadeUp} 
                            initial="hidden" 
                            whileInView="show" 
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            Send us a Message
                        </motion.h2>

                        {success && (
                            <motion.div 
                                className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                Thank you! Your message has been sent successfully.
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 px-6 rounded-lg font-semibold text-white ${
                                    loading ? 'bg-rose-400' : 'bg-rose-600 hover:bg-rose-700'
                                } transition-colors`}
                                whileHover={{ scale: loading ? 1 : 1.01 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;