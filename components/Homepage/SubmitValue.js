import { View, Text } from "react-native";
import React from "react";

const SubmitValue = ({ submitCount, totalCount }) => {
  return (
    <View>
      <Text style={{ color: "#A2A2B5" }}>{submitCount + "/" + totalCount}</Text>
    </View>
  );
};

export default SubmitValue;
