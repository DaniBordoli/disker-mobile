import React from 'react';
import { View, Image } from 'react-native';
import { BodyM } from '../typography/BodyText';

interface ChatBubbleProps {
  message: string;
  time: string;
  senderAvatar?: any;
  isOwnMessage?: boolean;
  attachedImage?: any;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  time, 
  senderAvatar,
  isOwnMessage = false,
  attachedImage
}) => {
  return (
    <View className={`flex-row items-end mb-4 px-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
    
      {!isOwnMessage && (
        <View className="mr-2">
          <Image
            source={senderAvatar || require('../../public/Icons/AdidasLogo.png')}
            className="w-8 h-8 rounded-full"
            resizeMode="contain"
          />
        </View>
      )}
      
     
      <View className="max-w-[95%]">
        <View className={`px-4 py-4 rounded-2xl ${
          isOwnMessage 
            ? 'bg-primary-950 rounded-br-sm' 
            : 'bg-primary-50 rounded-bl-sm'
        }`}>
          
          {attachedImage && (
            <View className="mb-3">
              <Image
                source={attachedImage}
                className="w-full h-48 rounded-xl"
                resizeMode="cover"
              />
            </View>
          )}
          
          <BodyM className={`${isOwnMessage ? 'text-white' : 'text-primary-950'} mb-1`}>
            {message}
          </BodyM>
          
          
          <View className="items-end">
            <BodyM className={`text-xs ${isOwnMessage ? 'text-gray-300' : 'text-gray-500'}`}>
              {time}
            </BodyM>
          </View>
        </View>
      </View>
      
    
      {isOwnMessage && (
        <View className="ml-2">
          <Image
            source={require('../../public/Icons/NikeLogo.png')}
            className="w-8 h-8 rounded-full"
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};
