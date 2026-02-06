import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}

const FeatureCard = ({ icon, title, description, link }: FeatureCardProps) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="shrink-0 text-cyan-500">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{description}</p>
        {link && (
          <a href={link} className="text-purple-600 hover:text-purple-700 font-medium">
            {link} →
          </a>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;