import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView,
  SafeAreaView,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { HeadingM } from '../components/typography/Headings';
import { BodyMStrong, BodyS } from '../components/typography/BodyText';

type ScriptHistoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScriptHistory'>;

interface ScriptItem {
  id: string;
  status: 'approved' | 'pending' | 'rejected';
  title: string;
  date: string;
  hasMessage?: boolean;
}

const scriptItems: ScriptItem[] = [
  {
    id: '1',
    status: 'approved',
    title: 'Propuesta aprobada',
    date: '15 de mayo'
  },
  {
    id: '2',
    status: 'pending',
    title: 'Propuesta pendiente',
    date: '15 de mayo'
  },
  {
    id: '3',
    status: 'rejected',
    title: 'Propuesta rechazada',
    date: '13 de mayo',
    hasMessage: true
  }
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'approved':
      return {
        bgColor: '#D3FAE0',
        iconColor: '#125133'
      };
    case 'pending':
      return {
        bgColor: '#FAF5FF',
        iconColor: '#691AAF' 
      };
    case 'rejected':
      return {
        bgColor: '#FFE4D4',
        iconColor: '#C61608'
      };
    default:
      return {
        bgColor: '#F6F6F6',
        iconColor: '#888888'
      };
  }
};

export const ScriptHistoryScreen: React.FC = () => {
  const navigation = useNavigation<ScriptHistoryScreenNavigationProp>();

  const handleItemPress = (item: ScriptItem) => {
    if (item.status === 'rejected') {
      navigation.navigate('RejectedProposal');
    } else if (item.status === 'pending') {
      navigation.navigate('PendingProposal');
    } else if (item.status === 'approved') {
      navigation.navigate('ApprovedProposal');
    }
  };

  const renderScriptItem = (item: ScriptItem, index: number) => {
    const config = getStatusConfig(item.status);
    const isLast = index === scriptItems.length - 1;
    
    return (
      <View key={item.id}>
        <TouchableOpacity 
          className="flex-row items-center p-4 bg-white"
          onPress={() => handleItemPress(item)}
        >
          {/* Icono con fondo de color */}
          <View 
            className="w-12 h-12 rounded-lg items-center justify-center mr-4"
            style={{ backgroundColor: config.bgColor }}
          >
            <Image
              source={require('../public/ProfileScreenIcons/IconDocument.png')}
              className="w-6 h-6"
              style={{ tintColor: config.iconColor }}
              resizeMode="contain"
            />
          </View>

          {/* Contenido */}
          <View className="flex-1">
            <BodyMStrong 
              className={`mb-1 ${
                item.status === 'approved' ? 'text-green-700' :
                item.status === 'pending' ? 'text-violet-700' :
                'text-red-700'
              }`}
            >
              {item.title}
            </BodyMStrong>
            <BodyS className="text-gray-500">{item.date}</BodyS>
          </View>

      
          {item.hasMessage && (
            <TouchableOpacity className="ml-3" onPress={(e) => {
              e.stopPropagation();
           
            }}>
              <BodyS className="text-blue-600 underline">Ver mensaje</BodyS>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        
        {/* Divider - solo si no es el último elemento */}
        {!isLast && (
          <View className="h-px bg-neutral-100 mx-4" />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header con botón de regreso */}
      <View className="px-4 pt-4 pb-2">
        <TouchableOpacity 
          className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Image 
            source={require('../public/Icons/IconGoback.png')}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Título */}
      <View className="px-4 pb-4 ml-2 mt-4">
        <HeadingM className="text-primary-950">Historial de guiones</HeadingM>
      </View>

      {/* Content */}
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        {scriptItems.map((item, index) => renderScriptItem(item, index))}
      </ScrollView>
    </SafeAreaView>
  );
};
