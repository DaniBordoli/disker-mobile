import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { HeadingM, HeadingS } from '../components/typography/Headings';
import { BodyM, BodyMLink, BodyS } from '../components/typography/BodyText';
import { PrimaryButton } from '../components/buttons/PrimaryButton';

type PaymentMethodsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PaymentMethods'>;

const PaymentMethodsScreen: React.FC = () => {
  const navigation = useNavigation<PaymentMethodsScreenNavigationProp>();

  const paymentMethods = [
    {
      id: 'paypal',
      title: 'Paypal en USD',
      email: 't***g@mail.com (USD)',
      isDefault: true,
      icon: require('../public/Icons/Paypal.png')
    },
    {
      id: 'payoneer',
      title: 'Payoneer en USD',
      email: 't***g@mail.com (USD)',
      isDefault: false,
      icon: require('../public/Icons/Payoneer.png')
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
     
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
        <HeadingM className="text-primary-950 mb-2">Cómo recibes tu dinero</HeadingM>
        <BodyM className="text-gray-600">
          Puedes editar tu dinero a más de un método de cobro
        </BodyM>
      </View>

     
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {paymentMethods.map((method, index) => (
          <View key={method.id} className="mb-4">
            <View className="flex-row items-center justify-between py-4">
             
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 bg-white border border-primary-100 rounded-full items-center justify-center mr-3">
                  <Image 
                    source={method.icon}
                    className="w-6 h-6" 
                    resizeMode="contain"
                  />
                </View>
                
                <View className="flex-1">
                  <HeadingS className="text-black font-semibold text-base mb-1">
                    {method.title}
                  </HeadingS>
                  {method.isDefault && (
                    <View className="bg-violet-100 px-2 py-1 rounded-md mb-1 self-start">
                      <BodyS className="text-violet-800 text-xs font-medium">
                        Cuenta predeterminada
                      </BodyS>
                    </View>
                  )}
                  <BodyM className="text-gray-600 text-sm">
                    {method.email}
                  </BodyM>
                </View>
              </View>

            
              <TouchableOpacity className="flex-row items-center">
                <Image
                  source={method.isDefault 
                    ? require('../public/Icons/IconStarFilled.png')
                    : require('../public/Icons/IconStarNoFilled.png')
                  }
                  className="w-5 h-5 mr-3"
                  resizeMode="contain"
                />
                <BodyMLink className="text-primary-950">
                  Editar
                </BodyMLink>
              </TouchableOpacity>
            </View>
            
         
            {index < paymentMethods.length - 1 && (
              <View className="h-px bg-gray-200" />
            )}
          </View>
        ))}
      </ScrollView>

      
      <View className="bg-white px-6 py-4">
        <PrimaryButton
          title="Agregar método de cobro"
          variant="dark"
          onPress={() => navigation.navigate('AddPaymentMethod')}
        />
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethodsScreen;
