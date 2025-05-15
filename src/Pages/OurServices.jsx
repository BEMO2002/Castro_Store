import React from "react";
import img1 from "../assets/Categories/WhatsApp Image 2025-05-14 at 22.49.02_9057ca85.jpg";
import img2 from "../assets/Categories/img2.png";
import img3 from "../assets/Categories/img3.png";
import { motion } from "framer-motion";
import { fadeIn } from "../Framermotion/varient";
export default function OurServices() {
  return (
    <div className="bg-gray-50 py-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Premium Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of high-end fashion and design
            services, crafted to meet your unique style needs
          </p>
          <div className="border-t-2 border-gray-300 w-20 mx-auto mt-6"></div>
        </motion.div>

        <div className="space-y-24">
          {/* Fashion Design Section */}
          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full lg:w-1/2">
                <img
                  src={img1}
                  alt="Fashion Design Services"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2 p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Custom Fashion Design
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Experience the art of bespoke fashion design with our expert
                  team. We create personalized garments that reflect your unique
                  style and personality, using premium materials and
                  cutting-edge techniques.
                </p>
                <button className="bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 transition-colors duration-300 font-medium inline-flex items-center">
                  Explore Collection
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Modern Design Section */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row-reverse items-center">
              <div className="w-full lg:w-1/2">
                <img
                  src={img2}
                  alt="Modern Design Services"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2 p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Contemporary Design Solutions
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Embrace modern aesthetics with our contemporary design
                  services. We blend innovative concepts with timeless elegance
                  to create pieces that stand out in today's fashion landscape.
                </p>
                <button className="bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 transition-colors duration-300 font-medium inline-flex items-center">
                  View Portfolio
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Special Designs Section */}
          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full lg:w-1/2">
                <img
                  src={img3}
                  alt="Special Design Services"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2 p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Exclusive Custom Creations
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Indulge in our exclusive custom design service, where we
                  transform your vision into reality. Each piece is meticulously
                  crafted to ensure exceptional quality and attention to detail.
                </p>
                <button className="bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 transition-colors duration-300 font-medium inline-flex items-center">
                  Book Consultation
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
