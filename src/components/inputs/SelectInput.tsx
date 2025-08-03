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
            className={`w-full py-5 px-4 rounded-xl border bg-white flex-row items-center justify-between ${
              error ? 'border-red-500' : 'border-primary-300'
            } ${className || ''}`}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Text className={`text-base ${
              value 
                ? 'text-gray-900' 
                : error 
                  ? 'text-red-400' 
                  : 'text-gray-400'
            }`}>
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
        <View className="flex-row items-center mt-1">
          <Image 
            source={require('../../public/Icons/IconWarning.png')} 
            className="w-4 h-4 mr-2" 
            style={{ tintColor: '#DC2626' }}
          />
          <Text className="text-red-600 text-sm">
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};
