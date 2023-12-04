// This file is for user to input the name and information by text, file, and due date
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import * as FileSystem from "expo-file-system";
import CheckBox from "react-native-check-box";
import postAssignment from "../../backend/hooks/postAssignment";
import { ref } from "firebase/storage";
import PostFile from "../../backend/hooks/submitFileStudent";
import PostFileTeacher from "../../backend/hooks/postFileTeacher";

/* To do list
- Change datetime picker function format (Pass!)
- Find the way to change format of date  (PASS!)
- Change stylesheet format  (PASS!)
- make some condition => if no fill on Name => error!
- make date condition => if no fill on date => no due date
*/
const FormAssignment = ({
  selected,
  setModalVisible,
  email,
  setIsLoading,
  setIsPosting,
}) => {
  const [textTitle, onChangeTitle] = useState("");
  const [textInformation, onChangeInformation] = useState("");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showDate, handleShowDate] = useState(true);
  const [insertData, setInsertData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("No selected file");
  const fileType = "Assignments";
  const [changedFormatDate, setChangeFormatDate] = useState(
    date.toLocaleString("default", { year: "numeric" }) +
      "-" +
      date.toLocaleString("default", { month: "2-digit" }) +
      "-" +
      date.toLocaleString("default", { day: "2-digit" }),
  );

  const setUpVariable = (
    //Funtion that gather all the variable
    selected,
    date,
    time,
    subjectTitle,
    subjectInformation,
    showDate,
  ) => {
    let dateTime;

    if (showDate === true) {
      //To check the due date condition
      dateTime = null;
    } else if (showDate === false) {
      dateTime = date.concat(" ", time);
    }

    if (!subjectTitle) {
      Alert.alert("Title", "Please fill in title", [{ text: "Ok" }]);
    } else {
      setInsertData({
        classID: selected,
        assName: subjectTitle,
        dueDate: dateTime,
        description: subjectInformation,
      });
    }
  };
  useEffect(() => {
    //ใส่ Data ตรงนี้ เพื่อส่งไป DB เน้อออ
    // This block of code will run whenever insertData changes
    if (insertData !== null) {
      postAssignment(
        insertData,
        setModalVisible,
        setDate,
        onChangeInformation,
        onChangeTitle,
        setIsLoading,
        setIsPosting,
      );
      PostFileTeacher(
        selected,
        fileType,
        file,
        setUploading,
        setFile,
        textTitle,
      );
      setModalVisible(false);
    }
    // console.log("insertData has been updated:", insertData);
  }, [insertData]);

  // DATE TIME CONFIG
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const changeFormatDate = (date) => {
    return (
      date.toLocaleString("default", { year: "numeric" }) +
      "-" +
      date.toLocaleString("default", { month: "2-digit" }) +
      "-" +
      date.toLocaleString("default", { day: "2-digit" })
    );
  };
  // To change the format date
  useEffect(() => {
    setChangeFormatDate(changeFormatDate(date));
  }, [date]);

  //File upload
  const pickFile = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
        copyToCacheDirectory: true,
      });

      console.log("DocumentPicker result:", result);
      setFileName(result.assets[0].name);
      if (!result.canceled) {
        setFile(result);
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  const dateTimeComponent = () => {
    return (
      <View
        style={{
          width: "90%",
        }}
      >
        {/* Input date zone */}
        <TouchableOpacity
          style={formAssignmentStyles.inputFile}
          activeOpacity={0.5}
          onPress={showDatepicker}
        >
          <Image
            source={require("../../assets/icons/calendar.png")}
            style={[formAssignmentStyles.image, { marginRight: 5 }]}
          />
          <Text style={formAssignmentStyles.textFile}>
            Due Date : {date.toLocaleDateString("en-GB")}
          </Text>
        </TouchableOpacity>

        {/* Input time zone */}
        <TouchableOpacity
          style={formAssignmentStyles.inputFile}
          activeOpacity={0.5}
          onPress={showTimepicker}
        >
          <Image
            source={require("../../assets/icons/clock.png")}
            style={[formAssignmentStyles.image, { marginRight: 5 }]}
          />
          <Text style={formAssignmentStyles.textFile}>
            Time : {date.toLocaleTimeString("en-GB").slice(0, 5)}{" "}
          </Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={formAssignmentStyles.text}>Title</Text>
      <TextInput
        style={formAssignmentStyles.input}
        inputMode="text"
        onChangeText={(text) => onChangeTitle(text)}
        value={textTitle}
      />

      <Text style={formAssignmentStyles.text}>Instruction (optional)</Text>
      <TextInput
        style={formAssignmentStyles.input}
        inputMode="text"
        onChangeText={(text) => onChangeInformation(text)}
        value={textInformation}
      />
      {/* Input file zone */}
      <TouchableOpacity
        style={[formAssignmentStyles.inputFile, { marginLeft: "10%" }]}
        onPress={pickFile}
        activeOpacity={0.5}
      >
        <Image
          source={require("../../assets/icons/clipboardFile.png")}
          style={formAssignmentStyles.image}
        />
        <Text style={formAssignmentStyles.textFile}>
          {" "}
          Attach file(s): {fileName}{" "}
        </Text>
      </TouchableOpacity>

      <View style={formAssignmentStyles.checkBox}>
        <CheckBox
          isChecked={showDate}
          onClick={() => handleShowDate(!showDate)}
          rightText="No Due Date"
          rightTextStyle={formAssignmentStyles.textCheckBox}
          checkBoxColor="#C1C1CD"
        />
      </View>

      {!showDate && dateTimeComponent()}
      {/* const [insertData, setInsertData] = useState(null); */}
      {/* Confirm Button zone */}
      <TouchableOpacity
        style={formAssignmentStyles.confirmButton}
        onPress={() => [
          setUpVariable(
            selected,
            changedFormatDate, //changeFormatDate = date format
            date.toLocaleTimeString("en-GB"),
            textTitle,
            textInformation,
            showDate,
          ),
        ]}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Confirm
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormAssignment;
