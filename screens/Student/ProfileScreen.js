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

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const data = {
  id: 64070503433,
  eduLevel: "Bechelor's Degree",
  Faculty: "Engineering",
  Department: "Computer Engineering",
};

const grade = {
  last: 3.91,
  GPAX: 3.87,
};
const activity = {
  total: 59,
};

const prepData = Object.values(data);

const prepGrade = Object.values(grade);

const prepAct = Object.values(activity);
const activityKey = Object.keys(activity);

const ProfileScreen = ({ navigation }) => {
  const email = useContext(DataContext);
  const [isPerInfoIsLoading, setPerInfoIsLoading] = useState(false);
  const [isSumActLoading, setSumActLoading] = useState(false);
  const [isActListLoading, setActListLoading] = useState(false);

  const [perInfo, setPerInfo] = useState([]);
  const [sumAct, setSumAct] = useState({});
  const [actList, setActList] = useState([])

  useEffect(() => {
    getStudentPersonalInfo(email, setPerInfo, setPerInfoIsLoading);
    getActivitySummary(email, setSumAct, setSumActLoading)
    getActivityList(email, setActList, setActListLoading)
  }, []);

  
  
  return (
    <View style={[globleStyles.pageContainer]}>
      {isPerInfoIsLoading && isSumActLoading && isActListLoading? (
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
                {perInfo.student_name}
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
          <InfoBox
            header={"Personal Info"}
            data={perInfo}
            handlePress={() => {
              navigation.push("Personal Info");
            }}
          />
          <InfoBox
            header={"Grade Results"}
            data={prepGrade}
            handlePress={() => {
              navigation.push("GradeResult");
            }}
          />
          <InfoBox
            header={"Activity"}
            data={sumAct}
            id={activityKey}
            handlePress={() => {
              navigation.push("Activity", actList);
            }}
          />

          {/*End -  Info */}
        </ScrollView>
      )}
    </View>
  );
};

export default ProfileScreen;
