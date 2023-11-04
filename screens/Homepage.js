import { View, Image, Text, Pressable , TouchableOpacity} from "react-native";
import React from "react";
import customStyles from "../styles/customStyles";
import Calendar from "../components/Calendar";
import EventList from "../components/EventList";

const Homepage = () => {
  return (
    <View style={customStyles.pageBackground}>
      <View
        style={[
          customStyles.customBox1,
          { borderTopLeftRadius: 0, borderTopRightRadius: 0, height: 382 },
        ]}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={customStyles.pageTitleContainer}>
            <Text style={customStyles.pageTitle}>Calendar</Text>
            <TouchableOpacity style={customStyles.notficationIcon}  onPress={() => console.log('Notfication Pressed')}>
              <Image source={require("../assets/icons/bell.png")}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={[
            customStyles.h4,
            { textAlign: "left", marginLeft: 24, marginBottom: 17 },
          ]}
        >
        Schedule
        </Text>
        <Calendar></Calendar>
        <EventList></EventList>
      </View>
    </View>
  );
};

export default Homepage;
