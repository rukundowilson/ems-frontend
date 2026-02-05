import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import { Service } from '@/types/services';

// Main hospital services
const services: Service[] = [
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
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with logo */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            {/* Logo icon */}
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Hospital Services</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Quality Care When You Need It
          </h1>
          
          {/* Subheading */}
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mb-8">
            Expert medical services across multiple departments including <span className="font-semibold">emergency care, surgery, diagnostics, and specialized treatments</span>.
          </p>

          {/* Divider line */}
          <div className="w-20 h-1 bg-gray-300 mb-12"></div>

          {/* "I'm here for" label */}
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            I'm here for:
          </h2>
        </div>

        {/* Services list */}
        <div className="space-y-5">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* See everything link - goes to another page */}
        <div className="text-center mt-16 pt-8">
          <Link 
            href="/services/all"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 hover:underline text-lg font-semibold transition-all group"
          >
            <span>See all our services</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Footer spacing */}
        <div className="h-12"></div>
      </div>
    </div>
  );
}