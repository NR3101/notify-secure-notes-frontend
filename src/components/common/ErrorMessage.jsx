import { motion } from "framer-motion";

// Error message display component with animation
const ErrorMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-74px)] flex items-center justify-center p-4 bg-white dark:bg-gray-900"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {message || "An unexpected error occurred"}
        </p>
      </div>
    </motion.div>
  );
};

export default ErrorMessage;
