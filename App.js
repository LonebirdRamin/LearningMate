import { StyleSheet, Text, View } from "react-native";
import Homepage from "./screens/Homepage";
import { SafeAreaView } from "react-native-safe-area-context";
import customStyles from "./styles/customStyles";
import NavigationBar from "./components/NavigationBar";
import { AddAssignmentButton } from "./components/AddAssignmentButton";

export default function App() {
  return (
    <SafeAreaView style={{width: '100%',height: '100%'}}>
      <NavigationBar />
    </SafeAreaView>
  );
}
