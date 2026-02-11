import Link from 'next/link';
import { Service } from '@/types/services';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/get-started/book?service=${service.slug}`}>
      <div
        className="
          bg-white
          border-l-4
          border-l-purple-600
          border
          border-gray-200
          rounded-lg
          p-6
          cursor-pointer
          transition-all
          duration-300
          hover:shadow-xl
          hover:border-purple-300
          hover:border-l-purple-700
          hover:-translate-y-1
          group
          h-full
          mb-4
          relative
          overflow-hidden
        "
      >
        {/* Subtle gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="flex justify-between items-center gap-6 relative z-10">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
              {service.description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <svg
              className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-all duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}