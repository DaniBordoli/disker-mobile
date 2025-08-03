import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { PrimaryButton } from '../components/buttons';
import { FloatingLabelInput } from '../components/inputs/FloatingLabelInput';
import { SelectInput } from '../components/inputs/SelectInput';
import { CountryPickerModal } from '../components/modal/CountryPickerModal';
import { HeadingM } from '../components/typography/Headings';
import { BodyM } from '../components/typography/BodyText';

type PaypalScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Paypal'>;

const PaypalScreen: React.FC = () => {
  const navigation = useNavigation<PaypalScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [showCountryModal, setShowCountryModal] = useState(false);
  
 
  const [emailError, setEmailError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [countryError, setCountryError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = () => {
    let hasErrors = false;
    
   
    if (!email.trim()) {
      setEmailError('Ingresá mail válido');
      hasErrors = true;
    } else if (!validateEmail(email)) {
      setEmailError('Ingresá mail válido');
      hasErrors = true;
    } else {
      setEmailError('');
    }
    
  
    if (!fullName.trim()) {
      setFullNameError('Ingresá el nombre completo del titular de la cuenta');
      hasErrors = true;
    } else {
      setFullNameError('');
    }
    

    if (!country.trim()) {
      setCountryError('Seleccioná un país');
      hasErrors = true;
    } else {
      setCountryError('');
    }
    
    if (!hasErrors) {
    
      console.log('Paypal data:', { email, fullName, country });
      navigation.navigate('PaymentMethods');
    }
  };

  const handleCountrySelect = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setCountryError(''); 
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      
      <View className="px-6 pt-4 pb-4">
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
        <HeadingM className="text-primary-950 mb-2">Paypal</HeadingM>
        <BodyM className="text-gray-600">
          Ingresá los datos para validar tu cuenta
        </BodyM>
      </View>

  
      <View className="flex-1 px-6">
 
        <FloatingLabelInput
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) setEmailError(''); 
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          className={emailError ? 'border-red-500' : ''}
        />
        {emailError ? (
          <View className="flex-row items-center mb-4 -mt-2">
            <Image
              source={require('../public/Icons/IconWarning.png')}
              className="w-4 h-4 mr-2"
              style={{ tintColor: '#DC2626' }}
              resizeMode="contain"
            />
            <Text className="text-red-600 text-sm">{emailError}</Text>
          </View>
        ) : null}

     
        <FloatingLabelInput
          label="Nombre y apellido"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            if (fullNameError) setFullNameError(''); 
          }}
          autoCapitalize="words"
          autoCorrect={false}
          className={fullNameError ? 'border-red-500' : ''}
        />
      
        <View className="flex-row items-center mb-6 -mt-2">
          <Image
            source={fullNameError 
              ? require('../public/Icons/IconWarning.png')
              : require('../public/Icons/IconAttention.png')
            }
            className="w-4 h-4 mr-2"
            style={{ tintColor: fullNameError ? '#DC2626' : '#6B7280' }}
            resizeMode="contain"
          />
          <Text className={`text-sm ${fullNameError ? 'text-red-600' : 'text-gray-500'}`}>
            {fullNameError || 'Nombre y apellido del titular de la cuenta'}
          </Text>
        </View>

    
        <SelectInput
          label="País"
          value={country}
          onPress={() => setShowCountryModal(true)}
          placeholder="País"
          className={countryError ? 'border-red-500' : ''}
        />
        {countryError ? (
          <View className="flex-row items-center mb-4 -mt-2">
            <Image
              source={require('../public/Icons/IconWarning.png')}
              className="w-4 h-4 mr-2"
              style={{ tintColor: '#DC2626' }}
              resizeMode="contain"
            />
            <Text className="text-red-600 text-sm">{countryError}</Text>
          </View>
        ) : null}
      </View>

    
      <View className="bg-white border-t border-primary-200 px-6 py-4">
        <PrimaryButton 
          title="Continuar"
          variant="dark"
          onPress={handleContinue}
        />
      </View>

   
      <CountryPickerModal
        visible={showCountryModal}
        onClose={() => setShowCountryModal(false)}
        onSelect={handleCountrySelect}
        selectedCountry={country.replace(/^🇦🇷 |^🇧🇷 |^🇨🇱 |^🇨🇴 |^🇪🇨 |^🇪🇸 |^🇺🇸 |^🇫🇷 |^🇮🇹 |^🇲🇽 |^🇵🇾 |^🇵🇪 |^🇺🇾 |^🇻🇪 /, '')}
      />
    </KeyboardAvoidingView>
  );
};

export default PaypalScreen;
