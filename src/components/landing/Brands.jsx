import { motion } from "framer-motion";
import { Globe, Shield, Zap, Users, Package, Headphones } from "lucide-react";

const BrandItem = ({ title, text, Icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white dark:bg-gray-800 shadow-lg shadow-blue-100 dark:shadow-gray-900 hover:shadow-blue-200 dark:hover:shadow-gray-700 flex flex-col pt-7 pb-10 px-4 items-center gap-3 justify-center rounded-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-300"
    >
      <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-full">
        <Icon className="text-white text-3xl w-8 h-8" />
      </div>
      <h3 className="text-xl text-gray-800 dark:text-gray-100 font-bold text-center">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
        {text}
      </p>
    </motion.div>
  );
};

const Brands = () => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-10 pt-20 md:px-0 px-5">
      <BrandItem
        title="World Class Partners"
        text="Connect with LinkedIn, Google, and 70+ other apps and tools to get more done. Make your work easier by linking your favorite platforms. Stay on top of tasks, calendars, and messages in one spot."
        Icon={Users}
      />
      <BrandItem
        title="Fast Global Support"
        text="Get instant help from our support team available 24/7 across the globe. Experience quick response times and expert assistance whenever you need it."
        Icon={Globe}
      />
      <BrandItem
        title="Trusted Security"
        text="Your data is protected with enterprise-grade encryption and security protocols. We ensure your notes remain private and secure at all times with advanced authentication methods."
        Icon={Shield}
      />
      <BrandItem
        title="Lightning Fast"
        text="Experience blazing fast note creation and retrieval. Our optimized infrastructure ensures your notes are always available instantly, no matter where you are."
        Icon={Zap}
      />
      <BrandItem
        title="Export Anywhere"
        text="Export your notes in multiple formats including PDF, Word, and Markdown. Take your data wherever you need it with our flexible export options."
        Icon={Package}
      />
      <BrandItem
        title="Assisted Onboarding"
        text="Get started quickly with our guided onboarding process. Our team is here to help you set up and make the most of all features from day one."
        Icon={Headphones}
      />
    </div>
  );
};

export default Brands;
