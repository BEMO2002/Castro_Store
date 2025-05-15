import React, { useState, useEffect } from "react";
import {
  FaTrash,
  FaSpinner,
  FaArrowLeft,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import cart from "../assets/Categories/cart.webp";
import { motion, AnimatePresence } from "framer-motion";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingItems, setLoadingItems] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/cart/all", {
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch cart items");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setCartItems(data);
      } else if (Array.isArray(data.items)) {
        setCartItems(data.items);
      } else {
        console.error("Unexpected cart data format:", data);
        toast.error("Unexpected response format from cart API");
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError(err.message);
      toast.error(err.message || "Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      setLoadingItems((prev) => ({ ...prev, [cartItemId]: true }));

      const response = await fetch(
        `http://localhost:8080/api/cart/delete/${cartItemId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove item");
      }

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== cartItemId)
      );
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Error removing item:", err);
      toast.error(err.message || "Failed to remove item from cart");
    } finally {
      setLoadingItems((prev) => ({ ...prev, [cartItemId]: false }));
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setLoadingItems((prev) => ({ ...prev, [cartItemId]: true }));

      const response = await fetch(
        `http://localhost:8080/api/cart/update/${cartItemId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update quantity");
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
      toast.error(err.message || "Failed to update quantity");
    } finally {
      setLoadingItems((prev) => ({ ...prev, [cartItemId]: false }));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.productPrice) * (item.quantity || 1),
      0
    );
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32 min-h-screen">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        toastClassName="shadow-lg"
        progressClassName="bg-black"
      />

      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors duration-200 hover:scale-105"
      >
        <FaArrowLeft className="mr-2" /> Back to shopping
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Your Shopping Cart
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <FaSpinner className="animate-spin text-4xl text-gray-400" />
        </div>
      ) : cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="max-w-md mx-auto">
            <img
              src={cart}
              className="mx-auto w-64 h-64 object-contain"
              alt="empty cart"
            />
            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mt-2 mb-6">
              Looks like you haven't added anything to your cart yet
            </p>
            <button
              onClick={() => navigate("/All")}
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 hover:scale-105 shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">
              Cart Items ({cartItems.length})
            </h2>

            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-6 border-b border-gray-100 py-6 last:border-0"
                >
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={item.productImageStatus}
                      alt={item.productName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/100?text=No+Image";
                      }}
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                      {item.productOfficialName}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      ${parseFloat(item.productPrice).toFixed(2)}
                    </p>

                    <div className="flex items-center mt-3">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            (item.quantity || 1) - 1
                          )
                        }
                        disabled={
                          loadingItems[item.id] || (item.quantity || 1) <= 1
                        }
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="mx-3 w-8 text-center">
                        {loadingItems[item.id] ? (
                          <FaSpinner className="animate-spin inline" />
                        ) : (
                          item.quantity || 1
                        )}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            (item.quantity || 1) + 1
                          )
                        }
                        disabled={loadingItems[item.id]}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                  </div>

                  <div className="text-center min-w-[100px]">
                    <p className="text-sm text-gray-500">{item.productNotes}</p>
                    <p className="font-medium mt-1">
                      $
                      {(
                        parseFloat(item.productPrice) * (item.quantity || 1)
                      ).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={loadingItems[item.id]}
                    className="text-gray-400 hover:text-red-600 disabled:opacity-50 transition-colors duration-200 p-2 hover:bg-red-50 rounded-full"
                    title="Remove item"
                  >
                    {loadingItems[item.id] ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaTrash />
                    )}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm sticky top-4 border border-gray-100"
            >
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-black">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/checkout")}
                className="w-full bg-gradient-to-r from-black to-primary text-white py-3 rounded-md hover:shadow-lg transition-all duration-200 font-medium"
              >
                Proceed to Checkout
              </motion.button>

              <p className="text-sm text-gray-500 mt-4 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block mr-1 -mt-1 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Free shipping and returns on all orders
              </p>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Need help?</h4>
                <p className="text-sm text-gray-500">
                  Contact our customer support at
                  <a
                    href="mailto:support@example.com"
                    className="text-indigo-600 hover:underline ml-1"
                  >
                    support@example.com
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
