import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'dark' | 'outline';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  title, 
  variant = 'primary',
  ...props 
}) => {
  const baseClasses = "w-full py-4 px-6 items-center justify-center mb-4";
  
  const variantClasses = variant === 'dark' 
    ? "bg-black rounded-xl" 
    : variant === 'outline'
    ? "bg-white border-2 border-gray-300 rounded-2xl"
    : "bg-white border border-gray-300 rounded-xl";
  
  const textClasses = variant === 'dark' 
    ? "text-white font-semibold text-base" 
    : variant === 'outline'
    ? "text-gray-600 font-medium text-base"
    : "text-black font-semibold text-base";

  return (
    <TouchableOpacity 
      className={`${baseClasses} ${variantClasses}`}
      {...props}
    >
      <Text className={textClasses}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
