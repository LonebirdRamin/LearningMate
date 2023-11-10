import { View, Text, Image } from "react-native";
import React from "react";
import plannerBoxStyles from "../../styles/plannerBoxStyles";

const PlannerBox = ({
  title = "None",
  subtitle = "Details...",
  time = "00:00",
  type = "book",
}) => {
  return (
    <View style={plannerBoxStyles.plannerBox}>
      <View style={plannerBoxStyles.contentWrapper}>
        <Image
          resizeMode="cover"
          style={plannerBoxStyles.icon}
          source={type === "reading"? require("../../assets/icons/Planner/book.png"): type==="entertainment"? require("../../assets/icons/Planner/game.png"): require("../../assets/icons/Planner/pen.png")}
        />
        <View style={plannerBoxStyles.plannerDetail}>
          <View>
            <Text style={plannerBoxStyles.title}>{title}</Text>
            <Text style={plannerBoxStyles.subtitle}>{subtitle}</Text>
          </View>
          <Text style={plannerBoxStyles.title}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default PlannerBox;
