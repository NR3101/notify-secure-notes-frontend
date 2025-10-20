import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import toast from "react-hot-toast";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Form input change handler - input fields ko track karta hai
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form submit handler - message send karne ke liye
  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Validation - saare fields filled hain ya nahi check karte hain
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation - proper email format check karte hain
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Success message dikhate hain
    toast.success("Message sent successfully! We will get back to you soon.");

    // Form ko reset kar dete hain
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-74px)] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4 transition-colors">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-800/50 dark:border-gray-700">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Send className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-playfair">
              Contact Us
            </CardTitle>
            <CardDescription className="text-lg mt-2 dark:text-gray-400">
              We'd love to hear from you! If you have any questions or feedback,
              feel free to reach out to us.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={onSubmitHandler} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Message
                </Label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Type your message here..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>

            {/* Additional Contact Info */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                Or reach us directly at{" "}
                <a
                  href="mailto:support@notify.com"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
                >
                  support@notify.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ContactPage;
