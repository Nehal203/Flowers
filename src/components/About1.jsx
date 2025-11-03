import React from 'react';
import { Link } from 'react-router-dom';

const About1 = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'CEO & Founder',
      image: 'https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/team-01.jpg',
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
      },
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Head Florist',
      image: 'https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/team-02.jpg',
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
      },
    },
    {
      id: 3,
      name: 'Michael Johnson',
      role: 'Event Specialist',
      image: 'https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/team-03.jpg',
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
      },
    },
    {
      id: 4,
      name: 'Sarah Williams',
      role: 'Customer Service',
      image: 'https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/team-04.jpg',
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
      },
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote: "The flowers were absolutely stunning! They arrived fresh and lasted for weeks. Will definitely order again.",
      author: 'Emily R.',
      rating: 5,
    },
    {
      id: 2,
      quote: "Incredible service and beautiful arrangements. The team went above and beyond for our wedding.",
      author: 'David M.',
      rating: 5,
    },
    {
      id: 3,
      quote: "The subscription service is amazing! Fresh flowers delivered to my door every week. Highly recommend!",
      author: 'Sophia K.',
      rating: 5,
    },
  ];

  return (
    <div className="font-sans">
      <div className="relative bg-cover bg-center h-96 flex items-center justify-center" style={{ backgroundImage: 'url("https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/team-hero-bg.jpg")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="text-center z-10 text-white px-4">
          <h1 className="text-md mb-4">OUR TEAM</h1>
          <h1 className="text-5xl font-bold mb-4">Meet Our Passionate Team</h1>
          <p className="text-md mb-4 max-w-2xl mx-auto">Dedicated to bringing beauty and joy through our floral creations.</p>
        </div>
      </div>

      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-rose-500 font-semibold mb-2">Our Experts</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet the Talented Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our team of passionate florists and designers bring creativity and expertise to every arrangement.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-80 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-rose-500 text-sm font-medium mb-4">{member.role}</p>
                  <div className="flex justify-center space-x-4">
                    <a href={member.social.facebook} className="text-gray-500 hover:text-rose-500">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a href={member.social.twitter} className="text-gray-500 hover:text-rose-500">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84z" />
                      </svg>
                    </a>
                    <a href={member.social.instagram} className="text-gray-500 hover:text-rose-500">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-rose-500 font-semibold mb-2">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from our satisfied customers about their experiences with our flowers and service.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <p className="font-medium text-gray-900">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-16 bg-rose-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Our Flowers?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Shop our collection of fresh flowers and arrangements today.</p>
          <Link 
            to="/shop" 
            className="bg-white text-rose-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About1;