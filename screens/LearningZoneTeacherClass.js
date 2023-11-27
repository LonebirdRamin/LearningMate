import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import customStyles from "../styles/customStyles";
import globleStyles from "../styles/globleStyles";
import DataContext from "../routes/DataContext";
import queryAssignment from "../backend/hooks/queryGetTeacherAssignment";
import { useIsFocused } from "@react-navigation/native";
import AssignmentListTeacher from "../components/LearningZone/AssignmentListTeacher";
import LearningzoneAddButton from "../components/uploadFileTeacher/LearningzoneAddButton";
import FileRecordList from "../components/LearningZone/FileRecordList";
import queryAnnouncement from "../backend/hooks/queryAnnouncement";
import ModifileFile from "../components/LearningZone/modifileFile";
import ModalModified from "../components/LearningZone/ModalModified";
import LoadFiles from "../backend/hooks/loadFiles";
import modalFillAssignmentStyles from "../styles/modalFillAssignmentStyles";
import LoadRecord from "../backend/hooks/loadRecord";
import LoadDocument from "../backend/hooks/loadDocument";

const LearningZoneTeacherClass = ({ route, navigation }) => {
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
  let ref = [];
  const [isVisible, setModalVisible] = useState(false);
  const [isVisibleModalModified, setModalModifiedVisible] = useState(false);
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [recordFile, setRecordFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const type = "teacher";

  useEffect(() => {
    const fetchData = async () => {
      queryAssignment(
        email,
        setIsAssignmentLoading,
        setAssignmentData,
        setAssignNum
      );
      const result = await queryAnnouncement(class_.class_id);
      setAnnounce(result[0].class_announcement);
      setIsPosting(false);
    };
    if (isFocused) {
      fetchData();
    }
  }, [isFocused, isPosting]);

  useEffect(() => {
    setFilteredData(
      assignmentData.filter((item) => {
        return item.class_id == class_.class_id;
      })
    );
  }, [assignmentData]);

  useEffect(() => {
    // console.log(filteredData);
    // LoadFiles(type, filteredData, setFiles, setIsLoading);
    LoadDocument(filteredData, setFiles, setIsLoading);
    LoadRecord(filteredData, setRecordFile, setIsLoading);
  }, [filteredData]);

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
      {isAssignmentLoading ? (
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
          <View
            style={[
              customStyles.customBox1,
              {
                width: "100%",
                maxHeight: height * 0.3,
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
                onPress={() => navigation.navigate("LearningZoneTeacher")}
                style={[customStyles.notficationIcon, { right: width * 0.9 }]}
              >
                <Image source={require("../assets/icons/back.png")}></Image>
              </TouchableOpacity>
              <Text style={customStyles.pageTitle}>{class_.class_id}</Text>
              <View
                style={{
                  justifyContent: "center",
                  position: "absolute",
                  right: 0,
                  marginTop: "3%",
                  marginRight: "2%",
                }}
              >
                <LearningzoneAddButton
                  classID={class_.class_id}
                  setIsPosting={setIsPosting}
                />
              </View>
            </View>
            <Text
              style={[
                customStyles.h3,
                { textAlign: "left", marginLeft: 24, marginTop: "5%" },
              ]}
            >
              Class announcement
            </Text>
            <Text
              numberOfLines={3}
              style={[
                customStyles.h3,
                {
                  textAlign: "left",
                  marginLeft: 24,
                  marginTop: 5,
                  width: "90%",
                },
              ]}
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
                  <AssignmentListTeacher
                    data={filteredData}
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
                    <TouchableOpacity onPress={() => expand(ref, 1, expanded)}>
                      <Text style={customStyles.bodySmall}>See all...</Text>
                    </TouchableOpacity>
                  </View>
                </View>

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
            </View>
          </ScrollView>
          <ModifileFile
            isVisible={isVisible}
            setModalVisible={setModalVisible}
            setModalModifiedVisible={setModalModifiedVisible}
            setText={setText}
          />
          <ModalModified
            text={text}
            isVisibleModalModified={isVisibleModalModified}
            setModalModifiedVisible={setModalModifiedVisible}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default LearningZoneTeacherClass;
