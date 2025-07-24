import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

interface SelectionButtonProps {
  title: string;
  icon?: string;
  isSelected: boolean;
  onPress: () => void;
  flex?: boolean;
}

export const SelectionButton: React.FC<SelectionButtonProps> = ({
  title,
  icon,
  isSelected,
  onPress,
  flex = false
}) => {
  return (
    <TouchableOpacity
      className={`${flex ? 'flex-1' : ''} py-3 px-4 rounded-full border ${
        isSelected 
          ? 'bg-gray-100 border-black' 
          : 'border-gray-300'
      }`}
      onPress={onPress}
    >
      <View className="flex-row items-center justify-center">
        {icon && <Text className="mr-2">{icon}</Text>}
        <Text className="font-medium text-black">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
