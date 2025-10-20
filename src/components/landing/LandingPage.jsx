import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import useAuthStore from "../../store/authStore";
import Brands from "./Brands";
import Stats from "./Stats";
import Testimonials from "./Testimonials";

const fadeInFromTop = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const fadeInFromBottom = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const LandingPage = () => {
  // Token state ko access karte hain Zustand store se
  const token = useAuthStore((state) => state.token);

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center bg-white dark:bg-gray-900 transition-colors">
      <div className="lg:w-[80%] w-full py-16 space-y-4">
        {/* Hero Section */}
        <motion.h1
          className="font-poppins uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent xl:text-6xl md:text-4xl text-2xl mx-auto text-center font-bold sm:w-[95%] w-full"
          initial="hidden"
          animate="visible"
          variants={fadeInFromTop}
        >
          Turn your thoughts into secure, organized notes And Faster.
        </motion.h1>

        <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-center">
          The #1 secure note-taking app.
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-center sm:w-[80%] w-[90%] mx-auto text-lg">
          Manage your notes effortlessly and securely. Just type, save, and
          access them from anywhere with robust encryption and seamless
          synchronization.
        </p>

        {/* CTA Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInFromBottom}
          className="flex items-center justify-center gap-3 py-10"
        >
          {token ? (
            <>
              <Link to="/create-note">
                <Button
                  size="lg"
                  className="sm:w-52 w-44 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 font-semibold hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Create Note
                </Button>
              </Link>
              <Link to="/notes">
                <Button
                  size="lg"
                  className="sm:w-52 w-44 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 font-semibold hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  My Notes
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  size="lg"
                  className="sm:w-52 w-44 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 font-semibold hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="lg"
                  className="sm:w-52 w-44 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 font-semibold hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </motion.div>

        {/* Features and Stats Section */}
        <div className="sm:pt-14 pt-0 xl:px-16 md:px-10">
          <h1 className="font-poppins uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent xl:text-6xl md:text-4xl text-2xl mx-auto text-center font-bold w-full">
            More Reasons Companies Around the World Trust Us
          </h1>

          <Brands />
          <Stats />

          {/* Testimonials Section */}
          <div className="pb-10">
            <motion.h1
              className="font-poppins uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-16 xl:text-6xl md:text-4xl text-2xl mx-auto text-center font-bold sm:w-[95%] w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInFromBottom}
            >
              Testimonials
            </motion.h1>
            <Testimonials />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
