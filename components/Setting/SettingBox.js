import { View, Text, Dimensions, TouchableOpacity, Alert } from "react-native";
import React from "react";
import globleStyles from "../../styles/globleStyles";
import customStyles from "../../styles/customStyles";
import profileStyles from "../../styles/profileStyle";
import uuid from "react-native-uuid";
import logout from "../../backend/hooks/logOut";
import logOut from "../../backend/hooks/logOut";

const height = Dimensions.get("screen").height;
/*
  This component is used to show all setting options in a column group.
*/
const SettingBox = ({ menu, navigation }) => {
  let i = 0;
  return (
    <View>
      <View style={profileStyles.infoContainer} onPress={() => handlePress()}>
        {/* Start - - Each row infomation */}
        {menu.map((item) => {
          const selectedMenu = item;
          return (
            <View key={uuid.v4()}>
              <View style={profileStyles.lineGap} />

              <TouchableOpacity
                style={[profileStyles.infoRow]}
                onPress={() => {
                  if (selectedMenu == "Help") {
                    navigation.push("Help");
                  } else if (selectedMenu == "Log out") {
                    Alert.alert("Logout", "Are you sure you want to logout?", [
                      { text: "No" },
                      {
                        text: "Yes",
                        onPress: () => {
                          logOut(navigation);
                        },
                      },
                    ]);
                  }
                }}
              >
                {/*Start - text container */}
                <View style={profileStyles.textContainer}>
                  <Text style={customStyles.h2}>{menu[i++]}</Text>
                </View>
              </TouchableOpacity>
              <View style={profileStyles.lineGap} />
              {i === menu.length ? <></> : <View style={profileStyles.line} />}
            </View>
          );
        })}

        {/* End - - Each row infomation */}
      </View>
    </View>
  );
};

export default SettingBox;
