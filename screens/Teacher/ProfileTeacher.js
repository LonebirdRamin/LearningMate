import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globleStyles from "../../styles/globleStyles";
import customStyles from "../../styles/customStyles";
import profileStyles from "../../styles/profileStyle";
import DataContext from "../../routes/DataContext";
import AppButton from "../../components/AppButton";
import InfoBox from "../../components/Profile/InfoBox";
import uuid from "react-native-uuid";
import getStudentPersonalInfo from "../../backend/hooks/getStudentPersonalInfo";
import getActivitySummary from "../../backend/hooks/getActivitySummary";
import getActivityList from "../../backend/hooks/getActivityList";
import InfoBoxTeacher from "../../components/Profile/InfoBoxTeacher";
import getTeacherPersonalInfo from "../../backend/hooks/getTeacherPersonalInfo";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
  
  

const ProfileTeacher = ({navigation}) => {
const email = useContext(DataContext);
  const [isPerInfoIsLoading, setPerInfoIsLoading] = useState(false);
  const [perInfo, setPerInfo] = useState([]);

  useEffect(
    ()=>{
      getTeacherPersonalInfo(email, setPerInfo, setPerInfoIsLoading)
    }
    ,[])
  

  return (
    <View style={[globleStyles.pageContainer]}>
      {isPerInfoIsLoading ? (
        <View style={globleStyles.loadingFull}>
          <ActivityIndicator size={100} color="#F04E22"/>
        </View>
      ) : (
        <ScrollView style={profileStyles.scrollContainer}>
          {/*Start - Icon, details, edit */}
          <View style={profileStyles.picNameContainer}>
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: "white",
                borderRadius: 55,
              }}
            />
            <View style={profileStyles.nameEmail}>
              <Text style={profileStyles.text("white", width * 0.045, "bold")}>
                {perInfo.teacher_name}
              </Text>
              <Text style={profileStyles.text("#A2A2B5", width * 0.035, "400")}>
                {email}
              </Text>
            </View>
            <AppButton
              text="Edit profile"
              textColor="white"
              style={{
                borderWidth: 0.5,
                borderColor: "rgba(78,78,97, 1)",
                selfAlign: "center",
                paddingHorizontal: width * 0.03,
                backgroundColor: "rgba(78,78,97, 0.5)",
              }}
              height={height * 0.045}
            />
          </View>
          {/*End - Icon, details, edit */}

          {/*Start - Info */}
          <InfoBoxTeacher
            header={"Personal Info"}
            data={perInfo}
            handlePress={() => {
              navigation.push("Personal Info");
            }}
          />
          {/*End -  Info */}
        </ScrollView>
      )}
    </View>
  )
}

export default ProfileTeacher