import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './Navigation';
import {Colors} from './assets/Stylesheet';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: Colors.purple}}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
