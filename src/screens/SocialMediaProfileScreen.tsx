import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { BottomNavBar } from '../components/navigation/BottomNavBar';
import { HeadingM, HeadingXS } from '../components/typography/Headings';
import { BodyM, BodyMLink } from '../components/typography/BodyText';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { HeadingS } from '../components/typography/Headings';

type SocialMediaProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SocialMediaProfile'>;

interface SocialPlatform {
  id: string;
  name: string;
  logo: any;
  username: string;
  backgroundStyle?: string;
  logoForLinked?: any;
}

const SocialMediaProfileScreen: React.FC = () => {
  const navigation = useNavigation<SocialMediaProfileScreenNavigationProp>();

  const allPlatforms: SocialPlatform[] = [
    {
      id: 'tiktok',
      name: 'TikTok',
      logo: require('../public/Icons/TiktokRounded.png'),
      logoForLinked: require('../public/Icons/TiktokRounded.png'),
      username: '@Yoentiktok',
      backgroundStyle: 'bg-primary-950'
    },
    {
      id: 'youtube',
      name: 'Youtube',
      logo: require('../public/SignUpImages/YoutubeLogo.png'),
      logoForLinked: require('../public/Icons/YoutubeRounded.png'),
      username: '@Yoenyoutube',
      backgroundStyle: 'bg-transparent'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      logo: require('../public/Icons/InstagramRounded.png'),
      logoForLinked: require('../public/Icons/InstagramRoundedColorless.png'),
      username: '@Yoeninstagram',
      backgroundStyle: 'bg-transparent'
    }
  ];

  const [linkedPlatforms, setLinkedPlatforms] = useState<string[]>(['tiktok', 'youtube', 'instagram']);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [platformToDelete, setPlatformToDelete] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const addPlatform = (platformId: string) => {
    if (!linkedPlatforms.includes(platformId)) {
      setLinkedPlatforms([...linkedPlatforms, platformId]);
    }
  };

  const removePlatform = (platformId: string) => {
    setLinkedPlatforms(linkedPlatforms.filter(id => id !== platformId));
  };

  const handleDeletePress = (platformId: string) => {
    setPlatformToDelete(platformId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (platformToDelete) {
      removePlatform(platformToDelete);
      setShowDeleteModal(false);
      setPlatformToDelete(null);
      setShowNotification(true);
      
    
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const connectedPlatforms = allPlatforms.filter(platform => linkedPlatforms.includes(platform.id));

  return (
    <SafeAreaView className="flex-1 bg-white">
 
      <View className="px-6 pt-4 pb-4 bg-white">
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
        <HeadingM className="text-primary-950">Redes sociales</HeadingM>
      </View>

 
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-6 pt-4">
          <BodyM className="text-primary-950 mb-6">
            Validalas una vez y empezá a recibir campañas que encajen con tu perfil.
          </BodyM>
          
          <HeadingXS className="text-primary-950 mb-4">
            Vincula una nueva cuenta
          </HeadingXS>
          
         
          <View className="flex-row justify-around mb-8">
            {allPlatforms.map((platform) => (
              <TouchableOpacity
                key={platform.id}
                className="w-28 h-24 rounded-2xl border-2 border-gray-200 bg-white items-center justify-center"
                onPress={() => addPlatform(platform.id)}
              >
                <Image
                  source={platform.logo}
                  className="w-10 h-10 mb-2"
                  resizeMode="contain"
                />
                <BodyM className="text-sm font-medium text-black">
                  {platform.name}
                </BodyM>
              </TouchableOpacity>
            ))}
          </View>
          
          <HeadingXS className="text-primary-950 mt-6 mb-4">
            Cuentas vinculadas
          </HeadingXS>
          
        
          {connectedPlatforms.length > 0 && (
            <View className="mb-8">
              <View className="">
                <View>
                  {connectedPlatforms.map((platform, index) => (
                    <View key={platform.id}>
                      <View className="flex-row items-center justify-between rounded-xl p-3">
                        <View className="flex-row items-center">
                          <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${platform.backgroundStyle}`}>
                            <Image
                              source={platform.logoForLinked || platform.logo}
                              className="w-10 h-10"
                              resizeMode="contain"
                            />
                          </View>
                          <View>
                            <Text className="text-black font-medium text-sm">
                              {platform.username}
                            </Text>
                            <Text className="text-gray-500 text-xs">
                              {platform.name}
                            </Text>
                          </View>
                        </View>
                        
                        <TouchableOpacity onPress={() => handleDeletePress(platform.id)}>
                          <Image
                            source={require('../public/Icons/IconTrash.png')}
                            className="w-7 h-7"
                            style={{ tintColor: '#9CA3AF' }}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                      
                      {index < connectedPlatforms.length - 1 && (
                        <View className="h-px bg-gray-200 mx-3 my-3" />
                      )}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={showDeleteModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <View className="flex-1 bg-black/40 justify-end">
            <View className="bg-white rounded-t-3xl px-6 py-8 w-full" style={{ minHeight: '43%', maxHeight: '50%' }}>
              <View className="flex-row justify-between items-center mb-6">
                <HeadingS className="text-xl font-bold text-primary-950 w-11/12">
                  ¿Estás seguro de desvincular tu cuenta?
                </HeadingS>
                <TouchableOpacity onPress={() => setShowDeleteModal(false)} className="p-1">
                  <Image
                    source={require('../public/Icons/IconClose.png')}
                    className="w-6 h-6"
                    style={{ tintColor: '#000000' }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                <BodyM className="text-primary-950">
                  Perder la conexión con esta red social podría limitar algunas funciones dentro de la plataforma.
                </BodyM>
                <BodyM className="text-primary-950">
                  Desde nuestro lado, no recomendamos esta acción, pero podés continuar si así lo decidís.
                </BodyM>
                <PrimaryButton
                  title="Seguir completando"
                  variant="dark"
                  onPress={() => setShowDeleteModal(false)}
                  className="mb-3"
                />
                <PrimaryButton
                  title="Cancelar"
                  variant="dark"
                  onPress={confirmDelete}
                />
                <BodyMLink 
                  className="mt-3 text-center text-primary-950"
                  onPress={confirmDelete}
                >
                  Desvincular de todos modos
                </BodyMLink>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

     
      {showNotification && (
        <View className="absolute bottom-20 left-0 right-0 flex-row justify-center">
          <View className="bg-violet-600 rounded-xl px-4 py-3 w-1/2 shadow-lg">
            <BodyM className="text-white text-center">
              Cuenta desvinculada
            </BodyM>
          </View>
        </View>
      )}

      
    </SafeAreaView>
  );
};

export default SocialMediaProfileScreen;
