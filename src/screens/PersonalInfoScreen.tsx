import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { BottomNavBar } from '../components/navigation/BottomNavBar';
import { HeadingM, HeadingS } from '../components/typography/Headings';
import { BodyM, BodyMLink, BodyMStrong, BodyS } from '../components/typography/BodyText';
import { useAuthStore } from '../store/auth';

type PersonalInfoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PersonalInfo'>;

interface PersonalInfoField {
  label: string;
  value: string;
  type: 'text' | 'password' | 'phone';
}

const PersonalInfoScreen: React.FC = () => {
  const navigation = useNavigation<PersonalInfoScreenNavigationProp>();
  const user = useAuthStore((s) => s.currentUser);
  const displayName = React.useMemo(() => {
    if (user?.name && user.name.trim().length > 0) return user.name.trim();
    return '—';
  }, [user]);
  const displayEmail = user?.email || '—';

  const personalInfoFields: PersonalInfoField[] = [
    {
      label: 'Email',
      value: displayEmail,
      type: 'text'
    },
    {
      label: 'Contraseña',
      value: '••••••••••••••••••',
      type: 'password'
    },
    {
      label: 'Nombre y apellido',
      value: displayName,
      type: 'text'
    },
    {
      label: 'Género',
      value: 'Masculino',
      type: 'text'
    },
    {
      label: 'Fecha de nacimiento',
      value: '11/11/1989',
      type: 'text'
    },
    {
      label: 'Soy de',
      value: 'Buenos Aires, Argentina',
      type: 'text'
    },
    {
      label: 'Teléfono',
      value: 'No proporcionado',
      type: 'phone'
    }
  ];

  const renderInfoField = (field: PersonalInfoField, index: number) => (
    <View key={index} className="py-4 border-b border-gray-100">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <BodyMStrong className="text-black font-medium mb-1">
            {field.label}
          </BodyMStrong>
          <BodyM className="text-gray-600">
            {field.value}
          </BodyM>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (field.label === 'Nombre y apellido') {
              navigation.navigate('EditName');
            } else if (field.label === 'Email') {
              navigation.navigate('EditEmail');
            } else if (field.label === 'Contraseña') {
              navigation.navigate('EditPassword');
            } else if (field.label === 'Género') {
              navigation.navigate('EditPersonalData', { section: 'gender' });
            } else if (field.label === 'Fecha de nacimiento') {
              navigation.navigate('EditPersonalData', { section: 'birthdate' });
            } else if (field.label === 'Soy de') {
              navigation.navigate('EditPersonalData', { section: 'location' });
            } else if (field.label === 'Teléfono') {
              navigation.navigate('EditPhone');
            }
          }}
        >
          <BodyMLink className="text-black">
            Editar
          </BodyMLink>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
     
      <View className="px-6 pt-4 pb-4 bg-white border-b border-gray-100">
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
        <HeadingM className="text-primary-950">Información personal</HeadingM>
      </View>

     
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-6 pt-4">
          {personalInfoFields.map((field, index) => renderInfoField(field, index))}
        </View>
      </ScrollView>

      <BottomNavBar onNavigate={(screen) => navigation.navigate(screen as any)} currentScreen="PersonalInfo" />
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;
