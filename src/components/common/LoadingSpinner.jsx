import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// Loading spinner component with animation
const LoadingSpinner = ({ message = "Please wait..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col justify-center items-center h-72"
    >
      <Loader2 className="h-12 w-12 animate-spin text-primary dark:text-blue-400" />
      <span className="mt-4 text-muted-foreground dark:text-gray-400">
        {message}
      </span>
    </motion.div>
  );
};

export default LoadingSpinner;
