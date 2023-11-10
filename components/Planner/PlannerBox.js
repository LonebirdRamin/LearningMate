import { View, Text, Image } from "react-native";
import React from "react";
import plannerBoxStyles from "../../styles/plannerBoxStyles";

const plannerType = ["Working", "Reading", "Chill"];

const PlannerBox = ({
  title = "None",
  subtitle = "Details...",
  time = "00:00",
  type = plannerType[0],
  id = 0
}) => {
  return (
    <View style={plannerBoxStyles.plannerBox}>
      <View style={plannerBoxStyles.contentWrapper}>
        <Image
          resizeMode="cover"
          style={plannerBoxStyles.icon}
          source={type === plannerType[1]? require("../../assets/icons/Planner/book.png"): type===plannerType[2]? require("../../assets/icons/Planner/game.png"): require("../../assets/icons/Planner/pen.png")}
        />
        <View style={plannerBoxStyles.plannerDetail}>
          <View>
            <Text style={plannerBoxStyles.title} numberOfLines={1} >{title}</Text>
            <Text style={plannerBoxStyles.subtitle} numberOfLines={1} >{subtitle}</Text>
          </View>
          <Text style={plannerBoxStyles.title}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default PlannerBox;
