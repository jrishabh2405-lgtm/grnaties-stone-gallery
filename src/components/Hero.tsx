
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <h1 className="heading-xl text-white mb-6 leading-tight">
            Discover Elegance in <span className="text-gold-light">Natural Stone</span>
          </h1>
          <p className="text-white/90 text-xl mb-8 max-w-xl">
            With over 25 years of experience, SM GRNATIES offers an extensive 
            collection of premium marble and granite for your luxury spaces.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="bg-gold-dark hover:bg-gold-dark/90 text-white py-3 px-6 rounded-md font-medium transition flex items-center"
            >
              Explore Collections <ArrowRight className="ml-2" size={18} />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-3 px-6 rounded-md font-medium transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
