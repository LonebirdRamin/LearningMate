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
import Modal from "react-native-modal";

/* To do list
- Change datetime picker function format (Pass!)
- Find the way to change format of date  (PASS!)
- Change stylesheet format  (PASS!)
- make some condition => if no fill on Name => error!
- make date condition => if no fill on date => no due date
*/
const FormAssignment = ({ selected, setModalVisible }) => {
  const [checkDueDate, setCheckDueDate] = useState(false);
  const [isModalDueDateVisible, setModalDueDateVisible] = useState(false);
  const [textTitle, onChangeTitle] = useState("");
  const [textInformation, onChangeInformation] = useState("");
  const [fileSelected, setFileSelected] = useState(null);
  const [date, setDate] = useState(new Date());
  const checkDate = new Date(); //For make no due date state
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalDueDateVisible);
  };

  const [changedFormatDate, setChangeFormatDate] = useState(
    date.toLocaleString("default", { year: "numeric" }) +
      "-" +
      date.toLocaleString("default", { month: "2-digit" }) +
      "-" +
      date.toLocaleString("default", { day: "2-digit" })
  );

  const handleDueDate = () => {
    if (checkDate.toLocaleDateString() === date.toLocaleDateString()) {
      setCheckDueDate(true);
    } else {
      setCheckDueDate(false);
    }
  };

  useEffect(() => {
    handleDueDate();
  }, [date]);

  const setUpVariable = (
    //Funtion that gather all the variable
    selected,
    date,
    time,
    subjectTitle,
    subjectInformation,
    file,
    checkDueDate
  ) => {
    let dateTime;
    if (checkDueDate === true) {
      //To check the due date condition
      dateTime = null;
    } else if (checkDueDate === false) {
      dateTime = date.concat(" ", time);
    }

    if (!subjectTitle) {
      Alert.alert("Title", "Please fill in title", [{ text: "Ok" }]);
    } else {
      console.log("---------------------------");
      console.log("Subject: " + selected);
      console.log("Title: " + subjectTitle);
      console.log("Information: " + subjectInformation);
      console.log("File: " + file);
      console.log("DateTime: " + dateTime);
      setModalVisible(false);
    }
  };

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

  const askDueDate = () => {
    return (
      <Modal
        isVisible={isModalDueDateVisible}
        style={{
          position: "absolute",
          width: "50%",
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "50%",
            height: "50%",
            backgroundColor: "white",
          }}
        >
          <Text>Test modal </Text>
        </View>
      </Modal>
    );
  };

  //File upload
  const handleDocumentSelection = async () => {
    try {
      const documentResult = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
      });

      if (!documentResult.cancelled) {
        // Check if assets array is present and not empty
        if (documentResult.assets && documentResult.assets.length > 0) {
          documentResult.assets.forEach((asset) => {
            console.log(
              `URI: ${asset.uri}\n` +
                `Title: ${asset.Title}\n` +
                `Type: ${asset.mimeType}\n` +
                `Size: ${asset.size}`
            );
          });

          // If needed, you can perform additional actions with the selected assets.
          // For example, you can store them in state using setFileSelected.
          setFileSelected(documentResult.assets);
        } else {
          console.log("No assets selected");
        }
      } else {
        console.log("Document picking canceled");
      }
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
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
        style={formAssignmentStyles.inputFile}
        onPress={handleDocumentSelection}
        activeOpacity={0.5}
      >
        <Image
          source={require("../../assets/icons/clipboardFile.png")}
          style={formAssignmentStyles.image}
        />
        <Text style={formAssignmentStyles.textFile}> Attach file(s) </Text>
      </TouchableOpacity>

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
          Due Date :{" "}
          {checkDueDate ? "No Due Date" : date.toLocaleDateString("en-GB")}
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
            fileSelected,
            checkDueDate
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
