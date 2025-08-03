import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { BottomNavBar } from '../components/navigation/BottomNavBar';
import { HeadingM, HeadingS, HeadingXS } from '../components/typography/Headings';
import { BodyM, BodyMLink, BodyS } from '../components/typography/BodyText';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
   
        <View className="px-6 pt-10 pb-4 bg-white">
          <View className="flex-row justify-end mb-2">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white border border-primary-100 items-center justify-center flex-row"
              onPress={() => navigation.navigate('Notifications')}
            >
              <Image source={require('../public/ProfileScreenIcons/IconBell.png')} className="w-6 h-6" style={{ tintColor: '#191919' }} />
            </TouchableOpacity>
          </View>
          <HeadingM className="text-primary-950 mb-6 text-left">Perfil</HeadingM>
          <View className="flex-row items-center mb-6">
            <Image
              source={require('../public/Icons/IconUser.png')} 
              style={{ width: 64, height: 64, borderRadius: 16, marginRight: 16, tintColor: '#191919' }}
              resizeMode="cover"
            />
            <View>
              <HeadingS className="text-lg text-black font-semibold mb-1">Lautaro Gómez</HeadingS>
              <BodyS className="text-base text-primary-600">Lgomez@mail.com</BodyS>
            </View>
          </View>
      
          <View className="bg-yellow-50 border-l-4 border-[#FFD600] rounded-lg px-4 py-3 mb-6 shadow-xl">
               <Image source={require('../public/Icons/IconWarning.png')} className="w-4 h-4 mb-2" style={{ tintColor: '#665000' }} />
            <View className="flex-row items-center mb-1">
              <Text className="text-yellow-700 font-semibold">Activá tu cuenta bancaria</Text>
            </View>
            <Text className="text-primary-950 text-sm mb-2">Verificá tu cuenta para poder cobrar sin demoras.</Text>
            <TouchableOpacity>
              <BodyMLink className="text-primary-950 font-medium text-base mb-4">Verificar ahora</BodyMLink>
            </TouchableOpacity>
          </View>
        </View>

       
        <View className="px-6">
    
          <HeadingXS className="text-base font-semibold text-gray-900 mb-2">Mi cuenta</HeadingXS>
          <View className="bg-white rounded-xl mb-4">
            <TouchableOpacity 
              className="flex-row items-center py-4 border-b border-primary-100"
              onPress={() => navigation.navigate('PersonalInfo')}
            >
              <Image source={require('../public/NavbarIcons/IconUser.png')} className="w-5 h-5 mr-3" style={{ tintColor: '#191919' }} />
              <BodyM className="flex-1 text-base text-gray-900">Información personal</BodyM>
              <Image source={require('../public/Icons/IconChevronRight.png')} className="w-7 h-7" style={{ tintColor: '#191919' }} />
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-row items-center py-4 border-b border-primary-100"
              onPress={() => navigation.navigate('PaymentMethods')}
            >
              <Image source={require('../public/ProfileScreenIcons/IconBank.png')} className="w-5 h-5 mr-3" style={{ tintColor: '#191919' }} />
              <BodyM className="flex-1 text-base text-gray-900">Forma de cobro</BodyM>
              <Image source={require('../public/Icons/IconChevronRight.png')} className="w-7 h-7" style={{ tintColor: '#191919' }} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center py-4 border-b border-primary-100">
              <Image source={require('../public/NavbarIcons/IconMegaphone.png')} className="w-5 h-5 mr-3" style={{ tintColor: '#191919' }} />
              <BodyM className="flex-1 text-base text-gray-900">Redes sociales</BodyM>
              <Image source={require('../public/Icons/IconChevronRight.png')} className="w-7 h-7" style={{ tintColor: '#191919' }} />
            </TouchableOpacity>
          </View>

          
          <HeadingXS className="text-base font-semibold text-gray-900 mb-2">Preferencias</HeadingXS>
          <View className="bg-white rounded-xl mb-4">
            <TouchableOpacity 
              className="flex-row items-center py-4 border-b border-primary-100"
              onPress={() => navigation.navigate('Notifications')}
            >
              <Image source={require('../public/ProfileScreenIcons/IconBell.png')} className="w-5 h-6 mr-3" style={{ tintColor: '#191919' }} />
              <BodyM className="flex-1 text-base text-gray-900">Notificaciones</BodyM>
              <Image source={require('../public/Icons/IconChevronRight.png')} className="w-7 h-7" style={{ tintColor: '#191919' }} />
            </TouchableOpacity>
          </View>

          
          <HeadingXS className="text-base font-semibold text-gray-900 mb-2">Beneficios y comunidad</HeadingXS>
          <View className="bg-white rounded-xl mb-4">
            <TouchableOpacity className="flex-row items-center py-4 border-b border-primary-100 ">
              <Image source={require('../public/ProfileScreenIcons/IconGift.png')} className="w-5 h-5 mr-3" style={{ tintColor: '#191919' }} />
              <BodyM className="flex-1 text-base text-gray-900">Referí y ganá</BodyM>
              <Image source={require('../public/Icons/IconChevronRight.png')} className="w-7 h-7" style={{ tintColor: '#191919' }} />
            </TouchableOpacity>
          </View>

         
          <HeadingXS className="text-base font-semibold text-gray-900 mb-2">Soporte y legales</HeadingXS>
          <View className="bg-white rounded-xl mb-4">
            <TouchableOpacity className="flex-row items-center py-4 border-b border-primary-100">
              <Image source={require('../public/ProfileScreenIcons/IconDocument.png')} className="w-5 h-6 mr-3" style={{ tintColor: '#191919' }} />
              <BodyM className="flex-1 text-base text-gray-900">Términos y condiciones</BodyM>
              <Image source={require('../public/Icons/IconChevronRight.png')} className="w-7 h-7" style={{ tintColor: '#191919' }} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center py-4 border-b border-primary-100">
              <Image source={require('../public/Icons/IconAttention.png')} className="w-5 h-5 mr-3" style={{ tintColor: '#191919' }} />
              <BodyM className="flex-1 text-base text-gray-900">Centro de ayuda</BodyM>
              <Image source={require('../public/Icons/IconChevronRight.png')} className="w-7 h-7" style={{ tintColor: '#191919' }} />
            </TouchableOpacity>
          </View>

          
          <TouchableOpacity className="mb-8">
            <BodyMLink className="text-primary-950 font-medium text-base">Cerrar sesión</BodyMLink>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavBar onNavigate={(screen) => navigation.navigate(screen as any)} currentScreen="Perfil" />
    </SafeAreaView>
  );
};

export default ProfileScreen;
