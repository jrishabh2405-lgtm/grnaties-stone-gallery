
import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">SM GRNATIES</h3>
            <p className="text-stone-300 mb-4">
              A distinguished natural stone solutions provider with over 25 years of experience offering an extensive collection of marble and granite.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gold-light transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold-light transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold-light transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold-light transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-stone-300 hover:text-gold-light transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-300 hover:text-gold-light transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-stone-300 hover:text-gold-light transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-stone-300 hover:text-gold-light transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-stone-300 hover:text-gold-light transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">Our Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-stone-300 hover:text-gold-light transition-colors">
                  Italian Marble
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-stone-300 hover:text-gold-light transition-colors">
                  Indian Marble
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-stone-300 hover:text-gold-light transition-colors">
                  Imported Granite
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-stone-300 hover:text-gold-light transition-colors">
                  Indian Granite
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-stone-300 hover:text-gold-light transition-colors">
                  View All Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 text-gold-light flex-shrink-0" size={18} />
                <span className="text-stone-300">Kishangarh, Rajasthan, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-gold-light flex-shrink-0" size={18} />
                <a href="tel:+919413727594" className="text-stone-300 hover:text-gold-light transition-colors">
                  +91 9413727594
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-gold-light flex-shrink-0" size={18} />
                <a href="mailto:contact@smgrnaties.com" className="text-stone-300 hover:text-gold-light transition-colors">
                  contact@smgrnaties.com
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="mr-3 text-gold-light flex-shrink-0" size={18} />
                <span className="text-stone-300">Mon - Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-stone-700 pt-6 mt-6 text-center text-stone-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SM GRNATIES. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
