import React, { useEffect, useRef, useState } from "react";
import { RxPinTop } from "react-icons/rx";

export const Top = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY >= 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        ref={buttonRef}
        onClick={scrollToTop}
        className="top p-[15px] bg-primary text-[#fff] border rounded-md font-bold fixed right-[10px] bottom-[20px] z-10"
      >
        <RxPinTop className="lg:text-2xl text-xl  font-bold" />
      </button>
    )
  );
};
