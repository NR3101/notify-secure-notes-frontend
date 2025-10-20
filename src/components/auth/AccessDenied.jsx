import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Access Denied page - jab user restricted page access karne ki koshish kare
const AccessDenied = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-74px)] flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-none text-center dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
                <ShieldAlert className="h-16 w-16 text-red-600 dark:text-red-400" />
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Access Denied
            </CardTitle>
            <CardDescription className="text-base dark:text-gray-400">
              You do not have permission to view this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              This area is restricted. Please contact your administrator if you
              believe you should have access.
            </p>
            <Button
              onClick={goHome}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Go Back Home
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AccessDenied;
