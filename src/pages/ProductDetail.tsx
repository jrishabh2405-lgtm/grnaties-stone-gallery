import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { getProductById, getRelatedProducts } from "@/data/products";
import { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    if (id) {
      const productData = getProductById(parseInt(id));
      setProduct(productData);
      setImageLoaded(false);
      
      if (productData) {
        setRelatedProducts(getRelatedProducts(productData));
        setActiveImageIndex(0); // Reset image index when product changes
        
        // Preload the main image
        const img = new Image();
        img.src = productData.image;
        img.onload = () => setImageLoaded(true);
        img.onerror = () => {
          console.error(`Failed to load main image for ${productData.name}`);
          setImageLoaded(true); // Set as loaded anyway so the fallback can show
        };
      }
    }
  }, [id]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, source: string) => {
    const target = e.target as HTMLImageElement;
    const productName = product?.name || "Unknown product";
    console.log(`Image failed to load: ${source} for ${productName}, replacing with fallback`);
    toast.error(`Image failed to load for ${productName}`, {
      description: "Using fallback image instead"
    });
    target.src = "https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop";
  };

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="heading-lg mb-4">Product Not Found</h2>
        <p className="mb-8 text-stone-600">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn-primary">
          Browse All Products
        </Link>
      </div>
    );
  }

  const handleNextImage = () => {
    if (product.gallery && activeImageIndex < product.gallery.length - 1) {
      setActiveImageIndex(activeImageIndex + 1);
      setImageLoaded(false);

      // Preload the next image
      const img = new Image();
      img.src = product.gallery[activeImageIndex + 1];
      img.onload = () => setImageLoaded(true);
      img.onerror = () => {
        console.error(`Failed to load gallery image ${activeImageIndex + 1} for ${product.name}`);
        setImageLoaded(true);
      };
    }
  };

  const handlePrevImage = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
      setImageLoaded(false);

      // Preload the previous image
      const img = new Image();
      img.src = product.gallery[activeImageIndex - 1];
      img.onload = () => setImageLoaded(true);
      img.onerror = () => {
        console.error(`Failed to load gallery image ${activeImageIndex - 1} for ${product.name}`);
        setImageLoaded(true);
      };
    }
  };

  // Use main image if no gallery or as fallback
  const currentImage = product.gallery && product.gallery.length > 0 
    ? product.gallery[activeImageIndex] 
    : product.image;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-stone-100 py-4">
        <div className="container-custom">
          <div className="text-sm text-stone-600">
            <Link to="/" className="hover:text-gold-dark">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-gold-dark">Products</Link>
            <span className="mx-2">/</span>
            <Link 
              to={`/products?category=${product.category}`} 
              className="hover:text-gold-dark"
            >
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-stone-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-stone-100">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="rounded-md bg-stone-200 h-32 w-32 mb-2"></div>
                      <span className="text-sm text-stone-400">Loading image...</span>
                    </div>
                  </div>
                )}
                <img
                  src={currentImage}
                  alt={product.name}
                  className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => handleImageError(e, currentImage)}
                />
                {product.gallery && product.gallery.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      disabled={activeImageIndex === 0}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full ${
                        activeImageIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-white"
                      }`}
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      disabled={!product.gallery || activeImageIndex === product.gallery.length - 1}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full ${
                        !product.gallery || activeImageIndex === product.gallery.length - 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-white"
                      }`}
                    >
                      <ArrowRight size={20} />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {product.gallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 ${
                        activeImageIndex === index ? "border-gold-dark" : "border-transparent"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} - View ${index + 1}`}
                        className="h-full w-full object-cover"
                        onError={(e) => handleImageError(e, img)}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div>
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium px-3 py-1 bg-stone-100 rounded-full text-stone-600 mr-2">
                    {product.subCategory}
                  </span>
                  <span className="text-sm font-medium px-3 py-1 bg-stone-100 rounded-full text-stone-600">
                    {product.isImported ? "Imported" : "Domestic"}
                  </span>
                </div>
                <h1 className="heading-lg mb-4">{product.name}</h1>
                <p className="text-stone-500 mb-6">Origin: <span className="font-medium text-stone-800">{product.origin}</span></p>
                <div className="border-t border-stone-200 pt-4 mb-6">
                  <p className="text-stone-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Specifications & Applications */}
              <Tabs defaultValue="specifications" className="mb-8">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                </TabsList>
                <TabsContent value="specifications" className="bg-stone-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-stone-500 mb-1">COLOR</h3>
                      <p className="font-medium">{product.specifications.color}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-stone-500 mb-1">AVAILABLE FINISHES</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.specifications.finish.map((finish, index) => (
                          <span key={index} className="px-3 py-1 bg-white border border-stone-200 rounded-md text-sm">
                            {finish}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-stone-500 mb-1">AVAILABLE THICKNESS</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.specifications.thickness.map((thickness, index) => (
                          <span key={index} className="px-3 py-1 bg-white border border-stone-200 rounded-md text-sm">
                            {thickness}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-stone-500 mb-1">STANDARD SIZES</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.specifications.sizes.map((size, index) => (
                          <span key={index} className="px-3 py-1 bg-white border border-stone-200 rounded-md text-sm">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="applications" className="bg-stone-50 rounded-lg p-6">
                  <div className="space-y-4">
                    {product.applications.map((application, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 text-gold-dark mt-1">
                          <CheckCircle size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{application.name}</h3>
                          <p className="text-stone-600 text-sm">{application.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Call To Action */}
              <div className="bg-marble-light p-6 rounded-lg mb-8">
                <h3 className="font-serif text-xl font-semibold mb-3">Interested in {product.name}?</h3>
                <p className="text-stone-600 mb-4">
                  Contact our team for pricing information, current stock availability, and to request samples.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-primary">
                    Request Information
                  </Link>
                  <Link to="/contact" className="btn-outline">
                    Request Sample
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-marble-light">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">Related Products</h2>
              <p className="section-subtitle">
                Explore other {product.category.toLowerCase()} options that might suit your project
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  to={`/products/${relatedProduct.id}`} 
                  key={relatedProduct.id} 
                  className="marble-card group bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => handleImageError(e, relatedProduct.image)}
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-sm text-gold-dark font-medium">
                      {relatedProduct.subCategory}
                    </span>
                    <h3 className="font-serif text-lg font-semibold mt-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-stone-500 text-sm mt-1">Origin: {relatedProduct.origin}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/products"
                className="btn-outline inline-flex items-center"
              >
                View All {product.category} Products
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
