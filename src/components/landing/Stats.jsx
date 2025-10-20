import { motion } from "framer-motion";
import CardSlider from "./CardSlider";

const Stats = () => {
  return (
    <div className="py-28">
      {/* Stats Numbers */}
      <div className="flex justify-between items-center md:px-0 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-1 flex-col items-center justify-center gap-2"
        >
          <span className="sm:text-4xl text-3xl bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-bold">
            7x
          </span>
          <span className="text-gray-600 text-center sm:text-sm text-xs">
            High Conversion Rate
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-1 flex-col items-center justify-center gap-2"
        >
          <span className="sm:text-4xl text-3xl bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent font-bold">
            42x
          </span>
          <span className="text-gray-600 dark:text-gray-400 text-center sm:text-sm text-xs">
            Faster Impression
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-1 flex-col items-center justify-center gap-2"
        >
          <span className="sm:text-4xl text-3xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
            300%
          </span>
          <span className="text-gray-600 dark:text-gray-400 text-center sm:text-sm text-xs">
            Higher Lead Quality
          </span>
        </motion.div>
      </div>

      {/* Metrics Section */}
      <div className="mt-10 md:px-0 px-4">
        <h3 className="text-gray-700 dark:text-gray-200 text-2xl font-semibold pb-5 pt-6 font-playfair">
          Metrics For Notify
        </h3>

        <div className="flex md:flex-row flex-col md:gap-0 gap-16 justify-between">
          {/* Features List */}
          <motion.ul
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="list-disc sm:px-5 ps-10 text-gray-700 dark:text-gray-300 flex flex-col gap-5 flex-1 overflow-hidden"
          >
            <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Trusted by thousands of users worldwide.
            </li>
            <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Experience reliable access to your notes anytime, anywhere.
            </li>
            <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Quickly access your notes with our optimized search feature.
            </li>
            <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Advanced encryption keeps your data secure and private.
            </li>
            <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <span className="font-semibold">10,000+</span> trusted users
            </li>
            <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <span className="font-semibold">99.9%</span> uptime guarantee
            </li>
            <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <span className="font-semibold">2x</span> faster note retrieval
            </li>
          </motion.ul>

          {/* Card Slider */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 overflow-hidden flex justify-center items-center"
          >
            <CardSlider />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
