
import React from "react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

const FeaturedProducts: React.FC = () => {
  const featuredProducts = products.filter(product => product.isPopular);

  return (
    <section className="section-padding bg-marble-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Collections</h2>
          <p className="section-subtitle">
            Discover our handpicked selection of premium natural stones that transform spaces into timeless masterpieces
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id} className="marble-card group">
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-4">
                <span className="text-sm text-gold-dark font-medium">
                  {product.subCategory}
                </span>
                <h3 className="font-serif text-lg font-semibold mt-1">
                  {product.name}
                </h3>
                <p className="text-stone-500 text-sm mt-1">Origin: {product.origin}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="btn-outline inline-flex items-center"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
