import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart, FaStar, FaRegStar, FaArrowLeft } from "react-icons/fa";
import { MdOutlineInventory2, MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { fadeIn } from "../Framermotion/varient";
function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loadingProducts, setLoadingProducts] = useState({});
  const [cartError, setCartError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);
  console.log("Product ID from URL:", id);

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400" half />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };
  const handleAddToCart = async (productId) => {
    try {
      setLoadingProducts((prev) => ({ ...prev, [productId]: true }));
      setCartError(null);

      const response = await fetch("http://localhost:8080/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      toast.success("Item added to cart successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
      setCartError(err.message);
      toast.error("Failed to add item to cart. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoadingProducts((prev) => ({ ...prev, [productId]: false }));
    }
  };
  if (loading)
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        <p className="text-gray-600 mt-4">Loading product details...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <MdErrorOutline className="text-4xl text-red-600 mb-4" />
        <p className="text-xl text-red-600 mb-2">Error loading product</p>
        <p className="text-gray-600 max-w-md text-center">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-black text-white rounded-md flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Products
        </button>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <p className="text-xl text-gray-600 mb-4">Product not found</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-black text-white rounded-md flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Products
        </button>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToastContainer />
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Back to Jackets
      </button>

      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg overflow-hidden h-96 flex items-center justify-center">
            <img
              src={product.productImageStatus}
              alt={product.productName}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.productOfficialName}
          </h1>
          <p className="text-gray-500 mb-4">{product.productOfficialSerial}</p>

          <div className="flex items-center mb-6">
            <div className="flex mr-2">
              {renderRatingStars(product.rating || 4.5)}
            </div>
            <span className="text-gray-600 text-sm">
              ({product.reviewCount || 24} reviews)
            </span>
          </div>

          <div className="mb-6">
            <span className="text-2xl font-bold text-black">
              ${parseFloat(product.productprice).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through ml-2">
                ${parseFloat(product.originalPrice).toFixed(2)}
              </span>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-700">
              {product.productNotes ||
                "Premium quality jacket with excellent craftsmanship. Made from high-quality materials designed for durability and comfort."}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2 flex items-center">
              <MdOutlineInventory2 className="mr-1" />
              {product.stockQuantity} available in stock
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleAddToCart(product.id)}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 font-medium flex items-center justify-center"
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <button className="w-full bg-white text-black py-3 rounded-md border border-black hover:bg-gray-100 transition-colors duration-300 font-medium">
              Buy Now
            </button>
          </div>

          {product.productNotes && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-gray-600">{product.productNotes}</p>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="mt-16 border-t border-gray-200 pt-12"
      >
        <h2 className="text-2xl font-bold mb-8">Product Details</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>High-quality materials for durability</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Water-resistant fabric</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Multiple pockets for convenience</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Adjustable cuffs and hem</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Specifications</h3>
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 text-gray-600">Material</td>
                  <td className="py-2 font-medium">Polyester, Cotton blend</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Color</td>
                  <td className="py-2 font-medium">Black</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Closure</td>
                  <td className="py-2 font-medium">Zipper</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Care Instructions</td>
                  <td className="py-2 font-medium">Machine wash cold</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Details;
