import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AuthProvider } from './app/context/AuthContext';
import Navigation from './app/navigation/Navigation';
import { MusicStates } from './app/context/MusicContext/MusicStates';


export default function App() {
  return (
    <AuthProvider>
      <MusicStates>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </MusicStates>

    </AuthProvider>
  );
}
