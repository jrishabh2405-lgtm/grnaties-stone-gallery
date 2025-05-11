import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Filter, CheckCircle } from "lucide-react";
import { products } from "@/data/products";
import { Product } from "@/types/product";
import { toast } from "sonner";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [activeCategory, setActiveCategory] = useState(queryParams.get("category") || "all");
  const [activeSubCategory, setActiveSubCategory] = useState(queryParams.get("subCategory") || "");
  const [searchTerm, setSearchTerm] = useState(queryParams.get("search") || "");
  const [imagesLoading, setImagesLoading] = useState<Record<number, boolean>>({});
  
  const categories = ["all", "Marble", "Granite"];
  
  const subCategories = {
    Marble: ["Italian Marble", "Indian Marble", "Imported Marble"],
    Granite: ["Indian Granite", "Imported Granite"],
  };

  useEffect(() => {
    // Initialize loading state for all products
    const initialLoadingState: Record<number, boolean> = {};
    products.forEach(product => {
      initialLoadingState[product.id] = true;
    });
    setImagesLoading(initialLoadingState);

    // Preload product images
    products.forEach(product => {
      const img = new Image();
      img.src = product.image;
      img.onload = () => {
        setImagesLoading(prev => ({ ...prev, [product.id]: false }));
      };
      img.onerror = () => {
        console.error(`Failed to load image for ${product.name}`);
        setImagesLoading(prev => ({ ...prev, [product.id]: false }));
      };
    });
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, product: Product) => {
    const target = e.target as HTMLImageElement;
    console.log(`Product image failed to load for ${product.name}, replacing with fallback`);
    toast.error(`Couldn't load image for ${product.name}`, {
      description: "Using fallback image instead"
    });
    target.src = "https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop";
  };

  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams();
    if (activeCategory !== "all") {
      params.set("category", activeCategory);
    }
    if (activeSubCategory) {
      params.set("subCategory", activeSubCategory);
    }
    if (searchTerm) {
      params.set("search", searchTerm);
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : "";
    navigate(`/products${newUrl}`, { replace: true });
  }, [activeCategory, activeSubCategory, searchTerm, navigate]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveSubCategory(""); // Reset subcategory when category changes
  };

  const handleSubCategoryChange = (subCategory: string) => {
    setActiveSubCategory(subCategory === activeSubCategory ? "" : subCategory);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSubCategory = !activeSubCategory || product.subCategory === activeSubCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.subCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSubCategory && matchesSearch;
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
                  onClick={() => handleCategoryChange(category)}
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

          {/* Sub-categories */}
          {activeCategory !== "all" && (
            <div className="mt-4 flex flex-wrap gap-2">
              {subCategories[activeCategory as keyof typeof subCategories]?.map((subCategory) => (
                <button
                  key={subCategory}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition flex items-center ${
                    activeSubCategory === subCategory
                      ? "bg-stone-200 text-stone-800"
                      : "bg-stone-50 text-stone-600 hover:bg-stone-100"
                  }`}
                  onClick={() => handleSubCategoryChange(subCategory)}
                >
                  {activeSubCategory === subCategory && (
                    <CheckCircle className="mr-1 text-gold-dark" size={14} />
                  )}
                  {subCategory}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-stone-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link 
                  to={`/products/${product.id}`} 
                  key={product.id} 
                  className="marble-card group cursor-pointer bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <div className="h-64 overflow-hidden relative">
                    {imagesLoading[product.id] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-stone-100">
                        <div className="animate-pulse flex flex-col items-center">
                          <div className="rounded-md bg-stone-200 h-24 w-24 mb-2"></div>
                          <span className="text-xs text-stone-400">Loading...</span>
                        </div>
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover group-hover:scale-105 transition duration-500 ${
                        imagesLoading[product.id] ? 'opacity-0' : 'opacity-100'
                      }`}
                      onLoad={() => setImagesLoading(prev => ({ ...prev, [product.id]: false }))}
                      onError={(e) => handleImageError(e, product)}
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
                    <div className="mt-4 text-gold-dark font-medium text-sm hover:text-gold-dark/80">
                      View Details
                    </div>
                  </div>
                </Link>
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

      {/* Collections Section */}
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
                {subCategories.Marble.map((subCategory, index) => {
                  // Get reliable image sources
                  const imageSources = [
                    "https://images.unsplash.com/photo-1545389054-cf76a0375ead?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1596731498067-13ae669a3fb3?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1617975179011-8935d5e533b7?q=80&w=800&auto=format&fit=crop"
                  ];
                  
                  return (
                    <div
                      key={subCategory}
                      className="relative h-64 group overflow-hidden rounded-lg shadow-sm"
                    >
                      <img
                        src={imageSources[index]}
                        alt={subCategory}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          console.log(`Collection image failed to load for ${subCategory}`);
                          target.src = "https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 group-hover:bg-black/50 transition">
                        <div className="text-center">
                          <h4 className="text-white text-xl font-serif font-semibold mb-2">
                            {subCategory}
                          </h4>
                          <button
                            onClick={() => {
                              handleCategoryChange("Marble");
                              handleSubCategoryChange(subCategory);
                            }}
                            className="bg-white text-stone-800 hover:bg-gold-light text-sm font-medium px-4 py-2 rounded-md transition"
                          >
                            View Collection
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Granite Collections */}
            <div>
              <h3 className="heading-md mb-6 pb-2 border-b border-stone-200">
                Granite Collections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subCategories.Granite.map((subCategory, index) => {
                  // Get reliable image sources
                  const imageSources = [
                    "https://images.unsplash.com/photo-1566996533071-2c578080c06e?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop"
                  ];
                  
                  return (
                    <div
                      key={subCategory}
                      className="relative h-64 group overflow-hidden rounded-lg shadow-sm"
                    >
                      <img
                        src={imageSources[index]}
                        alt={subCategory}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          console.log(`Collection image failed to load for ${subCategory}`);
                          target.src = "https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 group-hover:bg-black/50 transition">
                        <div className="text-center">
                          <h4 className="text-white text-xl font-serif font-semibold mb-2">
                            {subCategory}
                          </h4>
                          <button
                            onClick={() => {
                              handleCategoryChange("Granite");
                              handleSubCategoryChange(subCategory);
                            }}
                            className="bg-white text-stone-800 hover:bg-gold-light text-sm font-medium px-4 py-2 rounded-md transition"
                          >
                            View Collection
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Information Section */}
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
