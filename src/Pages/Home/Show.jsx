import React from "react";
import { TfiArrowTopRight } from "react-icons/tfi";
const Show = () => {
  return (
    <div className="relative">
      <div className="show ">
        <div className="absolute -bottom-20 left-0 right-0 p-20 bg-white lg:w-[1200px] w-[400px] mx-auto bg-opacity-95 shadow-lg text-black flex flex-col items-center justify-center text-center">
          <h2 className="lg:text-5xl text-4xl font-semibold mb-2">
            End of Season Clearance Sale
          </h2>
          <h3 className="text-4xl font-bold text-primary mb-4">
            UP TO 50% OFF
          </h3>
          <p className="max-w-lg mb-6">
            Welcome to the new range of shaving products from master barber. We
            have over three decades of experience in the male grooming industry
          </p>
          <a
            href="#"
            className="relative inline-block my-4 px-12 py-4 text-center 
            text-lg tracking-wider text-white no-underline
            bg-gray-900 cursor-pointer transition-all duration-500 ease-out
            shadow-[inset_0_0_0_0_#ff4135]
            hover:text-white hover:shadow-[inset_0_-100px_0_0_#ff4135]
            active:scale-90"
          >
            Shop Now
            <TfiArrowTopRight className="inline-block ml-2 text-xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Show;
