import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Contact = () => {
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

    return (
        <div className="min-h-screen bg-gray-50">
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
                <div className="relative container mx-auto px-4 ">
                    <h1 className="text-md mb-4 text-white">CONTACT US</h1>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">We'd love to hear from you</h1>
                    {/* <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white">Share some details here. This is Flexible section where you can share anything you want. It could be details or some information.</p> */}
                    {/* <Link to="/shop" className="bg-white text-pink-600 px-10 py-4 rounded-full font-semibold hover:bg-pink-100 transition-all hover:scale-105 inline-block text-lg">
                        Shop Now
                    </Link> */}
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                        <p className="text-gray-600 mb-8">
                            Have a question or special request? Fill out the form and our team will get back to you within 24 hours.
                        </p>

                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-rose-100 p-3 rounded-lg">
                                    <MapPin className="text-rose-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                                    <p className="text-gray-600">123 Flower Street, Garden City, India</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-rose-100 p-3 rounded-lg">
                                    <Phone className="text-rose-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                                    <p className="text-gray-600">+91 12345678990</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-rose-100 p-3 rounded-lg">
                                    <Mail className="text-rose-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                                    <p className="text-gray-600">hello@flowers.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-rose-100 p-3 rounded-lg">
                                    <Clock className="text-rose-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Working Hours</h3>
                                    <p className="text-gray-600">Monday - Sunday: 9:00 AM - 8:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>

                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                                Thank you! Your message has been sent successfully.
                            </div>
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;