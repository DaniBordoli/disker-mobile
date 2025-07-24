import React from 'react';
import { TextInput as RNTextInput, View, Text, TextInputProps, Image } from 'react-native';

interface SearchInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
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
      <View className="relative">
        <RNTextInput
          className={`w-full py-4 pl-12 pr-4 rounded-xl border border-gray-400 bg-white text-gray-900 text-base ${className || ''}`}
          placeholderTextColor="#9CA3AF"
          {...props}
        />
        <Image
          source={require('../../public/Icons/IconSearch.png')}
          className="absolute left-4 top-1/2 w-5 h-5"
          style={{ 
            tintColor: '#6B7280',
            transform: [{ translateY: -10 }]
          }}
          resizeMode="contain"
        />
      </View>
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};
