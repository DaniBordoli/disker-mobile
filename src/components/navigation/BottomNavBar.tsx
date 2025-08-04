import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BodyS } from '../typography/BodyText';
import type { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface NavItem {
  label: string;
  icon: any;
  isActive?: boolean;
  onPress: () => void;
}

interface BottomNavBarProps {
  items?: NavItem[];
  currentScreen?: string;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ items, currentScreen }) => {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState(currentScreen || 'Explora');

  console.log('🔧 BottomNavBar inicializado:', { currentScreen, activeTab, hasNavigation: !!navigation });

  const defaultNavItems = [
    {
      label: 'Explora',
      icon: require('../../public/NavbarIcons/IconCompass.png'),
      isActive: activeTab === 'Explora',
      onPress: () => {
        console.log('Navegando a Explora/Home');
        console.log('Navigation object:', navigation);
        console.log('Attempting to navigate to: Home');
        if (activeTab !== 'Explora') setActiveTab('Explora');
        try {
          navigation.navigate('Home');
          console.log('Navegación a Home exitosa');
        } catch (error) {
          console.error('Error navegando a Home:', error);
        }
      }
    },
    {
      label: 'Campañas',
      icon: require('../../public/NavbarIcons/IconMegaphone.png'),
      isActive: activeTab === 'Campañas',
      onPress: () => {
        console.log('Tab Campañas presionado');
        setActiveTab('Campañas');
     
        // navigation.navigate('Campaigns');
      }
    },
    {
      label: 'Hera',
      icon: require('../../public/NavbarIcons/IconStars.png'),
      isActive: activeTab === 'Hera',
      onPress: () => {
        console.log('⭐ Tab Hera presionado - No hay navegación configurada');
        setActiveTab('Hera');
        
        // navigation.navigate('Hera');
      }
    },
    {
      label: 'Mensajes',
      icon: require('../../public/NavbarIcons/IconChat.png'),
      isActive: activeTab === 'Mensajes',
      onPress: () => {
        console.log('Navegando a Messages');
        console.log('Navigation object:', navigation);
        console.log('Attempting to navigate to: Messages');
        setActiveTab('Mensajes');
        try {
          navigation.navigate('Messages');
          console.log('Navegación a Messages exitosa');
        } catch (error) {
          console.error('Error navegando a Messages:', error);
        }
      }
    },
    {
      label: 'Perfil',
      icon: require('../../public/NavbarIcons/IconUser.png'),
      isActive: activeTab === 'Perfil',
      onPress: () => {
        console.log('Navegando a Profile');
        console.log('Navigation object:', navigation);
        console.log('Attempting to navigate to: Profile');
        setActiveTab('Perfil');
        try {
          navigation.navigate('Profile');
          console.log('Navegación a Profile exitosa');
        } catch (error) {
          console.error('Error navegando a Profile:', error);
        }
      }
    }
  ];

  const navItems = items || defaultNavItems;

  return (
    <View className="flex-row justify-around items-center bg-white border-t border-primary-200 pt-2 pb-4 px-4">
      {navItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          className="flex-1 items-center justify-center py-2"
          onPress={item.onPress}
        >
          <View className="items-center">
            <Image
              source={item.icon}
              className="w-7 h-8 mb-1"
              style={{ tintColor: item.isActive ? '#000000' : '#6D6D6D' }}
              resizeMode="contain"
            />
            <BodyS className={`text-xs ${item.isActive ? 'text-black' : 'text-primary-500'}`}>
              {item.label}
            </BodyS>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
