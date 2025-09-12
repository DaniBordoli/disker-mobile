import React from 'react';
import { 
  View, 
  Image, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { HeadingM } from '../components/typography/Headings';
import { BodyS, BodyM, BodySLink, BodyMStrong } from '../components/typography/BodyText';

type RejectedProposalScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RejectedProposal'>;

export const RejectedProposalScreen: React.FC = () => {
  const navigation = useNavigation<RejectedProposalScreenNavigationProp>();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#EF2507' }}>
      <StatusBar barStyle="light-content" backgroundColor="#EF2507" />

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header Section */}
        <View className="pb-6 relative" style={{ backgroundColor: '#EF2507' }}>
          {/* Navigation */}
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
          </View>
        </View>

        {/* Document Icon */}
        <View 
          style={{ 
            position: 'absolute',
            top: 60, 
            left: '50%',
            marginLeft: -32, 
            zIndex: 9999, 
            elevation: 10 
          }}
        >
          <View 
            className="w-16 h-16 rounded-full items-center justify-center border-2 border-white"
            style={{ 
              backgroundColor: '#EF2507'
            }}
          >
            <Image
              source={require('../public/ProfileScreenIcons/IconDocument.png')}
              className="w-8 h-8"
              style={{ tintColor: '#FFE4D4' }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Content Section */}
        <View className="flex-1">
          <View className="bg-white rounded-t-3xl p-4 flex-1" style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 40 }}>
          
            <View className="items-center mb-6">
              <HeadingM className="text-primary-950 mb-1">Propuesta rechazada</HeadingM>
              <BodyS className="text-gray-500">13 de mayo</BodyS>
            </View>

            {/* Mensaje en caja neutral-50 */}
            <View className="bg-neutral-50 rounded-lg p-4 mb-6">
              <View className="flex-row items-start mb-3">
                <Image 
                  source={require('../public/NavbarIcons/IconChat.png')}
                  className="w-5 h-5 mr-2 mt-0.5"
                  resizeMode="contain"
                />
                <BodyM className="flex-1 text-primary-950">
                  Hola! Vimos el guion y por ahora no lo vamos a aprobar 😔. Nos parece muy largo, queremos algo más corto y directo, con foco en un solo beneficio y que el producto se vea más tiempo. También el CTA debería ser más motivador. Podés ajustarlo y mandarnos una nueva versión?
                </BodyM>
              </View>
              
              <TouchableOpacity className="mt-2">
                <BodySLink className="text-primary-950">Ir al mensaje</BodySLink>
              </TouchableOpacity>
            </View>

            {/* Contenido del guión */}
            <View className="space-y-4">
              <View>
                <BodyMStrong className="font-semibold text-primary-950 mb-2">1. HOOK (0-3 seg)</BodyMStrong>
                <BodyM className="text-primary-950 mb-1">Narración / Texto:</BodyM>
                <BodyM className="text-primary-950 mb-3">
                  👍 "¿Sabías que el 70% de tu rendimiento depende de cómo te recuperás después de entrenar?"
                </BodyM>
                <BodyM className="text-primary-950 mb-1">Visual:</BodyM>
                <BodyM className="text-primary-950">
                  Plano corto, vos mirando a cámara en el gym o en casa, tono directo.
                </BodyM>
              </View>

              <View>
                <BodyMStrong className="font-semibold text-primary-950 mb-2">2. PRESENTACIÓN DEL PRODUCTO (3-7 seg)</BodyMStrong>
                <BodyM className="text-primary-950 mb-1">Narración / Texto:</BodyM>
                <BodyM className="text-primary-950 mb-3">
                  "Por eso estoy usando [Nombre del producto], un suplemento que me ayuda a recuperarme más rápido y rendir mejor al día siguiente."
                </BodyM>
                <BodyM className="text-primary-950 mb-1">Visual:</BodyM>
                <BodyM className="text-primary-950">
                  Mostrar el producto en mano, acercamiento a la marca, packaging visible.
                </BodyM>
              </View>

              <View>
                <BodyMStrong className="font-semibold text-primary-950 mb-2">3. BENEFICIOS CLAVE (7-15 seg)</BodyMStrong>
                <BodyM className="text-primary-950 mb-1">Narración / Texto (con bullets en pantalla):</BodyM>
                <BodyM className="text-primary-950 mb-3">
                  ✔️ Acelera la recuperación{'\n'}
                  ✔️ Aporta energía limpia{'\n'}
                  ✔️ Sabor increíble
                </BodyM>
                <BodyM className="text-primary-950 mb-1">Visual:</BodyM>
                <BodyM className="text-primary-950">
                  Cortes rápidos: vos entrenando + detalle del producto + consumiéndolo.
                </BodyM>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
