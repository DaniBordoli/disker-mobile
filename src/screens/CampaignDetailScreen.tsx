import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Animated,
  Modal,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { HeadingM, HeadingS, HeadingXS } from '../components/typography/Headings';
import { BodyM, BodyS } from '../components/typography/BodyText';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { CampaignData } from '../types/campaign';

type CampaignDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CampaignDetail'>;

interface CampaignDetailScreenProps {
  campaignData?: CampaignData;
}

export const CampaignDetailScreen: React.FC<CampaignDetailScreenProps> = ({ 
  campaignData
}) => {
  const navigation = useNavigation<CampaignDetailScreenNavigationProp>();
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [showProjectModal, setShowProjectModal] = useState(false);

 
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
  const totalDeliverables = data.deliverables.reduce((sum, platform) => sum + platform.totalCount, 0);

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

   
      <Animated.View 
        className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 z-50"
        style={{ 
          opacity: fadeAnim,
          pointerEvents: showStickyHeader ? 'auto' : 'none'
        }}
      >
        <View className="flex-row justify-between items-center px-4 py-3">
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
            
            <View className="flex-1 mx-4">
              <HeadingS className="text-primary-950">{data.title}</HeadingS>
              <BodyS className="text-gray-500">ID: {data.id}</BodyS>
            </View>
            
            <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
              <Image 
                source={require('../public/Icons/IconShare.png')}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
       
        <View className="bg-violet-600 pb-6 relative">
         
          <View className="flex-row justify-between items-center px-4 pt-4 pb-6">
            <TouchableOpacity 
              className="w-10 h-10 bg-white rounded-full items-center justify-center"
              onPress={() => navigation.goBack()}
            >
              <Image 
                source={require('../public/Icons/IconGoback.png')}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
            
            <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center">
              <Image 
                source={require('../public/Icons/IconShare.png')}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

         
          {data.warningMessage && (
            <View className="absolute bottom-0 left-0 right-0 items-center" style={{ bottom: -55 }}>
              <View className="bg-yellow-100 px-3 py-2 rounded-lg flex-row items-center">
                <Image 
                  source={require('../public/Icons/IconWarning.png')}
                  className="w-4 h-4 mr-2"
                  resizeMode="contain"
                  tintColor={'#806600'}
                />
                <BodyS className="text-yellow-800">{data.warningMessage}</BodyS>
              </View>
            </View>
          )}
        </View>

        
        <View className="mt-20">
         
          <View className="bg-white rounded-t-3xl p-4" style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
           
            <View className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center flex-1">
                <Image
                  source={data.brandLogo}
                  className="w-10 h-10 rounded-full mr-3"
                  resizeMode="contain"
                />
                <View className="flex-1">
                  <HeadingS className="text-primary-950 mb-1">{data.title}</HeadingS>
                  <BodyS className="text-gray-500">ID: {data.id}</BodyS>
                </View>
              </View>
              <View className="flex-row items-center">
                {data.platforms.includes('instagram') && (
                  <View 
                    className="w-8 h-8 rounded-full items-center justify-center"
                    style={{ 
                      backgroundColor: '#FF0069',
                      zIndex: 2
                    }}
                  >
                    <Image
                      source={require('../public/Icons/InstagramRoundedColorless.png')}
                      className="w-6 h-6"
                      resizeMode="contain"
                    />
                  </View>
                )}
                {data.platforms.includes('tiktok') && (
                  <View 
                    className={`w-8 h-8 rounded-full items-center justify-center ${data.platforms.includes('instagram') ? '-ml-2' : ''}`}
                    style={{ 
                      backgroundColor: '#000000',
                      zIndex: data.platforms.includes('instagram') ? 1 : 2
                    }}
                  >
                    <Image
                      source={require('../public/Icons/TiktokRounded.png')}
                      className="w-6 h-6"
                      resizeMode="contain"
                    />
                  </View>
                )}
              </View>
            </View>

            
            <View className="flex-row items-center mb-2">
              <Image 
                source={require('../public/Icons/IconDate.png')}
                className="w-4 h-4 mr-2"
                resizeMode="contain"
              />
              <BodyS className="text-gray-600">Inicio: {data.startDate}</BodyS>
              <View className="mx-3 w-px h-4 bg-gray-400" />
              <Image 
                source={require('../public/Icons/IconTicket.png')}
                className="w-4 h-4 mr-2"
                resizeMode="contain"
              />
              <BodyS className="text-gray-600">{data.campaignType}</BodyS>
            </View>

            <View className="flex-row items-center mb-4">
              <Image 
                source={require('../public/Icons/IconPin.png')}
                className="w-4 h-4 mr-2"
                resizeMode="contain"
              />
              <BodyS className="text-gray-600">{data.location}</BodyS>
            </View>

           
            <View className="h-px bg-primary-200 mb-6" />

           
            <HeadingS className="text-primary-950 mb-3">Acerca del proyecto</HeadingS>
            <BodyM className="text-primary-950 leading-6 mb-4">
              {data.aboutProject.summary}
            </BodyM>
            
            <View className="items-center">
              <PrimaryButton 
                title="Mostrar más" 
                variant="outline"
                onPress={() => setShowProjectModal(true)}
              />
            </View>

           
            <View className="h-px bg-primary-200 mt-6" />
          </View>

         
            <View > 
          <View className="mb-6">
            <HeadingS className="text-primary-950 mb-4">Entregables ({totalDeliverables})</HeadingS>
            
            {data.deliverables.map((platform, index) => (
              <View key={platform.platform} className="mb-4 bg-primary-50 rounded-lg p-3">
                <View className="flex-row items-center mb-3">
                  <View 
                    className="w-8 h-8 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: platform.backgroundColor }}
                  >
                    <Image
                      source={platform.icon}
                      className="w-5 h-5"
                      resizeMode="contain"
                    />
                  </View>
                  <BodyM className="text-primary-950 font-medium">
                    {platform.platform === 'instagram' ? 'Instagram' : 'TikTok'}{' '}
                  </BodyM>
                  <BodyS className="text-primary-400 text-sm">{platform.totalCount} entregables</BodyS>
                </View>
                
                <View className="flex-row items-center ml-9 flex-wrap">
                  {platform.items.map((item, itemIndex) => (
                    <React.Fragment key={itemIndex}>
                      <View className="flex-row items-center">
                        <Text className="mr-1">{item.emoji}</Text>
                        <BodyS className="text-primary-950 text-sm">{item.text}</BodyS>
                      </View>
                      {itemIndex < platform.items.length - 1 && (
                        <View className="w-2 h-2 bg-primary-100 rounded-full mx-3" />
                      )}
                    </React.Fragment>
                  ))}
                </View>
              </View>
            ))}

          
            <View className="mb-6">
              <HeadingS className="text-primary-950 mb-4">Requisitos</HeadingS>
              <View className="space-y-2">
                {data.requirements.map((requirement, index) => (
                  <View key={index} className="flex-row items-start">
                    <Text className="text-primary-950 text-2xl mr-2">•</Text>
                    <BodyM className="text-primary-950 flex-1">{requirement}</BodyM>
                  </View>
                ))}
              </View>
            </View>

           
            <View className="h-px bg-primary-200 mb-6" />

            
            <View className="mb-6">
              <HeadingS className="text-primary-950 mb-4">Términos y condiciones</HeadingS>
              <BodyM className="text-primary-950 leading-5">
                {data.termsAndConditions}
              </BodyM>
            </View>

           
            <View className="h-px bg-primary-200 mb-6" />

         
            <View>
              <HeadingS className="text-primary-950 mb-4">Categorías</HeadingS>
              <View className="flex-row flex-wrap">
                {data.categories.map((category, index) => (
                  <View key={index} className="bg-primary-100 px-3 py-2 rounded-full mr-2 mb-2">
                    <BodyS className="text-primary-950">{category}</BodyS>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
        </View>
        </View>
      </ScrollView>

      
      <View className="bg-white border-t border-gray-200 px-4 py-4">
        <View className="flex-row items-center justify-between">
          <HeadingM className="text-primary-950">${data.price} {data.currency}</HeadingM>
          
          <View style={{ width: '65%' }}>
            <PrimaryButton 
              title="Postularme" 
              variant="dark"
              onPress={() => navigation.navigate('CampaignIdeaScreen')}
            />
          </View>
        </View>
      </View>

      
      <Modal
        visible={showProjectModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowProjectModal(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <View className="flex-1 bg-black/40 justify-end">
            <View className="bg-white rounded-t-3xl px-6 py-8 w-full" style={{ minHeight: '85%', maxHeight: '95%' }}>
            
              <View className="flex-row justify-between items-center mb-6">
                <HeadingS className="text-xl font-bold text-primary-950">
                  Acerca del proyecto
                </HeadingS>
                <TouchableOpacity onPress={() => setShowProjectModal(false)} className="p-1">
                  <Image
                    source={require('../public/Icons/IconClose.png')}
                    className="w-6 h-6"
                    style={{ tintColor: '#000000' }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

             
              <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                {data.aboutProject.fullDescription.split('\n\n').map((paragraph, index) => (
                  <BodyM key={index} className="text-primary-950 mb-4">
                    {paragraph}
                  </BodyM>
                ))}
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};
