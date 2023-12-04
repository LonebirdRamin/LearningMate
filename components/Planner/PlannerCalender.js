import { View, Text, Button, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import customStyles from "../../styles/customStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";

const PlannerCalendar = ({ day, setDay }) => {
  // day = selected day
  let week = [];
  for (i = 0; i < 7; i++) {
    week.push({
      display: moment().add(i, "days").format("DD:dddd"),
      key: moment().add(i, "days").format("YYYY-MM-DD"),
    });
  }
  // Create a list of 7 days from now on

  const getDaysFromWeek = (week) => {
    return week.map((item) => {
      const displayDate = item.display.split(":");
      const current = item.key;
      return (
        <Pressable
          key={current}
          style={[
            customStyles.calendarWidget,
            current === day
              ? { backgroundColor: "rgba(207, 207, 252, 0.3)" }
              : {},
          ]}
          onPress={() => {
            setDay(current);
          }}
        >
          <Text style={customStyles.h4}>{displayDate[0]}</Text>
          <Text style={customStyles.bodySmall}>
            {displayDate[1].substring(0, 2)}
          </Text>
          <View
            style={[
              { width: 6, height: 6, borderRadius: 3, margin: 5 },
              current === day
                ? { backgroundColor: "#F04E22" }
                : { backgroundColor: "#4E4E61" },
            ]}
          ></View>
        </Pressable>
      );
    });
  };

  // getDaysFromWeek(week)

  return (
    <View>
      <View style={customStyles.calendarContainer}>
        {getDaysFromWeek(week)}
      </View>
    </View>
  );
};

export default PlannerCalendar;
