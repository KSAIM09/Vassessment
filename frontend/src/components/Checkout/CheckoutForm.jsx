import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

const CheckoutForm = () => {
  const [amount, setAmount] = useState(0);

  const handleCheckout = () => {
    axiosInstance.post('/payment/checkout', { amount })
      .then((response) => {
        const { clientSecret } = response.data;
        // Handle payment integration here (Stripe.js, etc.)
        alert('Payment initiated!');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Amount (in USD)
      </label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        required
      />
      <button
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        onClick={handleCheckout}
      >
        Pay Now
      </button>
    </div>
  );
};

export default CheckoutForm;
