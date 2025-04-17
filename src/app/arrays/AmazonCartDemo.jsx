'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function AmazonCartDemo({ products }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6">
      {/* 🛍️ Cart Section */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg shadow p-4 mb-6">
        <h3 className="font-semibold text-blue-700 text-lg mb-2">🛒 Your Cart</h3>
        {cart.length === 0 ? (
          <p className="text-sm text-blue-500 italic">No items added yet</p>
        ) : (
          <ul className="space-y-1 text-sm text-blue-800">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center border-b border-blue-200 py-1">
                <span>{item.name}</span>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🛒 Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4 text-left border hover:border-blue-300 transition">
            {/* <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={130}
              className="rounded-md object-cover w-full h-32"
            /> */}
            <h4 className="font-medium text-gray-800 mt-2">{product.name}</h4>
            <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
