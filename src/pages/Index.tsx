
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Award, Clock, Truck, MapPin, Phone, Mail, Quote } from "lucide-react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import ContactForm from "@/components/ContactForm";

const features = [
  {
    title: "Premium Selection",
    description: "Over 250 varieties of premium marble and granite sourced from around the world.",
    icon: Globe,
  },
  {
    title: "Expert Guidance",
    description: "25+ years of experience helping clients find the perfect stone for their projects.",
    icon: Award,
  },
  {
    title: "Quality Assurance",
    description: "Rigorous quality control to ensure only the finest stones make it to your space.",
    icon: Clock,
  },
  {
    title: "Timely Delivery",
    description: "Efficient logistics to deliver your chosen stones right when you need them.",
    icon: Truck,
  },
];

const Index = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <Hero />

      {/* About Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 bg-gold-dark/10 rounded-full px-4 py-2 mb-6">
                <Award className="w-4 h-4 text-gold-dark" />
                <span className="text-sm font-medium text-gold-dark">Since 1999</span>
              </div>
              <h2 className="heading-lg mb-6 bg-gradient-to-r from-stone-800 to-stone-600 bg-clip-text text-transparent">
                Elevating Spaces with Nature's Finest Creations
              </h2>
              <p className="text-stone-600 mb-6 leading-relaxed">
                SM GRANITES has been a distinguished name in the natural stone industry for over 25 years.
                Based in Kishangarh, Rajasthan - the marble hub of India, we offer an extensive collection
                of premium marble and granite that transforms ordinary spaces into extraordinary experiences.
              </p>
              <p className="text-stone-600 mb-8 leading-relaxed">
                Our portfolio includes over 250 varieties of marble and granite, carefully sourced from the
                finest quarries across India and around the world. Each stone tells a unique story of nature's
                artistry, preserved and processed with precision to grace your spaces.
              </p>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-gold-dark to-gold-light text-white py-3 px-8 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1617975178295-4aff353a4296?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1608501078713-8e445a709b39?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1601612628452-9e99ced43524?q=80&w=800&auto=format&fit=crop",
              ].map((src, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.5 }}
                  className="relative group overflow-hidden rounded-xl shadow-lg"
                >
                  <img
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Why Choose Us */}
      <section className="section-padding bg-gradient-to-b from-white to-marble-light">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gold-dark/10 rounded-full px-4 py-2 mb-4">
              <Award className="w-4 h-4 text-gold-dark" />
              <span className="text-sm font-medium text-gold-dark">Our Advantages</span>
            </div>
            <h2 className="section-title">Why Choose SM GRANITES</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Expertise, quality, and service that makes us the preferred choice for premium natural stones
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-stone-100 hover:border-gold-light/50"
                >
                  <div className="bg-gradient-to-br from-gold-light/20 to-gold-dark/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-gold-dark" />
                  </div>
                  <h3 className="heading-sm mb-3 text-stone-800">{feature.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section
        className="py-20 bg-cover bg-center bg-fixed relative overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2000&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gold-light/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * 100,
              }}
              animate={{
                y: [null, window.innerHeight],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <Quote className="w-16 h-16 text-gold-light mx-auto mb-6 opacity-50" />
              <h2 className="font-serif text-4xl font-bold mb-6">What Our Clients Say</h2>
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl italic mb-8 leading-relaxed text-white/90"
            >
              "SM GRANITES provided us with the most exquisite marble for our hotel lobby.
              The quality and beauty of the stone has been praised by all our guests. Their
              team's expertise in helping us select the perfect pieces was invaluable."
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-block bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <p className="text-gold-light font-semibold text-lg mb-1">Amit Sharma</p>
              <p className="text-sm text-stone-300">Luxury Hotel Developer</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-gradient-to-b from-stone-50 to-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 bg-gold-dark/10 rounded-full px-4 py-2 mb-6">
                <Mail className="w-4 h-4 text-gold-dark" />
                <span className="text-sm font-medium text-gold-dark">Contact Us</span>
              </div>
              <h2 className="heading-lg mb-6">Get in Touch</h2>
              <p className="text-stone-600 mb-8 leading-relaxed">
                Have questions about our products or need a custom solution for your project?
                Our team is ready to assist you. Fill out the form and we'll get back to you
                as soon as possible.
              </p>

              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Visit Us", content: "Kishangarh, Rajasthan, India" },
                  { icon: Phone, title: "Contact", content: "+91 9413727594 (Rishabh Jain)", link: "tel:+919413727594" },
                  { icon: Mail, title: "Email", content: "contact@smgrnaties.com", link: "mailto:contact@smgrnaties.com" },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start group"
                    >
                      <div className="bg-gradient-to-br from-gold-light/30 to-gold-dark/30 p-4 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-gold-dark" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-stone-800 mb-1">{item.title}</h4>
                        {item.link ? (
                          <a href={item.link} className="text-stone-600 hover:text-gold-dark transition-colors">
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-stone-600">{item.content}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
