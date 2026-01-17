import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const products = [
  {
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
      { name: "Flooring", description: "Creates an opulent, luxurious ambiance in living rooms, hallways, and master bedrooms" },
      { name: "Wall Cladding", description: "Perfect for feature walls and bathroom surfaces that demand attention" },
      { name: "Countertops", description: "Ideal for kitchen islands and bathroom vanities where elegance is paramount" },
      { name: "Furniture", description: "Excellent for tabletops and decorative pieces that showcase its natural beauty" }
    ],
    isImported: true,
    isPopular: true
  },
  {
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
      { name: "Flooring", description: "Creates a bright, elegant atmosphere in living spaces and hallways" },
      { name: "Wall Cladding", description: "Perfect for creating clean, sophisticated wall surfaces" },
      { name: "Bathroom Applications", description: "Ideal for bathroom vanities, shower surrounds, and tub decks" },
      { name: "Architectural Elements", description: "Excellent for columns, moldings, and other decorative architectural features" }
    ],
    isImported: false,
    isPopular: true
  },
  {
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
      { name: "Kitchen Countertops", description: "Provides a dramatic, durable surface that resists heat, scratches, and stains" },
      { name: "Flooring", description: "Creates a bold statement in commercial spaces and luxury residences" },
      { name: "Exterior Applications", description: "Excellent for facades and exterior cladding due to its weather resistance" },
      { name: "Commercial Installations", description: "Perfect for high-traffic areas in hotels, restaurants, and offices" }
    ],
    isImported: false,
    isPopular: true
  },
  {
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
      { name: "Luxury Bathrooms", description: "Creates an opulent atmosphere in master bathrooms and spa retreats" },
      { name: "Kitchen Countertops", description: "Provides a stunning focal point in high-end kitchens" },
      { name: "Feature Walls", description: "Perfect for book-matched installations and dramatic wall features" },
      { name: "Hospitality Spaces", description: "Ideal for luxury hotels, restaurants, and high-end commercial spaces" }
    ],
    isImported: true,
    isPopular: true
  },
  {
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
      { name: "Statement Countertops", description: "Creates bold, eye-catching kitchen and bar counters" },
      { name: "Accent Features", description: "Perfect for feature walls and statement pieces in modern interiors" },
      { name: "Commercial Applications", description: "Ideal for reception counters and lobby features in upscale establishments" },
      { name: "Exterior Accents", description: "Excellent for adding color to outdoor kitchens and garden features" }
    ],
    isImported: true,
    isPopular: true
  },
  {
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
      { name: "Accent Walls", description: "Creates stunning feature walls in living rooms and entryways" },
      { name: "Luxury Bathrooms", description: "Adds organic elegance to bathroom vanities and shower walls" },
      { name: "Boutique Hotels", description: "Perfect for creating distinctive design elements in hospitality spaces" },
      { name: "Decorative Elements", description: "Ideal for inlays, borders, and custom furniture pieces" }
    ],
    isImported: true,
    isPopular: false
  },
  {
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
      { name: "Flooring", description: "Creates a warm, inviting ambiance in living rooms and entryways" },
      { name: "Wall Applications", description: "Perfect for accent walls and bathroom surrounds" },
      { name: "Fireplace Surrounds", description: "Adds richness and elegance to fireplaces and mantels" },
      { name: "Commercial Spaces", description: "Ideal for creating sophisticated, welcoming environments in offices and hotels" }
    ],
    isImported: true,
    isPopular: true
  },
  {
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
    description: "Absolute Black Granite, quarried in Zimbabwe, is renowned for its consistent, pure black coloring with virtually no visible grains or patterns. This elegant, uniform appearance makes it one of the most versatile and popular granite options available.",
    specifications: {
      color: "Pure, consistent black",
      finish: ["Polished", "Flamed", "Leather", "Honed", "Brushed"],
      thickness: ["18mm", "20mm", "30mm"],
      sizes: ["600x600mm", "800x800mm", "1200x600mm", "Custom sizes available"]
    },
    applications: [
      { name: "Kitchen Countertops", description: "Provides a sleek, sophisticated surface that pairs with any kitchen design" },
      { name: "Flooring", description: "Creates dramatic, elegant flooring in residential and commercial spaces" },
      { name: "Memorial Applications", description: "Often used for monuments and memorials due to its dignified appearance" },
      { name: "Modern Architecture", description: "Perfect for contemporary design elements in both interior and exterior applications" }
    ],
    isImported: true,
    isPopular: false
  },
  {
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
      { name: "Flooring", description: "Creates an inviting, elegant atmosphere in living spaces" },
      { name: "Wall Applications", description: "Perfect for bathroom walls and shower surrounds" },
      { name: "Vanity Tops", description: "Provides a sophisticated surface for bathroom vanities" },
      { name: "Commercial Spaces", description: "Ideal for hotels, restaurants, and retail environments" }
    ],
    isImported: true,
    isPopular: false
  },
  {
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
      { name: "Kitchen Countertops", description: "Provides a warm, durable surface that hides stains and fingerprints" },
      { name: "Commercial Flooring", description: "Excellent for high-traffic areas due to its durability and pattern" },
      { name: "Outdoor Applications", description: "Perfect for outdoor kitchens and garden features" },
      { name: "Accent Features", description: "Creates beautiful accent walls and fireplace surrounds" }
    ],
    isImported: false,
    isPopular: false
  },
  {
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
      { name: "Kitchen Countertops", description: "Creates bright, open kitchens that complement various cabinet colors" },
      { name: "Bathroom Vanities", description: "Provides an elegant, low-maintenance surface for bathrooms" },
      { name: "Commercial Applications", description: "Ideal for reception counters and common areas in office buildings" },
      { name: "Flooring", description: "Brightens spaces while offering excellent durability" }
    ],
    isImported: false,
    isPopular: false
  }
];

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Interior Designer",
    company: "Sharma Interiors",
    content: "SM GRANITES provided exceptional quality Italian marble for our luxury villa project. The Calacatta Gold they sourced was absolutely stunning, and their team ensured timely delivery. Highly recommended for premium natural stone.",
    rating: 5,
    featured: true,
    isActive: true
  },
  {
    name: "Priya Patel",
    role: "Architect",
    company: "Patel & Associates",
    content: "We've been sourcing granite from SM GRANITES for over 3 years. Their Black Galaxy granite is consistently high quality, and their customer service is outstanding. They're our go-to supplier for all stone requirements.",
    rating: 5,
    featured: true,
    isActive: true
  },
  {
    name: "Amit Kumar",
    role: "Property Developer",
    company: "Kumar Estates",
    content: "The Makrana White marble we purchased was perfect for our hotel lobby project. SM GRANITES helped us select the right stone and provided expert guidance throughout. Excellent experience!",
    rating: 5,
    featured: false,
    isActive: true
  },
  {
    name: "Sunita Reddy",
    role: "Homeowner",
    company: "",
    content: "Transformed our kitchen with beautiful granite countertops from SM GRANITES. The quality exceeded our expectations, and the price was very competitive. Thank you for making our dream kitchen a reality!",
    rating: 5,
    featured: false,
    isActive: true
  }
];

const teamMembers = [
  {
    name: "Rishabh Jain",
    role: "Managing Director",
    description: "Overseeing all operations with 15+ years of industry expertise in marble and granite trading.",
    order: 1,
    isActive: true
  },
  {
    name: "Suresh Kumar",
    role: "Operations Head",
    description: "Managing day-to-day operations and ensuring quality standards across all processes.",
    order: 2,
    isActive: true
  },
  {
    name: "Anita Sharma",
    role: "Sales Director",
    description: "Leading our sales team and building lasting relationships with clients across India.",
    order: 3,
    isActive: true
  },
  {
    name: "Vikram Singh",
    role: "Quality Manager",
    description: "Ensuring every slab meets our rigorous quality standards before delivery.",
    order: 4,
    isActive: true
  }
];

const faqs = [
  {
    question: "Do you ship products to other cities in India?",
    answer: "Yes, we deliver our marble and granite products across India through our reliable logistics network, ensuring safe transportation of your selected stones. We have partnerships with trusted carriers who specialize in handling natural stone products.",
    category: "shipping",
    order: 1,
    isActive: true
  },
  {
    question: "Can I request samples before making a purchase?",
    answer: "Absolutely! We offer a sample service to help you evaluate the color, texture, and quality of our stone varieties before making your final decision. Contact us to request samples of any product in our collection.",
    category: "ordering",
    order: 2,
    isActive: true
  },
  {
    question: "Do you provide installation services?",
    answer: "While we focus on supplying premium quality natural stones, we can recommend trusted installation professionals in your area through our network of partners. We also provide detailed installation guidelines with every purchase.",
    category: "installation",
    order: 3,
    isActive: true
  },
  {
    question: "What is your return policy?",
    answer: "We have a comprehensive quality check process before dispatch. In case of any defects or damage during transit, please notify us within 48 hours of receipt, and we'll work towards a suitable resolution including replacement or refund.",
    category: "ordering",
    order: 4,
    isActive: true
  },
  {
    question: "How do I maintain marble and granite surfaces?",
    answer: "For daily cleaning, use a soft cloth with mild soap and water. Avoid acidic cleaners on marble. Seal granite countertops annually. We provide detailed care instructions with every purchase and our team is available for maintenance guidance.",
    category: "maintenance",
    order: 5,
    isActive: true
  },
  {
    question: "What is the difference between marble and granite?",
    answer: "Marble is a metamorphic rock known for its elegant veining and softer surface, ideal for low-traffic areas and decorative applications. Granite is an igneous rock that's harder, more durable, and resistant to scratches, making it perfect for high-traffic areas and kitchen countertops.",
    category: "products",
    order: 6,
    isActive: true
  },
  {
    question: "Do you offer custom sizes and finishes?",
    answer: "Yes, we offer custom cutting and various finish options including polished, honed, brushed, and leather finishes. Contact our team with your specific requirements and we'll provide a custom quote.",
    category: "products",
    order: 7,
    isActive: true
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, UPI payments, and major credit/debit cards. For large orders, we offer flexible payment terms including advance payment with balance on delivery. Contact us to discuss payment options for your specific order.",
    category: "ordering",
    order: 8,
    isActive: true
  }
];

const galleryItems = [
  {
    title: "Luxury Villa Flooring",
    category: "flooring",
    description: "Complete marble flooring installation for a 5,000 sq ft luxury villa, featuring Statuario Marble with custom patterns.",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop",
    location: "Delhi, India",
    featured: true
  },
  {
    title: "Modern Kitchen Countertop",
    category: "countertops",
    description: "Black Galaxy granite countertop installation with waterfall edge design for a contemporary kitchen.",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=600&auto=format&fit=crop",
    location: "Mumbai, India",
    featured: false
  },
  {
    title: "Hotel Lobby Design",
    category: "commercial",
    description: "Grand lobby flooring and wall cladding using Italian Calacatta Gold marble for a five-star hotel.",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=600&auto=format&fit=crop",
    location: "Jaipur, India",
    featured: true
  },
  {
    title: "Bathroom Vanity",
    category: "bathrooms",
    description: "Custom bathroom vanity with Makrana White marble and integrated sink design.",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=600&auto=format&fit=crop",
    location: "Bangalore, India",
    featured: false
  },
  {
    title: "Office Reception Desk",
    category: "commercial",
    description: "Statement reception desk featuring book-matched Emperador Dark marble panels.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
    location: "Chennai, India",
    featured: false
  },
  {
    title: "Elegant Staircase",
    category: "flooring",
    description: "Floating staircase with Botticino Classico marble treads and matching wall cladding.",
    image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=600&auto=format&fit=crop",
    location: "Hyderabad, India",
    featured: false
  },
  {
    title: "Marble Wall Cladding",
    category: "wall",
    description: "Feature wall installation using Verde Guatemala marble with custom lighting integration.",
    image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?q=80&w=600&auto=format&fit=crop",
    location: "Pune, India",
    featured: false
  },
  {
    title: "Residential Kitchen Island",
    category: "countertops",
    description: "Large kitchen island with Kashmir White granite top and custom edge profile.",
    image: "https://images.unsplash.com/photo-1556911220-bda9da8a518b?q=80&w=600&auto=format&fit=crop",
    location: "Kolkata, India",
    featured: false
  }
];

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminExists = await prisma.admin.findFirst({
    where: { email: 'admin@smgrnaties.com' },
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123456', 10);
    await prisma.admin.create({
      data: {
        email: 'admin@smgrnaties.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'super_admin',
      },
    });
    console.log('✅ Admin user created: admin@smgrnaties.com / admin123456');
  } else {
    console.log('ℹ️  Admin user already exists');
  }

  // Seed products
  const existingProducts = await prisma.product.count();
  if (existingProducts === 0) {
    console.log('📦 Seeding products...');
    for (const product of products) {
      await prisma.product.create({
        data: product,
      });
    }
    console.log(`✅ Created ${products.length} products`);
  } else {
    console.log(`ℹ️  Found ${existingProducts} existing products, skipping product seed`);
  }

  // Seed gallery
  const existingGallery = await prisma.gallery.count();
  if (existingGallery === 0) {
    console.log('🖼️  Seeding gallery...');
    for (const item of galleryItems) {
      await prisma.gallery.create({
        data: item,
      });
    }
    console.log(`✅ Created ${galleryItems.length} gallery items`);
  } else {
    console.log(`ℹ️  Found ${existingGallery} existing gallery items, skipping gallery seed`);
  }

  // Seed testimonials
  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    console.log('💬 Seeding testimonials...');
    for (const item of testimonials) {
      await prisma.testimonial.create({
        data: item,
      });
    }
    console.log(`✅ Created ${testimonials.length} testimonials`);
  } else {
    console.log(`ℹ️  Found ${existingTestimonials} existing testimonials, skipping testimonials seed`);
  }

  // Seed team members
  const existingTeam = await prisma.teamMember.count();
  if (existingTeam === 0) {
    console.log('👥 Seeding team members...');
    for (const item of teamMembers) {
      await prisma.teamMember.create({
        data: item,
      });
    }
    console.log(`✅ Created ${teamMembers.length} team members`);
  } else {
    console.log(`ℹ️  Found ${existingTeam} existing team members, skipping team seed`);
  }

  // Seed FAQs
  const existingFaqs = await prisma.fAQ.count();
  if (existingFaqs === 0) {
    console.log('❓ Seeding FAQs...');
    for (const item of faqs) {
      await prisma.fAQ.create({
        data: item,
      });
    }
    console.log(`✅ Created ${faqs.length} FAQs`);
  } else {
    console.log(`ℹ️  Found ${existingFaqs} existing FAQs, skipping FAQs seed`);
  }

  // Final counts
  const productsCount = await prisma.product.count();
  const galleryCount = await prisma.gallery.count();
  const testimonialsCount = await prisma.testimonial.count();
  const teamCount = await prisma.teamMember.count();
  const faqsCount = await prisma.fAQ.count();
  const contactsCount = await prisma.contact.count();

  console.log('\n📊 Database summary:');
  console.log(`   Products: ${productsCount}`);
  console.log(`   Gallery items: ${galleryCount}`);
  console.log(`   Testimonials: ${testimonialsCount}`);
  console.log(`   Team members: ${teamCount}`);
  console.log(`   FAQs: ${faqsCount}`);
  console.log(`   Contacts: ${contactsCount}`);

  console.log('\n✅ Database seeding completed!');
  console.log('\n📝 Admin credentials:');
  console.log('   Email: admin@smgrnaties.com');
  console.log('   Password: admin123456');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
