import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { BottomNavBar } from '../components/navigation/BottomNavBar';
import { HeadingM, HeadingS } from '../components/typography/Headings';
import { BodyM, BodyMStrong, BodyS } from '../components/typography/BodyText';

type NotificationsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Notifications'>;

interface Notification {
  id: string;
  type: 'success' | 'message' | 'delivery' | 'warning' | 'link' | 'update';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  hasUnreadDot?: boolean;
}

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<NotificationsScreenNavigationProp>();
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filters = ['Todos', 'Sin leer', 'Campañas', 'Importante', 'Leídos', 'Spam', 'Papelera'];

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      title: '¡Postulación enviada!',
      description: 'Te postulaste a la campaña de Nespresso.',
      time: '28 jul, 18:26',
      isRead: false,
      hasUnreadDot: true
    },
    {
      id: '2',
      type: 'message',
      title: 'Nuevo mensaje de la marca',
      description: 'Puma respondió a tu consulta en el chat.',
      time: '28 jul, 16:55',
      isRead: false,
      hasUnreadDot: true
    },
    {
      id: '3',
      type: 'delivery',
      title: 'Entregable recibido',
      description: 'Subiste contenido para la campaña de Starbucks.',
      time: '28 jul, 14:42',
      isRead: true
    },
    {
      id: '4',
      type: 'warning',
      title: 'Revisión necesaria',
      description: 'Tu entregable para Levi\'s necesita cambios. Revisa los comentarios.',
      time: '27 jul, 20:18',
      isRead: true
    },
    {
      id: '5',
      type: 'link',
      title: 'Cuenta vinculada con éxito',
      description: 'Tu cuenta de TikTok se vinculó correctamente.',
      time: '27 jul, 12:30',
      isRead: true
    },
    {
      id: '6',
      type: 'update',
      title: 'Actualización en tu postulación',
      description: 'Rexona revisó tu perfil. Esperá novedades.',
      time: '26 jul, 19:07',
      isRead: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'message':
        return '💬';
      case 'delivery':
        return '📤';
      case 'warning':
        return '⚠️';
      case 'link':
        return '🔗';
      case 'update':
        return '🔁';
      default:
        return '📧';
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity className="flex-row items-start py-4 px-6 border-b border-gray-100">
      <View className="mr-3 mt-1">
        <Text className="text-lg">{getNotificationIcon(item.type)}</Text>
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <BodyMStrong className={`text-base ${item.isRead ? 'text-gray-700' : 'text-black font-semibold'}`}>
            {item.title}
          </BodyMStrong>
          {item.hasUnreadDot && (
            <View className="w-2 h-2 bg-purple-500 rounded-full ml-2" />
          )}
        </View>
        <BodyM className="text-gray-600 text-sm mb-1">
          {item.description}
        </BodyM>
        <BodyS className="text-gray-400 text-xs">
          {item.time}
        </BodyS>
      </View>
    </TouchableOpacity>
  );

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

  return (
    <SafeAreaView className="flex-1 bg-white">
     
      <View className="px-6 pt-4 pb-2 bg-white border-b border-gray-100">
        <View className="flex-row justify-start mb-4">
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            className="w-10 h-10 bg-white border border-primary-300 rounded-full items-center justify-center"
          >
            <Image 
              source={require('../public/Icons/IconGoback.png')} 
              className="w-4 h-4" 
              style={{ tintColor: '#191919' }}
            />
          </TouchableOpacity>
        </View>
        <HeadingM className="text-primary-950 mb-4">Notificaciones</HeadingM>
        
       
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
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <BottomNavBar onNavigate={(screen) => navigation.navigate(screen as any)} currentScreen="Notifications" />
    </SafeAreaView>
  );
};

export default NotificationsScreen;
