import React, { useState, useContext, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import customStyles from "../styles/customStyles";
import globleStyles from "../styles/globleStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import DataContext from "../routes/DataContext";
import queryClassTeacher from "../backend/hooks/queryClassTeacher";
import ClassList from "../components/LearningZone/ClassList";

const LearningZoneTeacher = ({ navigation }) => {
  const email = useContext(DataContext); // email from login
  const [_class, setClass] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const destination = 'LearningZoneTeacherClass'

  useEffect(() => {
    const fetchData = async () => {
      const data = await queryClassTeacher(email, setIsLoading);
      setClass(data);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      {isloading ? (
        <View
          style={[
            customStyles.pageBackground,
            { display: "flex", justifyContent: "center" },
          ]}
        >
          <View style={globleStyles.loading}>
            <ActivityIndicator size={100} color="#F04E22"></ActivityIndicator>
          </View>
        </View>
      ) : (
        <View style={[customStyles.pageBackground]}>
          <View style={customStyles.pageTitleContainer}>
            <Text style={customStyles.pageTitle}>Learning Zone</Text>
          </View>
          <View style={{ marginLeft: "auto", marginRight: 10 }}>
            <Text style={{ backgroundColor: "white" }}>Semester 1/2566</Text>
          </View>
          <ClassList data={_class} navigation={navigation} destination={destination}></ClassList>
        </View>
      )}
    </SafeAreaView>
  );
};

export default LearningZoneTeacher;
