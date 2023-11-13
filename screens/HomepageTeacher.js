import {
  View,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
  BackHandler,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import customStyles from "../styles/customStyles";
import globleStyles from "../styles/globleStyles";
import Calendar from "../components/Calendar";
import EventList from "../components/EventList";
import assignmentStyles from "../styles/assignmentStyles";
import AssignmentHeader from "../components/Homepage/AssignmentHeader";
import AssignmentBox from "../components/Homepage/AssignmentBox";
import { SafeAreaView } from "react-native-safe-area-context";
import SeeAllModal from "../components/Eventlist/SeeAllModal";
import { useRoute } from "@react-navigation/native";
import DataContext from "../routes/DataContext";
import queryScheduleTeacher from "../backend/hooks/queryScheduleTeacher";
import moment from "moment";
import queryAssignment from "../backend/hooks/queryAssignmentStudent";
import { AddAssignmentButton } from "../components/AddAssignment/AddAssignmentButton";
import AssignmentBoxTeacher from "../components/Homepage/AssignmentBoxTeacher";
import queryGetTeacherAssignment from "../backend/hooks/queryGetTeacherAssignment";
const height = Dimensions.get("screen").height;

const mockUpData = [
  {
    color: "red",
    code: "CPE111",
    subject: "HHAHAH",
    task: "BLALBALA",
    dueDate: "11 Fuc xxxx",
    submitCount: 50,
    totalCount: 89,
  },
  {
    color: "green",
    code: "CPE110",
    subject: "Hoooo",
    task: "EIEIEIE",
    dueDate: "11 Fuck x0x0",
    submitCount: 20,
    totalCount: 90,
  },
  {
    color: "blue",
    code: "CPE123",
    subject: "Huhhhh",
    task: "Lab kuiay",
    dueDate: "69 Lucifer xxx",
    submitCount: 30,
    totalCount: 90,
  },
  {
    color: "pink",
    code: "CPE191",
    subject: "Police",
    task: "Fuck off",
    dueDate: "19 Jane 2003",
    submitCount: 50,
    totalCount: 87,
  },
];

const HomepageTeacher = ({ navigation }) => {
  const [seeAll, setSeeAll] = useState(false);
  const email = useContext(DataContext); // email from
  const [isloading, setIsLoading] = useState(true);
  const [queriedSchedule, setQueriedSchedule] = useState([]);
  const [schedule, setSchedule] = useState(null);
  // const [date,setDate] = useState(moment().format('DD')) //Numerical date
  const [day, setDay] = useState(moment().format("dddd")); //Day such as Wednesday

  // Start - manage about assignment
  const [isAssignmentLoading, setIsAssignmentLoading] = useState(false);
  const [assignmentData, setAssignmentData] = useState([]);
  const [assignNum, setAssignNum] = useState("-");

  useEffect(() => {
    queryGetTeacherAssignment(
      email,
      setIsAssignmentLoading,
      setAssignmentData,
      setAssignNum
    );
    queryScheduleTeacher(email, setIsLoading, setQueriedSchedule);
  }, []);
  // End - manage about assignment

  useEffect(() => {
    //Filter again when day changes
    setSchedule(queriedSchedule.filter((item) => item.date_name === day));
  }, [queriedSchedule, day]);

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
        <View style={customStyles.pageBackground}>
          <View
            style={[
              customStyles.customBox1,
              { borderTopLeftRadius: 0, borderTopRightRadius: 0, height: 382 },
            ]}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View style={customStyles.pageTitleContainer}>
                <Text style={customStyles.pageTitle}>Calendar</Text>
                <TouchableOpacity
                  style={customStyles.notficationIcon}
                  onPress={() => navigation.navigate("Notification")}
                >
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
              Teacher
            </Text>
            <Calendar day={day} setDay={setDay}></Calendar>
            <EventList data={schedule}></EventList>

            <View
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={() => setSeeAll(!seeAll)}>
                <Text style={customStyles.bodySmall}>See all...</Text>
              </TouchableOpacity>
            </View>

            <SeeAllModal
              data={schedule}
              isVisible={seeAll}
              toggleModal={setSeeAll}
            ></SeeAllModal>
          </View>
          <View style={assignmentStyles.container}>
            <AssignmentHeader number={assignNum} />
            <AddAssignmentButton email={email} />
            <View style={assignmentStyles.list}>
              {isAssignmentLoading ? (
                <View
                  style={[
                    assignmentStyles.list,
                    {
                      height: height > 850 ? height * 0.25 : height * 0.2,
                      justifyContent: "center",
                    },
                  ]}
                >
                  <ActivityIndicator size={50} color="#F04E22" />
                </View>
              ) : (
                <FlatList
                  data={assignmentData}
                  renderItem={({ item }) => (
                    <AssignmentBoxTeacher
                      code={item.code}
                      subject={item.subject}
                      task={item.task}
                      dueDate={item.dueDate}
                      submitCount={item.submitCount}
                      totalCount={item.totalCount}
                    />
                  )}
                />
              )}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomepageTeacher;
