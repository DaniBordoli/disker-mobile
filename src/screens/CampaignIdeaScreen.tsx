import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { HeadingM } from '../components/typography/Headings';
import { BodyM, BodyMLink, BodyS } from '../components/typography/BodyText';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { HeadingS } from '../components/typography/Headings';

type CampaignIdeaScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CampaignIdeaScreen'>;

export const CampaignIdeaScreen: React.FC = () => {
  const navigation = useNavigation<CampaignIdeaScreenNavigationProp>();
  const [idea, setIdea] = useState('');
  const [showCompleteLaterModal, setShowCompleteLaterModal] = useState(false);
  const [showWhyModal, setShowWhyModal] = useState(false);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center px-4 pt-4 pb-2">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 bg-white rounded-full items-center justify-center border border-primary-100">
          <Image 
            source={require('../public/Icons/IconGoback.png')}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-2 pb-4 flex-1">
          <HeadingM className="mb-2 text-primary-950">Contanos tu idea para esta campaña</HeadingM>
          <BodyM className="mb-4 text-primary-950">
            Queremos saber cómo pensás presentar el contenido. No hace falta que sea perfecto: solo necesitamos entender tu enfoque.
          </BodyM>
          <BodyMLink className="mb-4 text-primary-950" onPress={() => setShowWhyModal(true)}>
            ¿Por qué te pedimos esto?
          </BodyMLink>
          <View style={{ position: 'relative' }}>
            <TextInput
              className="border border-gray-200 rounded-xl px-3 py-2 mt-2 text-primary-950"
              style={{ minHeight: 150, textAlignVertical: 'top', paddingRight: 60 }}
              placeholder='Ejemplo: "Hola a todos, hoy les quiero mostrar este nuevo producto que me encantó. Voy a hacer un video mostrando cómo lo uso en mi día a día..."'
              placeholderTextColor="#9CA3AF"
              maxLength={200}
              multiline
              value={idea}
              onChangeText={setIdea}
            />
            <View style={{ position: 'absolute', right: 12, bottom: 10 }}>
              <Text className="text-right text-gray-400 text-xs">{idea.length}/200</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={showCompleteLaterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCompleteLaterModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <View className="flex-1 bg-black/40 justify-end">
            <View className="bg-white rounded-t-3xl px-6 py-8 w-full" style={{ minHeight: '45%', maxHeight: '50%' }}>
              <View className="flex-row justify-between items-center mb-6">
                <HeadingS className="text-xl font-bold text-primary-950">
                  ¿Querés completarlo después?
                </HeadingS>
                <TouchableOpacity onPress={() => setShowCompleteLaterModal(false)} className="p-1">
                  <Image
                    source={require('../public/Icons/IconClose.png')}
                    className="w-6 h-6"
                    style={{ tintColor: '#000000' }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                <Text className="text-primary-950 mb-2">
                  Si salís ahora, tu postulación se guardará como incompleta y no se enviará.
                </Text>
                <Text className="text-primary-950 mb-6">
                  Vas a poder retomarla más tarde desde la sección Campañas → Mis postulaciones
                </Text>
                <PrimaryButton
                  title="Seguir completando"
                  variant="dark"
                  onPress={() => setShowCompleteLaterModal(false)}
                  className="mb-3"
                />
                <PrimaryButton
                  title="Completar después"
                  variant="dark"
                  onPress={() => {
                    
                  }}
                />
                <BodyMLink className="mt-3 text-center text-primary-950">
                  Completar después
                </BodyMLink>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      
      <Modal
        visible={showWhyModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowWhyModal(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <View className="flex-1 bg-black/40 justify-end">
            <View className="bg-white rounded-t-3xl px-6 py-8 w-full" style={{ minHeight: '28%', maxHeight: '50%' }}>
              <View className="flex-row justify-between items-center mb-6">
                <HeadingS className="text-xl font-bold text-primary-950">
                  ¿Por qué te pedimos esto?
                </HeadingS>
                <TouchableOpacity onPress={() => setShowWhyModal(false)} className="p-1">
                  <Image
                    source={require('../public/Icons/IconClose.png')}
                    className="w-6 h-6"
                    style={{ tintColor: '#000000' }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                <BodyM className="text-primary-950 px-3">
                  Queremos conocer mejor tu enfoque y creatividad para saber si tu perfil encaja con lo que esta campaña necesita. Así, desde Disker podemos tomar decisiones más justas y encontrar al creador ideal para cada proyecto.
                </BodyM>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <View className="flex-row px-4 py-4 bg-white border-t border-gray-200">
        <View className="flex-1 mr-2">
          <PrimaryButton title="Completar después" onPress={() => setShowCompleteLaterModal(true)} />
        </View>
        <View className="flex-1">
          <PrimaryButton title="Enviar y postular" variant="dark" />
        </View>
      </View>
    </View>
  );
};
