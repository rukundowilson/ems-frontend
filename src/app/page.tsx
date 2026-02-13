'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Layout from './components/Layout';
import Button from './components/Button';
import FeatureCard from './components/FeatureCard';
import Hero from './components/Hero';
import FeaturesSection from './components/Features';
import HowItWorksSection from './components/HowItWorksSection';
import HealthcareHero from './components/HealthcareHero';
import ServicesSection from './components/OurService';
import QualityByDesign from './components/QualityByDesign';
const DeviceIcon = () => (
  <svg className="w-12 h-12 bg-blue-100 rounded-full p-2 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-12 h-12 bg-blue-100 rounded-full p-2 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

const PrescriptionIcon = () => (
  <svg className="w-12 h-12 bg-blue-100 rounded-full p-2 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
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
    router.push('/services');
  };

  return (
      <Layout>
        {/* Hero Section */}
        <Hero />
        <FeaturesSection/>
        <HowItWorksSection />
        <HealthcareHero />  
        <ServicesSection/>
        <QualityByDesign/>        
      </Layout>
  );
}
