import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Divider } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Temperature from './components/temperature/Temperature';
import AppInfo from './components/appinfo/AppInfo';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'NORTH CORE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Divider style={styles.divider} />
        <Temperature></Temperature>
        <Divider style={styles.divider} />
        <AppInfo></AppInfo>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  divider: {
    backgroundColor: '#eee',
    height: 20
  }
});