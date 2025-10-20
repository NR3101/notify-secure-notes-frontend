import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Globe,
  Zap,
  Github,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 font-playfair">
            About Notify
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Your trusted companion for secure and private note-taking. We
            believe in providing a safe space where your thoughts and ideas are
            protected with the highest level of security.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-playfair">
                Our Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                Our mission is to ensure that your notes are always accessible
                to you and only you. With state-of-the-art encryption and
                user-friendly features, Notify is designed to keep your
                information confidential and secure. We're committed to
                providing the best note-taking experience while maintaining the
                highest security standards.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-playfair">
            Why Choose Notify?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Add an extra layer of security with two-factor
                      authentication to protect your account.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-lg">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
                      End-to-End Encryption
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your notes are encrypted from the moment you create them,
                      ensuring complete privacy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
                      Access Anywhere
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Access your notes from anywhere with the assurance that
                      they are stored securely.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-3 rounded-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
                      Intuitive Interface
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our app is designed to be intuitive and easy to use,
                      focusing on what matters most.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 font-playfair">
            Connect With Us
          </h2>
          <div className="flex justify-center gap-4">
            <Link
              to="https://github.com"
              className="bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link
              to="https://twitter.com"
              className="bg-gradient-to-br from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Twitter className="w-6 h-6" />
            </Link>
            <Link
              to="https://linkedin.com"
              className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link
              to="/contact"
              className="bg-gradient-to-br from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Mail className="w-6 h-6" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
