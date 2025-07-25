import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { BodyM } from '../typography/BodyText';

interface SelectionButtonProps {
  title: string;
  icon?: string | any;
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
          ? 'bg-primary-50 border-primary-950' 
          : 'border-gray-300'
      }`}
      onPress={onPress}
    >
      <View className="flex-row items-center justify-center">
        {icon && (
          isSelected ? (
            <Image
              source={require('../../public/Icons/IconCheck.png')}
              className="w-4 h-4 mr-2"
              style={{ tintColor: '#191919' }}
              resizeMode="contain"
            />
          ) : (
            typeof icon === 'string' ? (
              <Text className="mr-2">{icon}</Text>
            ) : (
              <Image
                source={icon}
                className="w-6 h-6 mr-2"
                resizeMode="contain"
              />
            )
          )
        )}
        <BodyM className="font-medium text-primary-950">
          {title}
        </BodyM>
      </View>
    </TouchableOpacity>
  );
};
