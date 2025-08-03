import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { BottomNavBar } from '../components/navigation/BottomNavBar';
import { HeadingM, HeadingS } from '../components/typography/Headings';
import { BodyM, BodyMLink, BodyMStrong, BodyS } from '../components/typography/BodyText';
import { SelectInput } from '../components/inputs/SelectInput';
import { CountryPickerModal } from '../components/modal/CountryPickerModal';
import { PrimaryButton } from '../components/buttons/PrimaryButton';

type AddPaymentMethodScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddPaymentMethod'>;

interface PaymentMethod {
  id: string;
  title: string;
  subtitle: string;
  details: string[];
  selected: boolean;
}

const AddPaymentMethodScreen: React.FC = () => {
  const navigation = useNavigation<AddPaymentMethodScreenNavigationProp>();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [countryError, setCountryError] = useState(false);
  const [paymentMethodError, setPaymentMethodError] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'paypal',
      title: 'Paypal en USD',
      subtitle: '',
      details: ['1 día hábil', 'Podrían aplicarse tarifas de PayPal'],
      selected: selectedPaymentMethod === 'paypal'
    },
    {
      id: 'payoneer',
      title: 'Payoneer en USD',
      subtitle: '',
      details: ['Tarjeta de débito MasterCard prepaga', '24 horas o menos'],
      selected: selectedPaymentMethod === 'payoneer'
    },
    {
      id: 'bank-ars',
      title: 'Cuenta bancaria en ARS',
      subtitle: '',
      details: ['de 3 a 5 días hábiles', 'Sin comisiones'],
      selected: selectedPaymentMethod === 'bank-ars'
    },
    {
      id: 'bank-usd',
      title: 'Cuenta bancaria en USD',
      subtitle: '',
      details: ['de 3 a 5 días hábiles', 'Sin comisiones'],
      selected: selectedPaymentMethod === 'bank-usd'
    }
  ];

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setCountryError(false); 
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    setPaymentMethodError(false);
  };

  const handleContinue = () => {
    let hasErrors = false;

 
    if (!selectedCountry) {
      setCountryError(true);
      hasErrors = true;
    }

  
    if (!selectedPaymentMethod) {
      setPaymentMethodError(true);
      hasErrors = true;
    }

    if (!hasErrors) {
      
      if (selectedPaymentMethod === 'paypal') {
        navigation.navigate('Paypal');
      } else {
      
        console.log('Continue with:', { selectedCountry, selectedPaymentMethod });
      }
    }
  };

  const renderPaymentMethod = (method: PaymentMethod) => {
    
    let iconSource;
    switch (method.id) {
      case 'paypal':
        iconSource = require('../public/Icons/Paypal.png');
        break;
      case 'payoneer':
        iconSource = require('../public/Icons/Payoneer.png');
        break;
      default:
        iconSource = require('../public/ProfileScreenIcons/IconBank.png');
    }

    return (
      <TouchableOpacity
        key={method.id}
        className="py-4"
        onPress={() => handlePaymentMethodSelect(method.id)}
      >
        <View className="flex-row items-start">
          <View className="w-10 h-10 bg-white border border-primary-100 rounded-full items-center justify-center mr-3 mt-0.5">
            <Image 
              source={iconSource}
              className="w-5 h-5" 
              style={{ tintColor: method.id === 'paypal' || method.id === 'payoneer' ? undefined : '#191919' }} 
            />
          </View>
          
          <View className="flex-1">
            <BodyMStrong className="text-black font-semibold mb-2 text-left">
              {method.title}
            </BodyMStrong>
            {method.details.map((detail, index) => (
              <View key={index} className="flex-row items-start mb-1">
                <View className="w-1.5 h-1.5 bg-primary-950 rounded-full mr-2 mt-2" />
                <BodyM className="text-primary-950 text-sm text-left flex-1">
                  {detail}
                </BodyM>
              </View>
            ))}
          </View>

          <View className="ml-4 mt-1">
            <View className={`w-5 h-5 rounded-full border-2 ${
              method.selected 
                ? 'border-primary-500 bg-primary-500' 
                : paymentMethodError 
                  ? 'border-red-500' 
                  : 'border-gray-300'
            } items-center justify-center`}>
              {method.selected && (
                <View className="w-2 h-2 bg-white rounded-full" />
              )}
            </View>
          </View>
        </View>
      
        <View className="h-px bg-gray-200 mt-4" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
     
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
      
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
          <HeadingM className="text-primary-950 mb-2">Agregá una forma de cobro</HeadingM>
          <BodyM className="text-gray-600">
            Para empezar, dinos a dónde querés que te enviemos tu dinero.
          </BodyM>
        </View>

        <View className="px-6 pt-6">
        
          <SelectInput
            label="País/región de facturación"
            value={selectedCountry}
            onPress={() => setShowCountryModal(true)}
            placeholder="País/región de facturación"
            className={`mb-2 ${countryError ? 'border-red-500' : ''}`}
            error={countryError ? 'Debe seleccionar una opción' : ''}
          />

       
          <View className="mb-6">
            <BodyMStrong className="text-black font-semibold mb-4 text-left">
              ¿Cómo querés recibir los pagos?
            </BodyMStrong>
            
            <View className="bg-white">
              {paymentMethods.map((method, index) => (
                <View key={method.id}>
                  {renderPaymentMethod(method)}
                 
                  {index === paymentMethods.length - 1 && <View className="h-px" />}
                </View>
              ))}
            </View>
            
         
            {paymentMethodError && (
              <View className="flex-row items-center mt-2">
                <Image 
                  source={require('../public/Icons/IconWarning.png')} 
                  className="w-4 h-4 mr-2" 
                  style={{ tintColor: '#DC2626' }}
                />
                <BodyS className="text-red-600">Debe seleccionar una opción</BodyS>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

     
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-primary-200 px-6 py-4">
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
        selectedCountry={selectedCountry}
      />
    </SafeAreaView>
  );
};

export default AddPaymentMethodScreen;
