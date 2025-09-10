import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { HeadingM, HeadingXS } from '../typography/Headings';
import { BodyM, BodyS } from '../typography/BodyText';
import { SocialButton } from '../buttons/SocialButton';
import { CampaignData } from '../../types/campaign';

interface DescriptionTabProps {
  data: CampaignData;
  onShowProjectModal: () => void;
}

export const DescriptionTab: React.FC<DescriptionTabProps> = ({ data, onShowProjectModal }) => {
  const totalDeliverables = data.deliverables.reduce((sum, platform) => sum + platform.totalCount, 0);

  return (
    <View>
      {/* Información de la campaña */}
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

      <View className="flex-row items-center mb-6">
        <Image 
          source={require('../../public/Icons/IconPin.png')}
          className="w-4 h-4 mr-2"
          resizeMode="contain"
        />
        <BodyS className="text-gray-600">{data.location}</BodyS>
      </View>
      
      <View className="h-px bg-gray-200 mb-6" />

      {/* Precio */}
      <View className="mb-6">
        <HeadingXS className="text-primary-950 mb-2">Pago</HeadingXS>
        <HeadingM className="text-primary-950">${data.price}</HeadingM>
      </View>

      <View className="h-px bg-gray-200 mb-6" />

      {/* Acerca del proyecto */}
      <View className="mb-6">
        <HeadingXS className="text-primary-950 mb-3">Acerca del proyecto</HeadingXS>
        <BodyM className="text-primary-950 leading-6 mb-4">
          {data.aboutProject.summary}
        </BodyM>
        
        <View className="items-center">
          <SocialButton 
            title="Mostrar más"
            onPress={onShowProjectModal}
          />
        </View>
      </View>

      {/* Entregables */}
      <View className="mb-6">
        <HeadingXS className="text-primary-950 mb-4">Entregables ({totalDeliverables})</HeadingXS>
        
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

      {/* Requisitos */}
      <View className="mb-6">
        <HeadingXS className="text-primary-950 mb-4">Requisitos</HeadingXS>
        <View className="space-y-2">
          {data.requirements.map((requirement, index) => (
            <View key={index} className="flex-row items-start">
              <Text className="text-primary-950 text-2xl mr-2">•</Text>
              <BodyM className="text-primary-950 flex-1">{requirement}</BodyM>
            </View>
          ))}
        </View>
      </View>

      {/* Términos y condiciones */}
      <View className="mb-6">
        <HeadingXS className="text-primary-950 mb-4">Términos y condiciones</HeadingXS>
        <BodyM className="text-primary-950 leading-5">
          {data.termsAndConditions}
        </BodyM>
      </View>

      {/* Categorías */}
      <View>
        <HeadingXS className="text-primary-950 mb-4">Categorías</HeadingXS>
        <View className="flex-row flex-wrap">
          {data.categories.map((category, index) => (
            <View key={index} className="bg-primary-100 px-3 py-2 rounded-full mr-2 mb-2">
              <BodyS className="text-primary-950">{category}</BodyS>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
