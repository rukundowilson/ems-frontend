'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import { ClinicProvider } from '../contexts/ClinicContext';
import { FaAllergies, FaVenusMars, FaEye, FaBaby, FaSyringe, FaVirus, FaHeartbeat } from 'react-icons/fa';
import { MdSick } from 'react-icons/md';

const DeviceIcon = () => (
  <svg className="w-12 h-12 bg-purple-100 rounded-full p-2 text-purple-900" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-12 h-12 bg-purple-100 rounded-full p-2 text-purple-900" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

const PrescriptionIcon = () => (
  <svg className="w-12 h-12 bg-purple-100 rounded-full p-2 text-purple-900" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z"/>
  </svg>
);

export default function Home() {
  const [selectedSymptom, setSelectedSymptom] = useState(0);
  const router = useRouter();

  const symptoms = [
    'Red or pink bumps',
    'Whiteheads / Blackheads',
    'Flushed or blushing face',
    'None of the above'
  ];

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <ClinicProvider>
      <Layout>
        {/* Hero Section */}
        {/* Hero Section */}
<section className="relative py-16 lg:py-20 overflow-hidden">
  {/* Split background */}
  <div className="absolute inset-0 flex">
    <div className="w-full lg:w-1/2 bg-purple-100" />
    <div className="hidden lg:block lg:w-1/2 bg-white" />
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* LEFT → PHONE */}
      <div className="flex justify-center lg:justify-start items-center relative min-h-[500px] lg:min-h-[690px]">
        
        {/* Purple circle */}
        <div className="absolute w-[320px] h-[200px] sm:w-[380px] sm:h-[220px] md:w-[420px] md:h-[250px] lg:w-[500px] lg:h-[300px] bg-purple-300 rounded-full left-1/2 lg:left-0 top-1/2 -translate-x-1/2 lg:translate-x-0 -translate-y-1/2" />

        {/* Phone */}
        <div className="relative w-[260px] sm:w-[280px] md:w-[310px] lg:w-[300px] h-[520px] sm:h-[560px] md:h-[620px] lg:h-[590px] z-10 lg:ml-24">
          
          {/* frame */}
          <div className="absolute inset-0 bg-gray-200 rounded-[40px] shadow-2xl p-2.5">
            
            {/* screen */}
            <div className="relative w-full h-full bg-white rounded-[35px] overflow-hidden">
              
              {/* Status */}
              <div className="absolute top-0 left-0 right-0 h-9 bg-gray-100 flex items-center justify-between px-4 text-xs text-gray-600">
                <span>6:30</span>
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-300 rounded-full"></div>
                <div className="flex gap-1">
                  <span>📶</span>
                  <span>📡</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* Browser */}
              <div className="absolute top-9 left-0 right-0 h-8 bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium gap-1">
                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                SkyClinic.com
              </div>

              {/* Content */}
              <div className="absolute top-[68px] left-0 right-0 bottom-0  ">
                
                {/* Header */}
                <div className="bg-gradient-to-br from-pink-800 to-indigo-700 px-4 py-12 text-white text-center">
                  <h3 className=" font-bold leading-tight text-2xl">
                    Which of these <br /> symptoms do <br /> you have?
                  </h3>
                </div>

                {/* Symptoms */}
                <div className="px-2 py-3 space-y-2">
                  {symptoms.map((symptom, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedSymptom(index)}
                      className="flex items-center p-2 bg-white  rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                      <div
                        className={`w-5 h-5 mr-3 flex items-center justify-center rounded-full ${
                          selectedSymptom === index
                            ? "bg-purple-500"
                            : "border-2 border-gray-300"
                        }`}
                      >
                        {selectedSymptom === index && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{symptom}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <div className="px-3 lg:mt-10 md:mt-10 sm:mt-2 flex justify-center">
                  <button
                    onClick={handleGetStarted}
                    className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-6  text-sm sm:"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT → TEXT */}
      <div className="text-center lg:text-left mt-10 lg:mt-0">
        <div className="max-w-xl mx-auto lg:mx-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get better faster
          </h1>

          <p className="text-lg lg:text-2xl font-bold mb-6 text-gray-900">
            Your care anywhere online clinic
          </p>

          <div className="flex justify-center lg:justify-start mb-8 ">
            <div className="space-y-4">
              {[
                "Same-day treatment",
                "Board-certified practitioners",
                "Satisfaction guarantee",
              ].map((text, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-cyan-500 rounded-full mr-2 sm:mr-3 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">{text}</span>
                </div>
              ))}
            </div>
          </div>


          <Button size="lg" className="px-8 rounded-none" onClick={handleGetStarted}>
            Get started →
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left side - Image */}
              <div className="relative">
                <div className="w-full h-96 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <div className="w-64 h-64 bg-gray-300 rounded-full overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop" 
                      alt="Healthcare professional" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Right side - Features */}
              <div className="space-y-8">
                <FeatureCard
                  icon={<DeviceIcon />}
                  title="Convenient care"
                  description="Skip the trip and start your visit anytime with any device."
                />
                
                <FeatureCard
                  icon={<DocumentIcon />}
                  title="A price that doesn't hurt"
                  description="Visits as low as $0 with insurance."
                  link="Pricing & Insurance"
                />
                
                <FeatureCard
                  icon={<PrescriptionIcon />}
                  title="Prescriptions & treatment plans"
                  description="You'll get a customized treatment plan, plus prescriptions sent to your favorite pharmacy."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Human Connection Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left side - Image */}
              <div className="relative">
                <div className="w-full h-96 bg-lineart-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop" 
                    alt="Doctor with stethoscope" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right side - Content */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 mb-2">Real people</p>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Always a human connection
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Board-certified nurse practitioners are at the heart of every visit. 
                  They create a custom treatment plan you can trust. And, they're available 
                  to answer any questions about your plan for free.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm text-gray-500 mb-2">Our services</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How we can help
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Online care is growing and so is our list of services and conditions.
              </p>
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                Our Services →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="text-6xl mb-4 text-red-500">
                  <FaAllergies />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Sinus, Cough & Allergy</h3>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="text-6xl mb-4 text-pink-500">
                  <FaVenusMars />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Women's Health</h3>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="text-6xl mb-4 text-purple-500">
                  <FaEye />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Eye & Ear</h3>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="text-6xl mb-4 text-cyan-500">
                  <FaBaby />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Kids' Health</h3>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="text-6xl mb-4 text-orange-500">
                  <MdSick />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Skin & Rashes</h3>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="text-6xl mb-4 text-teal-500">
                  <FaHeartbeat />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Sexual Health / STI</h3>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="text-6xl mb-4 text-blue-500">
                  <FaVirus />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Flu</h3>
              </div>
            </div>
          </div>
        </section>
        
      </Layout>
    </ClinicProvider>
  );
}
