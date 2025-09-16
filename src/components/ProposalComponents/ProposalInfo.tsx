import React from 'react';
import { View, Image } from 'react-native';
import { HeadingS } from '../typography/Headings';
import { BodyS } from '../typography/BodyText';
import { CampaignData } from '../../types/campaign';

interface ProposalInfoProps {
  data: CampaignData;
}

export const ProposalInfo: React.FC<ProposalInfoProps> = ({ data }) => {
  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center flex-1">
          <Image
            source={data.brandLogo}
            className="w-10 h-10 rounded-full mr-3"
            resizeMode="contain"
          />
          <View className="flex-1">
            <HeadingS className="text-primary-950 mb-1">{data.title}</HeadingS>
            <BodyS className="text-gray-500">ID: {data.id}</BodyS>
          </View>
        </View>
        <View className="flex-row items-center">
          {data.platforms.includes('instagram') && (
            <View 
              className="w-8 h-8 rounded-full items-center justify-center"
              style={{ 
                backgroundColor: '#FF0069',
                zIndex: 2
              }}
            >
              <Image
                source={require('../../public/Icons/InstagramRoundedColorless.png')}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </View>
          )}
          {data.platforms.includes('tiktok') && (
            <View 
              className={`w-8 h-8 rounded-full items-center justify-center ${data.platforms.includes('instagram') ? '-ml-2' : ''}`}
              style={{ 
                backgroundColor: '#000000',
                zIndex: data.platforms.includes('instagram') ? 1 : 2
              }}
            >
              <Image
                source={require('../../public/Icons/TiktokRounded.png')}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      </View>

      {/* Campaign info */}
      <View className="flex-row items-center mb-2">
        <Image 
          source={require('../../public/Icons/IconDate.png')}
          className="w-4 h-4 mr-2"
          resizeMode="contain"
        />
        <BodyS className="text-gray-600">Inicio: {data.startDate}</BodyS>
        <View className="mx-3 w-px h-4 bg-gray-400" />
        <Image 
          source={require('../../public/Icons/IconTicket.png')}
          className="w-4 h-4 mr-2"
          resizeMode="contain"
        />
        <BodyS className="text-gray-600">{data.campaignType}</BodyS>
      </View>

      <View className="flex-row items-center mb-4">
        <Image 
          source={require('../../public/Icons/IconPin.png')}
          className="w-4 h-4 mr-2"
          resizeMode="contain"
        />
        <BodyS className="text-gray-600">{data.location}</BodyS>
      </View>

      {/* Divider */}
      <View className="h-px bg-primary-200 mb-6" />
    </View>
  );
};