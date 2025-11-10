import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Reset password requested for:', email);
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" 
                 style={{ backgroundImage: 'url()' }}>
                <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center p-8">
                        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                        <p className="mb-8">To keep connected with us please login with your personal info</p>
                        <Link to="/login" className="inline-block border-2 border-white px-8 py-2 rounded-full hover:bg-white hover:bg-opacity-20 transition duration-300">
                            SIGN IN
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <Link to="/login" className="flex items-center text-gray-600 hover:text-pink-500 mb-6">
                        <FiArrowLeft className="mr-2" /> Back to Login
                    </Link>
                    
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password</h2>
                    <div className="flex items-center mb-8">
                        <div className="h-1 w-10 bg-pink-500 mr-2"></div>
                        <span className="text-gray-600">Enter your email to reset your password</span>
                    </div>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                            >
                                SEND RESET LINK
                            </button>
                        </form>
                    ) : (
                        <div className="text-center p-6 bg-green-50 rounded-lg">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Check your email</h3>
                            <p className="text-gray-600">We've sent a password reset link to <span className="font-medium">{email}</span></p>
                            <p className="text-sm text-gray-500 mt-2">Didn't receive the email? <button onClick={() => setIsSubmitted(false)} className="text-pink-500 hover:underline">Click to resend</button></p>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-pink-500 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
