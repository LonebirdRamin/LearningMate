import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import profileStyles from "../../styles/profileStyle";
import customStyles from "../../styles/customStyles";
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
/*
  A component for storing the assignments in a list for the LearningZone (Teacher), with status and details.
*/
const AssignmentListTeacher = ({
  onClickHandler,
  data,
  setModalVisible,
  setAssName,
}) => {
  const handleItemClick = (selectedOption) => {
    onClickHandler(selectedOption);
  };
  const maxLength = 25;
  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  const status_dict = {
    true: "#58E555" /*all student submitted*/,
    false: "#5C90D2",
  };
  const formatDate = (data) => {
    const date = new Date(data);
    return date.toLocaleDateString("en-GB");
  };

  if (data.length == 0) {
    {
      /*Start no assignments*/
    }
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
    {
      /*End no assignments*/
    }
  }

  return (
    <FlatList
      data={data}
      nestedScrollEnabled={true}
      renderItem={({ item, index }) => (
        <View>
          {/*Start first row*/}
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
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setAssName(item.assignment_name);
                handleItemClick();
              }}
            >
              <Image
                source={require("../../assets/icons/threedots.png")}
              ></Image>
            </TouchableOpacity>
          </View>
          {/*End first row*/}

          {/*Start second row*/}
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
            <View>
              <Text
                style={[
                  customStyles.h1,
                  customStyles.assignmentButton,
                  {
                    backgroundColor:
                      status_dict[item.Submit_Count == item.Assigned_Count],
                  },
                ]}
              >
                Submitted {item.Submit_Count}/{item.Assigned_Count}
              </Text>
            </View>
          </View>
          {/*End second row*/}
          {index != data.length - 1 && <View style={profileStyles.line} />}
        </View>
      )}
    />
  );
};

export default AssignmentListTeacher;
