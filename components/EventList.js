import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Touchable,
  FlatList,
} from "react-native";
import { React, useState } from "react";
import customStyles from "../styles/customStyles";
/*
  A component for displaying the events within that specific day.
*/
const EventList = ({ data }) => {
  const maxLength = 25;
  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const isClassEvent = (event) => {
    return "class_id" in event;
  };
  const isPlannerEvent = (event) => {
    return "planner_category" in event;
  };

  const renderItem = ({ item }) => {
    if (isClassEvent(item)) {
      {
        /* Start - class rendering */
      }
      return (
        <View style={customStyles.eventWidget}>
          <View style={customStyles.eventDetails}>
            <View
              style={[
                customStyles.eventIcon,
                { backgroundColor: "#F04E22", alignItems: "center" },
              ]}
            >
              <Text style={customStyles.h2}>
                {item.class_id.substring(0, 3)}
              </Text>
              <Text style={customStyles.h2}>
                {item.class_id.substring(3, 6)}
              </Text>
            </View>
            <Text style={customStyles.h2}>
              {truncate(item.class_name, maxLength)}
            </Text>
            <Text style={[customStyles.h1, { lineHeight: 20.5 }]}>
              {item.start_time.slice(0, -3) +
                " - " +
                item.end_time.slice(0, -3)}
            </Text>
          </View>
        </View>
      );
      {
        /* End - class rendering */
      }
    } else {
      {
        /* Start - event rendering */
      }
      return (
        <View style={customStyles.eventWidget}>
          <View style={customStyles.eventDetails}>
            <View
              style={[
                customStyles.eventIcon,
                {
                  backgroundColor: "rgba(207, 207, 252, 0.1)",
                  alignItems: "center",
                },
              ]}
            >
              <Text style={customStyles.plannerIconText}>EVENT</Text>
            </View>
            <Text style={customStyles.h2}>
              {truncate(item.planner_name, maxLength)}
            </Text>
            <Text style={[customStyles.h1, { lineHeight: 20.5 }]}>
              {item.start_time.slice(0, -3)}
            </Text>
          </View>
        </View>
      );
      {
        /* End - event rendering */
      }
    }
  };

  return (
    <View style={customStyles.eventsContainer}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

export default EventList;
