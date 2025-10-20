import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";

const TestimonialItem = ({ title, text, name, status, imgUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Card className="h-full bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-800/50 hover:shadow-xl transition-shadow duration-300 border-blue-100 dark:border-gray-700">
        <CardContent className="p-6 flex flex-col h-full">
          <h3 className="text-gray-900 dark:text-gray-100 font-montserrat text-2xl font-bold pb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 flex-grow mb-6 leading-relaxed">
            {text}
          </p>

          <div className="flex gap-3 items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <Avatar>
              <AvatarImage src={imgUrl} alt={name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {status}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-10 md:px-0 px-5">
      <TestimonialItem
        title="Amazing Experience"
        text="Notify has completely transformed how I organize my thoughts. The security features give me peace of mind, and the interface is incredibly intuitive. I can access my notes from anywhere, and the sync is seamless."
        name="Sarah Johnson"
        status="Product Manager"
        imgUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
      />
      <TestimonialItem
        title="Best Note-Taking App"
        text="As a developer, I needed a secure place to store code snippets and project ideas. Notify's rich text editor and code formatting make it perfect for my needs. The OAuth integration was a breeze to set up."
        name="Michael Chen"
        status="Software Engineer"
        imgUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
      />
      <TestimonialItem
        title="Highly Recommended"
        text="I've tried many note-taking apps, but Notify stands out with its combination of security and ease of use. The two-factor authentication gives me confidence that my sensitive information is protected."
        name="Emily Rodriguez"
        status="Business Consultant"
        imgUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
      />
    </div>
  );
};

export default Testimonials;
