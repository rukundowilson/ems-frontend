import React from 'react';
import { Monitor, FileText, Pill } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Why simple is better</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Smart and affordable
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Circle with Image */}
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-xl aspect-square">
              {/* Circle Container */}
              <div className="w-full h-full">
                {/* Image - Replace with actual image */}
                <img 
                    src="/images/in-features-sec.webp" 
                  alt="Healthcare professional"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="order-1 lg:order-2 space-y-10 flex flex-col justify-center">
            
            {/* Feature 1 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0">
                <Monitor className="w-12 h-12 text-cyan-400" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Convenient care
                </h3>
                <p className="text-lg text-gray-600">
                  Skip the trip and start your visit anytime with any device.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0">
                <FileText className="w-12 h-12 text-cyan-400" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  A price that doesn't hurt
                </h3>
                <p className="text-lg text-gray-600 mb-2">
                  Visits as low as $0 with insurance.
                </p>
                <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center gap-1">
                  Pricing & insurance
                  <span>›</span>
                </a>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0">
                <Pill className="w-12 h-12 text-cyan-400" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Prescriptions & treatment plans
                </h3>
                <p className="text-lg text-gray-600">
                  You'll get a customized treatment plan, plus prescriptions sent to your favorite pharmacy.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;