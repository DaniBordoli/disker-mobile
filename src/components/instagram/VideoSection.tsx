import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { BodyMStrong, BodyS, BodyMLink, BodyM } from '../typography/BodyText';

export const VideoSection: React.FC = () => {
  return (
    <View className="mb-6">
      <View className="border border-gray-200 rounded-lg p-4 bg-white">
        <View className="flex-row items-start justify-between mb-3">
          <BodyMStrong className="text-primary-950">Video</BodyMStrong>
          <View className="bg-green-100 px-3 py-1 rounded-lg">
            <BodyS className="text-green-800 font-medium">Aprobado</BodyS>
          </View>
        </View>
        
       
        <View className="flex-row items-center mb-3 bg-gray-100 rounded-lg p-3">
          <View className="w-12 h-12 bg-gray-300 rounded mr-3 items-center justify-center">
            <Image 
              source={require('../../public/Icons/IconCheck.png')}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
          <View className="flex-1">
            <BodyM className="text-primary-950 font-medium">Video_2.mp4</BodyM>
            <BodyS className="text-gray-500">4,3 MB</BodyS>
          </View>
        </View>
        
        <TouchableOpacity>
          <BodyMLink className="text-primary-950">Ver historial</BodyMLink>
        </TouchableOpacity>
      </View>
    </View>
  );
};
