
import React, { useState } from "react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Luxury Villa Flooring",
      category: "flooring",
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Modern Kitchen Countertop",
      category: "countertops",
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Hotel Lobby Design",
      category: "commercial",
      image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Bathroom Vanity",
      category: "bathrooms",
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Office Reception Desk",
      category: "commercial",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Elegant Staircase",
      category: "flooring",
      image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 7,
      title: "Marble Wall Cladding",
      category: "wall",
      image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 8,
      title: "Residential Kitchen Island",
      category: "countertops",
      image: "https://images.unsplash.com/photo-1556911220-bda9da8a518b?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 9,
      title: "Spa Bathroom Design",
      category: "bathrooms",
      image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 10,
      title: "Restaurant Tabletops",
      category: "commercial",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 11,
      title: "Luxury Bathroom Flooring",
      category: "bathrooms",
      image: "https://images.unsplash.com/photo-1630699144339-420f59eb6edf?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 12,
      title: "Feature Wall Design",
      category: "wall",
      image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "flooring", label: "Flooring" },
    { id: "countertops", label: "Countertops" },
    { id: "bathrooms", label: "Bathrooms" },
    { id: "wall", label: "Wall Cladding" },
    { id: "commercial", label: "Commercial" },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <section className="section-padding bg-stone-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Highlighting some of our exceptional installations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-80">
                <img
                  src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop"
                  alt="Luxury Villa Project"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="heading-md mb-3">Luxury Villa Makeover</h3>
                <p className="text-stone-600 mb-4">
                  Complete transformation of a 5,000 sq ft villa with Italian marble flooring, custom-cut granite countertops, and decorative wall cladding.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-stone-100 px-2 py-1 rounded text-stone-600">
                    Italian Marble
                  </span>
                  <span className="text-xs bg-stone-100 px-2 py-1 rounded text-stone-600">
                    Imported Granite
                  </span>
                  <span className="text-xs bg-stone-100 px-2 py-1 rounded text-stone-600">
                    Wall Cladding
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-80">
                <img
                  src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1000&auto=format&fit=crop"
                  alt="Hotel Project"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="heading-md mb-3">Five-Star Hotel Lobby</h3>
                <p className="text-stone-600 mb-4">
                  Exquisite marble flooring and feature wall installation for a luxury hotel lobby, creating a stunning first impression for guests.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-stone-100 px-2 py-1 rounded text-stone-600">
                    Statuario Marble
                  </span>
                  <span className="text-xs bg-stone-100 px-2 py-1 rounded text-stone-600">
                    Feature Wall
                  </span>
                  <span className="text-xs bg-stone-100 px-2 py-1 rounded text-stone-600">
                    Commercial Project
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
