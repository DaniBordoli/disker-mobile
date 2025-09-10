import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';
import { BodyM, BodyS, BodyMLink, BodyMStrong } from '../typography/BodyText';

type ProgressTabNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProgressTab: React.FC = () => {
  const navigation = useNavigation<ProgressTabNavigationProp>();

  return (
    <View>
      {/* Estado de postulación */}
      <View className="mb-6">
        <View className="border border-gray-200 rounded-lg p-4">
          <View className="flex-row items-start justify-between mb-2">
            <BodyMStrong className="text-primary-950 font-medium">Postulación</BodyMStrong>
            <View className="bg-green-100 px-3 py-1 rounded-lg">
              <BodyS className="text-green-800 font-medium">Aceptado</BodyS>
            </View>
          </View>
          <TouchableOpacity>
            <BodyMLink className="text-primary-950">Ver postulación</BodyMLink>
          </TouchableOpacity>
        </View>
      </View>

      {/* Entregables con progreso */}
      <View className="mb-6">
        {/* Instagram Reel */}
        <View className="mb-4 border border-primary-950 rounded-lg p-4">
          <View className="flex-row items-center mb-3">
            <View 
              className="w-8 h-8 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: '#FF0069' }}
            >
              <Image
                source={require('../../public/Icons/InstagramRoundedColorless.png')}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </View>
            <View className="flex-1">
              <BodyM className="text-primary-950 font-medium">Reel 1</BodyM>
              <BodyS className="text-gray-500">Vence en 15 días</BodyS>
            </View>
            <View className="bg-purple-100 px-3 py-1 rounded">
              <BodyS className="text-purple-700 font-medium">En progreso</BodyS>
            </View>
          </View>
          
          {/* Barras de progreso */}
          <View className="mb-4 flex-row">
            <View className="h-1 bg-violet-400 rounded-full" style={{ width: 62 }} />
            <View className="h-1 bg-violet-400 rounded-full ml-1" style={{ width: 62 }} />
            <View className="h-1 bg-violet-400 rounded-full ml-1" style={{ width: 62 }} />
            <View className="h-1 bg-violet-100 rounded-full ml-1" style={{ width: 62 }} />
            <View className="h-1 bg-violet-100 rounded-full ml-1" style={{ width: 62 }} />
          </View>
          
          <TouchableOpacity onPress={() => navigation.navigate('InstagramProgress')}>
            <BodyMLink className="text-primary-950">Completar contenido</BodyMLink>
          </TouchableOpacity>
        </View>

        {/* TikTok */}
        <View className="mb-4 border border-primary-950 rounded-lg p-4">
          <View className="flex-row items-center mb-3">
            <View 
              className="w-8 h-8 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: '#000000' }}
            >
              <Image
                source={require('../../public/Icons/TiktokRounded.png')}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </View>
            <View className="flex-1">
              <BodyM className="text-primary-950 font-medium">Tiktok 1</BodyM>
              <BodyS className="text-gray-500">Vence en 21 días</BodyS>
            </View>
            <View className="bg-purple-100 px-3 py-1 rounded">
              <BodyS className="text-purple-700 font-medium">En progreso</BodyS>
            </View>
          </View>
          
          {/* Barras de progreso */}
          <View className="mb-4 flex-row">
            <View className="h-1 bg-violet-400 rounded-full" style={{ width: 62 }} />
            <View className="h-1 bg-violet-400 rounded-full ml-1" style={{ width: 62 }} />
            <View className="h-1 bg-violet-400 rounded-full ml-1" style={{ width: 62 }} />
            <View className="h-1 bg-violet-100 rounded-full ml-1" style={{ width: 62 }} />
            <View className="h-1 bg-violet-100 rounded-full ml-1" style={{ width: 62 }} />
          </View>
          
          <BodyMLink className="text-primary-950">Completar contenido</BodyMLink>
        </View>

        {/* Finalizado */}
        <View className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <BodyMStrong className="text-gray-500">Finalizado</BodyMStrong>
        </View>
      </View>
    </View>
  );
};
