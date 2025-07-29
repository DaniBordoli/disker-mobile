
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { HeadingM, HeadingS } from '../components/typography/Headings';
import { BodyM, BodyMLink, BodyS } from '../components/typography/BodyText';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { AudienceStatsFile } from '../types/audienceStats';

export const AudienceStatsScreen: React.FC<{ onGoBack?: () => void }> = ({ onGoBack }) => {
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [showHowModal, setShowHowModal] = useState(false);
  const [igFile, setIgFile] = useState<AudienceStatsFile | null>(null);
  const [ttFile, setTtFile] = useState<AudienceStatsFile | null>(null);

  const handleUpload = (type: 'ig' | 'tt') => {
    const simulatedImages = [
      'https://picsum.photos/300/400?random=1',
      'https://picsum.photos/300/400?random=2',
      'https://picsum.photos/300/400?random=3',
    ];
    const randomImage = simulatedImages[Math.floor(Math.random() * simulatedImages.length)];
    const fakeFile = {
      name: 'Estadisticas.jpg',
      size: Math.floor(Math.random() * 3 + 2) * 1024 * 1024, 
      progress: 0,
      uploading: true,
      uri: randomImage,
      completed: false,
    };
    if (type === 'ig') setIgFile(fakeFile);
    else setTtFile(fakeFile);
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.floor(Math.random() * 15 + 5); 
      if (prog >= 100) {
        prog = 100;
       
        if (type === 'ig') {
          setIgFile(f => f && { ...f, progress: 100, uploading: false, completed: true });
        } else {
          setTtFile(f => f && { ...f, progress: 100, uploading: false, completed: true });
        }
        clearInterval(interval);
      } else {
        if (type === 'ig') {
          setIgFile(f => f && { ...f, progress: prog });
        } else {
          setTtFile(f => f && { ...f, progress: prog });
        }
      }
    }, 200);
  };
  const handleRemove = (type: 'ig' | 'tt') => {
    if (type === 'ig') setIgFile(null);
    else setTtFile(null);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center px-4 pt-4 pb-2">
        <TouchableOpacity onPress={onGoBack} className="w-10 h-10 bg-white rounded-full items-center justify-center border border-primary-100">
          <Image 
            source={require('../public/Icons/IconGoback.png')}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-2 pb-4 flex-1">
          <HeadingM className="mb-2 text-primary-950">Subí tus estadísticas de audiencia</HeadingM>
          <BodyM className="mb-4 text-primary-950">
            Antes de postularte, necesitamos que compartas información sobre tu audiencia en redes. Subí capturas de tus estadísticas.
          </BodyM>
          <BodyMLink className='text-primary-950 mb-8' onPress={() => setShowWhyModal(true)}>
            ¿Por qué te pedimos esto?
          </BodyMLink>
          <View className="mb-6">
            <View className="flex-row items-center mb-6">
              <Image source={require('../public/Icons/InstagramRoundedColorless.png')} className="w-7 h-7 mr-2" resizeMode="contain" />
              <BodyM className="text-primary-950 font-semibold text-base">Instagram</BodyM>
            </View>
            {igFile ? (
              <View className="mb-3">
                <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 mb-2">
                  {igFile.uri ? (
                    <Image 
                      source={{ uri: igFile.uri }} 
                      className="w-12 h-12 rounded-xl mr-3" 
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="w-12 h-12 bg-gray-200 rounded-xl mr-3" />
                  )}
                  <View className="flex-1">
                    <Text className="text-primary-950 font-medium mb-1">{igFile.name}</Text>
                    {igFile.uploading ? (
                      <>
                        <View className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mb-1">
                          <View style={{ width: `${igFile.progress}%` }} className="h-1.5 bg-violet-500 rounded-full" />
                        </View>
                        <Text className="text-xs text-gray-500">
                          Subiendo... {igFile.progress}% ({(igFile.size * igFile.progress / 100 / (1024 * 1024)).toFixed(1)} MB de {(igFile.size / (1024 * 1024)).toFixed(1)} MB)
                        </Text>
                      </>
                    ) : (
                      <Text className="text-xs text-gray-500">
                        {(igFile.size / (1024 * 1024)).toFixed(1)} MB
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => handleRemove('ig')} className="ml-2">
                    <Image 
                      source={require('../public/Icons/IconClose.png')}
                      className="w-5 h-5"
                      style={{ tintColor: '#9CA3AF' }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <PrimaryButton title="Subir estadísticas" variant="outline" onPress={() => handleUpload('ig')} />
            )}
            <BodyS className="text-xs text-gray-500 mb-2">Formatos: JPG/PNG/PDF. Hasta 5MB.</BodyS>
            <BodyMLink className='text-primary-700' onPress={() => setShowHowModal(true)}>
              ¿Cómo obtener tus estadísticas?
            </BodyMLink>
          </View>
          <View className="h-px bg-gray-200 mb-6" />
          <View className="mb-6">
            <View className="flex-row items-center mb-6">
              <Image source={require('../public/Icons/TiktokRounded.png')} className="w-7 h-7 mr-2" resizeMode="contain" />
              <BodyM className="text-primary-950 font-semibold text-base">Tiktok</BodyM>
            </View>
            {ttFile ? (
              <View className="mb-3">
                <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 mb-2">
                  {ttFile.uri ? (
                    <Image 
                      source={{ uri: ttFile.uri }} 
                      className="w-12 h-12 rounded-xl mr-3" 
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="w-12 h-12 bg-gray-200 rounded-xl mr-3" />
                  )}
                  <View className="flex-1">
                    <Text className="text-primary-950 font-medium mb-1">{ttFile.name}</Text>
                    {ttFile.uploading ? (
                      <>
                        <View className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mb-1">
                          <View style={{ width: `${ttFile.progress}%` }} className="h-1.5 bg-violet-500 rounded-full" />
                        </View>
                        <Text className="text-xs text-gray-500">
                          Subiendo... {ttFile.progress}% ({(ttFile.size * ttFile.progress / 100 / (1024 * 1024)).toFixed(1)} MB de {(ttFile.size / (1024 * 1024)).toFixed(1)} MB)
                        </Text>
                      </>
                    ) : (
                      <Text className="text-xs text-gray-500">
                        {(ttFile.size / (1024 * 1024)).toFixed(1)} MB
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => handleRemove('tt')} className="ml-2">
                    <Image 
                      source={require('../public/Icons/IconClose.png')}
                      className="w-5 h-5"
                      style={{ tintColor: '#9CA3AF' }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <PrimaryButton title="Subir estadísticas" variant="outline" onPress={() => handleUpload('tt')} />
            )}
            <BodyS className="text-xs text-gray-500 mb-2">Formatos: JPG/PNG/PDF. Hasta 5MB.</BodyS>
            <BodyMLink className='text-primary-700' onPress={() => setShowHowModal(true)}>
              ¿Cómo obtener tus estadísticas?
            </BodyMLink>
          </View>
        </View>
      </ScrollView>
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
              Queremos conocer mejor tu alcance para saber si tu perfil encaja con lo que esta campaña necesita. Así, desde Disker podemos tomar decisiones más justas y encontrar al creador ideal para cada proyecto.
                </BodyM>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal
        visible={showHowModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowHowModal(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <View className="flex-1 bg-black/40 justify-end">
            <View className="bg-white rounded-t-3xl px-6 py-8 w-full" style={{ minHeight: '60%', maxHeight: '90%' }}>
              <View className="flex-row justify-between items-center mb-6">
                <HeadingS className="text-xl font-bold text-primary-950">
                  ¿Cómo obtener tus estadísticas?
                </HeadingS>
                <TouchableOpacity onPress={() => setShowHowModal(false)} className="p-1">
                  <Image
                    source={require('../public/Icons/IconClose.png')}
                    className="w-6 h-6"
                    style={{ tintColor: '#000000' }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                <View className="mb-4">
                  {["Ingresá a tu perfil de Instagram", "Tocá 'Panel para profesionales'", "Seleccioná 'Total de seguidores'", "Hacé una captura de pantalla con las estadísticas que se muestran"].map((step, idx) => (
                    <View key={idx} className="flex-row items-start mb-2">
                      <View className="w-6 h-6 rounded-full bg-gray-100 items-center justify-center mr-2">
                        <Text className="text-primary-950 font-bold text-sm">{idx + 1}</Text>
                      </View>
                      <BodyM className="text-primary-950 flex-1">{step}</BodyM>
                    </View>
                  ))}
                </View>
                <View className="rounded-2xl overflow-hidden bg-gray-200 items-center justify-center">
                  <Image
                    source={{ uri: 'https://img.youtube.com/vi/2Vv-BfVoq4g/maxresdefault.jpg' }}
                    className="w-full h-60"
                    resizeMode="cover"
                  />
                  <View className="absolute inset-0 items-center justify-center">
                    <Image
                      source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_squircle_%282017%29.svg' }}
                      className="w-14 h-14 opacity-90"
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <View className="flex-row px-4 py-4 bg-white border-t border-gray-200">
        <View className="flex-1 mr-2">
          <PrimaryButton title="Completar después" />
        </View>
        <View className="flex-1">
          <PrimaryButton title="Enviar y postular" variant="dark" />
        </View>
      </View>
    </View>
  );
};
