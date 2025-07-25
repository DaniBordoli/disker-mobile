/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { AuthScreen, EmailScreen, NameScreen, PasswordScreen, AboutScreen, SocialMediaScreen, AccountCreatedScreen, HomeScreen } from './src/screens';
import './global.css';

type Screen = 'Auth' | 'Email' | 'Name' | 'Password' | 'About' | 'SocialMedia' | 'AccountCreated' | 'Home';

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Auth');

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  switch (currentScreen) {
    case 'Auth':
      return <AuthScreen onNavigate={navigate} />;
    case 'Email':
      return <EmailScreen onNavigate={navigate} />;
    case 'Name':
      return <NameScreen onNavigate={navigate} />;
    case 'Password':
      return <PasswordScreen onNavigate={navigate} />;
    case 'About':
      return <AboutScreen onNavigate={navigate} />;
    case 'SocialMedia':
      return <SocialMediaScreen onNavigate={navigate} />;
    case 'AccountCreated':
      return <AccountCreatedScreen onNavigate={navigate} />;
    case 'Home':
      return <HomeScreen onNavigate={navigate} />;
    default:
      return <AuthScreen onNavigate={navigate} />;
  }
}

export default App;
