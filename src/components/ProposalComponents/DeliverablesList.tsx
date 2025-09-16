import React from 'react';
import { View, Image, Text } from 'react-native';
import { HeadingS } from '../typography/Headings';
import { BodyM, BodyS } from '../typography/BodyText';
import { CampaignData } from '../../types/campaign';

interface DeliverablesListProps {
  data: CampaignData;
}

export const DeliverablesList: React.FC<DeliverablesListProps> = ({ data }) => {
  const totalDeliverables = data.deliverables.reduce((sum, platform) => sum + platform.totalCount, 0);

  return (
    <View className="mb-6">
      <HeadingS className="text-primary-950 mb-4">Entregables ({totalDeliverables})</HeadingS>
      
      {data.deliverables.map((platform, index) => (
        <View key={platform.platform} className="mb-4 bg-primary-50 rounded-lg p-3">
          <View className="flex-row items-center mb-3">
            <View 
              className="w-8 h-8 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: platform.backgroundColor }}
            >
              <Image
                source={platform.icon}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </View>
            <BodyM className="text-primary-950 font-medium">
              {platform.platform === 'instagram' ? 'Instagram' : 'TikTok'}{' '}
            </BodyM>
            <BodyS className="text-primary-400 text-sm">{platform.totalCount} entregables</BodyS>
          </View>
          
          <View className="flex-row items-center ml-9 flex-wrap">
            {platform.items.map((item, itemIndex) => (
              <React.Fragment key={itemIndex}>
                <View className="flex-row items-center">
                  <Text className="mr-1">{item.emoji}</Text>
                  <BodyS className="text-primary-950 text-sm">{item.text}</BodyS>
                </View>
                {itemIndex < platform.items.length - 1 && (
                  <View className="w-2 h-2 bg-primary-100 rounded-full mx-3" />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};