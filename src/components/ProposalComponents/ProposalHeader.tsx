import React from 'react';
import { View, TouchableOpacity, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeadingS } from '../typography/Headings';
import { BodyS } from '../typography/BodyText';
import { CampaignData } from '../../types/campaign';

interface ProposalHeaderProps {
  data: CampaignData;
  showStickyHeader: boolean;
  fadeAnim: Animated.Value;
}

export const ProposalHeader: React.FC<ProposalHeaderProps> = ({
  data,
  showStickyHeader,
  fadeAnim
}) => {
  const navigation = useNavigation();

  return (
    <>
      {/* Sticky Header */}
      <Animated.View 
        className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 z-50"
        style={{ 
          opacity: fadeAnim,
          pointerEvents: showStickyHeader ? 'auto' : 'none'
        }}
      >
        <View className="flex-row justify-between items-center px-4 py-3">
          <TouchableOpacity 
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={require('../../public/Icons/IconGoback.png')}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <View className="flex-1 mx-4">
            <HeadingS className="text-primary-950">{data.title}</HeadingS>
            <BodyS className="text-gray-500">ID: {data.id}</BodyS>
          </View>
          
          <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
            <Image 
              source={require('../../public/Icons/IconShare.png')}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Header violeta */}
      <View className="bg-violet-600 pb-6 relative">
        {/* Navigation */}
        <View className="flex-row justify-between items-center px-4 pt-4 pb-6">
          <TouchableOpacity 
            className="w-10 h-10 bg-white rounded-full items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={require('../../public/Icons/IconGoback.png')}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center">
            <Image 
              source={require('../../public/Icons/IconShare.png')}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Warning message */}
        {data.warningMessage && (
          <View className="absolute bottom-0 left-0 right-0 items-center" style={{ bottom: -55 }}>
            <View className="bg-yellow-100 px-3 py-2 rounded-lg flex-row items-center">
              <Image 
                source={require('../../public/Icons/IconWarning.png')}
                className="w-4 h-4 mr-2"
                resizeMode="contain"
                tintColor={'#806600'}
              />
              <BodyS className="text-yellow-800">{data.warningMessage}</BodyS>
            </View>
          </View>
        )}
      </View>
    </>
  );
};