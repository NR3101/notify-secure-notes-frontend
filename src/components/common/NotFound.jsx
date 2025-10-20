import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

// 404 NotFound page - jab koi invalid route access ho
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-74px)] flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <FileQuestion className="h-32 w-32 text-gray-400 dark:text-gray-600" />
        </motion.div>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="hover:scale-105 transition-transform dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Go Back
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-transform"
          >
            Go Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
