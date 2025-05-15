import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaSpinner, FaSearch } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { MdOutlineInventory2, MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notfound from "../assets/Categories/notfound.webp";
import { motion } from "framer-motion";
import { fadeIn } from "../Framermotion/varient";
function Girls() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState({});
  const [cartError, setCartError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    minPrice: "",
    maxPrice: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products from API...");
        let url = "http://localhost:8080/api/products";

        if (
          searchParams.keyword ||
          searchParams.minPrice ||
          searchParams.maxPrice
        ) {
          const params = new URLSearchParams();
          if (searchParams.keyword)
            params.append("keyword", searchParams.keyword);
          if (searchParams.minPrice)
            params.append("minPrice", searchParams.minPrice);
          if (searchParams.maxPrice)
            params.append("maxPrice", searchParams.maxPrice);

          url = `http://localhost:8080/api/products/search?${params.toString()}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        console.log("Finished fetching products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);
  const handleSearch = (e) => {
    e.preventDefault();

    setSearchParams({
      ...searchParams,
      keyword: e.target.keyword.value,
      minPrice: e.target.minPrice.value,
      maxPrice: e.target.maxPrice.value,
    });
  };

  const handleResetFilters = () => {
    setSearchParams({
      keyword: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  const handleDetailClick = (id) => {
    navigate(`/details/${id}`);
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
        <FaSpinner className="animate-spin text-4xl text-black mb-4" />
        <p className="text-gray-600">Loading jackets collection...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <MdErrorOutline className="text-4xl text-red-600 mb-4" />
        <p className="text-xl text-red-600 mb-2">Error loading products</p>
        <p className="text-gray-600 max-w-md text-center">{error}</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-40">
      <ToastContainer />
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Girl's Causal Collection
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Premium quality jackets for every occasion and season
        </p>
      </motion.div>

      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="mb-8 p-4 bg-gray-50 rounded-lg"
      >
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              name="keyword"
              placeholder="Search products..."
              className="pl-10 w-full p-2 border border-gray-300 rounded-md"
              defaultValue={searchParams.keyword}
            />
          </div>

          <div className="flex gap-4">
            <input
              type="number"
              name="minPrice"
              placeholder="Min price"
              className="w-24 p-2 border border-gray-300 rounded-md"
              defaultValue={searchParams.minPrice}
            />

            <input
              type="number"
              name="maxPrice"
              placeholder="Max price"
              className="w-24 p-2 border border-gray-300 rounded-md"
              defaultValue={searchParams.maxPrice}
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Search
          </button>

          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            Reset
          </button>
        </form>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0 }}
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col"
          >
            <div className="relative h-64 overflow-hidden group">
              <img
                onClick={() => handleDetailClick(product.id)}
                src={product.productImageStatus}
                alt={product.productName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold flex items-center ${
                  product.productStatus.toLowerCase() === "in stock"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.productStatus}
              </span>
            </div>

            <div className="p-5 flex-grow flex flex-col">
              <div className="mb-3">
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {product.productOfficialName}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {product.productOfficialSerial}
                </p>
              </div>

              <div className="flex justify-between items-center mb-4 mt-auto">
                <span className="text-xl font-bold text-black">
                  ${parseFloat(product.productprice).toFixed(2)}
                </span>
                <span className="text-sm text-gray-600 flex items-center">
                  <MdOutlineInventory2 className="mr-1" />
                  {product.stockQuantity}
                </span>
              </div>

              {product.productNotes && (
                <p className="text-gray-600 text-sm italic mb-5 line-clamp-2">
                  {product.productNotes}
                </p>
              )}

              <button
                onClick={() => handleAddToCart(product.id)}
                disabled={loadingProducts[product.id]}
                className="w-full bg-gradient-to-r from-black to-gray-400 text-white py-2.5 rounded-md duration-300 font-medium flex items-center justify-center"
              >
                {loadingProducts[product.id] ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaShoppingCart className="mr-2" />
                )}
                {loadingProducts[product.id] ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center  py-20">
          <img src={notfound} alt="" className="mx-auto" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600">
            {searchParams.keyword ||
            searchParams.minPrice ||
            searchParams.maxPrice
              ? "No products match your search criteria."
              : "We couldn't find any products in this category."}
          </p>
          {(searchParams.keyword ||
            searchParams.minPrice ||
            searchParams.maxPrice) && (
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-black text-white rounded-md"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Girls;
