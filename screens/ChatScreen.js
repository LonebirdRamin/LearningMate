import { SafeAreaView, Text } from "react-native";
import customStyles from "../styles/customStyles";

const ChatScreen = () => {
  return (
    <SafeAreaView style={[customStyles.pageBackground,{display:'flex',width:'100%',
    height:'100%',justifyContent:'center',alignItems:'center'}]}>
      <Text style={customStyles.h4}>Work in progress.</Text>
    </SafeAreaView>
  );
};
export default ChatScreen;
