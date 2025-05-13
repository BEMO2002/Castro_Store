import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { TfiArrowTopRight } from "react-icons/tfi";
import image1 from "../../assets/banner-image-4.png";
import image2 from "../../assets/banner-image-5.png";
import image3 from "../../assets/banner-image-6.png";
import shape from "../../assets/shape-1.png";
import suit from "../../assets/pngtree-a-business-man-wearing-suit-and-tie-png-image_19597300.png";
import image4 from "../../assets/banner-image-2.png";
import image5 from "../../assets/banner-image-1.png";
import looder from "../../assets/preloader.svg";

const ProfessionalCarousel = ({ items, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setTimeout(goToNext, interval);
    return () => clearTimeout(timer);
  }, [currentIndex, isPaused]);

  return (
    <div
      className="relative bg-assent-tertiary w-full h-[90vh] max-h-screen overflow-hidden pt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="relative w-full h-full transition-transform duration-700 ease-in-out">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-700 ${
              index === currentIndex
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={shape}
              alt=""
              className="absolute -top-20 left-0 inset-0 rotate-180"
            />
            <img src={looder} alt="" className="absolute right-20 top-0 w-40" />
            <img
              src={looder}
              alt=""
              className="absolute left-20 bottom-10 w-40"
            />
            <div className="container mx-auto px-4 py-12">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Text Section */}
                <div className="w-full lg:w-1/2 z-50">
                  {item.paragraph && (
                    <h2 className="text-5xl md:text-7xl font-semibold mb-4 text-black leading-tight">
                      {item.paragraph}
                    </h2>
                  )}
                  {item.title && (
                    <h3 className="text-5xl md:text-8xl mb-2 text-primary">
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p className="text-2xl text-black mb-6 leading-10">
                      {item.description}
                    </p>
                  )}
                  {item.cta && (
                    <button
                      className="relative inline-block my-4 px-12 py-6 text-center border-2 border-black 
            text-lg tracking-wider text-black no-underline font-bold
            cursor-pointer transition-all duration-500 ease-out
            shadow-[inset_0_0_0_0_#000]
            hover:text-white hover:shadow-[inset_0_-100px_0_0_#000]
            active:scale-90"
                    >
                      {item.cta}
                      <TfiArrowTopRight className="inline-block ml-2 text-xl" />
                    </button>
                  )}
                </div>

                {/* Image Section with Permanent Orange Background */}
                <div className="w-full lg:w-1/2 relative">
                  {/* Permanent Orange Background */}
                  {
                    // <div className="absolute inset-0 bg-white rounded-xl transform -rotate-6 scale-90"></div>
                  }

                  {/* Image Container */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.alt || `Slide ${index + 1}`}
                      className="w-full h-auto max-h-[800px] object-contain rounded-xl relative z-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Always Visible */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 shadow-lg bg-white text-black hover:bg-black hover:text-white transition duration-300"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 shadow-lg bg-white text-black hover:bg-black hover:text-white transition duration-300"
        aria-label="Next slide"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentIndex
                ? "bg-red-600 w-6"
                : "bg-red-500 hover:bg-red-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Example usage
const Slider = () => {
  const carouselItems = [
    {
      id: 1,
      image: image1,
      paragraph: "Up to",
      title: "50% Discount",
      description: "Discover our latest arrivals for this season",
      cta: "Shop Now",
    },
    {
      id: 2,
      image: image2,
      paragraph: "Up to",
      title: "50% Discount",
      description: "Up to 30% off on selected electronic items",
      cta: "View Details",
    },
    {
      id: 3,
      image: image3,
      paragraph: "Up to",
      title: "50% Discount",
      description: "Eco-friendly products for your home",
      cta: "Explore Now",
    },
    {
      id: 4,
      image: suit,
      paragraph: "Up to",
      title: "50% Discount",
      description: "Eco-friendly products for your home",
      cta: "Explore Now",
    },
    {
      id: 5,
      image: image4,
      paragraph: "Up to",
      title: "50% Discount",
      description: "Eco-friendly products for your home",
      cta: "Explore Now",
    },
    {
      id: 6,
      image: image5,
      paragraph: "Up to",
      title: "50% Discount",
      description: "Eco-friendly products for your home",
      cta: "Explore Now",
    },
  ];

  return (
    <div className="bg-secondary">
      <ProfessionalCarousel
        items={carouselItems}
        autoPlay={true}
        interval={6000}
      />
    </div>
  );
};

export default Slider;
