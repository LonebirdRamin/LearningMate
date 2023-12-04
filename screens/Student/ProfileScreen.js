import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
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
import queryGrade from "../../backend/hooks/queryGrade";
import getCurrentSemStudent from "../../backend/hooks/getCurrentSemStudent";
import getSemesterYear from "../../backend/hooks/getSemesterYear";
import loadProfilePic from "../../backend/hooks/loadProfilePic";
import changeProfilePicture from "../../backend/hooks/changeProfilePicture";
import pickFile from "../../backend/hooks/pickFile";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
/*
  A screen used to show the student picture, information, grade, and activity.
*/
const ProfileScreen = ({ navigation }) => {
  const email = useContext(DataContext);
  let prevSem;
  let gradeListPrev = [];
  const [isPerInfoIsLoading, setPerInfoIsLoading] = useState(false);
  const [isSumActLoading, setSumActLoading] = useState(false);
  const [isActListLoading, setActListLoading] = useState(false);
  const [isGradeListLoading, setGradeListLoading] = useState(false);
  const [isCurrentSemLoading, setCurrentSemLoading] = useState(false);
  const [isSemYearLoading, setSemYearLoading] = useState(false);
  const [isPicLoading, setIsPicLoading] = useState(true);
  const [perInfo, setPerInfo] = useState({});
  const [prepPerInfo, setPrepPerInfo] = useState([]);
  const [prepPerInfoDetail, setPerInfoDetail] = useState([]);
  const [sumAct, setSumAct] = useState({});
  const [actList, setActList] = useState([]);
  const [gradeList, setGradeList] = useState([]);
  const [gpax, setGpax] = useState("-");
  const [currentSem, setCurrentSem] = useState();
  const [lastSemGrade, setLastSemGrade] = useState("-");
  const [semYear, setSemYear] = useState([]);
  const [picUrl, setPicUrl] = useState();
  const [file, setFile] = useState();
  const [profilePicSuccess, setProfilePicSuccess] = useState(false);
  const calculateAverage = (grades) => {
    // Implement your GPA calculation logic here
    // Assuming grades have a numeric value, you can calculate the average
    const totalCredits = grades.reduce(
      (total, grade) => total + parseFloat(grade.class_credit),
      0
    );
    const totalGradePoints = grades.reduce(
      (total, grade) =>
        total + parseFloat(grade.grade) * parseFloat(grade.class_credit),
      0
    );

    const average = totalGradePoints / totalCredits;
    return average.toFixed(3); // Round to two decimal places
  };
  useEffect(() => {
    getStudentPersonalInfo(email, setPerInfo, setPerInfoIsLoading);
    getActivitySummary(email, setSumAct, setSumActLoading);
    getActivityList(email, setActList, setActListLoading);
    queryGrade(email, setGradeList, setGradeListLoading);
    getCurrentSemStudent(email, setCurrentSem, setCurrentSemLoading);
    getSemesterYear(email, setSemYear, setSemYearLoading);
  }, []);

  useEffect(() => {
    loadProfilePic(
      setPicUrl,
      `users/student/${perInfo.student_id}`,
      setIsPicLoading
    );
  }, [perInfo]);

  useEffect(() => {
    setGpax(calculateAverage(gradeList).slice(0, 4));
  }, [gradeList]);

  useEffect(() => {
    if (currentSem !== undefined) {
      if (currentSem.class_period_semester === "1") {
        prevSem = {
          class_period_semester: "2",
          class_period_year: currentSem.class_period_year - 1,
        };
      } else {
        prevSem = {
          class_period_semester: "1",
          class_period_year: currentSem.class_period_year,
        };
      }
      gradeListPrev = gradeList.filter((item) => {
        return (
          item.class_period_semester === prevSem.class_period_semester &&
          item.class_period_year === prevSem.class_period_year
        );
      });
      if (gradeListPrev.length == 0) {
        setLastSemGrade(calculateAverage(gradeList).slice(0, 4));
      } else {
        setLastSemGrade(calculateAverage(gradeListPrev).slice(0, 4));
      }
    }
  }, [currentSem, gradeList]);

  useEffect(() => {
    let {
      student_name,
      student_id,
      gender,
      academic_year,
      room,
      degree_name,
      date_of_birth,
      teacher_name,
      id_card,
      personal_email,
      faculty_name,
      department_name,
    } = perInfo;
    setPrepPerInfo([
      student_name,
      student_id,
      degree_name,
      faculty_name,
      department_name,
    ]);
    setPerInfoDetail([
      student_id,
      student_name,
      gender,
      academic_year,
      room,
      faculty_name,
      department_name,
      degree_name,
      new Date(date_of_birth).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      teacher_name,
      id_card,
      email,
      personal_email,
    ]);
  }, [perInfo]);

  return (
    <View style={[globleStyles.pageContainer]}>
      {isPerInfoIsLoading ||
      isSumActLoading ||
      isActListLoading ||
      isGradeListLoading ||
      isCurrentSemLoading ||
      isSemYearLoading ||
      isPicLoading ? (
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
                    "student",
                    perInfo?.student_id,
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
                {prepPerInfo[0]}
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
          <InfoBox
            header={"Personal Info"}
            data={prepPerInfo}
            handlePress={() => {
              navigation.push("Personal Info", prepPerInfoDetail);
            }}
          />
          <InfoBox
            header={"Grade Results"}
            data={[lastSemGrade, gpax]}
            handlePress={() => {
              navigation.push("GradeResult", [
                gradeList,
                currentSem,
                gpax,
                semYear,
              ]);
            }}
          />
          <InfoBox
            header={"Activity"}
            data={sumAct}
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
