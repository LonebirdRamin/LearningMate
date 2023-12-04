import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import plannerBoxStyles from "../../styles/plannerBoxStyles";

const plannerType = ["Work", "Read", "Chill"];
/*
  The component for store the individual planner datails.
*/
const PlannerBox = ({
  title = "None",
  subtitle = "Details...",
  time = "00:00",
  date = "0000-00-00",
  type = plannerType[0],
  id = 0,
  setEditModalVisible,
  setSelectedPlan,
}) => {
  return (
    <TouchableOpacity
      style={plannerBoxStyles.plannerBox}
      onPress={() => {
        setSelectedPlan({ type, title, subtitle, id, time, date });
        setEditModalVisible(true);
      }}
    >
      <View style={plannerBoxStyles.contentWrapper}>
        <Image
          resizeMode="cover"
          style={plannerBoxStyles.icon}
          source={
            type === plannerType[1]
              ? require("../../assets/icons/Planner/book.png")
              : type === plannerType[2]
              ? require("../../assets/icons/Planner/game.png")
              : require("../../assets/icons/Planner/pen.png")
          }
        />
        <View style={plannerBoxStyles.plannerDetail}>
          <View>
            <Text style={plannerBoxStyles.title()} numberOfLines={1}>
              {title}
            </Text>
            <Text style={plannerBoxStyles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          </View>

          <Text
            style={[
              plannerBoxStyles.title(true),
              {
                width: Dimensions.get("screen").width * 0.15,
                textAlign: "right",
              },
            ]}
          >
            {time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlannerBox;
