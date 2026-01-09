
import React from "react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight, Award, Eye } from "lucide-react";

const FeaturedProducts: React.FC = () => {
  const featuredProducts = products.filter(product => product.isPopular);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, productName: string) => {
    const target = e.target as HTMLImageElement;
    console.log(`Image failed to load for ${productName}, replacing with fallback`);
    target.src = "https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop";
    toast.error(`Couldn't load image for ${productName}`, {
      description: "Using fallback image instead"
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="section-padding bg-gradient-to-b from-marble-light to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gold-dark/10 rounded-full px-4 py-2 mb-4">
            <Award className="w-4 h-4 text-gold-dark" />
            <span className="text-sm font-medium text-gold-dark">Premium Selection</span>
          </div>
          <h2 className="section-title">Featured Collections</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Discover our handpicked selection of premium natural stones that transform spaces into timeless masterpieces
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredProducts.map((product, index) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Link
                to={`/products/${product.id}`}
                className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="h-64 overflow-hidden relative">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => handleImageError(e, product.name)}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Origin Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                    <span className="text-xs font-semibold text-stone-700">
                      {product.origin}
                    </span>
                  </div>

                  {/* View Details Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 shadow-xl">
                      <Eye className="w-4 h-4 text-gold-dark" />
                      <span className="text-sm font-semibold text-stone-800">View Details</span>
                    </div>
                  </motion.div>

                  {/* Popular Badge */}
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-gold-dark/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Award className="w-3 h-3 text-white" />
                      <span className="text-xs font-medium text-white">Popular</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <motion.span
                    className="inline-block text-xs text-gold-dark font-semibold uppercase tracking-wider mb-2 bg-gold-light/20 px-3 py-1 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    {product.subCategory}
                  </motion.span>
                  <h3 className="font-serif text-lg font-bold text-stone-800 mt-2 group-hover:text-gold-dark transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-100">
                    <p className="text-stone-500 text-sm font-medium">
                      {product.category}
                    </p>
                    <ArrowRight className="w-4 h-4 text-gold-dark group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-gold-dark to-gold-light text-white py-3 px-8 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
