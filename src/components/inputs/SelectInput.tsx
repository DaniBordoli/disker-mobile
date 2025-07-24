import React from 'react';
import { 
  TouchableOpacity, 
  View, 
  Text, 
  Image,
  TouchableWithoutFeedback 
} from 'react-native';

interface SelectInputProps {
  label: string;
  value: string;
  onPress: () => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({ 
  label, 
  value,
  onPress,
  placeholder,
  error,
  className
}) => {
  return (
    <View className="mb-4">
      <TouchableWithoutFeedback onPress={onPress}>
        <View className="relative">
          <TouchableOpacity
            className={`w-full py-5 px-4 rounded-xl border border-gray-300 bg-white flex-row items-center justify-between ${className || ''}`}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Text className={`text-base ${value ? 'text-gray-900' : 'text-gray-400'}`}>
              {value || placeholder || 'País'}
            </Text>
            <Image
              source={require('../../public/Icons/IconChevronDown.png')}
              className="w-5 h-5"
              style={{ tintColor: '#6B7280' }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {value && (
            <Text className="absolute left-4 top-2 text-xs text-gray-500">
              {label}
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};
