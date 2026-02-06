'use client';

import Link from 'next/link';
import { Service } from '@/types/services';

// All hospital services (comprehensive list)
const allServices: Service[] = [
  {
    id: '1',
    title: 'Emergency Care',
    description: '24/7 emergency medical services for urgent and life-threatening conditions.',
    slug: 'emergency-care'
  },
  {
    id: '2',
    title: 'General Surgery',
    description: 'Comprehensive surgical procedures including appendectomy, hernia repair, and gallbladder removal.',
    slug: 'general-surgery'
  },
  {
    id: '3',
    title: 'Cardiology',
    description: 'Heart care services including diagnosis and treatment of cardiovascular diseases.',
    slug: 'cardiology'
  },
  {
    id: '4',
    title: 'Pediatrics',
    description: 'Specialized medical care for infants, children, and adolescents.',
    slug: 'pediatrics'
  },
  {
    id: '5',
    title: 'Maternity & Obstetrics',
    description: 'Prenatal care, delivery services, and postnatal care for mothers and newborns.',
    slug: 'maternity-obstetrics'
  },
  {
    id: '6',
    title: 'Radiology & Imaging',
    description: 'X-rays, CT scans, MRI, ultrasound, and other diagnostic imaging services.',
    slug: 'radiology-imaging'
  },
  {
    id: '7',
    title: 'Laboratory Services',
    description: 'Blood tests, urinalysis, microbiology, and other diagnostic laboratory tests.',
    slug: 'laboratory-services'
  },
  {
    id: '8',
    title: 'Orthopedics',
    description: 'Treatment for bone, joint, ligament, tendon, and muscle conditions and injuries.',
    slug: 'orthopedics'
  },
  {
    id: '9',
    title: 'Dental Care',
    description: 'General dentistry, tooth extractions, fillings, and oral health services.',
    slug: 'dental-care'
  },
  {
    id: '10',
    title: 'Physiotherapy',
    description: 'Physical rehabilitation and therapy for injury recovery and mobility improvement.',
    slug: 'physiotherapy'
  },
  {
    id: '11',
    title: 'Ophthalmology',
    description: 'Eye care services including vision tests, cataract surgery, and eye disease treatment.',
    slug: 'ophthalmology'
  },
  {
    id: '12',
    title: 'ENT Services',
    description: 'Treatment for ear infections, sinus problems, tonsillitis, and hearing issues.',
    slug: 'ent'
  },
  {
    id: '13',
    title: 'Dermatology',
    description: 'Skin care including treatment for acne, rashes, infections, and skin conditions.',
    slug: 'dermatology'
  },
  {
    id: '14',
    title: 'Neurology',
    description: 'Diagnosis and treatment of nervous system disorders including stroke and epilepsy.',
    slug: 'neurology'
  },
  {
    id: '15',
    title: 'Mental Health',
    description: 'Mental health services including counseling and treatment for depression and anxiety.',
    slug: 'psychiatry'
  },
  {
    id: '16',
    title: 'Pharmacy',
    description: 'In-house pharmacy providing prescribed medications and pharmaceutical care.',
    slug: 'pharmacy'
  },
  {
    id: '17',
    title: 'Dialysis',
    description: 'Kidney dialysis services for patients with chronic kidney disease.',
    slug: 'dialysis'
  },
  {
    id: '18',
    title: 'Cancer Care',
    description: 'Cancer screening, diagnosis, chemotherapy, and supportive cancer treatment.',
    slug: 'oncology'
  },
  {
    id: '19',
    title: 'Intensive Care',
    description: 'Critical care for seriously ill patients requiring constant monitoring.',
    slug: 'icu'
  },
  {
    id: '20',
    title: 'Nutrition',
    description: 'Nutritional counseling and diet planning for various health conditions.',
    slug: 'nutrition-dietetics'
  },
  {
    id: '21',
    title: 'Vaccination',
    description: 'Immunization programs for children and adults including flu shots and travel vaccines.',
    slug: 'vaccination'
  },
  {
    id: '22',
    title: 'Blood Bank',
    description: 'Blood donation, storage, and transfusion services.',
    slug: 'blood-bank'
  },
  {
    id: '23',
    title: 'Ambulance',
    description: 'Emergency medical transportation with trained paramedics.',
    slug: 'ambulance'
  },
  {
    id: '24',
    title: 'Health Screening',
    description: 'Comprehensive health check-ups and preventive screening programs.',
    slug: 'health-screening'
  }
];

export default function AllServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-gray-800 text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <Link href="/" className="font-bold text-lg">Hospital Services</Link>
              <Link href="/services" className="hover:text-gray-300">How it works</Link>
              <Link href="/services/all" className="hover:text-gray-300 border-b-2 border-purple-500 pb-3">Treatment & services</Link>
              <Link href="#" className="hover:text-gray-300">Pricing & insurance</Link>
              <Link href="#" className="hover:text-gray-300">Inside Hospital</Link>
              <Link href="#" className="hover:text-gray-300">Reviews</Link>
              <Link href="#" className="hover:text-gray-300">Blog</Link>
              <Link href="#" className="hover:text-gray-300">FAQ</Link>
            </div>
            <Link 
              href="/dashboard"
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Back to Dashboard
            </Link>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-3">Our Services</h1>
          <p className="text-lg text-purple-100">
            Choose a service to learn more or request an appointment with our healthcare professionals
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Grid of service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((service) => (
            <div 
              key={service.id} 
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 group flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors pr-2">
                  {service.title}
                </h3>
                <svg 
                  className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {service.description}
              </p>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <Link 
                  href={`/services/${service.slug}`}
                  className="flex-1 text-center px-4 py-2 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors text-sm"
                >
                  Learn More
                </Link>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex-1 text-center px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm"
                >
                  Request Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm font-medium mb-2">We're here to help</p>
          <h2 className="text-4xl font-bold mb-4">Need help choosing a service?</h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Our healthcare team is available 24/7 to guide you through our services and help you book the right appointment
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Go to Dashboard
            </Link>
            <a 
              href="tel:+250123456789"
              className="inline-block bg-purple-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-purple-800 transition-colors"
            >
              Call Us: +250 123 456 789
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}