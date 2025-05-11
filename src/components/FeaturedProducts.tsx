
import React from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  origin: string;
}

const FeaturedProducts: React.FC = () => {
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Statuario Marble",
      category: "Italian Marble",
      image: "https://images.unsplash.com/photo-1533422902779-aff35862e462?q=80&w=500&auto=format&fit=crop",
      origin: "Italy",
    },
    {
      id: 2,
      name: "Makrana White",
      category: "Indian Marble",
      image: "https://images.unsplash.com/photo-1599619350702-30761da3f83a?q=80&w=500&auto=format&fit=crop",
      origin: "India",
    },
    {
      id: 3,
      name: "Black Galaxy",
      category: "Indian Granite",
      image: "https://images.unsplash.com/photo-1566996533071-2c578080c06e?q=80&w=500&auto=format&fit=crop",
      origin: "India",
    },
    {
      id: 4,
      name: "Calacatta Gold",
      category: "Italian Marble",
      image: "https://images.unsplash.com/photo-1574115289253-eea2a0a3d10f?q=80&w=500&auto=format&fit=crop",
      origin: "Italy",
    },
  ];

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
            <Link to="/products" key={product.id} className="marble-card group">
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-4">
                <span className="text-sm text-gold-dark font-medium">
                  {product.category}
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
