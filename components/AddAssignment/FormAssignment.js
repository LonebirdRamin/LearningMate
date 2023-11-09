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
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//Change datetime picker function format
//Find the way to change format of date

const FormAssignment = ({ selected }) => {
  const [textName, onChangeName] = useState("");
  const [textInformation, onChangeInformation] = useState("");

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
    console.log("---------------------------");
    console.log("Subject: " + selected);
    console.log("Name: " + subjectName);
    console.log("Information: " + subjectInformation);
    console.log("File: " + file);
    console.log("Date: " + date);
    console.log("Time: " + time);
  };

  // DATE TIME CONFIG
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setShow(false);
    // setShow(false); //To able to edit the date
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleDocumentSelection = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
      });
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }

    if (result.type === "success") {
      console.log(
        `URI: ${result.uri}\n` +
          `Name: ${result.name}\n` +
          `Type: ${result.type}\n` +
          `Size: ${result.size}`
      );
    } else {
      console.log("Document picking canceled or failed");
    }
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>Name</Text>
      <TextInput
        style={styles.input}
        inputMode="text"
        onChangeText={onChangeName}
        value={textName}
      />

      <Text style={styles.text}>Information</Text>
      <TextInput
        style={styles.input}
        inputMode="text"
        onChangeText={onChangeInformation}
        value={textInformation}
      />
      {/* Input file zone */}
      <TouchableOpacity
        style={styles.inputFile}
        onPress={handleDocumentSelection}
        activeOpacity={0.5}
      >
        <Image
          source={require("../../assets/icons/clipboardFile.png")}
          style={styles.image}
        />
        <Text style={styles.textFile}> Attach file(s) </Text>
      </TouchableOpacity>

      {/* Input date zone */}
      <TouchableOpacity
        style={styles.inputFile}
        activeOpacity={0.5}
        onPress={() => {
          showMode("date");
        }}
      >
        <Image
          source={require("../../assets/icons/calendar.png")}
          style={[styles.image, { marginRight: 5 }]}
        />
        <Text style={styles.textFile}>
          Due Date : {date.toLocaleDateString("en-GB")}{" "}
        </Text>
      </TouchableOpacity>

      {/* Input time zone */}
      <TouchableOpacity
        style={styles.inputFile}
        activeOpacity={0.5}
        onPress={() => {
          showMode("time");
        }}
      >
        <Image
          source={require("../../assets/icons/clock.png")}
          style={[styles.image, { marginRight: 5 }]}
        />
        <Text style={styles.textFile}>
          Time : {date.toLocaleTimeString("en-GB")}{" "}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePickerAndroid
          timeZoneName="Asia/Bangkok"
          is24Hour={true}
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() =>
          printVariable(
            selected,
            date, //changeFormatDate = date format
            date.toLocaleTimeString("en-GB").slice(0, 5),
            textName,
            textInformation
          )
        }
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

const styles = StyleSheet.create({
  confirmButton: {
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.067,
    width: "55%",
    backgroundColor: true ? "#F04E22" : "#393A3F",
    marginTop: windowHeight * 0.03,
  },
  input: {
    borderRadius: 30,
    color: "white",
    width: "90%",
    marginHorizontal: "15%",
    borderWidth: 1,
    borderColor: "#C1C1CD",
    height: windowHeight * 0.063,
    marginBottom: windowHeight * 0.015,
    paddingLeft: windowWidth * 0.05,
  },
  inputFile: {
    marginTop: windowHeight * 0.017,
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
  },
  image: {
    width: 16,
    height: 16,
  },
  text: {
    color: "#C1C1CD",
    paddingBottom: windowHeight * 0.013,
    alignSelf: "stretch",
    marginHorizontal: "5%",
    fontSize: 15,
  },
  textFile: {
    color: "#C1C1CD",
    fontSize: 15,
  },
});

export default FormAssignment;
