import { View, Text, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globleStyles from "../styles/globleStyles";
import LogoHeader from "../components/Login/LogoHeader";
import registerStyles from "../styles/registerStyles";
import FormText from "../components/FormText";
import AppButton from "../components/AppButton";
import { StackActions } from "@react-navigation/routers";
import ConfirmModal from "../components/Register/ConfirmModal";
const Register = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={globleStyles.pageContainer}>
      <LogoHeader text="Register" />
      <View style={registerStyles.formContainer}>
        <View style={registerStyles.upperForm}>
          <FormText text="Email address" />
          <FormText text="Password" protect={true} />
          <FormText text="Confirm password" protect={true} />
        </View>
        <View style={registerStyles.lowerForm}>
          <AppButton textColor="white" height={55} text="Register" handlePress={toggleModal}/>
          <View style={registerStyles.haveAccount}>
            
              <Text style={{color: 'white', textAlign: 'center'}}>Do you already have an account?</Text>
            
            <AppButton
              textColor="white"
              bgColor={false}
              height={55}
              text="Login"
              handlePress={()=>{
                navigation.dispatch(StackActions.replace("Login"));
              }}
              
            />
          </View>
        </View>
      </View>
      <ConfirmModal isModalVisible={isModalVisible} toggleModal={toggleModal} setModalVisible={setModalVisible}/>
    </SafeAreaView>
  );
};

export default Register;
