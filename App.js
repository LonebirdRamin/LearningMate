import { StyleSheet, Text, View } from 'react-native';
import Homepage from './screens/Homepage';
import { SafeAreaView } from 'react-native-safe-area-context';
import customStyles from './styles/customStyles';

export default function App() {
  return (
    <SafeAreaView style={customStyles.pageBackground}>
      <Homepage></Homepage>
    </SafeAreaView>
  );
}
