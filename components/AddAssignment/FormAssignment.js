// This file is for user to input the name and information by text, file, and due date
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import formAssignmentStyles from "../../styles/formAssignmentStyles";

/* To do list
- Change datetime picker function format (Pass!)
- Find the way to change format of date  (PASS!)
- Change stylesheet format  (PASS!)
- make some condition => if no fill on Name => error!
- make date condition => if no fill on date => no due date
*/
const FormAssignment = ({ selected, setModalVisible }) => {
  const [textName, onChangeName] = useState("");
  const [textInformation, onChangeInformation] = useState("");
  const [fileSelected, setFileSelected] = useState(null);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("No Due Date");
  const [changedFormatDate, setChangeFormatDate] = useState(
    date.toLocaleString("default", { year: "numeric" }) +
      "-" +
      date.toLocaleString("default", { month: "2-digit" }) +
      "-" +
      date.toLocaleString("default", { day: "2-digit" })
  );

  const printVariable = (
    selected,
    date,
    time,
    subjectName,
    subjectInformation,
    file
  ) => {
    // setChangeFormatDate(date);
    const dateTime = date.concat(" ", time);
    console.log("---------------------------");
    console.log("Subject: " + selected);
    console.log("Name: " + subjectName);
    console.log("Information: " + subjectInformation);
    console.log("File: " + file);
    console.log("DateTime: " + dateTime);
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
                `Name: ${asset.name}\n` +
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
      <Text style={formAssignmentStyles.text}>Name</Text>
      <TextInput
        style={formAssignmentStyles.input}
        inputMode="text"
        onChangeText={onChangeName}
        value={textName}
      />

      <Text style={formAssignmentStyles.text}>Information</Text>
      <TextInput
        style={formAssignmentStyles.input}
        inputMode="text"
        onChangeText={onChangeInformation}
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
          Due Date : {date.toLocaleDateString("en-GB")}{" "}
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
          Time : {date.toLocaleTimeString("en-GB")}{" "}
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
          printVariable(
            selected,
            changedFormatDate, //changeFormatDate = date format
            date.toLocaleTimeString("en-GB"),
            textName,
            textInformation,
            fileSelected
          ),
          setModalVisible(false),
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
