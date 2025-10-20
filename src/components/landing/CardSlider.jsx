import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
  {
    id: 1,
    text: "Notify",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    id: 2,
    text: "More Faster",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    id: 3,
    text: "Faster Impression",
    gradient: "from-gray-700 to-gray-900",
  },
  {
    id: 4,
    text: "Higher Lead Quality",
    gradient: "from-purple-700 to-purple-900",
  },
  {
    id: 5,
    text: "Higher Conversion Rate",
    gradient: "from-green-500 to-emerald-600",
  },
];

const CardSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect - card automatically change hota rehta hai
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000); // Har 3 seconds mein card change hoga

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[280px] h-[360px] perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
          animate={{ rotateY: 0, opacity: 1, scale: 1 }}
          exit={{ rotateY: -90, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 bg-gradient-to-br ${cards[currentIndex].gradient} rounded-xl shadow-2xl flex items-center justify-center text-white font-bold text-2xl text-center p-8`}
        >
          {cards[currentIndex].text}
        </motion.div>
      </AnimatePresence>

      {/* Indicator Dots */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-600 dark:bg-blue-400 w-6"
                : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
