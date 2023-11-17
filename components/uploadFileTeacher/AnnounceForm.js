import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import FillBoxForm from "./FillBoxForm";
import formAssignmentStyles from "../../styles/formAssignmentStyles";

const AnnounceForm = ({ selected, setModalVisible }) => {
  const [title, setTitle] = useState("");
  const [announce, setAnnounce] = useState("");
  const [insertData, setInsertData] = useState({});
  const email = "test email";

  useEffect(() => {
    console.log("---------Announce--------\n");
    console.log(insertData);
  }, [insertData]);

  return (
    <View>
      <FillBoxForm value={setTitle} text={"Title"} />
      <Text style={[formAssignmentStyles.text, { marginTop: "-2%" }]}>
        Information
      </Text>
      <TextInput
        style={[
          formAssignmentStyles.learningInput,
          {
            height: "33%",
            textAlignVertical: "top",
            paddingTop: "3%",
          },
        ]}
        inputMode="text"
        onChangeText={(text) => setAnnounce(text)}
      />
      {/* {console.log("Title: " + title + "\nAnnounce: " + announce)} */}
      <View style={formAssignmentStyles.buttonMain}>
        <TouchableOpacity
          style={formAssignmentStyles.confirmButton}
          onPress={() => {
            if (announce === "" && title === "") {
              Alert.alert(
                "Alert",
                "Please fill in your title and information",
                [{ text: "Ok" }]
              );
            } else if (title === "") {
              Alert.alert("Alert", "Please fill in your title", [
                { text: "Ok" },
              ]);
            } else if (announce === "") {
              Alert.alert("Alert", "Please fill in your announce", [
                { text: "Ok" },
              ]);
            } else {
              setInsertData({
                email: email,
                class_id: selected,
                announce_title: title,
                announce_information: announce,
              });
              setModalVisible(false);
            }
          }}
        >
          <Text style={formAssignmentStyles.buttonStyle}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AnnounceForm;
