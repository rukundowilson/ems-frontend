"use client"
import React from 'react';
import { Check, Star } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

interface Review {
  rating: number;
  daysAgo: number;
  text: string;
}

const VirtuwellHero: React.FC = () => {
  const reviews: Review[] = [
    {
      rating: 5,
      daysAgo: 2,
      text: "Quick, easy and effective."
    },
    {
      rating: 5,
      daysAgo: 3,
      text: "Really appreciate the fast and thoroughness of the service."
    },
    {
      rating: 5,
      daysAgo: 3,
      text: "Great experience well organized and prompt service"
    }
  ];

  const features = [
    "Same-day treatment",
    "Board-certified practitioners",
    "Satisfaction guarantee"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2">
        {/* Left side - Phone mockup */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 py-16 px-4 sm:px-6 lg:px-12 flex items-center">
          <div className="w-full max-w-sm mx-auto">
            {/* PhoneMockup component inserted here */}
            <PhoneMockup />
          </div>
        </div>

        {/* Right side - White background with content */}
        <div className="bg-white py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-xl space-y-8">
            <div className="space-y-4">
              <h1 className="hero-title text-5xl md:text-6xl font-bold text-gray-900">
                Get better faster
              </h1>
              <p className="lead text-lg md:text-xl text-gray-700">
                Your care anywhere online clinic
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-teal-600" strokeWidth={3} />
                  </div>
                  <span className="text-gray-900 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <button className="btn-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-3">
                Get started
                <span className="text-2xl">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            {/* Rating Summary */}
            <div className="flex-shrink-0 space-y-3">
              <div className="flex items-center gap-4">
                <div className="text-6xl font-bold text-gray-900">4.7</div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
                View all 125750 reviews
                <span className="text-lg">›</span>
              </a>
            </div>

            {/* Review Cards - Horizontal Row */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0 divide-x divide-gray-200">
              {reviews.map((review, index) => (
                <div key={index} className="space-y-3 px-8">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">{review.daysAgo} days ago</div>
                  <p className="text-gray-900">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtuwellHero;