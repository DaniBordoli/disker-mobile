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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { PrimaryButton, SelectionButton } from '../components/buttons';
import { FloatingLabelInput, DateInput, SelectInput } from '../components/inputs';
import { CountryPickerModal } from '../components/modal/CountryPickerModal';
import { HeadingM, HeadingXS } from '../components/typography/Headings';
import { BodyM, BodyS, BodyMStrong } from '../components/typography/BodyText';

type AboutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'About'>;

export const AboutScreen: React.FC = () => {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  const [gender, setGender] = useState<'Masculino' | 'Femenino' | ''>('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [showCountryModal, setShowCountryModal] = useState(false);

  const handleContinue = () => {
    if (gender && birthDate && country && city) {
      console.log('Continue with data:', { gender, birthDate, country, city });
    
      navigation.navigate('SocialMedia');
    }
  };

 
  const calculateAge = (dateString: string) => {
    if (!dateString || dateString.length < 10) return null;
    
    const [day, month, year] = dateString.split('/').map(Number);
    if (!day || !month || !year) return null;
    
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const age = calculateAge(birthDate);
  const isUnderage = age !== null && age < 18;

  const isFormValid = gender && birthDate && country && city && !isUnderage;

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
            onPress={() => navigation.goBack()}
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
            <BodyMStrong className="text-gray-600 font-medium">4/5</BodyMStrong>
          </View>
        </View>

    
        <ScrollView 
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
        <HeadingM  className="text-2xl text-center font-bold text-primary-950 mb-2">
          Contanos un poco más sobre vos
        </HeadingM>
        <BodyM className="text-primary-600 text-center text-base mb-8">
          Esto nos ayuda a personalizar tu experiencia.
        </BodyM>

      
        <HeadingXS className="text-primary-950 font-medium text-base mb-4">
          ¿Cómo te identificás?
        </HeadingXS>

  <View className="flex-row mb-6">
          <View className="w-auto">
            <SelectionButton
              title="Masculino"
              icon={require('../public/Icons/MasculineEmoji.png')}
              isSelected={gender === 'Masculino'}
              onPress={() => setGender('Masculino')}
            />
          </View>
          
          <View className="w-4" />
          
          <View className="w-auto">
            <SelectionButton
              title="Femenino"
              icon={require('../public/Icons/FemenineEmoji.png')}
              isSelected={gender === 'Femenino'}
              onPress={() => setGender('Femenino')}
            />
          </View>
        </View>

        {/* Birth Date */}
        <HeadingXS className="text-primary-950 font-medium text-base mb-4">
          ¿Cuál es tu fecha de nacimiento?
        </HeadingXS>

        <DateInput
          label="DD/MM/AAAA"
          value={birthDate}
          onChangeText={setBirthDate}
        />
        
        <BodyS className={`text-sm mb-6 flex-row items-center ${
          isUnderage ? 'text-red-600' : 'text-primary-950'
        }`}>
          <Image
            source={isUnderage 
              ? require('../public/Icons/IconWarning.png')
              : require('../public/Icons/IconAttention.png')
            }
            className="w-4 h-4 mr-1"
            style={{ tintColor: isUnderage ? '#DC2626' : '#6B7280' }}
            resizeMode="contain"
          />
          {' '}{isUnderage ? 'Tienes que ser mayor a 18 años' : 'Debés tener al menos 18 años para registrarte.'}
        </BodyS>

        <HeadingXS className="text-primary-950 font-medium text-base mb-4">
          ¿Dónde vivís?
        </HeadingXS>

        <SelectInput
          label="País"
          value={country}
          placeholder="País"
          onPress={() => setShowCountryModal(true)}
          className="mb-4"
        />
        
        <FloatingLabelInput
          label="Ciudad"
          value={city}
          onChangeText={setCity}
          className="pb-8"
        />
      </ScrollView>

   
      <View className="px-6 pb-8 bg-white">
        <PrimaryButton 
          title="Continuar"
          variant="dark"
          onPress={handleContinue}
          disabled={!isFormValid}
        />
      </View>

   
      <CountryPickerModal
        visible={showCountryModal}
        onClose={() => setShowCountryModal(false)}
        onSelect={setCountry}
        selectedCountry={country}
      />
    </View>
    </KeyboardAvoidingView>
  );
};
