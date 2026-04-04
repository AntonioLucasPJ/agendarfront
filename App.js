import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import { TelaHome } from './src/screens/Home/index.jsx';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Calendary } from './src/screens/Calendary/index.jsx';
import { Perfil } from './src/screens/Perfil/index.jsx';
import { Main } from './src/screens/main/index.jsx';
import { Service } from './src/screens/Service/index.jsx';
import { Schedule } from './src/screens/agendamento/index.jsx';
export default function App() {
  return (
    <Schedule></Schedule>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',

  },
});
