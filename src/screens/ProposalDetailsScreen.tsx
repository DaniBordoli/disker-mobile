import React, { useState } from 'react';
import { 
  View, 
  StatusBar, 
  ScrollView,
  SafeAreaView,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { HeadingM } from '../components/typography/Headings';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { 
  ProposalHeader,
  ProposalInfo,
  AboutProject,
  DeliverablesList,
  RequirementsSection
} from '../components/ProposalComponents';
import { CampaignData } from '../types/campaign';

type ProposalDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProposalDetails'>;

interface ProposalDetailsScreenProps {
  campaignData?: CampaignData;
}

export const ProposalDetailsScreen: React.FC<ProposalDetailsScreenProps> = ({ 
  campaignData
}) => {
  const navigation = useNavigation<ProposalDetailsScreenNavigationProp>();
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const defaultData: CampaignData = {
    id: '#RWK2310',
    title: 'Run With Me',
    brandLogo: require('../public/Icons/NikeLogo.png'),
    startDate: '17/05',
    campaignType: 'Campaña musical',
    location: 'Argentina, Colombia y Chile',
    aboutProject: {
      summary: 'Queremos invitarte a contar tu historia con las Air Max como parte de tu día a día. La propuesta es que muestres cómo éstas zapatillas se integran de manera natural en tu rutina, acomp...',
      fullDescription: `Queremos invitarte a contar tu historia con las Air Max como parte de tu día a día. La propuesta es que muestres cómo estas zapatillas se integran de manera natural en tu rutina, acompañando cada uno de tus momentos: desde lo cotidiano hasta esos espacios donde encontrás disfrute, relax o conexión con vos mismo y con los demás.

No buscamos algo forzado ni producido: queremos contenido real, cercano y con tu impronta. Que se sienta auténtico. Ya sea saliendo a caminar, yendo a laburar, compartiendo un café con amigxs, entrenando, viajando o simplemente descansando, las Air Max están ahí. Queremos que tu audiencia lo vea y lo sienta.

El foco está en el lifestyle: que se vea tu estilo, tu forma de moverte por el mundo, cómo elegís y vivís. Mostranos cómo estas zapatillas reflejan tu personalidad, tu forma de expresarte y de habitar los espacios. Queremos destacar su diseño, comodidad y versatilidad, pero sobre todo, cómo se vuelven parte de vos.

Animate a mostrar tu mundo con las Air Max. Contá tu historia, desde lo más simple hasta lo más único. Eso es lo que queremos compartir.`
    },
    deliverables: [
      {
        platform: 'instagram',
        icon: require('../public/Icons/InstagramRoundedColorless.png'),
        backgroundColor: '#FF0069',
        totalCount: 16,
        items: [
          { emoji: '📸', text: '4 posteos' },
          { emoji: '🎞️', text: '4 reels' },
          { emoji: '📖', text: '8 historias' }
        ]
      },
      {
        platform: 'tiktok',
        icon: require('../public/Icons/TiktokRounded.png'),
        backgroundColor: '#000000',
        totalCount: 8,
        items: [
          { emoji: '📽', text: '6 videos' },
          { emoji: '🤝', text: '2 duetos' }
        ]
      }
    ],
    requirements: [
      '+10K followers en IG',
      'Público principal en Argentina',
      'Audiencia: 18 a 35 años',
      'No se permite contenido político, sexual ni con referencias a otras marcas'
    ],
    termsAndConditions: 'El contenido debe permanecer publicado por al menos 30 días. El influencer autoriza a Nike a republicar el contenido en sus propias redes con crédito correspondiente.',
    categories: ['Deportes', 'Belleza', 'Ropa', 'Nike', 'Futbol'],
    price: '300',
    currency: 'USD',
    warningMessage: 'Se piden métricas de redes',
    platforms: ['instagram', 'tiktok']
  };

  const data = campaignData || defaultData;

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const shouldShow = scrollY > 100;
    
    if (shouldShow !== showStickyHeader) {
      setShowStickyHeader(shouldShow);
      
      Animated.timing(fadeAnim, {
        toValue: shouldShow ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-violet-600">
      <StatusBar barStyle="light-content" backgroundColor="#8F2AF3" />

      <ProposalHeader 
        data={data} 
        showStickyHeader={showStickyHeader} 
        fadeAnim={fadeAnim} 
      />

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Content white area */}
        <View className="mt-20">
          <View className="bg-white rounded-t-3xl p-4" style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
            <ProposalInfo data={data} />
            <AboutProject data={data} />
          </View>

          <View className="bg-white px-4">
            <DeliverablesList data={data} />
            <RequirementsSection data={data} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View className="bg-white border-t border-gray-200 px-4 py-4">
        <View className="flex-row items-center justify-between">
          <HeadingM className="text-primary-950">${data.price} {data.currency}</HeadingM>
          
          <View style={{ width: '65%' }}>
            <PrimaryButton 
              title="Postularme" 
              variant="dark"
              onPress={() => navigation.navigate('AudienceStats')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};