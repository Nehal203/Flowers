import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderConfirmation = ({ orderDetails }) => {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const [hasClearedCart, setHasClearedCart] = React.useState(false);

  useEffect(() => {
    if (!hasClearedCart) {
      clearCart();
      setHasClearedCart(true);
      
      toast.success('Your order has been placed successfully!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    const timer = setTimeout(() => {
      navigate('/');
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [clearCart, navigate, orderDetails, hasClearedCart]);
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-12 sm:px-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase! Your order has been received and is being processed.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-medium">#{orderDetails?.orderId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-medium">${orderDetails?.total?.toFixed(2) || '0.00'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">{orderDetails?.paymentMethod || 'Credit Card'}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700"
            >
              Continue Shopping
            </Link>
            {/* <Link
              to="/orders"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View Orders
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
