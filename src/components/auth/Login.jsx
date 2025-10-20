import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
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

const Login = () => {
  // Step 1: Login method aur Step 2: 2FA verification
  const [step, setStep] = useState(1);
  const [jwtToken, setJwtToken] = useState("");
  const [loading, setLoading] = useState(false);

  // Zustand store se token aur setToken function access karenge
  const { setToken, token, fetchUser } = useAuthStore();
  const navigate = useNavigate();

  // React Hook Form initialization - form validation ke liye
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      code: "",
    },
    mode: "onTouched",
  });

  // Successful login ke baad user ko redirect aur state update
  const handleSuccessfulLogin = async (token, decodedToken) => {
    const user = {
      username: decodedToken.sub,
      roles: decodedToken.roles ? decodedToken.roles.split(",") : [],
    };

    // LocalStorage me token aur user info store karo
    localStorage.setItem("JWT_TOKEN", token);
    localStorage.setItem("USER", JSON.stringify(user));

    // Zustand store me token set karo - globally accessible ho jayega
    setToken(token);

    // Current user ko fetch karo - admin status set hogi
    await fetchUser();

    // User ko notes page par redirect kar do - replace: true se history me login page nahi aayega
    navigate("/notes", { replace: true });
  };

  // Login credentials ke saath API call
  const onLoginHandler = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/public/signin", data);

      toast.success("Login Successful");
      reset(); // Form fields ko reset kar do

      // Agar response me JWT token hai toh check karo 2FA enabled hai ya nahi
      if (response.status === 200 && response.data.jwtToken) {
        setJwtToken(response.data.jwtToken);
        const decodedToken = jwtDecode(response.data.jwtToken);

        // Agar 2FA enabled hai toh verification step par jao
        if (decodedToken.is2faEnabled) {
          setStep(2);
        } else {
          // Nahi toh seedha login kar do
          handleSuccessfulLogin(response.data.jwtToken, decodedToken);
        }
      } else {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      }
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // 2FA code verify karne ka function
  const onVerify2FaHandler = async (data) => {
    const code = data.code;
    setLoading(true);

    try {
      // Backend ko 2FA code aur JWT token bhejo
      const formData = new URLSearchParams();
      formData.append("code", code);
      formData.append("jwtToken", jwtToken);

      await api.post("/auth/public/verify-2fa-login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const decodedToken = jwtDecode(jwtToken);
      handleSuccessfulLogin(jwtToken, decodedToken);
    } catch (error) {
      console.error("2FA verification error", error);
      toast.error("Invalid 2FA code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Agar user pehle se logged in hai toh usko login page par nahi aane denge
  useEffect(() => {
    if (token) navigate("/notes", { replace: true });
  }, [navigate, token]);

  return (
    <div className="min-h-[calc(100vh-74px)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {step === 1 ? (
          // Step 1: Login Form
          <Card className="shadow-2xl border-none dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center text-base dark:text-gray-400">
                Please enter your credentials to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onLoginHandler)}
                className="space-y-4"
              >
                {/* OAuth Login Buttons */}
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
                    placeholder="Enter your username"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="Password"
                    required
                    id="password"
                    type="password"
                    message="Password is required"
                    placeholder="Enter your password"
                    register={register}
                    errors={errors}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <div className="text-sm text-center space-y-2">
                  <Link
                    to="/forgot-password"
                    className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                  <p className="text-muted-foreground dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          // Step 2: 2FA Verification Form
          <Card className="shadow-2xl border-none dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Verify 2FA
              </CardTitle>
              <CardDescription className="text-center text-base dark:text-gray-400">
                Enter the code from your authenticator app
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onVerify2FaHandler)}
                className="space-y-4"
              >
                <InputField
                  label="Authentication Code"
                  required
                  id="code"
                  type="text"
                  message="Code is required"
                  placeholder="Enter your 2FA code"
                  register={register}
                  errors={errors}
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? "Verifying..." : "Verify 2FA"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
