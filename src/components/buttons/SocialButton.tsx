import React from 'react';
import { TouchableOpacity, Text, View, TouchableOpacityProps } from 'react-native';
import { BodyM } from '../typography/BodyText';

interface SocialButtonProps extends TouchableOpacityProps {
  title: string;
  icon?: React.ReactNode;
  provider?: 'tiktok' | 'google' | 'instagram' | 'apple';
}

export const SocialButton: React.FC<SocialButtonProps> = ({ 
  title, 
  icon,
  provider,
  ...props 
}) => {
  return (
    <TouchableOpacity 
      className="w-full py-5 px-6 rounded-xl items-center justify-center mb-3 flex-row bg-white border border-primary-300"
      {...props}
    >
      {icon && (
        <View className="mr-3">
          {icon}
        </View>
      )}
      <BodyM className="text-primary-950 font-medium text-base">
        {title}
      </BodyM>
    </TouchableOpacity>
  );
};
