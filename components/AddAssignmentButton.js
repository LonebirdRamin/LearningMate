import React from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import customStyles from "../styles/customStyles";

export const AddAssignmentButton = () => {
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.greyLine}>
        <Pressable
          style={styles.addAssignmentBut}
          onPress={() => console.log("Clicked!")}
        >
          <Image
            source={require("../assets/icons/plusIcon.png")}
            style={{
              zIndex: 2,
            }}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1C23",
  },
  greyLine: {
    zIndex: 0,
    width: 326,
    height: 2,
    backgroundColor: "#4E4E61",
    justifyContent: "center",
    alignItems: "center",
  },
  addAssignmentBut: {
    zIndex: 2,
    width: 48,
    height: 48,
    borderRadius: 16,
    // borderWidth: 1,
    // borderColor: "#CFCFFC",
    backgroundColor: "#2E2E38",
    justifyContent: "center",
    backdropFilter: "blur(5px)",
    alignItems: "center",
  },
});
