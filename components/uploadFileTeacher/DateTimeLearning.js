import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import DateTimePicker from "@react-native-community/datetimepicker";

/* 
  D  
*/

const DateTimeLearning = ({ handleDateTime }) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const changeFormatDate = (date) => {
    return (
      date.toLocaleString("default", { year: "numeric" }) +
      "-" +
      date.toLocaleString("default", { month: "2-digit" }) +
      "-" +
      date.toLocaleString("default", { day: "2-digit" }) +
      " " +
      date.toLocaleTimeString("en-GB")
    );
  };

  useEffect(() => {
    handleDateTime(changeFormatDate(date));
  }, [date]);

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

  return (
    <View>
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
        // Convert to DateTime format right here
      )}
    </View>
  );
};

export default DateTimeLearning;
