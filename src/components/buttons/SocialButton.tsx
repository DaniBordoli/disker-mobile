import React from 'react';
import { TouchableOpacity, Text, View, TouchableOpacityProps } from 'react-native';

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
      className="w-full py-4 px-6 rounded-xl items-center justify-center mb-3 flex-row bg-white border border-gray-300"
      {...props}
    >
      {icon && (
        <View className="mr-3">
          {icon}
        </View>
      )}
      <Text className="text-gray-900 font-medium text-base">
        {title}
      </Text>
    </TouchableOpacity>
  );
};
