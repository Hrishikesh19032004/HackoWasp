import React from 'react';
import sideImage from '../Images/globe.png'; 
import Navbar from '../components/Navbar';

const ContactUs = () => {
  return (
<>
    {/* <Navbar/> */}
    <div className="min-h-screen bg-gray-100 py-12 px-4">
   

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-4">
            We would love to hear from you! Whether you have a question, feedback, or just want to say hi, feel free to reach out to us.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Enter your message"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#2D6A4F] text-white rounded-md hover:bg-[#1A4C34] transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row md:items-start md:space-x-8">
            
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mumbai Office</h3>
              <p className="text-gray-700">
                Thadomal Shahani Engineering College <br />
                Bandra (W), Mumbai 400050 <br />
                Maharashtra, India
              </p>
              <p className="mt-2 text-gray-700">Phone: +91 22 2649 0447</p>
              <p className="mt-2 text-gray-700">Email: contact@mumbai-office.com</p>
            </div>

            <div className="md:w-1/2">
              <img
                src={sideImage}
                alt="Office Building"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="w-full">
            <iframe
              className="w-full h-64 rounded-lg shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.6556737821546!2d72.8351637148076!3d19.068636587090274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92d70f9b6e3%3A0x85d85c7875b02d1a!2sThadomal%20Shahani%20Engineering%20College!5e0!3m2!1sen!2sin!4v1632499607643!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              title="Mumbai Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
