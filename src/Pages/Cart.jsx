import React, { useState, useEffect } from "react";
import { FaTrash, FaSpinner } from "react-icons/fa";
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

      console.log("Cart response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        throw new Error(errorData.message || "Failed to fetch cart items");
      }

      const data = await response.json(); // ✅ جلب الداتا هنا
      console.log("🛒 cart data from API:", data); // ✅ الآن يمكن طباعة الداتا

      // تحقق مما إذا كانت الداتا عبارة عن كائن أو مصفوفة
      if (Array.isArray(data)) {
        setCartItems(data);
      } else if (Array.isArray(data.items)) {
        setCartItems(data.items);
      } else {
        console.error("❌ Unexpected cart data format:", data);
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
      console.log("Attempting to remove cart item:", cartItemId);

      const response = await fetch(
        `http://localhost:8080/api/cart/delete/${cartItemId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Delete error response:", errorData);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-40">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cartItems.length === 0 && !loading ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <button
            onClick={() => navigate("/All")}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b border-gray-200 py-6"
              >
                <img
                  src={item.productImageStatus}
                  alt={item.productName}
                  className="w-24 h-24 object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/100";
                  }}
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.productOfficialName}
                  </h3>
                  <p className="text-gray-600">
                    ${parseFloat(item.productPrice).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={loadingItems[item.productId]}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                  >
                    {loadingItems[item.productId] ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaTrash />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
                onClick={() =>
                  toast.info("Checkout functionality coming soon!")
                }
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
