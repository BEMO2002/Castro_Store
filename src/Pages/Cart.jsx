import React, { useState, useEffect } from "react";
import { FaTrash, FaSpinner, FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.productPrice),
      0
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32 min-h-screen">
      <ToastContainer position="top-center" autoClose={3000} />

      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors"
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
        <div className="text-center py-12">
          <div className="bg-gray-100 p-8 rounded-lg inline-block">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items yet
            </p>
            <button
              onClick={() => navigate("/All")}
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 cursor-pointer">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">
              Cart Items ({cartItems.length})
            </h2>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 border-b border-gray-100 py-6 last:border-0"
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.productImageStatus}
                    alt={item.productName}
                    className="w-full h-full object-cover rounded-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/100?text=No+Image";
                    }}
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 ">
                    {item.productOfficialName}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    ${parseFloat(item.productPrice).toFixed(2)}
                  </p>
                </div>
                <div className="">
                  <p className="text-center">{item.productNotes}</p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={loadingItems[item.productId]}
                  className="text-gray-400 hover:text-red-600 disabled:opacity-50 transition-colors p-2"
                  title="Remove item"
                >
                  {loadingItems[item.productId] ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaTrash />
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
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
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
                onClick={() =>
                  toast.info("Checkout functionality coming soon!")
                }
              >
                Proceed to Checkout
              </button>

              <p className="text-sm text-gray-500 mt-4 text-center">
                Free shipping and returns on all orders
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
