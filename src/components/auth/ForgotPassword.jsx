import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
import useAuthStore from "@/store/authStore";
import api from "@/services/api";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Zustand store se token lenge - logged in users ko redirect karne ke liye
  const { token } = useAuthStore();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
  });

  // Password reset email bhejne ka function
  const onPasswordForgotHandler = async (data) => {
    const { email } = data;

    try {
      setLoading(true);

      // Backend ko email bhejenge form-urlencoded format me
      const formData = new URLSearchParams();
      formData.append("email", email);

      await api.post("/auth/public/forgot-password", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      reset(); // Form clear kar do
      toast.success("Password reset email sent! Check your inbox.");
    } catch {
      toast.error("Error sending password reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Agar user already logged in hai toh home page par redirect
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center p-4 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-none dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-center text-base dark:text-gray-400">
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onPasswordForgotHandler)}
              className="space-y-4"
            >
              <InputField
                label="Email Address"
                required
                id="email"
                type="email"
                message="Email is required"
                placeholder="Enter your registered email"
                register={register}
                errors={errors}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
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

export default ForgotPassword;
