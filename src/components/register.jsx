import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    } 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <div className="container mx-auto">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 " >
                    <h1 className="text-2xl font-bold mb-4">Register Page</h1>
                    <form onSubmit={handleSubmit}>
                        <input className="form-control mb-3 border border-gray-300 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " type="text" name="name" placeholder="Name" onChange={handleInputChange}/>
                        <input className="form-control mb-3 border border-gray-300 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="text" name="email" placeholder="Email" onChange={handleInputChange}/>
                        <input className="form-control mb-3 border border-gray-300 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="password" name="password" placeholder="Password" onChange={handleInputChange}/>
                        <input className="form-control mb-3 border border-gray-300 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange}/>

                        <Link to="" className="text-center mt-3 text-blue-500 ">forgot password?</Link>
                        
                        <Link to="/login" className="text-center mt-3 text-blue-500">Already have an account? Login</Link>

                        <button className="btn btn-primary w-full mt-3 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;    