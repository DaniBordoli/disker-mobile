import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { BodyM, BodyS } from '../typography/BodyText';
import { HeadingS, HeadingXS } from '../typography/Headings';

interface CampaignCardProps {
  brand: {
    logo: any;
    name: string;
  };
  title: string;
  description: string;
  startDate: string;
  type: string;
  location: string;
  amount: string;
  currency: string;
  actionLabel: string;
  actionColor: string;
  socialIcons?: any[]; 
  onPress: () => void;
  onActionPress: () => void;
}

export const CampaignCard: React.FC<CampaignCardProps & { style?: any }> = ({
  brand,
  title,
  description,
  startDate,
  type,
  location,
  amount,
  currency,
  actionLabel,
  actionColor,
  socialIcons,
  onPress,
  onActionPress,
  style
}) => {
  return (
    <TouchableOpacity 
      className="bg-white rounded-2xl p-4 mb-4 border border-primary-200 shadow-sm"
      onPress={onPress}
      style={style}
    >
     
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Image
            source={brand.logo}
            className="w-8 h-8 rounded-full mr-2"
            resizeMode="contain"
          />
          <HeadingXS className="font-medium text-black">{brand.name}</HeadingXS>
        </View>
        <View className="flex-row items-center">
          {socialIcons && socialIcons.map((icon, index) => {
          
            let backgroundColor = '#000000'; 
            
           
            if (icon === require('../../public/Icons/InstagramRoundedColorless.png')) {
              backgroundColor = '#E1306C'; 
            } else if (icon === require('../../public/Icons/YoutubeRounded.png')) {
              backgroundColor = '#FF0000'; 
            } else if (icon === require('../../public/Icons/TiktokRounded.png')) {
              backgroundColor = '#000000'; 
            }
            
            return (
              <View 
                key={index}
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  index > 0 ? '-ml-2' : ''
                }`}
                style={{ 
                  backgroundColor,
                  zIndex: socialIcons.length - index
                }}
              >
                <Image
                  source={icon}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </View>
            );
          })}
        </View>
      </View>

     
      <BodyM className="text-gray-700 mb-4 leading-5">
        {description}
      </BodyM>

      
      <View className="flex-row items-center mb-2">
        <Image
          source={require('../../public/Icons/IconDate.png')}
          className="w-4 h-4 mr-2"
          resizeMode="contain"
        />
        <BodyS className="text-primary-950">Inicio: {startDate}</BodyS>
        <View className="w-4 h-4 items-center justify-center mx-2">
          <View className="w-1 h-1 bg-gray-400 rounded-full" />
        </View>
        <Image
          source={require('../../public/Icons/IconTicket.png')}
          className="w-4 h-4 mr-2"
          resizeMode="contain"
        />
        <BodyS className="text-primary-950">{type}</BodyS>
      </View>

      <View className="flex-row items-center mb-4">
        <Image
          source={require('../../public/Icons/IconPin.png')}
          className="w-4 h-4 mr-2"
          resizeMode="contain"
        />
        <BodyS className="text-primary-950">{location}</BodyS>
      </View>

    
      <View className="h-px bg-primary-200 mb-4" />

      
      <View className="flex-row items-center justify-between">
        <HeadingS className="text-black font-bold text-lg">
          ${amount} {currency}
        </HeadingS>
        <TouchableOpacity
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: actionColor }}
          onPress={onActionPress}
        >
          <BodyS className="text-violet-800 font-medium">{actionLabel}</BodyS>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
