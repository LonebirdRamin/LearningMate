import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import globleStyles from '../styles/globleStyles';
import SettingBox from '../components/Setting/SettingBox';
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const menu = ["Change Language", "Notification Setting", "Help", "Log out"]

const auth = getAuth();

const logout = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    // navigate to login page
  }).catch((error) => {
    // An error happened.
  });
}



const Setting = ({navigation}) => {
  return (
    <View style={[globleStyles.pageContainer, {paddingTop: height*0.05, paddingHorizontal: width*0.09,}]}>
        <SettingBox menu={menu} navigation={navigation}/>
    </View>
  )
}

export default Setting