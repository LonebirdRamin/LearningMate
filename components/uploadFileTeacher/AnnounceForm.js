import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import PostAnnouncement from "../../backend/hooks/postAnnouncement";

const AnnounceForm = ({
  setIsPosting,
  setModalVisible,
  classID,
  setIsLoading,
}) => {
  // const [title, setTitle] = useState("");
  const [announce, setAnnounce] = useState("");
  const [insertData, setInsertData] = useState(null);

  useEffect(() => {
    if (insertData !== null) {
      // console.log("---------Update Announcement--------\n");
      // console.log(insertData);
      PostAnnouncement(insertData, setModalVisible, setIsLoading, setIsPosting);
    }
  }, [insertData]);

  return (
    <View>
      {/* <FillBoxForm value={setTitle} text={"Title"} /> */}
      <Text style={[formAssignmentStyles.text, { marginTop: "-2%" }]}>
        Announcement
      </Text>
      <TextInput
        style={[
          formAssignmentStyles.learningInput,
          {
            height: "50%",
            textAlignVertical: "top",
            paddingTop: "3%",
            paddingHorizontal: "5%",
          },
        ]}
        multiline={true}
        inputMode="text"
        onChangeText={(text) => setAnnounce(text)}
      />
      {/* {console.log("Title: " + title + "\nAnnounce: " + announce)} */}
      <View style={formAssignmentStyles.buttonMain}>
        <TouchableOpacity
          style={formAssignmentStyles.confirmButton}
          onPress={() => {
            // if (announce === "") {
            //   Alert.alert(
            //     "Alert",
            //     "Please fill in your title and information",
            //     [{ text: "Ok" }]
            //   );
            // } else if (title === "") {
            //   Alert.alert("Alert", "Please fill in your title", [
            //     { text: "Ok" },
            //   ]);
            // }
            if (announce === "") {
              Alert.alert("Alert", "Please fill in your announce", [
                { text: "Ok" },
              ]);
            } else {
              setInsertData({
                classID: classID,
                announcement: announce,
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
