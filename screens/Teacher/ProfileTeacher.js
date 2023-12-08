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
import InfoBoxTeacher from "../../components/Profile/InfoBoxTeacher";
import getTeacherPersonalInfo from "../../backend/hooks/getTeacherPersonalInfo";
import loadProfilePic from "../../backend/hooks/loadProfilePic";
import pickFile from "../../backend/hooks/pickFile";
import changeProfilePicture from "../../backend/hooks/changeProfilePicture";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
/*
  A screen used to show the teahcer picture and information.
*/
const ProfileTeacher = ({ navigation }) => {
  const email = useContext(DataContext);
  const [isPerInfoIsLoading, setPerInfoIsLoading] = useState(false);
  const [perInfo, setPerInfo] = useState([]);
  const [prepPerInfo, setPrepPerInfo] = useState([]);
  const [prepPerInfoDetail, setPrepPerInfoDetail] = useState([]);
  const [picUrl, setPicUrl] = useState();
  const [isPicLoading, setIsPicLoading] = useState(true);
  const [file, setFile] = useState();
  const [profilePicSuccess, setProfilePicSuccess] = useState(false);
  useEffect(() => {
    getTeacherPersonalInfo(email, setPerInfo, setPerInfoIsLoading);
  }, []);

  useEffect(() => {
    let {
      teacher_id,
      faculty_name,
      department_name,
      date_of_birth,
      gender,
      id_card,
      personal_email,
      teacher_name,
    } = perInfo;
    setPrepPerInfo([teacher_id, faculty_name, department_name]);
    setPrepPerInfoDetail([
      teacher_id,
      teacher_name,
      gender,
      faculty_name,
      department_name,
      new Date(date_of_birth).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      id_card,
      personal_email,
      email,
    ]);
    loadProfilePic(
      setPicUrl,
      `users/teacher/${perInfo.teacher_id}`,
      setIsPicLoading
    );
  }, [perInfo]);

  useEffect(()=>{console.log(file)},[file])
  return (
    <View style={[globleStyles.pageContainer]}>
      {isPerInfoIsLoading || isPicLoading? (
        <View style={globleStyles.loadingFull}>
          <ActivityIndicator size={100} color="#F04E22" />
        </View>
      ) : (
        <ScrollView style={profileStyles.scrollContainer}>
          {/*Start - Icon, details, edit */}
          <View style={profileStyles.picNameContainer}>
            {isPicLoading ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <View>
                {(picUrl === undefined)&&!file ? (
                  <Image
                    resizeMode={"contain"}
                    source={require("../../assets/icons/Profile/user.png")}
                    style={{
                      borderRadius: width,
                      width: width * 0.27,
                      height: width * 0.27,
                    }}
                  />
                ) : file?.assets &&
                  file?.assets.length > 0 &&
                  file?.assets[0].mimeType.startsWith("image/") ? (
                  <Image
                    source={{ uri: file?.assets[0].uri }}
                    style={{
                      width: width * 0.27,
                      borderRadius: width,
                      height: width * 0.27,
                    }}
                  />
                ) : (
                  <Image
                    resizeMode={"contain"}
                    source={{
                      uri: picUrl?.downloadURL,
                      width: width * 0.27,
                      height: width * 0.27,
                    }}
                    style={{ borderRadius: width }}
                  />
                )}
              </View>
            )}

            {file && profilePicSuccess ? (
              <TouchableOpacity
                style={[
                  {
                    backgroundColor: "#5C90D2",
                    paddingVertical: height * 0.01,
                    paddingHorizontal: width * 0.03,
                    borderRadius: 999,
                  },
                ]}
                onPress={() => {
                  changeProfilePicture(
                    "teacher",
                    perInfo?.teacher_id,
                    file,
                    setFile,
                    setProfilePicSuccess,
                    setIsPicLoading
                  );
                }}
              >
                <Text style={[customStyles.h1, { color: "white" }]}>
                  Save Change
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
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
              handlePress={() => {
                pickFile(setFile, false, setProfilePicSuccess);
              }}
            />
          </View>
          {/*End - Icon, details, edit */}

          {/*Start - Info */}
          <InfoBoxTeacher
            header={"Personal Info"}
            data={prepPerInfo}
            handlePress={() => {
              navigation.push("Personal Info", prepPerInfoDetail);
            }}
          />
          {/*End -  Info */}
        </ScrollView>
      )}
    </View>
  );
};

export default ProfileTeacher;
