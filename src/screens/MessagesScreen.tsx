import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { BottomNavBar } from '../components/navigation/BottomNavBar';
import { HeadingM } from '../components/typography/Headings';
import { BodyM, BodyS, BodyMStrong, BodySStrong } from '../components/typography/BodyText';

type MessagesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Messages'>;

interface Message {
  id: string;
  brand: string;
  message: string;
  time: string;
  day: string;
  iconType?: 'music' | 'image' | 'clip';
  tag?: string;
  hasUnreadDot?: boolean;
  unreadCount?: number;
  isRead?: boolean;
}

const MessagesScreen: React.FC = () => {
  const navigation = useNavigation<MessagesScreenNavigationProp>();
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filters = ['Todos', 'Campañas', 'Soporte', 'Favoritos', 'No leído'];

  const getMessageIcon = (iconType?: string) => {
    switch (iconType) {
      case 'music':
        return require('../public/MessageIcons/IconMusicMessage.png');
      case 'image':
        return require('../public/MessageIcons/IconImageMessage.png');
      case 'clip':
        return require('../public/MessageIcons/IconClipMessage.png');
      default:
        return require('../public/Icons/IconTrash.png');
    }
  };

  const messages: Message[] = [
    {
      id: '1',
      brand: 'Stay Fresh SS24',
      message: '¿Podés reenviar la historia sin la marca...',
      time: 'Ayer',
      day: 'Ayer',
      hasUnreadDot: true,
      unreadCount: 3
    },
    {
      id: '2',
      brand: 'Just Move FW24',
      message: 'El club quedó buenísimo, ¿lo mandas al...',
      time: 'Martes',
      day: 'Martes',
      hasUnreadDot: true,
      unreadCount: 21
    },
    {
      id: '3',
      brand: 'Soporte Supra',
      message: 'Hola 👋 ¿En qué podemos ayudarte con tu ca...',
      time: 'Lunes',
      day: 'Lunes',
      tag: 'Soporte'
    },
    {
      id: '4',
      brand: 'EcoPower Drop',
      message: 'Lo adaptamos a vertical para stories, ¿lo q...',
      time: 'Lunes',
      day: 'Lunes',
      isRead: true
    },
    {
      id: '5',
      brand: 'Concrete Bloom',
      message: 'VO_brand_intro_LA.mp3',
      time: '9 de jul.',
      day: '9 de jul.',
      iconType: 'music'
    },
    {
      id: '6',
      brand: 'Core Active Drop 02',
      message: 'Dale, lo edito sin textos y te lo paso hoy.',
      time: '7 de jul.',
      day: '7 de jul.',
      iconType: 'image'
    },
    {
      id: '7',
      brand: 'Dream in Color',
      message: '¿Este video va con subtítulos o sin?',
      time: '6 de jul.',
      day: '6 de jul.',
      iconType: 'clip'
    },
    {
      id: '8',
      brand: 'Summer Splash',
      message: '¿Le cambiamos el texto por uno más local?',
      time: '5 de jul.',
      day: '5 de jul.',
      isRead: true
    }
  ];

  const renderFilterItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      className={`px-4 py-2 mr-3 rounded-full ${
        activeFilter === item ? 'bg-black' : 'bg-gray-100'
      }`}
      onPress={() => setActiveFilter(item)}
    >
      <Text className={`text-sm ${
        activeFilter === item ? 'text-white font-medium' : 'text-gray-700'
      }`}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderMessage = ({ item }: { item: Message }) => (
    <TouchableOpacity 
      className="flex-row items-center py-4 px-6 border-b border-gray-100"
      onPress={() => navigation.navigate('MessageDetail', { messageId: item.id, brand: item.brand })}
    >

      <View className="mr-3">
        <Image
          source={require('../public/Icons/NikeLogo.png')}
          className="w-12 h-12 rounded-full"
          resizeMode="contain"
        />
      </View>
      
   
      <View className="flex-1">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <BodySStrong className={`text-base ${item.hasUnreadDot ? 'text-black font-semibold' : 'text-gray-700'}`}>
                {item.brand}
              </BodySStrong>
              {item.tag && (
                <View className="bg-violet-600 px-4 py-1 rounded-full ml-2">
                  <BodyS className="text-white">{item.tag}</BodyS>
                </View>
              )}
            </View>
            
            <View className="flex-row items-center">
              {item.iconType && (
                <Image
                  source={getMessageIcon(item.iconType)}
                  className="w-4 h-4 mr-2"
                  style={{ tintColor: '#6B7280' }}
                  resizeMode="contain"
                />
              )}
              {item.isRead && (
                <Image
                  source={require('../public/MessageIcons/IconSentMessage.png')}
                  className="w-5 h-5 mr-1"
                  style={{ tintColor: '#2846E8' }}
                  resizeMode="contain"
                />
              )}
              <BodyS className="text-primary-950 flex-1" numberOfLines={1}>
                {item.message}
              </BodyS>
            </View>
          </View>
          
          <View className="items-end ml-3">
            <BodyS className="text-gray-400 text-xs mb-1">
              {item.time}
            </BodyS>
            {item.hasUnreadDot && item.unreadCount && (
              <View className="bg-violet-600 rounded-full w-6 h-6 items-center justify-center">
                <Text className="text-white text-xs font-semibold">
                  {item.unreadCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">

      <View className="px-6 pt-4 pb-2 bg-white">
        <View className="flex-row justify-end mb-2">
          <TouchableOpacity className="w-10 h-10 bg-white border border-primary-200 rounded-full items-center justify-center">
            <Image 
              source={require('../public/Icons/IconSearch.png')} 
              className="w-5 h-5" 
              style={{ tintColor: '#191919' }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        
        <View className="mb-4">
          <HeadingM className="text-primary-950">Mensajes</HeadingM>
        </View>
     
        <FlatList
          data={filters}
          renderItem={renderFilterItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <BottomNavBar currentScreen="Mensajes" />
    </SafeAreaView>
  );
};

export default MessagesScreen;
