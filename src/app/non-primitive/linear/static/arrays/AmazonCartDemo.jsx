'use client';

import { useState } from 'react';
import Image from 'next/image';

export const explainAmazonCart = () => {
  return (
    <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
      <h3 className="text-lg font-semibold text-green-800 mb-2">How Shopping Carts Work with Arrays</h3>
      <p className="text-green-700 mb-2">
        Shopping carts in e-commerce applications like Amazon use arrays to store and manage items. Here's how it works:
      </p>
      <ul className="list-disc pl-5 text-green-700 space-y-1 text-left">
        <li>Each item in the cart is an <strong>element</strong> in the array</li>
        <li>When a user adds an item, it's pushed to the end of the array</li>
        <li>When a user removes an item, it's filtered out or spliced from the array</li>
        <li>The array maintains the order of items as they were added</li>
        <li>Arrays allow for easy iteration to display all items in the cart</li>
        <li>Arrays enable quick calculations like total price by reducing over all items</li>
      </ul>
      <div className="mt-3 p-3 bg-green-100 rounded-md">
        <p className="text-green-800 font-medium">Code Implementation:</p>
        <pre className="text-xs text-green-900 mt-1 overflow-x-auto text-left">
{`// Shopping cart implementation
class ShoppingCart {
  constructor() {
    this.items = [];
  }
  
  addItem(product) {
    this.items.push(product);
  }
  
  removeItem(index) {
    this.items.splice(index, 1);
  }
  
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
  
  getItemCount() {
    return this.items.length;
  }
  
  clearCart() {
    this.items = [];
  }
}`}
        </pre>
      </div>
    </div>
  );
};

export default function AmazonCartDemo({ products }) {
  const [cart, setCart] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

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
      
      <div className="mt-6">
        <button 
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-1 text-green-600 hover:text-green-800"
        >
          <span>{showExplanation ? 'Hide' : 'Show'} Implementation Details</span>
          <span>{showExplanation ? '▲' : '▼'}</span>
        </button>
        {showExplanation && explainAmazonCart()}
      </div>
    </div>
  );
}
