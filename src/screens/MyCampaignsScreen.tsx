import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, ScrollView, SafeAreaView, FlatList, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { HeadingM } from '../components/typography/Headings';
import { BodyM } from '../components/typography/BodyText';
import { CampaignCard } from '../components/cards/CampaignCard';
import { BottomNavBar } from '../components/navigation/BottomNavBar';
import { SelectionButton } from '../components/buttons/SelectionButton';

// Campañas activas
const activeCampaigns = [
  {
    brand: {
      logo: require('../public/Icons/NiveaLogo.png'),
      name: 'Rutina Glow'
    },
    title: 'Rutina Glow',
    description: 'Contá tu experiencia con nuestra línea de skincare natural.',
    startDate: '20/05',
    type: 'Campaña de evento',
    location: 'Argentina, Perú y Brasil',
    amount: '350',
    currency: 'USD',
    actionLabel: 'Cierra esta semana',
    actionColor: '#F3E7FF',
    socialIcons: [
      require('../public/Icons/InstagramRoundedColorless.png'),
      require('../public/Icons/TiktokRounded.png'),
      require('../public/Icons/YoutubeRounded.png')
    ]
  },
  {
    brand: {
      logo: require('../public/Icons/NikeLogo.png'),
      name: 'Run With Me'
    },
    title: 'Run With Me',
    description: 'Mostrá cómo usás tus zapatillas Nike en tu día a día.',
    startDate: '17/05',
    type: 'Campaña musical',
    location: 'Argentina, Colombia y Chile',
    amount: '300',
    currency: 'USD',
    actionLabel: 'Cierra esta semana',
    actionColor: '#F3E7FF',
    socialIcons: [
      require('../public/Icons/InstagramRoundedColorless.png'),
      require('../public/Icons/TiktokRounded.png')
    ]
  },
  {
    brand: {
      logo: require('../public/Icons/AdidasLogo.png'),
      name: 'Movete con estilo by Stay Fresh'
    },
    title: 'Movete con estilo by Stay Fresh',
    description: 'Presentá tu outfit urbano favorito con la nueva colección SS24.',
    startDate: '15/05',
    type: 'Campaña musical',
    location: 'Presencial',
    amount: '500',
    currency: 'USD',
    actionLabel: 'Cierra esta semana',
    actionColor: '#F3E7FF',
    socialIcons: [
      require('../public/Icons/YoutubeRounded.png'),
    ]
  }
];

// Campañas en revisión
const reviewCampaigns = [
  {
    brand: {
      logo: require('../public/Icons/NiveaLogo.png'),
      name: 'Rutina Glow'
    },
    title: 'Rutina Glow',
    description: 'Tu postulación está siendo revisada por el equipo.',
    startDate: '20/05',
    type: 'Campaña de evento',
    location: 'Argentina, Perú y Brasil',
    amount: '350',
    currency: 'USD',
    actionLabel: 'En revisión',
    actionColor: '#F3E7FF', 
    socialIcons: [
      require('../public/Icons/InstagramRoundedColorless.png'),
      require('../public/Icons/TiktokRounded.png'),
      require('../public/Icons/YoutubeRounded.png')
    ]
  },
  {
    brand: {
      logo: require('../public/Icons/NikeLogo.png'),
      name: 'Run With Me'
    },
    title: 'Run With Me',
    description: 'Estamos evaluando tu perfil para esta campaña.',
    startDate: '17/05',
    type: 'Campaña musical',
    location: 'Argentina, Colombia y Chile',
    amount: '300',
    currency: 'USD',
    actionLabel: 'En revisión',
    actionColor: '#F3E7FF', 
    socialIcons: [
      require('../public/Icons/InstagramRoundedColorless.png'),
      require('../public/Icons/TiktokRounded.png')
    ]
  }
];

// Navigation type

type MyCampaignsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MyCampaigns'>;

const MyCampaignsScreen: React.FC = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('Más reciente');
  const orderOptions = [
    'Más reciente',
    'Fecha de inicio',
    'Fecha de cierre',
    'Mayor pago',
    'Menor pago',
    'Nombre (A–Z)'
  ];
  const navigation = useNavigation<MyCampaignsScreenNavigationProp>();
  const [activeFilter, setActiveFilter] = useState('Activas');
  const filters = ['Activas', 'Mis postulaciones', 'Finalizadas'];

  const renderFilterItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      className={`px-4 py-2 mr-3 rounded-full ${activeFilter === item ? 'bg-black' : 'bg-gray-100'}`}
      onPress={() => setActiveFilter(item)}
    >
      <Text className={`text-sm ${activeFilter === item ? 'text-white font-medium' : 'text-gray-700'}`}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary-950">
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View className="flex-1 relative bg-white">
        <View className="px-6 pt-6 pb-2 bg-white">
          <HeadingM className="text-primary-950 mb-4">Mis campañas</HeadingM>
          <FlatList
            data={filters}
            renderItem={renderFilterItem}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8 }}
          />
        </View>
        <ScrollView 
          className="flex-1 px-6 pt-2 relative z-10"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
        >
          {(activeFilter === 'Mis postulaciones' ? reviewCampaigns : activeFilter === 'Activas' ? activeCampaigns : activeCampaigns).map((campaign, index) => (
            <CampaignCard
              key={index}
              {...campaign}
              onPress={() => navigation.navigate('CampaignDetail')}
              onActionPress={() => {}}
            />
          ))}
        </ScrollView>
      </View>
      <View className="absolute bottom-40 left-6 right-6 flex-row justify-center">
        <TouchableOpacity 
          className="flex-row items-center bg-primary-950 px-4 py-3 rounded-full"
          style={{
            shadowColor: '#191919',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 8,
          }}
          onPress={() => setShowFilterModal(true)}
        >
          <Image 
            source={require('../public/Icons/IconFilter.png')}
            className="w-5 h-5 mr-2"
            resizeMode="contain"
          />
          <Text className="text-white font-medium text-base">Filtros</Text>
        </TouchableOpacity>
      </View>
      <BottomNavBar currentScreen="Campañas" />

      {/* Modal de filtros */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <View className="flex-1 bg-black/40 justify-end">
            <View className="bg-white rounded-t-3xl px-6 py-8 w-full" style={{ minHeight: '43%', maxHeight: '50%' }}>
              <View className="flex-row justify-between items-center mb-6">
                <HeadingM className="text-xl font-bold text-primary-950 w-11/12">
                  Ordenar campañas
                </HeadingM>
                <TouchableOpacity onPress={() => setShowFilterModal(false)} className="p-1">
                  <Image
                    source={require('../public/Icons/IconClose.png')}
                    className="w-6 h-6"
                    style={{ tintColor: '#000000' }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View className="flex-row flex-wrap mb-8">
                {orderOptions.map((option) => (
                  <View key={option} className="m-1">
                    <SelectionButton
                      title={option}
                      isSelected={selectedOrder === option}
                      onPress={() => setSelectedOrder(option)}
                      flex={false}
                    />
                  </View>
                ))}
              </View>
              <TouchableOpacity
                className="bg-black rounded-xl py-4 w-full items-center justify-center"
                onPress={() => setShowFilterModal(false)}
              >
                <Text className="text-white text-base font-medium">Aplicar filtros</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default MyCampaignsScreen;
