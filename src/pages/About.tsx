
import React, { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || '/api';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description?: string;
  image?: string;
  email?: string;
  linkedin?: string;
}

const About = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${API_URL}/team`);
        if (response.ok) {
          const data = await response.json();
          setTeamMembers(data);
        }
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoadingTeam(false);
      }
    };

    fetchTeam();
  }, []);
  const milestones = [
    {
      year: "1998",
      title: "Company Founded",
      description: "SM GRANITES was established in Kishangarh, Rajasthan."
    },
    {
      year: "2005",
      title: "Expanded Collection",
      description: "Added international marble and granite varieties to our portfolio."
    },
    {
      year: "2010",
      title: "Modern Facility",
      description: "Upgraded to state-of-the-art processing facility."
    },
    {
      year: "2015",
      title: "Pan-India Presence",
      description: "Expanded distribution network across major cities in India."
    },
    {
      year: "2023",
      title: "Digital Transformation",
      description: "Launched online catalog and digital consultation services."
    }
  ];

  const values = [
    {
      title: "Quality",
      description: "We never compromise on the quality of our products."
    },
    {
      title: "Integrity",
      description: "Honesty and transparency in all our dealings."
    },
    {
      title: "Customer Satisfaction",
      description: "Going above and beyond to meet client expectations."
    },
    {
      title: "Innovation",
      description: "Constantly improving our processes and offerings."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-stone-100">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-xl mb-6">About SM GRANITES</h1>
            <p className="text-lg text-stone-600">
              A legacy of excellence in natural stone solutions, built over 25 years of dedicated craftsmanship and customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1596731498067-3ca5626252a3?q=80&w=1000&auto=format&fit=crop"
                alt="Marble quarry"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="heading-lg mb-6">Our Story</h2>
              <p className="text-stone-600 mb-4">
                Founded in 1998, SM GRANITES began as a small supplier of local marble in Kishangarh, Rajasthan - a region globally renowned for its exquisite marble deposits. What started as a modest operation has now evolved into one of the leading providers of premium natural stone solutions in India.
              </p>
              <p className="text-stone-600 mb-4">
                Our journey has been defined by a relentless pursuit of quality and excellence. Over the years, we have expanded our collection to include over 250 varieties of marble and granite from quarries across India and around the world, each selected for its unique characteristics and aesthetic appeal.
              </p>
              <p className="text-stone-600">
                Today, SM GRANITES is trusted by architects, interior designers, and homeowners for delivering natural stones that transform spaces into works of art. Our expertise, attention to detail, and commitment to customer satisfaction continue to drive our growth and reputation in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-marble-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="heading-md mb-4">Our Vision</h3>
              <p className="text-stone-600">
                To be the most trusted and preferred supplier of natural stone, known for our exceptional quality, diverse collection, and unparalleled customer experience.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="heading-md mb-4">Our Mission</h3>
              <p className="text-stone-600">
                To source and deliver the finest natural stones that inspire creativity and elevate spaces, while providing excellent service and building lasting relationships with our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide our operations and relationships
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="border border-stone-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-gold-dark mr-2" size={20} />
                  <h3 className="font-serif text-xl font-semibold">{value.title}</h3>
                </div>
                <p className="text-stone-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="section-padding bg-stone-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">
              Key milestones that have shaped our growth over the years
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gold-light/30"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Year Circle */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gold-dark border-4 border-gold-light text-white flex items-center justify-center text-sm font-bold z-10"></div>
                    
                    {/* Content */}
                    <div className="md:w-1/2 md:pr-12 md:text-right md:ml-auto">
                      <div className={`bg-white p-6 rounded-lg shadow-sm ${index % 2 === 0 ? 'md:mr-6' : 'md:ml-6'}`}>
                        <div className="text-gold-dark font-bold text-xl mb-2">{milestone.year}</div>
                        <h3 className="font-serif text-xl font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-stone-600">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="md:w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Leadership</h2>
            <p className="section-subtitle">
              Meet the experts behind SM GRANITES
            </p>
          </div>

          {loadingTeam ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-gold-dark" />
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 bg-stone-100">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400 text-4xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gold-dark mb-2">{member.role}</p>
                  {member.description && (
                    <p className="text-stone-600 text-sm">{member.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-1">Rishabh Jain</h3>
                <p className="text-gold-dark mb-2">Managing Director</p>
                <p className="text-stone-600 text-sm">Overseeing all operations with 15+ years of industry expertise</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
