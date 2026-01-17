import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || '/api';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  location?: string;
  featured: boolean;
}

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "flooring", label: "Flooring" },
    { id: "countertops", label: "Countertops" },
    { id: "bathrooms", label: "Bathrooms" },
    { id: "wall", label: "Wall Cladding" },
    { id: "commercial", label: "Commercial" },
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/gallery`);
        if (!response.ok) throw new Error('Failed to fetch gallery');
        const data = await response.json();
        setGalleryItems(data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        toast.error('Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const featuredItems = galleryItems.filter((item) => item.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-stone-800 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-xl mb-6">Our Gallery</h1>
            <p className="text-lg text-stone-300">
              Explore our showcase of completed projects featuring our premium marble and granite collections.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Filters */}
      <section className="py-8 border-b border-stone-200">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  activeFilter === filter.id
                    ? "bg-gold-dark text-white"
                    : "bg-stone-100 text-stone-800 hover:bg-stone-200"
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-gold-dark" />
              <span className="ml-3 text-stone-600">Loading gallery...</span>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="marble-card group overflow-hidden"
                >
                  <div className="relative h-64">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div className="text-white text-center p-4">
                        <span className="text-sm uppercase tracking-wider bg-gold-dark px-2 py-1 rounded">
                          {filters.find(f => f.id === item.category)?.label || item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-semibold">
                      {item.title}
                    </h3>
                    {item.location && (
                      <p className="text-stone-500 text-sm mt-1">{item.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold mb-2">No gallery items yet</h3>
              <p className="text-stone-600">
                Gallery items will be added soon. Check back later!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects - Show only if we have featured items */}
      {featuredItems.length > 0 && (
        <section className="section-padding bg-stone-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">
                Highlighting some of our exceptional installations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredItems.slice(0, 2).map((item) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-80">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="heading-md mb-3">{item.title}</h3>
                    <p className="text-stone-600 mb-4">
                      {item.description}
                    </p>
                    {item.location && (
                      <span className="text-xs bg-stone-100 px-2 py-1 rounded text-stone-600">
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Client Testimonials</h2>
            <p className="section-subtitle">
              What our clients say about their experience with SM GRANITES
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-gold-dark text-2xl mr-2">★★★★★</div>
              </div>
              <blockquote className="text-stone-600 italic mb-4">
                "The marble we sourced from SM GRANITES transformed our home completely. The quality was exceptional and their team helped us select the perfect variety for our space."
              </blockquote>
              <div>
                <p className="font-medium">Priya & Rahul Khanna</p>
                <p className="text-sm text-stone-500">Homeowner, Delhi</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-gold-dark text-2xl mr-2">★★★★★</div>
              </div>
              <blockquote className="text-stone-600 italic mb-4">
                "As an interior designer, I've worked with many stone suppliers, but SM GRANITES stands out for their extensive collection and commitment to quality. My clients are always impressed."
              </blockquote>
              <div>
                <p className="font-medium">Anjali Sharma</p>
                <p className="text-sm text-stone-500">Interior Designer, Mumbai</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-gold-dark text-2xl mr-2">★★★★★</div>
              </div>
              <blockquote className="text-stone-600 italic mb-4">
                "For our hotel renovation project, we needed consistent quality across large quantities of marble. SM GRANITES delivered perfectly, on time and with excellent service."
              </blockquote>
              <div>
                <p className="font-medium">Vikram Singh</p>
                <p className="text-sm text-stone-500">Hotel Developer, Jaipur</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
