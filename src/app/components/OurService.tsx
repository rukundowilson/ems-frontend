"use client"
import React from 'react';

export default function ServicesSection() {
  const services = [
    {
      icon: 'https://images.ctfassets.net/jxiqobw4rz6v/4ms1gBE9XL6nbbf8wKEmaK/d2820fce2044929aaabfbc9daffbbec9/ICON_category_cold-cough-allergy_96.svg',
      title: 'Sinus, Cough & Allergy'
    },
    {
      icon: 'https://images.ctfassets.net/jxiqobw4rz6v/3k2ZILUVfv4vJDlcF3xrR4/10286abf365eb852278a2724a2cfd9fd/ICON_category_womens-health_96.svg',
      title: "Women's Health"
    },
    {
      icon: 'https://images.ctfassets.net/jxiqobw4rz6v/R5iZ2PccR0wWxREIN73T1/48fcdd29291fc75b89d4e5ee0b2e26a3/ICON_category_eye-and-ear_96.svg',
      title: 'Eye & Ear'
    },
    {
      icon: 'https://images.ctfassets.net/jxiqobw4rz6v/6mNnSy8jh6OwxXeGEQfpI7/226eb9bed89e7b7acbdd43f39d5b9035/ICON_category_kids-health_96.svg',
      title: "Kids' Health"
    },
    {
      icon: 'https://images.ctfassets.net/jxiqobw4rz6v/4ms1gBE9XL6nbbf8wKEmaK/d2820fce2044929aaabfbc9daffbbec9/ICON_category_cold-cough-allergy_96.svg',
      title: 'Skin & Rashes'
    },
    {
      icon: 'https://images.ctfassets.net/jxiqobw4rz6v/3k2ZILUVfv4vJDlcF3xrR4/10286abf365eb852278a2724a2cfd9fd/ICON_category_womens-health_96.svg',
      title: 'Sexual Health / STI'
    },
    {
      icon: 'https://images.ctfassets.net/jxiqobw4rz6v/4ms1gBE9XL6nbbf8wKEmaK/d2820fce2044929aaabfbc9daffbbec9/ICON_category_cold-cough-allergy_96.svg',
      title: 'Flu'
    }
  ];

  return (
    <section className="w-full bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Our services
          </p>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How we can help
          </h2>

          <p className="text-base lg:text-lg text-gray-600 mb-4">
            Online care is growing and so is our list of services and conditions.
          </p>

          {/* Divider */}
          <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-4"></div>

          {/* Link */}
          <a href="#" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition">
            Our Services
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
              {/* Icon */}
              <div className="mb-4 transition-transform group-hover:scale-110">
                <img 
                  src={service.icon} 
                  alt={service.title}
                  className="w-16 h-16 lg:w-20 lg:h-20"
                />
              </div>
              
              {/* Title */}
              <h3 className="text-base lg:text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}