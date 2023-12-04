import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import customStyles from "../styles/customStyles";
import globleStyles from "../styles/globleStyles";
import DataContext from "../routes/DataContext";
import queryAssignment from "../backend/hooks/queryAssignmentStudent";
import { useIsFocused } from "@react-navigation/native";
import AssignmentList from "../components/LearningZone/AssignmentList";
import FileRecordList from "../components/LearningZone/FileRecordList";
import queryAnnouncement from "../backend/hooks/queryAnnouncement";
import loadDocument from "../backend/hooks/loadDocument";
import loadRecord from "../backend/hooks/loadRecord";
/*
  This is a screen for the interactable LearningZone (Student)
*/
const LearningZoneStudentClass = ({ route, navigation }) => {
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;
  const isFocused = useIsFocused();
  const { class_ } = route.params;
  const email = useContext(DataContext);
  const [isAssignmentLoading, setIsAssignmentLoading] = useState(false);
  const [assignmentData, setAssignmentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [assignNum, setAssignNum] = useState("-");
  const [isPosting, setIsPosting] = useState(false);
  const [announce, setAnnounce] = useState("No Announcement");
  const [expanded, setExpanded] = useState([false, false, false, false]);
  const [files, setFiles] = useState([]);
  const [recordFile, setRecordFile] = useState([]);
  const [isVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const type = "student";
  let ref = [];

  /* Start - manage assignment & announcement */
  useEffect(() => {
    const fetchData = async () => {
      queryAssignment(
        email,
        setIsAssignmentLoading,
        setAssignmentData,
        setAssignNum,
      );
      const result = await queryAnnouncement(class_.class_id);
      setAnnounce(result[0].class_announcement);
      setIsPosting(false);
    };
    if (isFocused) {
      fetchData();
    }
  }, [isFocused, isPosting]);
  /* End - manage assignment & announcement */

  /* Start - filter assignment */
  useEffect(() => {
    setFilteredData(
      assignmentData.filter((item) => {
        return item.class_id == class_.class_id;
      }),
    );
  }, [assignmentData]);
  /* End - filter assignment */

  /* Start - manage file & document */
  useEffect(() => {
    loadDocument(class_.class_id, setFiles, setIsLoading);
    loadRecord(class_.class_id, setRecordFile, setIsLoading);
  }, [filteredData]);
  /* End - manage file & document */

  const initializeRefs = (count) => {
    ref = Array.from({ length: count }, () => useRef(null));
  };
  initializeRefs(4);

  const expand = (ref, index, expanded) => {
    const array = [...expanded];

    if (array[index]) {
      ref[index].current.setNativeProps({
        style: {
          maxHeight: height * 0.35,
        },
      });
    } else {
      ref[index].current.setNativeProps({
        style: {
          maxHeight: "none",
        },
      });
    }
    array[index] = !array[index];
    setExpanded(array);
  };

  return (
    <SafeAreaView style={globleStyles.pageContainer}>
      {isAssignmentLoading || isLoading ? (
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
        <View style={customStyles.pageBackground}>
          {/* Start - announcement */}
          <View
            style={[
              customStyles.customBox1,
              {
                width: "100%",
                height: "fit-content",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                overflow: "hidden",
              },
            ]}
            ref={ref[0]}
          >
            <View style={customStyles.pageTitleContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("LearningZoneStudent")}
                style={[customStyles.notficationIcon, { right: width * 0.9 }]}
              >
                <Image source={require("../assets/icons/back.png")}></Image>
              </TouchableOpacity>
              <Text style={customStyles.pageTitle}>{class_.class_id}</Text>
            </View>
            <Text
              style={[
                customStyles.h3,
                { textAlign: "left", marginLeft: 24, marginVertical: 10 },
              ]}
            >
              Class announcement
            </Text>
            <Text
              style={[customStyles.h3, { textAlign: "left", marginLeft: 24 }]}
            >
              {announce}
            </Text>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: "auto",
                marginBottom: 10,
              }}
            >
              <TouchableOpacity onPress={() => expand(ref, 0, expanded)}>
                <Text style={customStyles.bodySmall}>See all...</Text>
              </TouchableOpacity>
            </View>
            {/* End - announcement */}

            {/* Start - assignments */}
          </View>
          <ScrollView style={{ marginBottom: height * 0.1 }}>
            <View style={{ paddingHorizontal: width * 0.05 }}>
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: height * 0.04,
                  }}
                >
                  <Text style={[customStyles.h4, { flex: 1 }]}>Assignment</Text>
                  <Text style={customStyles.h4}>
                    {filteredData.length} assignments
                  </Text>
                </View>
                <View
                  style={customStyles.learningZoneAssignmentWidget}
                  ref={ref[1]}
                >
                  <AssignmentList data={filteredData} />
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                      marginTop: "auto",
                      marginBottom: 10,
                    }}
                  >
                    <TouchableOpacity onPress={() => expand(ref, 1, expanded)}>
                      <Text style={customStyles.bodySmall}>See all...</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* End - assignments */}

              {/* Start - files */}
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: height * 0.04,
                  }}
                >
                  <Text style={[customStyles.h4, { flex: 1 }]}>File</Text>
                </View>
                {isLoading ? (
                  <View style={globleStyles.loading}>
                    <ActivityIndicator
                      size={100}
                      color="#F04E22"
                    ></ActivityIndicator>
                  </View>
                ) : (
                  <View
                    style={customStyles.learningZoneAssignmentWidget}
                    ref={ref[2]}
                  >
                    <FileRecordList
                      data={files}
                      type={type}
                      setModalVisible={setModalVisible}
                    />
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                        marginTop: "auto",
                        marginBottom: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => expand(ref, 2, expanded)}
                      >
                        <Text style={customStyles.bodySmall}>See all...</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
              {/* End - files */}

              {/* Start - recordings */}
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: height * 0.04,
                  }}
                >
                  <Text style={[customStyles.h4, { flex: 1 }]}>Record</Text>
                </View>
                {isLoading ? (
                  <View style={globleStyles.loading}>
                    <ActivityIndicator
                      size={100}
                      color="#F04E22"
                    ></ActivityIndicator>
                  </View>
                ) : (
                  <View
                    style={customStyles.learningZoneAssignmentWidget}
                    ref={ref[3]}
                  >
                    <FileRecordList
                      data={recordFile}
                      type={type}
                      setModalVisible={setModalVisible}
                    />
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                        marginTop: "auto",
                        marginBottom: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => expand(ref, 3, expanded)}
                      >
                        <Text style={customStyles.bodySmall}>See all...</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
            {/* End - recordings */}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default LearningZoneStudentClass;
