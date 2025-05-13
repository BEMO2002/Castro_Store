import React from "react";
import suits from "../../assets/Categories/Classic Suit2.jpg";
import jacket from "../../assets/Categories/jacket1.jpg";
import boy from "../../assets/Categories/boy2.jpg";
const Categories = () => {
  const categories = [
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      title: "Men's Jackets",
      description:
        "Premium jackets for all seasons - leather, denim, bomber & more",
      count: "245 Styles",
      image: jacket,
    },
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      title: "Men's Suits",
      description: "Elegant formal wear for business and special occasions",
      count: "189 Styles",
      image: suits,
    },
    {
      id: 3,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "Boys Clothing",
      description: "Trendy outfits for boys of all ages",
      count: "312 Styles",
      image: boy,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of men's and boys' fashion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="relative  overflow-hidden  h-48 ">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full  object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-assent-tertiary text-black mr-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {category.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-black ">
                    {category.count}
                  </span>
                  <button className="text-black hover:text-primary  font-bold text-sm flex items-center transition-all duration-300">
                    Shop Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="relative inline-block my-4 px-10 py-4 text-center bg-black text-white
            text-lg tracking-wider no-underline font-bold
            cursor-pointer transition-all duration-500 ease-out
            shadow-[inset_0_0_0_0_#ff4135]
            hover:text-white hover:shadow-[inset_0_-100px_0_0_#ff4135]
            active:scale-90"
          >
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
