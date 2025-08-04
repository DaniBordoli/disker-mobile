import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation';
import { HeadingM, HeadingS } from '../components/typography/Headings';
import { BodyM, BodyS } from '../components/typography/BodyText';
import { ChatBubble } from '../components/chat/ChatBubble';
import { MessageTextBox } from '../components/chat/MessageTextBox';
import { DateSeparator } from '../components/chat/DateSeparator';

type MessageDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MessageDetail'>;
type MessageDetailScreenRouteProp = RouteProp<RootStackParamList, 'MessageDetail'>;

const MessageDetailScreen: React.FC = () => {
  const navigation = useNavigation<MessageDetailScreenNavigationProp>();
  const route = useRoute<MessageDetailScreenRouteProp>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  
  const { messageId, brand } = route.params;

  useEffect(() => {
   
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
    
      <View className="px-6 pt-4 pb-4 bg-white border-b border-gray-100">
        <View className="flex-row items-start justify-between">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="w-10 h-10 bg-white border border-primary-200 rounded-full items-center justify-center"
          >
            <Image 
              source={require('../public/Icons/IconGoback.png')} 
              className="w-5 h-5" 
              style={{ tintColor: '#191919' }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <View className="flex-1 ml-4">
            <HeadingM className="text-primary-950">{brand}</HeadingM>
            <BodyS className="text-gray-500">ID: {messageId}</BodyS>
          </View>
          
          <TouchableOpacity 
            className="w-10 h-10 bg-white border border-primary-200 rounded-full items-center justify-center"
            onPress={() => setShowOptionsModal(true)}
          >
            <Image 
              source={require('../public/Icons/IconDotsVertical.png')} 
              className="w-6 h-6" 
              style={{ tintColor: '#191919' }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      
      <ScrollView 
        ref={scrollViewRef}
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-4">
             <ChatBubble 
            message="Subido. Te dejo la previsualización del layout también."
            time="10:10"
            isOwnMessage={true}
          />
          <ChatBubble 
            message="Sí, así ya la dejamos lista para programación."
            time="10:08"
            isOwnMessage={false}
          />
          
          <ChatBubble 
            message="Subido. Te dejo la previsualización del layout también."
            time="10:10"
            isOwnMessage={true}
          />
          
          <ChatBubble 
            message="Está buenísimo, ¡gracias!"
            time="10:12"
            isOwnMessage={false}
          />
          
          <ChatBubble 
            message="Vi esta referencia y pensé que puede servirnos para la próxima campaña"
            time="17:15"
            isOwnMessage={true}
            attachedImage={require('../public/MessageIcons/imageProvisionalChat.png')}
          />
          
          <DateSeparator date="24 de mayo" />
          
          <ChatBubble 
            message="Sí, esa onda va perfecto con lo que buscamos."
            time="10:12"
            isOwnMessage={false}
          />
        </View>
      </ScrollView>

     
      <MessageTextBox 
        onSendMessage={(message) => console.log('Sending message:', message)}
        onAttachFile={() => console.log('Attach file')}
        onStartRecording={() => console.log('Start recording')}
      />

      
      <Modal
        visible={showOptionsModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowOptionsModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <View className="flex-1 bg-black/40 justify-end">
            <View className="bg-white rounded-t-3xl px-6 py-8 w-full" style={{ minHeight: '58%', maxHeight: '60%' }}>
              <View className="flex-row justify-between items-center mb-6">
                <View className="flex-row items-center flex-1">
                  <Image
                    source={require('../public/Icons/NikeLogo.png')}
                    className="w-9 h-9 mr-3"
                    resizeMode="contain"
                  />
                  <View>
                    <HeadingS className="text-xl font-bold text-primary-950">
                      {brand}
                    </HeadingS>
                    <BodyS className="text-gray-500">ID: {messageId}</BodyS>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setShowOptionsModal(false)} className="p-1">
                  <Image
                    source={require('../public/Icons/IconClose.png')}
                    className="w-4 h-4"
                    style={{ tintColor: '#000000' }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              
              <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                <View className="bg-white">
                  <TouchableOpacity className="flex-row items-center py-6 border-b border-primary-100">
                    <Image 
                      source={require('../public/ProfileScreenIcons/IconDocument.png')} 
                      className="w-6 h-6 mr-4" 
                      style={{ tintColor: '#191919' }} 
                    />
                    <BodyM className="flex-1 text-lg text-gray-900">Ver campaña</BodyM>
                    <Image 
                      source={require('../public/Icons/IconChevronRight.png')} 
                      className="w-7 h-7" 
                      style={{ tintColor: '#191919' }} 
                    />
                  </TouchableOpacity>
                  
                  <TouchableOpacity className="flex-row items-center py-6 border-b border-primary-100">
                    <Image 
                      source={require('../public/Icons/IconEnvelope.png')} 
                      className="w-6 h-6 mr-4" 
                      style={{ tintColor: '#191919' }} 
                    />
                    <BodyM className="flex-1 text-lg text-gray-900">Marcar como leída</BodyM>
                  </TouchableOpacity>
                  
                  <TouchableOpacity className="flex-row items-center py-6 border-b border-primary-100">
                    <Image 
                      source={require('../public/Icons/IconStarNoFilled.png')} 
                      className="w-6 h-6 mr-4" 
                      style={{ tintColor: '#191919' }} 
                    />
                    <BodyM className="flex-1 text-lg text-gray-900">Marcar como favorito</BodyM>
                  </TouchableOpacity>
                  
                  <TouchableOpacity className="flex-row items-center py-6 border-b border-primary-100">
                    <Image 
                      source={require('../public/Icons/IconBox.png')} 
                      className="w-6 h-6 mr-4" 
                      style={{ tintColor: '#191919' }} 
                    />
                    <BodyM className="flex-1 text-lg text-gray-900">Archivar</BodyM>
                  </TouchableOpacity>
                  
                  <TouchableOpacity className="flex-row items-center py-6">
                    <Image 
                      source={require('../public/Icons/IconBellSlash.png')} 
                      className="w-6 h-6 mr-4" 
                      style={{ tintColor: '#191919' }} 
                    />
                    <BodyM className="flex-1 text-lg text-gray-900">Silenciar conversación</BodyM>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default MessageDetailScreen;
