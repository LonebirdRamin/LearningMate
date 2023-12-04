import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import profileStyles from "../../styles/profileStyle";
import customStyles from "../../styles/customStyles";

const AssignmentList = ({ data }) => {
  const maxLength = 25;
  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  const status_dict = {
    0: { status: "Not submitted", color: "#4E4E61" },
    1: { status: "Submitted", color: "#58E555" },
    2: { status: "Late", color: "#CE2727" },
  };
  const formatDate = (data) => {
    const date = new Date(data);
    return date.toLocaleDateString("en-GB");
  };

  if (data.length == 0) {
    return (
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: "5%",
          }}
        >
          <Text style={customStyles.h2}>No Assignment</Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      nestedScrollEnabled={true}
      renderItem={({ item, index }) => (
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingTop: "5%",
            }}
          >
            <Text style={[customStyles.h2, { flex: 1 }]}>
              {truncate(item.assignment_name, maxLength)}
            </Text>
            <Text
              style={[
                customStyles.h1,
                customStyles.assignmentButton,
                { backgroundColor: status_dict[item.status].color },
              ]}
            >
              {status_dict[item.status].status}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: "5%",
              paddingTop: "2%",
            }}
          >
            <View
              style={[
                customStyles.assignmentButton,
                {
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#353542",
                  display: "flex",
                  flexDirection: "row",
                },
              ]}
            >
              <Text style={[customStyles.h2, { marginRight: "5%" }]}>
                DUE DATE
              </Text>
              <Text style={[customStyles.bodysmall, { color: "white" }]}>
                {item.assignment_due_date === null ? (
                  <Text style={[customStyles.h2, { width: "50%" }]}>
                    {" "}
                    No Due Date{" "}
                  </Text>
                ) : (
                  formatDate(item.assignment_due_date)
                )}
              </Text>
            </View>
            <View style={{ marginRight: "auto" }}></View>
            <TouchableOpacity>
              <Text
                style={[
                  customStyles.h1,
                  customStyles.assignmentButton,
                  { backgroundColor: "#5C90D2" },
                ]}
              >
                {item.status == 1 ? "Edit submission" : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
          {index != data.length - 1 && <View style={profileStyles.line} />}
        </View>
      )}
    />
  );
};

export default AssignmentList;
