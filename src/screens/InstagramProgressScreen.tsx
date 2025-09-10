import React, { useState } from 'react';
import { 
  View, 
  Image, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView,
  SafeAreaView,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { HeadingS } from '../components/typography/Headings';
import { BodyS } from '../components/typography/BodyText';
import { AudienceStatsFile } from '../types/audienceStats';
import { 
  ScriptSection, 
  VideoSection, 
  VideoHDSection, 
  LinkSection, 
  MetricsSection, 
  LinkUploadModal 
} from '../components/instagram';

type InstagramProgressScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'InstagramProgress'>;

export const InstagramProgressScreen: React.FC = () => {
  const navigation = useNavigation<InstagramProgressScreenNavigationProp>();
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [videoHDUploaded, setVideoHDUploaded] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUploaded, setLinkUploaded] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [metricsFile, setMetricsFile] = useState<AudienceStatsFile | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const shouldShow = scrollY > 100;
    
    if (shouldShow !== showStickyHeader) {
      setShowStickyHeader(shouldShow);
      
      Animated.timing(fadeAnim, {
        toValue: shouldShow ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleMetricsUpload = () => {
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
    setMetricsFile(fakeFile);
    
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.floor(Math.random() * 15 + 5); 
      if (prog >= 100) {
        prog = 100;
        setMetricsFile(f => f && { ...f, progress: 100, uploading: false, completed: true });
        clearInterval(interval);
      } else {
        setMetricsFile(f => f && { ...f, progress: prog });
      }
    }, 200);
  };

  const handleMetricsRemove = () => {
    setMetricsFile(null);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#99003F' }}>
      <StatusBar barStyle="light-content" backgroundColor="#99003F" />

      {/* Sticky Header */}
      <Animated.View 
        className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 z-50"
        style={{ 
          opacity: fadeAnim,
          pointerEvents: showStickyHeader ? 'auto' : 'none'
        }}
      >
        <View className="flex-row justify-between items-center px-4 py-3">
          <TouchableOpacity 
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={require('../public/Icons/IconGoback.png')}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <View className="flex-1 mx-4 items-center">
            <HeadingS className="text-primary-950">Reel 1</HeadingS>
            <BodyS className="text-gray-500">Vence en 15 días</BodyS>
          </View>
          
          <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
            <Image 
              source={require('../public/Icons/IconShare.png')}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header Section */}
        <View className="pb-6 relative" style={{ backgroundColor: '#99003F' }}>
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
              backgroundColor: '#FF0069'
            }}
          >
            <Image
              source={require('../public/Icons/InstagramRoundedColorless.png')}
              className="w-10 h-10"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Content Section */}
        <View className="flex-1">

 
          <View className="bg-white rounded-t-3xl p-4 flex-1" style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 40 }}>
            {/* Title - Centrado debajo del icono */}
            <View className="items-center mb-6">
              <HeadingS className="text-primary-950 mb-1">Reel 1</HeadingS>
              <BodyS className="text-gray-500">Vence en 15 días</BodyS>
            </View>

   
            <View className="relative">
        
              <View 
                className="absolute left-1/2 bg-gray-200"
                style={{
                  width: 1,
                  top: 0,
                  bottom: 0,
                  marginLeft: -0.5 
                }}
              />

         
              <ScriptSection />
              
              <VideoSection />

              
              <VideoHDSection 
                videoHDUploaded={videoHDUploaded}
                onUpload={() => setVideoHDUploaded(true)}
                onRemove={() => setVideoHDUploaded(false)}
              />

              <LinkSection 
                linkUploaded={linkUploaded}
                linkText={linkText}
                onShowModal={() => setShowLinkModal(true)}
              />

              <MetricsSection 
                metricsFile={metricsFile}
                onUpload={handleMetricsUpload}
                onRemove={handleMetricsRemove}
              />

          
            </View>
          </View>
        </View>
      </ScrollView>

      <LinkUploadModal
        visible={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        linkText={linkText}
        onLinkTextChange={setLinkText}
        onSubmit={() => {
          if (linkText.trim()) {
            setLinkUploaded(true);
            setShowLinkModal(false);
          }
        }}
      />
    </SafeAreaView>
  );
};
