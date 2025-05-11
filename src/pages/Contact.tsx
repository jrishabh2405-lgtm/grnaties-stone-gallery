
import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-stone-800 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-xl mb-6">Contact Us</h1>
            <p className="text-lg text-stone-300">
              We're here to help with your natural stone requirements. Reach out to discuss your project or visit our showroom.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="heading-lg mb-6">Get in Touch</h2>
              <p className="text-stone-600 mb-8">
                Whether you have questions about our products, need a custom solution for your project, or want to schedule a visit to our showroom, our team is ready to assist you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-gold-light/20 p-3 rounded-full mr-4">
                    <MapPin className="text-gold-dark" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Visit Us</h4>
                    <p className="text-stone-600">
                      SM GRNATIES<br />
                      Kishangarh, Rajasthan, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gold-light/20 p-3 rounded-full mr-4">
                    <Phone className="text-gold-dark" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Call Us</h4>
                    <p className="text-stone-600">
                      <a href="tel:+919413727594" className="hover:text-gold-dark">
                        +91 9413727594
                      </a>
                      <br />
                      Rishabh Jain (Managing Director)
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gold-light/20 p-3 rounded-full mr-4">
                    <Mail className="text-gold-dark" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Email Us</h4>
                    <p className="text-stone-600">
                      <a href="mailto:contact@smgrnaties.com" className="hover:text-gold-dark">
                        contact@smgrnaties.com
                      </a>
                      <br />
                      For sales and inquiries
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gold-light/20 p-3 rounded-full mr-4">
                    <Clock className="text-gold-dark" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Business Hours</h4>
                    <p className="text-stone-600">
                      Monday - Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium text-lg mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-stone-800 text-white p-3 rounded-full hover:bg-gold-dark transition-colors" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-stone-800 text-white p-3 rounded-full hover:bg-gold-dark transition-colors" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <path d="M16 2.5v.5m0 0v.5m0-.5h.5m-.5 0h-.5" />
                    </svg>
                  </a>
                  <a href="#" className="bg-stone-800 text-white p-3 rounded-full hover:bg-gold-dark transition-colors" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a href="#" className="bg-stone-800 text-white p-3 rounded-full hover:bg-gold-dark transition-colors" aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="heading-md mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-stone-50 pt-0">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Visit Our Showroom</h2>
            <p className="section-subtitle">
              Experience our extensive collection of marble and granite in person
            </p>
          </div>

          <div className="h-96 bg-stone-200 rounded-lg overflow-hidden">
            {/* This is where you would embed a Google Map. For now, using a placeholder */}
            <div className="w-full h-full flex items-center justify-center bg-stone-300">
              <div className="text-center">
                <MapPin className="mx-auto text-gold-dark mb-2" size={40} />
                <p className="text-xl font-medium">Google Maps Embed Here</p>
                <p className="text-stone-600">Kishangarh, Rajasthan, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Find answers to common questions about our products and services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-serif text-lg font-semibold mb-2">Do you ship products to other cities in India?</h3>
              <p className="text-stone-600">
                Yes, we deliver our marble and granite products across India through our reliable logistics network, ensuring safe transportation of your selected stones.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-serif text-lg font-semibold mb-2">Can I request samples before making a purchase?</h3>
              <p className="text-stone-600">
                Absolutely! We offer a sample service to help you evaluate the color, texture, and quality of our stone varieties before making your final decision.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-serif text-lg font-semibold mb-2">Do you provide installation services?</h3>
              <p className="text-stone-600">
                While we focus on supplying premium quality natural stones, we can recommend trusted installation professionals in your area through our network of partners.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-serif text-lg font-semibold mb-2">What is your return policy?</h3>
              <p className="text-stone-600">
                We have a comprehensive quality check process before dispatch. In case of any defects or damage during transit, please notify us within 48 hours of receipt, and we'll work towards a suitable resolution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
