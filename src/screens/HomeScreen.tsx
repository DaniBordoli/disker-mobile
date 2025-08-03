import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { HeadingM } from '../components/typography/Headings';
import { BodyM } from '../components/typography/BodyText';
import { CampaignCard } from '../components/cards/CampaignCard';
import { BottomNavBar } from '../components/navigation/BottomNavBar';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const campaigns = [
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

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  return (
    <SafeAreaView className="flex-1 bg-primary-950">
      <StatusBar barStyle="light-content" backgroundColor="black" />

      
      <View className="flex-1 relative bg-white">
      
        <Image 
          source={require('../public/Icons/Status.png')}
          className="absolute top-0 left-0 right-0 z-0"
          style={{ 
            width: '100%', 
            height: 200,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16
          }}
          resizeMode="cover"
        />
        
        <ScrollView 
          className="flex-1 px-6 pt-6 relative z-10"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 50 }}
        >
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={index}
              {...campaign}
              onPress={() => {
                console.log('Navegando a CampaignDetail desde HomeScreen');
                navigation.navigate('CampaignDetail');
              }}
              onActionPress={() => {
                console.log('Action presionado en campaña:', campaign.title);
              }}
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
        >
          <Image 
            source={require('../public/Icons/IconFilter.png')}
            className="w-5 h-5 mr-2"
            resizeMode="contain"
          />
          <Text className="text-white font-medium text-base">Filtros</Text>
        </TouchableOpacity>
      </View>

      <BottomNavBar
        currentScreen="Explora"
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
