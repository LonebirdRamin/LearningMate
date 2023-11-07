import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";

const FormAssignment = () => {
  const [textTitle, onChangeTitle] = useState("");
  const [textInformation, onChangeInformation] = useState("");

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#C1C1CD",
          paddingBottom: 8,
          alignSelf: "stretch",
          marginHorizontal: "5%",
          fontSize: 15,
        }}
      >
        Title
      </Text>
      <TextInput
        style={styles.input}
        inputMode="text"
        onChangeText={onChangeTitle}
        value={textTitle}
      />
      <Text
        style={{
          color: "#C1C1CD",
          paddingBottom: 8,
          alignSelf: "stretch",
          marginHorizontal: "5%",
          fontSize: 15,
        }}
      >
        Information
      </Text>
      <TextInput
        style={styles.input}
        inputMode="text"
        onChangeText={onChangeInformation}
        value={textInformation}
      />
      <Text>{console.log("Title: " + textTitle)}</Text>
      <Text>{console.log("Information: " + textInformation)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    paddingLeft: 15,
    color: "white",
    width: "90%",
    marginHorizontal: "15%",
    borderWidth: 1,
    borderColor: "#C1C1CD",
    height: 55,
    marginBottom: 15,
  },
});

export default FormAssignment;
