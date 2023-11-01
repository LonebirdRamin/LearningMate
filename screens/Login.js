import { View, Text, Image, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globleStyles from "../styles/globleStyles";
import loginStyles from "../styles/loginStyle";
import LoginHeader from "../components/Login/LoginHeader";
import FormText from "../components/FormText";
import { TouchableOpacity } from "react-native";
import AppButton from "../components/AppButton";
const Login = () => {
  return (
    <SafeAreaView style={globleStyles.pageContainer}>
      <LoginHeader text="Login" />

      <View style={loginStyles.formContainer}>
        <View style={loginStyles.upperForm}>
          <FormText text="Email address" type='email'/>
          <FormText text="Password" protect={true} />
        </View>

        <View style={loginStyles.lowerForm}>
          <TouchableOpacity style={{alignSelf: 'flex-end'}}>
            <Text style={{ color: "#666680", textAlign: "right" }}>
              Forget Password
            </Text>
          </TouchableOpacity>

          <AppButton text="Login" bgColor="#F04E22" textColor="white" height={55}/>

          <TouchableOpacity style={{alignSelf: 'flex-end'}}>
            <Text style={{ color: "white", textAlign: "right" }}>
              Do not have an account yet? Register
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Login;
