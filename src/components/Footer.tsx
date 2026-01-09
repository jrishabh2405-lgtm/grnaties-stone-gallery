
import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Twitter, Sparkles, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gradient-to-b from-stone-900 to-stone-950 text-white pt-16 pb-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-light rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-dark rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-gold-light" />
              <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-white to-stone-300 bg-clip-text text-transparent">
                SM GRANITES
              </h3>
            </div>
            <p className="text-stone-400 mb-6 leading-relaxed">
              A distinguished natural stone solutions provider with over 25 years of experience offering an extensive collection of premium marble and granite.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-stone-800 p-3 rounded-lg text-white hover:bg-gradient-to-r hover:from-gold-dark hover:to-gold-light transition-all duration-300 shadow-lg"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-serif font-semibold mb-6 text-gold-light">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Products", path: "/products" },
                { name: "Gallery", path: "/gallery" },
                { name: "Contact", path: "/contact" },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    className="text-stone-400 hover:text-gold-light transition-colors flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-gold-light group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-serif font-semibold mb-6 text-gold-light">Our Products</h3>
            <ul className="space-y-3">
              {[
                "Italian Marble",
                "Indian Marble",
                "Imported Granite",
                "Indian Granite",
                "View All Collections",
              ].map((product, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/products"
                    className="text-stone-400 hover:text-gold-light transition-colors flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-gold-light group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {product}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-serif font-semibold mb-6 text-gold-light">Contact Us</h3>
            <ul className="space-y-4">
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-start group"
              >
                <div className="bg-stone-800 p-2 rounded-lg mr-3 group-hover:bg-gold-dark/20 transition-colors">
                  <MapPin className="text-gold-light flex-shrink-0" size={16} />
                </div>
                <span className="text-stone-400 group-hover:text-stone-300 transition-colors">
                  Kishangarh, Rajasthan, India
                </span>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-center group"
              >
                <div className="bg-stone-800 p-2 rounded-lg mr-3 group-hover:bg-gold-dark/20 transition-colors">
                  <Phone className="text-gold-light flex-shrink-0" size={16} />
                </div>
                <a
                  href="tel:+919413727594"
                  className="text-stone-400 hover:text-gold-light transition-colors"
                >
                  +91 9413727594
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-center group"
              >
                <div className="bg-stone-800 p-2 rounded-lg mr-3 group-hover:bg-gold-dark/20 transition-colors">
                  <Mail className="text-gold-light flex-shrink-0" size={16} />
                </div>
                <a
                  href="mailto:contact@smgrnaties.com"
                  className="text-stone-400 hover:text-gold-light transition-colors"
                >
                  contact@smgrnaties.com
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-center group"
              >
                <div className="bg-stone-800 p-2 rounded-lg mr-3 group-hover:bg-gold-dark/20 transition-colors">
                  <Clock className="text-gold-light flex-shrink-0" size={16} />
                </div>
                <span className="text-stone-400 group-hover:text-stone-300 transition-colors">
                  Mon - Sat: 9:00 AM - 6:00 PM
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Scroll to Top Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-gold-dark to-gold-light p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t border-stone-800 pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} SM GRANITES. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-stone-400 hover:text-gold-light transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-stone-400 hover:text-gold-light transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
