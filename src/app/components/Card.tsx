import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({ 
  children, 
  className = '', 
  padding = 'md', 
  shadow = 'sm' 
}: CardProps) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };

  return (
    <div className={`bg-white rounded-lg border border-blue-600 ${paddingClasses[padding]} ${shadowClasses[shadow]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;