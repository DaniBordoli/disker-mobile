import React from 'react';
import { View, Text } from 'react-native';
import { HeadingS } from '../typography/Headings';
import { BodyM, BodyS } from '../typography/BodyText';
import { CampaignData } from '../../types/campaign';

interface RequirementsSectionProps {
  data: CampaignData;
}

export const RequirementsSection: React.FC<RequirementsSectionProps> = ({ data }) => {
  return (
    <>
      {/* Requirements */}
      <View className="mb-6">
        <HeadingS className="text-primary-950 mb-4">Requisitos</HeadingS>
        <View className="space-y-2">
          {data.requirements.map((requirement, index) => (
            <View key={index} className="flex-row items-start">
              <Text className="text-primary-950 text-2xl mr-2">•</Text>
              <BodyM className="text-primary-950 flex-1">{requirement}</BodyM>
            </View>
          ))}
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-primary-200 mb-6" />

      {/* Terms and Conditions */}
      <View className="mb-6">
        <HeadingS className="text-primary-950 mb-4">Términos y condiciones</HeadingS>
        <BodyM className="text-primary-950 leading-5">
          {data.termsAndConditions}
        </BodyM>
      </View>

      {/* Divider */}
      <View className="h-px bg-primary-200 mb-6" />

      {/* Categories */}
      <View>
        <HeadingS className="text-primary-950 mb-4">Categorías</HeadingS>
        <View className="flex-row flex-wrap">
          {data.categories.map((category, index) => (
            <View key={index} className="bg-primary-100 px-3 py-2 rounded-full mr-2 mb-2">
              <BodyS className="text-primary-950">{category}</BodyS>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};