import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import FillBoxForm from "../uploadFileTeacher/FillBoxForm";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import InputFileLearning from "../uploadFileTeacher/InputFileLearning";
import SubmitAssignment from "../../backend/hooks/submitAssignment";
import getStudentPersonalInfo from "../../backend/hooks/getStudentPersonalInfo";
import queryAssignment from "../../backend/hooks/queryAssignmentStudent";
import getSubjectAssignmentID from "../../backend/hooks/getSubjectAssignmentID";
import SubmitFileStudent from "../../backend/hooks/submitFileStudent";

/*
  This component handles the submission form in student Learningzone 
*/

const MainStudentAssignment = ({
  setModalVisible,
  classID,
  email,
  assName,
  setIsLoading,
  setIsPosting,
}) => {
  const [description, setDescription] = useState("");
  const [isLoadingFunc, setIsLoadingFunc] = useState(false);
  const [file, setFile] = useState(null);
  const [insertData, setInsertData] = useState(null);
  const [perInfo, setPerInfo] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [assignmentData, setAssignmentData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileType = "Assignments";

  useEffect(() => {
    /* Start - Query to student personal info */
    getStudentPersonalInfo(email, setPerInfo, setIsLoadingFunc);
    /* End - Query to student personal info */

    /* Start - Query to get Assignment ID */
    getSubjectAssignmentID(
      assName,
      setAssignmentData,
      setIsLoadingFunc,
      setDescription
    );
    /* End - Query to get Assignment ID */
  }, []);

  /*Start - Change the date format */
  const changeFormatDate = (date) => {
    const formattedDate = new Date(date);
    return (
      formattedDate.toLocaleString("default", { year: "numeric" }) +
      "-" +
      formattedDate.toLocaleString("default", { month: "2-digit" }) +
      "-" +
      formattedDate.toLocaleString("default", { day: "2-digit" }) +
      " " +
      formattedDate.toLocaleTimeString("en-GB")
    );
  };
  /*End - Change the date format */

  useEffect(() => {
    if (insertData !== null) {
      // console.log("Insert Data: ");
      // console.log(insertData);
      SubmitAssignment(
        insertData,
        setModalVisible,
        setIsLoading,
        setDescription,
        setCurrentDate
      );
      SubmitFileStudent(
        classID,
        fileType,
        file,
        setUploading,
        setFile,
        assName,
        perInfo.student_id, //student ID
        setIsPosting
      );
    }
  }, [insertData]);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={formAssignmentStyles.text}>Description (optional)</Text>
      <TextInput
        style={[
          formAssignmentStyles.learningInput,
          { height: "60%", textAlignVertical: "top", paddingTop: "5%" },
        ]}
        inputMode="text"
        onChangeText={(text) => setDescription(text)}
      />
      <View
        style={{
          alignSelf: "flex-start",
          marginHorizontal: "5%",
        }}
      >
        <InputFileLearning setFile={setFile} />
      </View>
      <View style={[formAssignmentStyles.buttonMain, { width: "65%" }]}>
        <TouchableOpacity
          style={formAssignmentStyles.confirmButton}
          onPress={() => {
            setInsertData({
              student_id: perInfo.student_id,
              assID: assignmentData.assignment_id,
              formattedCurrentDate: changeFormatDate(currentDate),
              formattedDueDate: changeFormatDate(
                assignmentData.assignment_due_date
              ),
            });
            setModalVisible(false);
          }}
        >
          <Text style={formAssignmentStyles.buttonStyle}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainStudentAssignment;
