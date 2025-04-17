import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["Popular", "Trending", "Top Rated"];

const TabMenu = () => {
  const [activeTab, setActiveTab] = useState("Popular");

  const content = {
    Popular: "🔥 This is the popular tab content.",
    Trending: "📈 Here’s what’s trending now.",
    "Top Rated": "⭐ These are top-rated items."
  };

  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 rounded-2xl shadow-lg bg-white">
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="min-h-[100px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.4 }}
            className="text-center text-lg"
          >
            {content[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TabMenu;
