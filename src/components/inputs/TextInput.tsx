import React from 'react';
import { TextInput as RNTextInput, View, Text, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const TextInput: React.FC<CustomTextInputProps> = ({ 
  label, 
  error,
  className,
  ...props 
}) => {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-gray-700 font-medium mb-2 text-base">
          {label}
        </Text>
      )}
      <RNTextInput
        className={`w-full py-4 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 text-base ${className || ''}`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};
