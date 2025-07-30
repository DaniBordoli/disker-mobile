import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { BodyS } from '../typography/BodyText';

interface NavItem {
  label: string;
  icon: any;
  isActive?: boolean;
  onPress: () => void;
}

interface BottomNavBarProps {
  items?: NavItem[];
  onNavigate?: (screen: 'Auth' | 'Email' | 'Name' | 'Password' | 'About' | 'SocialMedia' | 'AccountCreated' | 'Home' | 'CampaignDetail' | 'AudienceStats' | 'Profile' | 'CampaignIdeaScreen') => void;
  currentScreen?: string;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ items, onNavigate, currentScreen }) => {
  const [activeTab, setActiveTab] = useState(currentScreen || 'Explora');

  const defaultNavItems = [
    {
      label: 'Explora',
      icon: require('../../public/NavbarIcons/IconCompass.png'),
      isActive: activeTab === 'Explora',
      onPress: () => {
        if (activeTab !== 'Explora') setActiveTab('Explora');
        onNavigate && onNavigate('Home');
      }
    },
    {
      label: 'Campañas',
      icon: require('../../public/NavbarIcons/IconMegaphone.png'),
      isActive: activeTab === 'Campañas',
      onPress: () => {
        setActiveTab('Campañas');
 
      }
    },
    {
      label: 'Hera',
      icon: require('../../public/NavbarIcons/IconStars.png'),
      isActive: activeTab === 'Hera',
      onPress: () => {
        setActiveTab('Hera');
       
      }
    },
    {
      label: 'Mensajes',
      icon: require('../../public/NavbarIcons/IconChat.png'),
      isActive: activeTab === 'Mensajes',
      onPress: () => {
        setActiveTab('Mensajes');
     
      }
    },
    {
      label: 'Perfil',
      icon: require('../../public/NavbarIcons/IconUser.png'),
      isActive: activeTab === 'Perfil',
      onPress: () => {
        setActiveTab('Perfil');
        onNavigate && onNavigate('Profile');
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
