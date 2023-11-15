import React, { useContext } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globleStyles from "../styles/globleStyles";
import customStyles from "../styles/customStyles";
import profileStyles from "../styles/profileStyle";
import DataContext from "../routes/DataContext"
import AppButton from "../components/AppButton"
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const ProfileScreen = () => {
  const email = useContext(DataContext);
  return (
    <SafeAreaView style={globleStyles.pageContainer}>
      <ScrollView style={profileStyles.scrollContainer}>
        {/*Start - Profile and setting */}
        <View
          style={[
            customStyles.pageTitleContainer,
            profileStyles.headerContainer,
          ]}
        >
          <Text style={[customStyles.pageTitle]}>Profile</Text>

          <TouchableOpacity style={profileStyles.setting}>
            <Image source={require("../assets/icons/Profile/setting.png")} />
          </TouchableOpacity>
        </View>
        {/*End - Profile and setting */}

        {/*Start - Icon, details, edit */}
        <View style={profileStyles.picNameContainer}>
          <View style={{width: 100, height: 100, backgroundColor: 'white', borderRadius: 55}}/>
          <View style={profileStyles.nameEmail}>
            <Text style={profileStyles.text("white", width*0.045, "bold")}>Pannawat Durongrittichai</Text>
            <Text style={profileStyles.text("#A2A2B5", width*0.035, "400")}>{email}</Text>
          </View>  
          <AppButton text="Edit profile" textColor="white" style={{borderWidth: 0.5, borderColor: "rgba(78,78,97, 1)",selfAlign: 'center', paddingHorizontal: width*0.03, backgroundColor: 'rgba(78,78,97, 0.5)'} } height={height*0.045}/>
        </View>
        {/*End - Icon, details, edit */}

        {/*Start - Personal Info */}
        <View >
          <Text style={customStyles.h2}>
            Personal Info
          </Text>
        </View>
        {/*End - Personal Info */}


      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
