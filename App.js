import { StyleSheet, Text, View } from "react-native";
import LandingStack from "./routes/LandingStack";
import ConfirmModal from "./components/Register/ConfirmModal";
import { SafeAreaView } from "react-native-safe-area-context";
import customStyles from "./styles/customStyles";
import Homepage from "./screens/Homepage";
import { LogBox } from "react-native";

export default function App() {
  return <LandingStack />;

  {
    LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
    /*<SafeAreaView style={customStyles.pageBackground}>
    <Homepage></Homepage>
  </SafeAreaView>*/
  }
}
