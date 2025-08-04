import React from 'react';
import { View, Text } from 'react-native';
import { BodyS } from '../typography/BodyText';

interface DateSeparatorProps {
  date: string;
}

export const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  return (
    <View className="flex-row items-center my-4 px-6">
      <View className="flex-1 h-px bg-primary-100" />
      <View className="bg-primary-950 px-4 py-2 rounded-full mx-4">
        <BodyS className="text-white font-medium">
          {date}
        </BodyS>
      </View>
      <View className="flex-1 h-px bg-primary-100" />
    </View>
  );
};
