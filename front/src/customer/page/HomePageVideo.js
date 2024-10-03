import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HomePageVideo() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden mt-0">
      <video
        autoPlay
        loop
        muted
        className="absolute z-0 w-full h-full object-cover"
      >
        <source src="/ShoppingVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-white mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to ECOM
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the latest trends in fashion and accessories
          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/products">
              <motion.button
                className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-indigo-100 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
            </Link>
            <Link to="/categories">
              <motion.button
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-indigo-600 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Categories
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HomePageVideo;
