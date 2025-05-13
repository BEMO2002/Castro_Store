import React, { useState, useEffect } from "react";
import { FaGift, FaTicketAlt, FaCoins, FaPercentage } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";

const LuckySpin = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const controls = useAnimation();
  const [hasSpun, setHasSpun] = useState(false);

  const prizes = [
    {
      id: 1,
      name: "10% Off",
      icon: <FaPercentage className="text-2xl" />,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Free Gift",
      icon: <FaGift className="text-2xl" />,
      color: "bg-purple-500",
    },
    {
      id: 3,
      name: "20% Off",
      icon: <FaPercentage className="text-2xl" />,
      color: "bg-red-500",
    },
    {
      id: 4,
      name: "50 Coins",
      icon: <FaCoins className="text-2xl" />,
      color: "bg-yellow-500",
    },
    {
      id: 5,
      name: "Free Jacket",
      icon: <FaTicketAlt className="text-2xl" />,
      color: "bg-green-500",
    },
    {
      id: 6,
      name: "15% Off",
      icon: <FaPercentage className="text-2xl" />,
      color: "bg-pink-500",
    },
    {
      id: 7,
      name: "100 Coins",
      icon: <FaCoins className="text-2xl" />,
      color: "bg-indigo-500",
    },
    {
      id: 8,
      name: "5% Off",
      icon: <FaPercentage className="text-2xl" />,
      color: "bg-teal-500",
    },
  ];

  const spinWheel = () => {
    if (spinning || hasSpun) return;

    setSpinning(true);
    setResult(null);

    const spinDuration = 3000 + Math.random() * 2000;

    const rotations = 5;
    const finalAngle =
      360 * rotations +
      Math.floor((Math.random() * 360) / (360 / prizes.length)) *
        (360 / prizes.length);

    controls.start({
      rotate: finalAngle,
      transition: {
        duration: spinDuration / 1000,
        ease: [0.2, 0.1, 0.2, 1],
      },
    });

    setTimeout(() => {
      setSpinning(false);
      setHasSpun(true);
      const prizeIndex = Math.floor((finalAngle % 360) / (360 / prizes.length));
      setResult(prizes[prizeIndex]);
    }, spinDuration);
  };

  const resetSpin = () => {
    controls.start({ rotate: 0 });
    setHasSpun(false);
    setResult(null);
  };

  return (
    <div className="pt-20 pb-20">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto ">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Try Your Luck!
        </h2>

        <div className="relative flex justify-center items-center mb-8">
          {/* Wheel */}
          <div className="relative w-80 h-80">
            <motion.div
              className="w-full h-full rounded-full border-8 border-gray-200 relative overflow-hidden"
              animate={controls}
              style={{ rotate: 0 }}
            >
              {prizes.map((prize, index) => (
                <div
                  key={prize.id}
                  className={`${prize.color} absolute w-1/2 h-1/2 origin-bottom-right`}
                  style={{
                    transform: `rotate(${
                      index * (360 / prizes.length)
                    }deg) skewY(${90 - 360 / prizes.length}deg)`,
                    left: "0",
                    top: "0",
                  }}
                >
                  <div
                    className="absolute text-white font-medium text-sm"
                    style={{
                      transform: `skewY(${
                        360 / prizes.length - 90
                      }deg) rotate(${360 / prizes.length / 2}deg)`,
                      width: "100px",
                      left: "20px",
                      top: "20px",
                    }}
                  >
                    <div className="flex flex-col items-center">
                      {prize.icon}
                      <span>{prize.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border-4 border-gray-300 z-10 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            </div>

            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 rotate-45 z-20"></div>
          </div>
        </div>

        {/* Spin button */}
        {!hasSpun ? (
          <button
            onClick={spinWheel}
            disabled={spinning}
            className={`w-full py-3 px-6 rounded-lg font-bold text-white text-lg transition-all ${
              spinning
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            }`}
          >
            {spinning ? "Spinning..." : "Spin Now"}
          </button>
        ) : (
          <div className="text-center">
            <div
              className={`p-4 mb-4 rounded-lg ${result.color} text-white font-bold text-xl`}
            >
              You won: {result.name}!
            </div>
            <button
              onClick={resetSpin}
              className="w-full py-3 px-6 rounded-lg font-bold text-white text-lg bg-gray-600 hover:bg-gray-700 transition-all"
            >
              Spin Again
            </button>
          </div>
        )}

        <div className="mt-4 text-center text-sm text-gray-500">
          {hasSpun
            ? "Come back tomorrow for another spin!"
            : "One spin per day per customer"}
        </div>
      </div>
    </div>
  );
};

export default LuckySpin;
