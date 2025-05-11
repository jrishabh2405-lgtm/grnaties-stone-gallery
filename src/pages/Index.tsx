
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import ContactForm from "@/components/ContactForm";

const features = [
  {
    title: "Premium Selection",
    description: "Over 250 varieties of premium marble and granite sourced from around the world.",
    icon: "🌍",
  },
  {
    title: "Expert Guidance",
    description: "25+ years of experience helping clients find the perfect stone for their projects.",
    icon: "💼",
  },
  {
    title: "Quality Assurance",
    description: "Rigorous quality control to ensure only the finest stones make it to your space.",
    icon: "✓",
  },
  {
    title: "Timely Delivery",
    description: "Efficient logistics to deliver your chosen stones right when you need them.",
    icon: "🚚",
  },
];

const Index = () => {
  return (
    <div>
      <Hero />

      {/* About Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">Elevating Spaces with Nature's Finest Creations</h2>
              <p className="text-stone-600 mb-6">
                SM GRNATIES has been a distinguished name in the natural stone industry for over 25 years. Based in Kishangarh, Rajasthan - the marble hub of India, we offer an extensive collection of premium marble and granite that transforms ordinary spaces into extraordinary experiences.
              </p>
              <p className="text-stone-600 mb-6">
                Our portfolio includes over 250 varieties of marble and granite, carefully sourced from the finest quarries across India and around the world. Each stone tells a unique story of nature's artistry, preserved and processed with precision to grace your spaces.
              </p>
              <Link to="/about" className="btn-primary inline-flex items-center">
                Learn More About Us <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1599619351208-3e6c839d6828?q=80&w=800&auto=format&fit=crop"
                alt="Marble sample"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1617975178295-4aff353a4296?q=80&w=800&auto=format&fit=crop"
                alt="Granite sample"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1608501078713-8e445a709b39?q=80&w=800&auto=format&fit=crop"
                alt="Stone manufacturing"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1601612628452-9e99ced43524?q=80&w=800&auto=format&fit=crop"
                alt="Finished marble product"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose SM GRNATIES</h2>
            <p className="section-subtitle">
              Expertise, quality, and service that makes us the preferred choice for premium natural stones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-marble-light p-6 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="heading-sm mb-3">{feature.title}</h3>
                <p className="text-stone-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section 
        className="py-16 bg-cover bg-center relative" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2000&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="font-serif text-3xl font-bold mb-8">What Our Clients Say</h2>
            <blockquote className="text-xl italic mb-6">
              "SM GRNATIES provided us with the most exquisite marble for our hotel lobby. The quality and beauty of the stone has been praised by all our guests. Their team's expertise in helping us select the perfect pieces was invaluable."
            </blockquote>
            <div className="font-medium">
              <p className="text-gold-light">Amit Sharma</p>
              <p className="text-sm text-stone-300">Luxury Hotel Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-stone-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="heading-lg mb-6">Get in Touch</h2>
              <p className="text-stone-600 mb-8">
                Have questions about our products or need a custom solution for your project? 
                Our team is ready to assist you. Fill out the form and we'll get back to you 
                as soon as possible.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-gold-light/20 p-3 rounded-full text-gold-dark mr-4">📍</div>
                  <div>
                    <h4 className="font-medium">Visit Us</h4>
                    <p className="text-stone-600">Kishangarh, Rajasthan, India</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gold-light/20 p-3 rounded-full text-gold-dark mr-4">📱</div>
                  <div>
                    <h4 className="font-medium">Contact</h4>
                    <p className="text-stone-600">
                      <a href="tel:+919413727594">+91 9413727594</a> (Rishabh Jain)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gold-light/20 p-3 rounded-full text-gold-dark mr-4">📧</div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-stone-600">
                      <a href="mailto:contact@smgrnaties.com">contact@smgrnaties.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
