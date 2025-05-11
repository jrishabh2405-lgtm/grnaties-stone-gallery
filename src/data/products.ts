import { Product } from "../types/product";

// Helper function to get fallback image URL
const getFallbackImage = (index: number): string => {
  const fallbackImages = [
    "https://images.unsplash.com/photo-1545389054-cf76a0375ead?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618220370223-3e8c7dc04aad?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618219965072-5ddc7a59a173?q=80&w=800&auto=format&fit=crop"
  ];
  return fallbackImages[index % fallbackImages.length];
};

export const products: Product[] = [
  {
    id: 1,
    name: "Statuario Marble",
    category: "Marble",
    subCategory: "Italian Marble",
    origin: "Italy",
    image: "https://images.unsplash.com/photo-1545389054-cf76a0375ead?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1545389054-cf76a0375ead?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617975147774-ca80bb7f4c19?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599619350702-30761da3f83a?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Statuario Marble is a luxurious white Italian marble characterized by dramatic gray veining that creates a bold, distinctive look. Its pristine white background provides a perfect canvas for the elegant veins, making it a timeless choice for upscale interior applications.",
    specifications: {
      color: "White with gray veining",
      finish: ["Polished", "Honed", "Brushed"],
      thickness: ["16mm", "18mm", "20mm", "30mm"],
      sizes: ["300x300mm", "600x600mm", "800x800mm", "Custom sizes available"]
    },
    applications: [
      {
        name: "Flooring",
        description: "Creates an opulent, luxurious ambiance in living rooms, hallways, and master bedrooms"
      },
      {
        name: "Wall Cladding",
        description: "Perfect for feature walls and bathroom surfaces that demand attention"
      },
      {
        name: "Countertops",
        description: "Ideal for kitchen islands and bathroom vanities where elegance is paramount"
      },
      {
        name: "Furniture",
        description: "Excellent for tabletops and decorative pieces that showcase its natural beauty"
      }
    ],
    isImported: true,
    isPopular: true
  },
  {
    id: 2,
    name: "Makrana White",
    category: "Marble",
    subCategory: "Indian Marble",
    origin: "India",
    image: "https://images.unsplash.com/photo-1596731498067-13ae669a3fb3?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1596731498067-13ae669a3fb3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596731498064-e4b79bd35e4d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579271722639-7c25d40f393b?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Makrana White Marble, sourced from the renowned quarries of Rajasthan, is famous for its pure white background and subtle, delicate veining. This is the same marble used in the construction of the Taj Mahal, showcasing its timeless beauty and historical significance.",
    specifications: {
      color: "Pure white with minimal veining",
      finish: ["Polished", "Honed", "Brushed"],
      thickness: ["16mm", "18mm", "20mm", "30mm"],
      sizes: ["300x300mm", "600x600mm", "800x800mm", "Custom sizes available"]
    },
    applications: [
      {
        name: "Flooring",
        description: "Creates a bright, elegant atmosphere in living spaces and hallways"
      },
      {
        name: "Wall Cladding",
        description: "Perfect for creating clean, sophisticated wall surfaces"
      },
      {
        name: "Bathroom Applications",
        description: "Ideal for bathroom vanities, shower surrounds, and tub decks"
      },
      {
        name: "Architectural Elements",
        description: "Excellent for columns, moldings, and other decorative architectural features"
      }
    ],
    isImported: false,
    isPopular: true
  },
  {
    id: 3,
    name: "Black Galaxy",
    category: "Granite",
    subCategory: "Indian Granite",
    origin: "India",
    image: "https://images.unsplash.com/photo-1566996533071-2c578080c06e?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1566996533071-2c578080c06e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614159102522-381a3100b4bb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614159102500-23508d71fcf2?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Black Galaxy Granite is a premium black granite with distinctive gold/bronze flecks that resemble stars in a night sky. Quarried in Andhra Pradesh, India, this striking natural stone offers both visual appeal and exceptional durability.",
    specifications: {
      color: "Deep black with gold/bronze flecks",
      finish: ["Polished", "Flamed", "Leather", "Honed"],
      thickness: ["18mm", "20mm", "30mm"],
      sizes: ["600x600mm", "800x800mm", "1200x600mm", "Custom sizes available"]
    },
    applications: [
      {
        name: "Kitchen Countertops",
        description: "Provides a dramatic, durable surface that resists heat, scratches, and stains"
      },
      {
        name: "Flooring",
        description: "Creates a bold statement in commercial spaces and luxury residences"
      },
      {
        name: "Exterior Applications",
        description: "Excellent for facades and exterior cladding due to its weather resistance"
      },
      {
        name: "Commercial Installations",
        description: "Perfect for high-traffic areas in hotels, restaurants, and offices"
      }
    ],
    isImported: false,
    isPopular: true
  },
  {
    id: 4,
    name: "Calacatta Gold",
    category: "Marble",
    subCategory: "Italian Marble",
    origin: "Italy",
    image: "https://images.unsplash.com/photo-1618219965072-5ddc7a59a173?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1618219965072-5ddc7a59a173?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Calacatta Gold Marble is one of the most luxurious and sought-after Italian marbles, characterized by a pristine white background with dramatic, bold veining in gold and gray tones. This exquisite stone is quarried from the mountains of Carrara, Italy.",
    specifications: {
      color: "White with gold and gray veining",
      finish: ["Polished", "Honed", "Brushed", "Leathered"],
      thickness: ["16mm", "18mm", "20mm", "30mm"],
      sizes: ["300x300mm", "600x600mm", "800x800mm", "Custom sizes available"]
    },
    applications: [
      {
        name: "Luxury Bathrooms",
        description: "Creates an opulent atmosphere in master bathrooms and spa retreats"
      },
      {
        name: "Kitchen Countertops",
        description: "Provides a stunning focal point in high-end kitchens"
      },
      {
        name: "Feature Walls",
        description: "Perfect for book-matched installations and dramatic wall features"
      },
      {
        name: "Hospitality Spaces",
        description: "Ideal for luxury hotels, restaurants, and high-end commercial spaces"
      }
    ],
    isImported: true,
    isPopular: true
  },
  {
    id: 5,
    name: "Ruby Red",
    category: "Granite",
    subCategory: "Imported Granite",
    origin: "Norway",
    image: "https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580991584164-a4e12c31521d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589033358804-4820d4799f19?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Ruby Red Granite is a vibrant and striking natural stone with a deep red background and black mineral deposits throughout. Quarried in Norway, this granite offers a unique color that stands out in any application, combining visual impact with exceptional durability.",
    specifications: {
      color: "Deep red with black mineral deposits",
      finish: ["Polished", "Flamed", "Leather", "Honed"],
      thickness: ["20mm", "30mm"],
      sizes: ["600x600mm", "800x800mm", "1200x600mm", "Custom sizes available"]
    },
    applications: [
      {
        name: "Statement Countertops",
        description: "Creates bold, eye-catching kitchen and bar counters"
      },
      {
        name: "Accent Features",
        description: "Perfect for feature walls and statement pieces in modern interiors"
      },
      {
        name: "Commercial Applications",
        description: "Ideal for reception counters and lobby features in upscale establishments"
      },
      {
        name: "Exterior Accents",
        description: "Excellent for adding color to outdoor kitchens and garden features"
      }
    ],
    isImported: true,
    isPopular: true
  },
  {
    id: 6,
    name: "Verde Guatemala",
    category: "Marble",
    subCategory: "Imported Marble",
    origin: "Guatemala",
    image: "https://images.unsplash.com/photo-1617975179011-8935d5e533b7?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1617975179011-8935d5e533b7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604077137850-c6d2e2a66966?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Verde Guatemala Marble is an exotic green marble with striking white and black veining patterns that create a forest-like appearance. This unique natural stone offers a touch of nature-inspired luxury to spaces seeking a distinctive character.",
    specifications: {
      color: "Green with white and black veining",
      finish: ["Polished", "Honed"],
      thickness: ["16mm", "18mm", "20mm"],
      sizes: ["300x300mm", "600x600mm", "Custom sizes available"]
    },
    applications: [
      {
        name: "Accent Walls",
        description: "Creates stunning feature walls in living rooms and entryways"
      },
      {
        name: "Luxury Bathrooms",
        description: "Adds organic elegance to bathroom vanities and shower walls"
      },
      {
        name: "Boutique Hotels",
        description: "Perfect for creating distinctive design elements in hospitality spaces"
      },
      {
        name: "Decorative Elements",
        description: "Ideal for inlays, borders, and custom furniture pieces"
      }
    ],
    isImported: true
  },
  {
    id: 7,
    name: "Emperador Dark",
    category: "Marble",
    subCategory: "Imported Marble",
    origin: "Spain",
    image: "https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618220370223-3e8c7dc04aad?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599619352689-c44d26aa9b93?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Emperador Dark Marble from Spain offers a rich, chocolate brown background with lighter veining, creating a warm, sophisticated aesthetic. This versatile marble adds depth and character to any space, making it particularly popular for elegant, traditional environments.",
    specifications: {
      color: "Brown with lighter veining",
      finish: ["Polished", "Honed", "Brushed"],
      thickness: ["16mm", "18mm", "20mm"],
      sizes: ["300x300mm", "600x600mm", "800x800mm", "Custom sizes available"]
    },
    applications: [
      {
        name: "Flooring",
        description: "Creates a warm, inviting ambiance in living rooms and entryways"
      },
      {
        name: "Wall Applications",
        description: "Perfect for accent walls and bathroom surrounds"
      },
      {
        name: "Fireplace Surrounds",
        description: "Adds richness and elegance to fireplaces and mantels"
      },
      {
        name: "Commercial Spaces",
        description: "Ideal for creating sophisticated, welcoming environments in offices and hotels"
      }
    ],
    isImported: true,
    isPopular: true
  },
  {
    id: 8,
    name: "Absolute Black",
    category: "Granite",
    subCategory: "Imported Granite",
    origin: "Zimbabwe",
    image: "https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616108738832-22aec6836325?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Absolute Black Granite, quarried in Zimbabwe, is renowned for its consistent, pure black coloring with virtually no visible grains or patterns. This elegant, uniform appearance makes it one of the most versatile and popular granite options available, providing a timeless backdrop for any design scheme.",
    specifications: {
      color: "Pure, consistent black",
      finish: ["Polished", "Flamed", "Leather", "Honed", "Brushed"],
      thickness: ["18mm", "20mm", "30mm"],
      sizes: ["600x600mm", "800x800mm", "1200x600mm", "Custom sizes available"]
    },
    applications: [
      {
        name: "Kitchen Countertops",
        description: "Provides a sleek, sophisticated surface that pairs with any kitchen design"
      },
      {
        name: "Flooring",
        description: "Creates dramatic, elegant flooring in residential and commercial spaces"
      },
      {
        name: "Memorial Applications",
        description: "Often used for monuments and memorials due to its dignified appearance"
      },
      {
        name: "Modern Architecture",
        description: "Perfect for contemporary design elements in both interior and exterior applications"
      }
    ],
    isImported: true
  },
  {
    id: 9,
    name: "Botticino Classico",
    category: "Marble",
    subCategory: "Italian Marble",
    origin: "Italy",
    image: "https://images.unsplash.com/photo-1596731498067-13ae669a3fb3?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1596731498067-13ae669a3fb3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596731498064-e4b79bd35e4d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579271722639-7c25d40f393b?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Botticino Classico is a fine-grained beige marble quarried in northern Italy, featuring subtle beige tones and delicate veining. Its warm, neutral color makes it exceptionally versatile and timeless for a wide range of applications.",
    specifications: {
      color: "Warm beige with subtle veining",
      finish: ["Polished", "Honed", "Brushed"],
      thickness: ["16mm", "18mm", "20mm"],
      sizes: ["300x300mm", "600x600mm", "800x800mm", "Custom sizes available"]
    },
    applications: [
      {
        name: "Flooring",
        description: "Creates an inviting, elegant atmosphere in living spaces"
      },
      {
        name: "Wall Applications",
        description: "Perfect for bathroom walls and shower surrounds"
      },
      {
        name: "Vanity Tops",
        description: "Provides a sophisticated surface for bathroom vanities"
      },
      {
        name: "Commercial Spaces",
        description: "Ideal for hotels, restaurants, and retail environments"
      }
    ],
    isImported: true
  },
  {
    id: 10,
    name: "Tan Brown",
    category: "Granite",
    subCategory: "Indian Granite",
    origin: "India",
    image: "https://images.unsplash.com/photo-1618221195706-ec3fb2a15f34?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1618221195706-ec3fb2a15f34?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584726468258-177daa29ca78?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581982581239-d92d82992dba?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Tan Brown granite from India features a rich brown background dotted with darker brown and black mineral deposits, creating a distinctive, earthy appearance. Its natural warmth and exceptional durability make it a practical yet beautiful choice.",
    specifications: {
      color: "Brown with black and caramel flecks",
      finish: ["Polished", "Flamed", "Leather", "Honed"],
      thickness: ["18mm", "20mm", "30mm"],
      sizes: ["600x600mm", "800x800mm", "1200x600mm", "Custom sizes available"]
    },
    applications: [
      {
        name: "Kitchen Countertops",
        description: "Provides a warm, durable surface that hides stains and fingerprints"
      },
      {
        name: "Commercial Flooring",
        description: "Excellent for high-traffic areas due to its durability and pattern"
      },
      {
        name: "Outdoor Applications",
        description: "Perfect for outdoor kitchens and garden features"
      },
      {
        name: "Accent Features",
        description: "Creates beautiful accent walls and fireplace surrounds"
      }
    ],
    isImported: false
  },
  {
    id: 11,
    name: "Rain Forest Green",
    category: "Marble",
    subCategory: "Imported Marble",
    origin: "India",
    image: "https://images.unsplash.com/photo-1617975179012-14387731c886?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1617975179012-14387731c886?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617975147774-ca80bb7f4c19?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600800578830-5093764bc3f3?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Rain Forest Green Marble features dramatic forest green tones with white and darker green veining that resembles a lush forest canopy. This exotic marble creates a powerful visual impact in any space where it's installed.",
    specifications: {
      color: "Green with white and dark green veining",
      finish: ["Polished", "Honed"],
      thickness: ["16mm", "18mm", "20mm"],
      sizes: ["300x300mm", "600x600mm", "Custom sizes available"]
    },
    applications: [
      {
        name: "Luxury Bathrooms",
        description: "Creates a spa-like atmosphere in master bathrooms"
      },
      {
        name: "Feature Walls",
        description: "Makes a dramatic statement in living areas and lobbies"
      },
      {
        name: "High-End Commercial",
        description: "Perfect for upscale retail spaces and boutique hotels"
      },
      {
        name: "Custom Furniture",
        description: "Ideal for one-of-a-kind tables and decorative pieces"
      }
    ],
    isImported: true
  },
  {
    id: 12,
    name: "Kashmir White",
    category: "Granite",
    subCategory: "Indian Granite",
    origin: "India",
    image: "https://images.unsplash.com/photo-1617975178295-4aff353a4296?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1617975178295-4aff353a4296?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617975147442-c2648cf4ecae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579271723251-5515844a05a9?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Kashmir White Granite features a light cream to white background with flecks of burgundy and gray mineral deposits. Quarried in India, this granite offers a bright, versatile aesthetic that works well with various design styles.",
    specifications: {
      color: "Off-white with burgundy and gray flecks",
      finish: ["Polished", "Flamed", "Leather", "Honed"],
      thickness: ["18mm", "20mm", "30mm"],
      sizes: ["600x600mm", "800x800mm", "1200x600mm", "Custom sizes available"]
    },
    applications: [
      {
        name: "Kitchen Countertops",
        description: "Creates bright, open kitchens that complement various cabinet colors"
      },
      {
        name: "Bathroom Vanities",
        description: "Provides an elegant, low-maintenance surface for bathrooms"
      },
      {
        name: "Commercial Applications",
        description: "Ideal for reception counters and common areas in office buildings"
      },
      {
        name: "Flooring",
        description: "Brightens spaces while offering excellent durability"
      }
    ],
    isImported: false
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
};
