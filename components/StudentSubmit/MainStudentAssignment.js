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
const email = "pannawat.duro@kmutt.ac.th";

//Need email, setModalVisible, classID, assignmentName
const MainStudentAssignment = ({ setModalVisible }) => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [insertData, setInsertData] = useState(null);
  const [perInfo, setPerInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [assignmentData, setAssignmentData] = useState(null);
  const [uploading, setUploading] = useState(false);

  const classID = "CPE241";
  const assignment_name = "Test sent";
  const fileType = "Assignments";

  useEffect(() => {
    getStudentPersonalInfo(email, setPerInfo, setIsLoading);
    getSubjectAssignmentID(
      assignment_name,
      setAssignmentData,
      setIsLoading,
      setDescription
    );
    // console.log(perInfo.student_id);
  }, []);

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

  useEffect(() => {
    // const studentID = perInfo.student_id;
    if (insertData !== null) {
      console.log("Insert Data: ");
      console.log(insertData);
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
        assignment_name,
        perInfo.student_id //student ID
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
              // description: description,
            });
          }}
        >
          <Text style={formAssignmentStyles.buttonStyle}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainStudentAssignment;
