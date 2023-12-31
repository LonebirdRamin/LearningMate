import {
  View,
  Text,
  Image,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globleStyles from "../styles/globleStyles";
import loginStyles from "../styles/loginStyles";
import LogoHeader from "../components/Login/LogoHeader";
import FormText from "../components/FormText";
import { TouchableOpacity } from "react-native";
import { StackActions } from "@react-navigation/routers";
import AppButton from "../components/AppButton";
import signIn from "../backend/hooks/signIn";
/*
  A screen for user to login to the system.
*/
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoad = (state) => {
    setIsLoading(state);
  };
  const handleEmail = (value) => {
    setEmail(value);
  };
  const handlePass = (value) => {
    setPassword(value);
  };

  // Change page with passing value across routes
  const changePage = (value, email) => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: value,
          params: { email: email },
          state: {
            index: 0,
            routes: [
              {
                name: "HomeNoti",
              },
            ],
          },
        },
      ],
    });
  };

  return (
    <SafeAreaView style={globleStyles.pageContainer}>
      <LogoHeader text="Login" />

      <View style={loginStyles.formContainer}>
        {isLoading ? (
          <View style={globleStyles.loading}>
            <ActivityIndicator size={100} color="#F04E22" />
          </View>
        ) : (
          <View>
            <View style={loginStyles.upperForm}>
              <FormText
                text="Email address"
                type="email"
                display={email}
                formChange={handleEmail}
              />
              <FormText
                text="Password"
                protect={true}
                display={password}
                formChange={handlePass}
              />
            </View>

            <View style={loginStyles.lowerForm}>

              <AppButton
                text="Login"
                textColor="white"
                height={55}
                handlePress={() => {
                  if (email === "" && password === "") {
                    Alert.alert(
                      "Login",
                      "Please fill in your email and password",
                      [{ text: "Ok" }],
                    );
                  } else if (password === "") {
                    Alert.alert("Login", "Please fill in your password", [
                      { text: "Ok" },
                    ]);
                  } else if (email === "") {
                    Alert.alert("Login", "Please fill in your email", [
                      { text: "Ok" },
                    ]);
                  } else {
                    signIn(email, password, changePage, handleLoad);
                  }
                }}
              />

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
        )}
      </View>
    </SafeAreaView>
  );
};

export default Login;
