import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../contexts';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
          
            const userData = {
                email: formData.email,
                name: formData.email.split('@')[0] 
            };
            
            login(userData);
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" 
                 style={{ backgroundImage: 'url()' }}>
                <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                        <p className="text-gray-600">Please sign in to your account</p>
                        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>}
                        <Link to="/register" className="inline-block border-2 border-white px-8 py-2 rounded-full hover:bg-white hover:bg-opacity-20 transition duration-300">
                            SIGN UP
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign in to Website</h2>
                    <div className="flex items-center mb-8">
                        <div className="h-1 w-10 bg-pink-500 mr-2"></div>
                        <span className="text-gray-600">or use your email account</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="text-sm text-pink-500 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                        >
                            SIGN IN
                        </button>

                        <div className="text-center mt-4">
                            <span className="text-sm text-gray-600">Don't have an account? </span>
                            <Link to="/register" className="text-sm text-pink-500 hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
