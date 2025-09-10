import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BodyMStrong, BodyS, BodyMLink } from '../typography/BodyText';

export const ScriptSection: React.FC = () => {
  return (
    <View className="mb-6">
      <View className="border border-gray-200 rounded-lg p-4 bg-white">
        <View className="flex-row items-start justify-between mb-2">
          <BodyMStrong className="text-primary-950">Guión</BodyMStrong>
          <View className="bg-green-100 px-3 py-1 rounded-lg">
            <BodyS className="text-green-800 font-medium">Aceptado</BodyS>
          </View>
        </View>
        <TouchableOpacity className="mb-3">
          <BodyMLink className="text-primary-950">Ver historial</BodyMLink>
        </TouchableOpacity>
        
   
        <View className="h-px bg-gray-200 my-3" />
        
        <TouchableOpacity>
          <BodyMLink className="text-primary-950">Ver guión</BodyMLink>
        </TouchableOpacity>
      </View>
    </View>
  );
};
