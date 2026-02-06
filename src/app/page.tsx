'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import { ClinicProvider } from '../contexts/ClinicContext';

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
        <section className="bg-linear-to-br from-purple-50 to-purple-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Mobile mockup */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="w-80 h-96 bg-white rounded-3xl shadow-2xl p-6 border-8 border-gray-200">
                    <div className="bg-linear-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white mb-4">
                      <h3 className="text-lg font-semibold mb-4">Which of these symptoms do you have?</h3>
                    </div>
                    <div className="space-y-3">
                      {symptoms.map((symptom, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedSymptom(index)}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedSymptom === index
                              ? 'bg-purple-200'
                              : 'bg-gray-50 hover:bg-purple-50'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full mr-3 ${
                              selectedSymptom === index
                                ? 'bg-purple-600'
                                : 'border-2 border-gray-300'
                            }`}
                          ></div>
                          <span className="text-gray-700">{symptom}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button className="w-full" variant="outline" onClick={handleGetStarted}>Continue →</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Content */}
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  Get better faster
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Your care anywhere online clinic
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full mr-3 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Same-day treatment</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full mr-3 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Board-certified practitioners</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full mr-3 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Satisfaction guarantee</span>
                  </div>
                </div>

                <Button size="lg" className="px-8" onClick={handleGetStarted}>
                  Get started →
                </Button>
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
                <div className="text-6xl mb-4 text-red-500">🤧</div>
                <h3 className="text-lg font-semibold text-gray-900">Sinus, Cough & Allergy</h3>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="text-6xl mb-4 text-blue-500">🌸</div>
                <h3 className="text-lg font-semibold text-gray-900">Women's Health</h3>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="text-6xl mb-4 text-purple-500">👁️👂</div>
                <h3 className="text-lg font-semibold text-gray-900">Eye & Ear</h3>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="text-6xl mb-4 text-cyan-500">👶</div>
                <h3 className="text-lg font-semibold text-gray-900">Kids' Health</h3>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="text-6xl mb-4 text-orange-500">🔬</div>
                <h3 className="text-lg font-semibold text-gray-900">Skin & Rashes</h3>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="text-6xl mb-4 text-teal-500">➕</div>
                <h3 className="text-lg font-semibold text-gray-900">Sexual Health / STI</h3>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="text-6xl mb-4 text-pink-500">🌡️</div>
                <h3 className="text-lg font-semibold text-gray-900">Flu</h3>
              </div>
            </div>
          </div>
        </section>
        
      </Layout>
    </ClinicProvider>
  );
}
