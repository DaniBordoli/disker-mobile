import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { PrimaryButton } from '../components/buttons';
import { HeadingM } from '../components/typography/Headings';
import { BodyM, BodyMStrong } from '../components/typography/BodyText';

interface SocialMediaScreenProps {
  onNavigate: (screen: 'Auth' | 'Email' | 'Name' | 'Password' | 'About' | 'SocialMedia' | 'AccountCreated') => void;
}

interface SocialPlatform {
  id: string;
  name: string;
  logo: any;
  selected: boolean;
}

export const SocialMediaScreen: React.FC<SocialMediaScreenProps> = ({ onNavigate }) => {
  const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatform[]>([
    {
      id: 'tiktok',
      name: 'TikTok',
      logo: require('../public/Icons/TiktokRounded.png'),
      selected: false
    },
    {
      id: 'youtube',
      name: 'Youtube',
      logo: require('../public/SignUpImages/YoutubeLogo.png'),
      selected: false
    },
    {
      id: 'instagram',
      name: 'Instagram',
      logo: require('../public/Icons/InstagramRounded.png'),
      selected: false
    }
  ]);

  const togglePlatform = (id: string) => {
    setSocialPlatforms(platforms => 
      platforms.map(platform => 
        platform.id === id 
          ? { ...platform, selected: !platform.selected }
          : platform
      )
    );
  };

  const handleContinue = () => {
    const selectedPlatforms = socialPlatforms.filter(platform => platform.selected);
    console.log('Selected social platforms:', selectedPlatforms);
  
    onNavigate('AccountCreated');
  };

  const handleSkip = () => {
    console.log('User skipped social media selection');
   
  };

 
  const hasSelection = socialPlatforms.some(platform => platform.selected);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        
       
        <View className="flex-row items-center justify-between mb-8 px-6 pt-12">
          <TouchableOpacity 
            className="w-8 h-8 items-center justify-center"
            onPress={() => onNavigate('About')}
          >
            <Image
              source={require('../public/Icons/IconGoback.png')}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View className="items-center justify-center">
            <Image
              source={require('../public/Logo.png')}
              className="w-12 h-11 mt-2"
              resizeMode="contain"
            />
          </View>
          
          <View className="w-8 items-center justify-center">
            <BodyMStrong className="text-gray-600 font-medium">5/5</BodyMStrong>
          </View>
        </View>

      
        <ScrollView 
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <HeadingM className="text-2xl text-center font-bold text-primary-950 mb-2">
            ¿En qué redes creás contenido?
          </HeadingM>
          <BodyM className="text-primary-600 text-center text-base mb-8 px-8">
            Para continuar, necesitás vincular y validar al menos una red social.
          </BodyM>

         
          <View className="flex-row justify-around mb-8">
            {socialPlatforms.map((platform) => (
              <TouchableOpacity
                key={platform.id}
                className="w-28 h-24 rounded-2xl border-2 border-gray-200 bg-white items-center justify-center"
                onPress={() => togglePlatform(platform.id)}
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

        
          {hasSelection && (
            <View className="mb-8">
              <View className="bg-gray-50 rounded-2xl p-4">
                <Text className="text-black font-medium text-lg mb-4">
                  Cuentas vinculadas
                </Text>
                
                {socialPlatforms.filter(platform => platform.selected).map((platform, index, array) => (
                  <View key={platform.id}>
                    <View className="flex-row items-center justify-between rounded-xl p-3">
                      <View className="flex-row items-center">
                        <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                          platform.id === 'tiktok' ? 'bg-primary-950' : 'bg-transparent'
                        }`}>
                          <Image
                            source={platform.id === 'youtube' 
                              ? require('../public/Icons/YoutubeRounded.png')
                              : platform.id === 'instagram'
                                ? require('../public/Icons/InstagramRoundedColorless.png')
                                : platform.logo
                            }
                            className="w-10 h-10"
                            resizeMode="contain"
                          />
                        </View>
                        <View>
                          <Text className="text-black font-medium text-sm">
                            @Yoen{platform.name.toLowerCase()}
                          </Text>
                          <Text className="text-gray-500 text-xs">
                            {platform.name}
                          </Text>
                        </View>
                      </View>
                      
                      <TouchableOpacity onPress={() => togglePlatform(platform.id)}>
                        <Image
                          source={require('../public/Icons/IconClose.png')}
                          className="w-5 h-5"
                          style={{ tintColor: '#9CA3AF' }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                    
      
                    {index < array.length - 1 && (
                      <View className="h-px bg-gray-200 mx-3 my-3" />
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

   
        <View className="px-6 pb-4 bg-white">
          {hasSelection ? (
            <PrimaryButton 
              title="Finalizar"
              variant="dark"
              onPress={handleContinue}
              disabled={false}
            />
          ) : (
            <PrimaryButton 
              title="Completar más tarde"
              variant="outline"
              onPress={handleSkip}
            />
          )}
          
         
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
