import React from "react";
import img1 from "../assets/Categories/WhatsApp Image 2025-05-14 at 22.49.02_9057ca85.jpg";
import img2 from "../assets/Categories/img2.png";
import img3 from "../assets/Categories/img3.png";

export default function OurServices() {
  return (
    <div className=" bg-gray-100 pt-10">
      {/* Our Services Section */}
      <section className=" mx-auto  text-center">
        <h2 className="text-4xl font-bold mb-4">Our Services</h2>
        <p className="text-gray-600 mb-8">
          Excepteur sint occaecat cupidatat non proident sunt
        </p>
        <div className="border-t-2 border-gray-300 w-16 mx-auto mb-8"></div>

        <div className="bg-slate-50 ">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                {img1 ? (
                  <img
                    src={img1}
                    alt="Fashion Design"
                    className="h-auto object-cover "
                  />
                ) : (
                  <p>Image not loaded</p>
                )}
              </div>

              {/* Text and Button Section */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Fashion Design
                </h2>
                <p className="text-gray-600 mb-6">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum, sed ut
                  perspici
                </p>
                <button className="w-100 bg-black text-white py-4 px-16 rounded-md hover:bg-primary transition-colors duration-300 font-medium flex items-center justify-center">
                  View Catalog →
                </button>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Text and Button Section */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                  Modern Design
                </h3>
                <p className="text-gray-600 mb-6">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum, sed ut
                  perspici
                </p>
                <button className="w-100 bg-black text-white py-4 px-16 rounded-md hover:bg-primary transition-colors duration-300 font-medium flex items-center justify-center">
                  View Catalog →
                </button>
              </div>

              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                {img1 ? (
                  <img
                    src={img2}
                    alt="Fashion Design"
                    className="h-auto object-cover "
                  />
                ) : (
                  <p>Image not loaded</p>
                )}
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                {img1 ? (
                  <img
                    src={img3}
                    alt="Handmade Craft"
                    className="h-auto object-cover "
                  />
                ) : (
                  <p>Image not loaded</p>
                )}
              </div>

              {/* Text and Button Section */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                  Special Designs
                </h3>
                <p className="text-gray-600 mb-6">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum, sed ut
                  perspici
                </p>
                <button className="w-100 bg-black text-white py-4 px-16 rounded-md hover:bg-primary transition-colors duration-300 font-medium flex items-center justify-center">
                  View Catalog →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
       
    </div>
  );
}
