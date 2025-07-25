import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { BodyM } from '../typography/BodyText';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'dark' | 'outline';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  title, 
  variant = 'primary',
  ...props 
}) => {
  const baseClasses = "w-full py-5 px-6 items-center justify-center mb-4";
  
  const variantClasses = variant === 'dark' 
    ? "bg-primary-950 rounded-xl" 
    : variant === 'outline'
    ? "bg-white border-2 border-primary-300 rounded-2xl"
    : "bg-white border border-primary-300 rounded-xl";
  
  const textClasses = variant === 'dark' 
    ? "text-white font-semibold text-base" 
    : variant === 'outline'
    ? "text-primary-950 font-medium text-base"
    : "text-black font-semibold text-base";

  return (
    <TouchableOpacity 
      className={`${baseClasses} ${variantClasses}`}
      {...props}
    >
      <BodyM className={textClasses}>
        {title}
      </BodyM>
    </TouchableOpacity>
  );
};
