import { View, Text, Image, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globleStyles from "../styles/globleStyles";
import loginStyles from "../styles/loginStyles";
import LogoHeader from "../components/Login/LogoHeader";
import FormText from "../components/FormText";
import { TouchableOpacity } from "react-native";
import AppButton from "../components/AppButton";
import { StackActions } from "@react-navigation/routers";

const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={globleStyles.pageContainer}>
      <LogoHeader text="Login" />

      <View style={loginStyles.formContainer}>
        <View style={loginStyles.upperForm}>
          <FormText text="Email address" type="email" />
          <FormText text="Password" protect={true} />
        </View>

        <View style={loginStyles.lowerForm}>
          <TouchableOpacity style={{ alignSelf: "flex-end" }}>
            <Text style={{ color: "#666680", textAlign: "right" }}>
              Forget Password
            </Text>
          </TouchableOpacity>

          <AppButton text="Login" textColor="white" height={55} />

          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => {
              navigation.dispatch(StackActions.replace("Register"));
            }}
          >
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
