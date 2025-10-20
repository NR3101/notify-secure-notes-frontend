import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import InputField from "@/components/common/InputField";
import useAuthStore from "@/store/authStore";
import api from "@/services/api";

const apiUrl = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [role, _setRole] = useState("ROLE_USER");
  const [loading, setLoading] = useState(false);

  // Zustand store se token check karenge - already logged in users ko redirect karne ke liye
  const { token } = useAuthStore();
  const navigate = useNavigate();

  // React Hook Form setup - form validation aur error handling ke liye
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  // Form submit handler - backend ko signup data bhejega
  const onSubmitHandler = async (data) => {
    const { username, email, password } = data;
    const sendData = {
      username,
      email,
      password,
      role: [role], // Default role USER hai
    };

    try {
      setLoading(true);
      const response = await api.post("/auth/public/signup", sendData);

      toast.success("Registration Successful");
      reset(); // Form ko clear kar do

      // Registration successful hone par login page par redirect
      if (response.data) {
        navigate("/login");
      }
    } catch (error) {
      // Backend se aane wale specific errors ko handle karo
      // React Hook Form me programmatically error set kar sakte hain
      if (
        error?.response?.data?.message === "Error: Username is already taken!"
      ) {
        setError("username", { message: "Username is already taken" });
      } else if (
        error?.response?.data?.message === "Error: Email is already in use!"
      ) {
        setError("email", { message: "Email is already in use" });
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Agar user already logged in hai toh usko signup page par nahi aane denge
  useEffect(() => {
    if (token) navigate("/notes", { replace: true });
  }, [navigate, token]);

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center p-4 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-none dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-base dark:text-gray-400">
              Sign up to start taking secure notes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="space-y-4"
            >
              {/* OAuth Signup Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() =>
                    (window.location.href = `${apiUrl}/oauth2/authorization/google`)
                  }
                  className="w-full hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-300 transition-all duration-300"
                >
                  <FcGoogle className="text-xl mr-2" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() =>
                    (window.location.href = `${apiUrl}/oauth2/authorization/github`)
                  }
                  className="w-full hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-300 transition-all duration-300"
                >
                  <FaGithub className="text-xl mr-2" />
                  Github
                </Button>
              </div>

              <div className="relative">
                <Separator className="my-4 dark:bg-gray-700" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-2 text-xs text-muted-foreground dark:text-gray-400">
                  OR
                </span>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <InputField
                  label="Username"
                  required
                  id="username"
                  type="text"
                  message="Username is required"
                  placeholder="Choose a username"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Email"
                  required
                  id="email"
                  type="email"
                  message="Email is required"
                  placeholder="Enter your email"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Password"
                  required
                  id="password"
                  type="password"
                  message="Password is required"
                  placeholder="Create a strong password"
                  register={register}
                  errors={errors}
                  min={6}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </Button>

              <p className="text-sm text-center text-muted-foreground dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-600 dark:text-purple-400 font-semibold hover:underline hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                >
                  Login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
