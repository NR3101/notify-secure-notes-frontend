import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InputField from "@/components/common/InputField";
import api from "@/services/api";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams(); // URL se token lenge

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
    mode: "onTouched",
  });

  // Password reset karne ka function
  const handleResetPassword = async (data) => {
    const { password } = data;

    // URL query params se token lenge jo email link me aata hai
    const token = searchParams.get("token");

    setLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("newPassword", password);

      await api.post("/auth/public/reset-password", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toast.success("Password reset successful! You can now log in.");
      reset();
    } catch {
      toast.error("Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center p-4 bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-none dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Reset Password
            </CardTitle>
            <CardDescription className="text-center text-base dark:text-gray-400">
              Enter your new password to update it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(handleResetPassword)}
              className="space-y-4"
            >
              <InputField
                label="New Password"
                required
                id="password"
                type="password"
                message="Password is required"
                placeholder="Enter your new password"
                register={register}
                errors={errors}
                min={6}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm text-teal-600 dark:text-teal-400 hover:underline hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
