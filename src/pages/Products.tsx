
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  origin: string;
  image: string;
  description: string;
}

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const products: Product[] = [
    {
      id: 1,
      name: "Statuario Marble",
      category: "Marble",
      subCategory: "Italian Marble",
      origin: "Italy",
      image: "https://images.unsplash.com/photo-1533422902779-aff35862e462?q=80&w=500&auto=format&fit=crop",
      description: "White marble with distinctive gray veins, perfect for luxurious interiors.",
    },
    {
      id: 2,
      name: "Makrana White",
      category: "Marble",
      subCategory: "Indian Marble",
      origin: "India",
      image: "https://images.unsplash.com/photo-1599619350702-30761da3f83a?q=80&w=500&auto=format&fit=crop",
      description: "Famous white marble from Rajasthan with a fine-grained crystalline structure.",
    },
    {
      id: 3,
      name: "Black Galaxy",
      category: "Granite",
      subCategory: "Indian Granite",
      origin: "India",
      image: "https://images.unsplash.com/photo-1566996533071-2c578080c06e?q=80&w=500&auto=format&fit=crop",
      description: "Deep black granite with gold/copper flecks, highly durable and elegant.",
    },
    {
      id: 4,
      name: "Calacatta Gold",
      category: "Marble",
      subCategory: "Italian Marble",
      origin: "Italy",
      image: "https://images.unsplash.com/photo-1574115289253-eea2a0a3d10f?q=80&w=500&auto=format&fit=crop",
      description: "Distinctive white marble with dramatic gold veining patterns.",
    },
    {
      id: 5,
      name: "Ruby Red",
      category: "Granite",
      subCategory: "Imported Granite",
      origin: "Norway",
      image: "https://images.unsplash.com/photo-1614159102522-381a3100b4bb?q=80&w=500&auto=format&fit=crop",
      description: "Vibrant red granite with black mineral deposits and high durability.",
    },
    {
      id: 6,
      name: "Verde Guatemala",
      category: "Marble",
      subCategory: "Imported Marble",
      origin: "Guatemala",
      image: "https://images.unsplash.com/photo-1617975179011-8935d5e533b7?q=80&w=500&auto=format&fit=crop",
      description: "Exotic green marble with white and black veining patterns.",
    },
    {
      id: 7,
      name: "Emperador Dark",
      category: "Marble",
      subCategory: "Imported Marble",
      origin: "Spain",
      image: "https://images.unsplash.com/photo-1618220370223-3e8c7dc04aad?q=80&w=500&auto=format&fit=crop",
      description: "Rich brown marble with lighter veining, perfect for elegant spaces.",
    },
    {
      id: 8,
      name: "Absolute Black",
      category: "Granite",
      subCategory: "Imported Granite",
      origin: "Zimbabwe",
      image: "https://images.unsplash.com/photo-1614159102500-23508d71fcf2?q=80&w=500&auto=format&fit=crop",
      description: "Pure black granite with consistent coloring and exceptional hardness.",
    },
  ];

  const categories = ["all", "Marble", "Granite"];
  
  const subCategories = {
    Marble: ["Italian Marble", "Indian Marble", "Imported Marble"],
    Granite: ["Indian Granite", "Imported Granite"],
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.subCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.origin.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-stone-800 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-xl mb-6">Our Products</h1>
            <p className="text-lg text-stone-300">
              Explore our extensive collection of over 250 varieties of marble and granite, sourced from the finest quarries across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Product Filters */}
      <section className="py-8 border-b border-stone-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    activeCategory === category
                      ? "bg-gold-dark text-white"
                      : "bg-stone-100 text-stone-800 hover:bg-stone-200"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category === "all" ? "All Products" : category}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gold-dark"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-stone-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="marble-card group">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-gold-dark font-medium">
                        {product.subCategory}
                      </span>
                      <span className="text-xs bg-stone-100 px-2 py-1 rounded text-stone-600">
                        {product.origin}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold">
                      {product.name}
                    </h3>
                    <p className="text-stone-600 text-sm mt-2 line-clamp-2">
                      {product.description}
                    </p>
                    <Link
                      to="/contact"
                      className="mt-4 inline-block text-gold-dark font-medium text-sm hover:text-gold-dark/80"
                    >
                      Request Information
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-stone-600">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Collections</h2>
            <p className="section-subtitle">
              Explore our curated stone collections categorized by type and origin
            </p>
          </div>

          <div className="space-y-12">
            {/* Marble Collections */}
            <div>
              <h3 className="heading-md mb-6 pb-2 border-b border-stone-200">
                Marble Collections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subCategories.Marble.map((subCategory) => (
                  <div
                    key={subCategory}
                    className="relative h-64 group overflow-hidden rounded-lg"
                  >
                    <img
                      src={
                        subCategory === "Italian Marble"
                          ? "https://images.unsplash.com/photo-1574115289253-eea2a0a3d10f?q=80&w=600&auto=format&fit=crop"
                          : subCategory === "Indian Marble"
                          ? "https://images.unsplash.com/photo-1599619350702-30761da3f83a?q=80&w=600&auto=format&fit=crop"
                          : "https://images.unsplash.com/photo-1617975179011-8935d5e533b7?q=80&w=600&auto=format&fit=crop"
                      }
                      alt={subCategory}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 group-hover:bg-black/50 transition">
                      <div className="text-center">
                        <h4 className="text-white text-xl font-serif font-semibold mb-2">
                          {subCategory}
                        </h4>
                        <button
                          onClick={() => {
                            setActiveCategory("Marble");
                            setSearchTerm(subCategory);
                          }}
                          className="bg-white text-stone-800 hover:bg-gold-light text-sm font-medium px-4 py-2 rounded-md transition"
                        >
                          View Collection
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Granite Collections */}
            <div>
              <h3 className="heading-md mb-6 pb-2 border-b border-stone-200">
                Granite Collections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subCategories.Granite.map((subCategory) => (
                  <div
                    key={subCategory}
                    className="relative h-64 group overflow-hidden rounded-lg"
                  >
                    <img
                      src={
                        subCategory === "Indian Granite"
                          ? "https://images.unsplash.com/photo-1566996533071-2c578080c06e?q=80&w=600&auto=format&fit=crop"
                          : "https://images.unsplash.com/photo-1614159102500-23508d71fcf2?q=80&w=600&auto=format&fit=crop"
                      }
                      alt={subCategory}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 group-hover:bg-black/50 transition">
                      <div className="text-center">
                        <h4 className="text-white text-xl font-serif font-semibold mb-2">
                          {subCategory}
                        </h4>
                        <button
                          onClick={() => {
                            setActiveCategory("Granite");
                            setSearchTerm(subCategory);
                          }}
                          className="bg-white text-stone-800 hover:bg-gold-light text-sm font-medium px-4 py-2 rounded-md transition"
                        >
                          View Collection
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Information */}
      <section className="section-padding bg-marble-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">Premium Natural Stone Solutions</h2>
              <p className="text-stone-600 mb-4">
                Our extensive collection comprises over 250 varieties of marble and granite, each offering unique patterns, colors, and textures to suit diverse aesthetic preferences and functional requirements.
              </p>
              <p className="text-stone-600 mb-4">
                Whether you're looking for the timeless elegance of Italian marble, the cultural heritage of Indian marble, or the durability of premium granite, our curated selection provides numerous options for your residential and commercial projects.
              </p>
              <p className="text-stone-600">
                Each stone we offer undergoes rigorous quality checks to ensure it meets our high standards for appearance, durability, and consistency.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-serif text-xl font-semibold mb-3">Custom Solutions</h3>
                <p className="text-stone-600">
                  Need a specific stone variety or custom dimensions? Contact our team to discuss your unique requirements. We specialize in sourcing rare stones and creating custom-cut solutions for special projects.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-serif text-xl font-semibold mb-3">Expert Consultation</h3>
                <p className="text-stone-600">
                  Not sure which stone is right for your project? Our experts can guide you through the selection process, considering factors like usage area, maintenance requirements, and aesthetic preferences.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-serif text-xl font-semibold mb-3">Sample Service</h3>
                <p className="text-stone-600">
                  Request physical samples of our stones to better evaluate colors, textures, and finishes before making your final decision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
