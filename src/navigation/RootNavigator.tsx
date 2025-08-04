import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  AuthScreen, 
  EmailScreen, 
  NameScreen, 
  PasswordScreen, 
  AboutScreen, 
  SocialMediaScreen, 
  AccountCreatedScreen, 
  HomeScreen, 
  CampaignDetailScreen, 
  ProfileScreen, 
  AddPaymentMethodScreen 
} from '../screens';
import { AudienceStatsScreen } from '../screens/AudienceStatsScreen';
import { CampaignIdeaScreen } from '../screens/CampaignIdeaScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import SocialMediaProfileScreen from '../screens/SocialMediaProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MessageDetailScreen from '../screens/MessageDetailScreen';
import PaypalScreen from '../screens/PaypalScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="SocialMedia" component={SocialMediaScreen} />
      <Stack.Screen name="AccountCreated" component={AccountCreatedScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CampaignDetail" component={CampaignDetailScreen} />
      <Stack.Screen name="CampaignIdeaScreen" component={CampaignIdeaScreen} />
      <Stack.Screen name="AudienceStats" component={AudienceStatsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="SocialMediaProfile" component={SocialMediaProfileScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="MessageDetail" component={MessageDetailScreen} />
      <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethodScreen} />
      <Stack.Screen name="Paypal" component={PaypalScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
    </Stack.Navigator>
  );
};
