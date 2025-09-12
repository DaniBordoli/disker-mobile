import React, { useState } from 'react';
import { 
  View, 
  Image, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView,
  SafeAreaView,
  TextInput
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation';
import { HeadingM } from '../components/typography/Headings';
import { BodyS } from '../components/typography/BodyText';
import { PrimaryButton } from '../components/buttons/PrimaryButton';

type AddScriptScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddScript'>;
type AddScriptScreenRouteProp = RouteProp<RootStackParamList, 'AddScript'>;

export const AddScriptScreen: React.FC = () => {
  const navigation = useNavigation<AddScriptScreenNavigationProp>();
  const route = useRoute<AddScriptScreenRouteProp>();
  const [scriptText, setScriptText] = useState('');

  const handleSubmit = () => {
    
    console.log('Guión enviado:', scriptText);
    
   
    if (route.params?.onScriptSubmitted) {
      route.params.onScriptSubmitted();
    }
    
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

    
      <View className="px-4 pt-4 pb-2">
        <View className="flex-row items-center">
          <TouchableOpacity 
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4"
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={require('../public/Icons/IconGoback.png')}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <View className="flex-1">
            <HeadingM className="text-primary-950">Guión</HeadingM>
            <BodyS className="text-gray-500">Última edición hace 4 min</BodyS>
          </View>
        </View>
      </View>

      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="p-4 flex-1">
       
          <View className="mb-4">
            <HeadingM className="text-primary-950 mb-2">Hola a todos 👋</HeadingM>
          </View>

      
          <TextInput
            className="flex-1 text-primary-950 text-base leading-6"
            multiline
            textAlignVertical="top"
            placeholder="Hoy les quiero contar una noticia que nos tiene muy emocionados. Después de meses de trabajo, finalmente llegó el momento de mostrarles lo que preparamos.

Esta app está pensada para simplificarles el día a día: con un solo clic van a poder organizar sus tareas, conectarse con sus amigos y además..."
            placeholderTextColor="#888888"
            value={scriptText}
            onChangeText={setScriptText}
            style={{
              fontSize: 16,
              lineHeight: 24,
              minHeight: 400,
            }}
          />
        </View>

        
        <View className="p-4">
          <PrimaryButton
            title="Enviar guión"
            variant="dark"
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
