import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
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
import signUp from "../backend/hooks/signUp";

const Register = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPass, setConPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const handleLoad = (state) => {
    setIsLoading(state);
  };
  const handleEmail = (value) => {
    setEmail(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleConPass = (value) => {
    setConPass(value);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
      <LogoHeader text="Register" />
      <View style={registerStyles.formContainer}>
        {isLoading ? (
          <View style={[globleStyles.loading, { height: "80%" }]}>
            <ActivityIndicator size={100} color="#F04E22" />
          </View>
        ) : (
          <View style={{ height: "100%" }}>
            <View style={registerStyles.upperForm}>
              <FormText
                text="Email address"
                formChange={handleEmail}
                type="email"
              />
              <View>
                <FormText
                  text="Password (At least 6 letters)"
                  protect={true}
                  formChange={handlePassword}
                />
              </View>
              <FormText
                text="Confirm password"
                protect={true}
                formChange={handleConPass}
              />
            </View>
            <View style={registerStyles.lowerForm}>
              <AppButton
                textColor="white"
                height={55}
                text="Register"
                handlePress={() => {
                  // อย่าลืมเรื่อง email ใช้แล้ว
                  // รูปแบบ email password
                  if (email === "" && password === "" && conPass === "") {
                    Alert.alert("Register", "Please fill in the form", [
                      { text: "Ok" },
                    ]);
                  } else if (email === "") {
                    Alert.alert("Register", "Please fill in email", [
                      { text: "Ok" },
                    ]);
                  } else if (password === "" || conPass === "") {
                    Alert.alert("Register", "Please fill in password", [
                      { text: "Ok" },
                    ]);
                  } else if (password.length < 6) {
                    Alert.alert(
                      "Register",
                      "Password should contain at least 6 letters",
                      [{ text: "Ok" }]
                    );
                  } else if (password !== conPass) {
                    Alert.alert("Register", "Password is not the same", [
                      { text: "Ok" },
                    ]);
                  } else {
                    setModalVisible(true);
                  }
                }}
              />
              <View style={registerStyles.haveAccount}>
                <Text style={{ color: "white", textAlign: "center" }}>
                  Do you already have an account?
                </Text>

                <AppButton
                  textColor="white"
                  bgColor={false}
                  height={55}
                  text="Login"
                  handlePress={() => {
                    navigation.dispatch(StackActions.replace("Login"));
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </View>

      <ConfirmModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        setModalVisible={setModalVisible}
        handleDecline={() => {
          setModalVisible(false);
        }}
        handleConfirm={() => {
          signUp(email, password, changePage, handleLoad, setModalVisible);
        }}
      />
    </SafeAreaView>
  );
};

export default Register;
