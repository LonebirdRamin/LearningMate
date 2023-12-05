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
  RefreshControl,
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
import querySchedule from "../backend/hooks/querySchedule";
import moment from "moment";
import queryAssignment from "../backend/hooks/queryAssignmentStudent";
import queryPlanner from "../backend/hooks/queryPlanner";
import { useIsFocused } from "@react-navigation/native";
import getCurrentSemStudent from "../backend/hooks/getCurrentSemStudent";

const height = Dimensions.get("screen").height;
/* 
  This screen is used for displaying the homepage (Student)
*/
const Homepage = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [seeAll, setSeeAll] = useState(false);
  const email = useContext(DataContext);

  const [isloading, setIsLoading] = useState(true);

  const [queriedSchedule, setQueriedSchedule] = useState([]);
  const [queriedPlanner, setQueriedPlanner] = useState([]);
  const [appendedEvents, setAppendedEvents] = useState([]);
  const [validEvents, setValidEvents] = useState([]);

  /* Start - - Manage pull to reload */
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    queryAssignment(email, setRefreshing, setAssignmentData, setAssignNum);
  };
  /* End - - Manange pull to reload */

  const [day, setDay] = useState(
    moment().format("dddd"),
  ); /* Day such as Wednesday */

  const [isAssignmentLoading, setIsAssignmentLoading] = useState(true);
  const [isCurSemLoading, setIsCurSemLoading] = useState(true);
  const [assignmentData, setAssignmentData] = useState([]);
  const [filteredAssignments, setfilteredAssignments] = useState([]);
  const [assignNum, setAssignNum] = useState("-");
  const [curSem, setCurSem] = useState();

  /* Start - manage about schedule */
  useEffect(() => {
    const fetchData = async () => {
      getCurrentSemStudent(email, setCurSem, setIsCurSemLoading);
      querySchedule(email, setQueriedSchedule);
    };
    setIsLoading(false);
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);
  /* End - manage about schedule */

  /* Start - manage about assignment */
  useEffect(() => {
    queryAssignment(
      email,
      setIsAssignmentLoading,
      setAssignmentData,
      setAssignNum,
    );
  }, []);
  /* End - manage about assignment */

  useEffect(()=>{
    if(assignmentData){
      setfilteredAssignments(assignmentData.filter(
        item => {return(item.status == 0)}
      ));
    };
  },[assignmentData]);

  /* Start - manage about planner */
  useEffect(() => {
    const fetchPlanner = async () => {
      await queryPlanner(email, setQueriedPlanner);
    };
    fetchPlanner();
  }, [queriedSchedule]);
  /* End - manage about planner */

  /* Start - combine event and planner */
  useEffect(() => {
    const combinedEvents = [...queriedSchedule, ...queriedPlanner];
    setAppendedEvents(combinedEvents);
    setIsLoading(false);
  }, [queriedPlanner]);
  /* End - combine event and planner */

  /* Start - filter event and planner */
  const filterEvents = (appendedEvents) => {
    const copy = JSON.parse(JSON.stringify(appendedEvents));
    const currentDate = new Date();
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() + 6);
    dateLimit.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const isClassEvent = (event) => {
      return "class_id" in event;
    };
    const isPlannerEvent = (event) => {
      return "planner_category" in event;
    };

    /* Filter out planner that is not in the 7-day period and cur semester/year */
    const validEvents = copy.filter((item) => {
      if (isClassEvent(item)) {
        return (
          item.class_period_year == curSem.class_period_year &&
          item.class_period_semester == curSem.class_period_semester
        );
      }
      const eventStartDate = new Date(item.start_time);
      return currentDate <= eventStartDate && eventStartDate <= dateLimit;
    });

    /* Format the planner object to be appropriate for filtering */
    validEvents.map((event) => {
      if (isPlannerEvent(event)) {
        const dateTimeString = event.start_time;
        const dateTime = new Date(dateTimeString);
        const eventStartDateTime = new Date(event.start_time);
        const [date_name, day] = dateTime
          .toLocaleDateString("en-GB", { weekday: "long" })
          .split(", ");
        event.date_name = date_name;
        event.start_time = eventStartDateTime.toLocaleTimeString("en-GB");
      }
    });

    validEvents.sort((a, b) => {
      /* Filter by START_TIME ONLY! (date_name will be filtered on eventList.js) */
      const aStartDateTime = a.start_time.split(":");
      const bStartDateTime = b.start_time.split(":");

      const timeANumeric =
        parseInt(aStartDateTime[0]) * 3600 +
        parseInt(aStartDateTime[1]) * 60 +
        parseInt(aStartDateTime[2]);
      const timeBNumeric =
        parseInt(bStartDateTime[0]) * 3600 +
        parseInt(bStartDateTime[1]) * 60 +
        parseInt(bStartDateTime[2]);

      return timeANumeric - timeBNumeric;
    });

    return validEvents;
  };
  /* End - filter event and planner */

  /* Start - filter event and planner when day changes*/
  useEffect(() => {
    /* Filter again when day changes */
    if (curSem !== undefined) {
      const res = filterEvents(appendedEvents).filter(
        (item) => item.date_name == day,
      );
      setValidEvents(res);
    }
  }, [appendedEvents, day, curSem]);
  /* End - filter event and planner when day changes*/

  return (
    <SafeAreaView style={globleStyles.pageContainer}>
      {
        <View style={customStyles.pageBackground}>
          {/* Start - top of page */}
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
                <Text style={customStyles.pageTitle}>Learning Mate</Text>
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
              Schedule
            </Text>
            <Calendar day={day} setDay={setDay}></Calendar>
            <EventList data={validEvents}></EventList>

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
              data={validEvents}
              isVisible={seeAll}
              toggleModal={setSeeAll}
            ></SeeAllModal>
          </View>
          {/* End - top of page */}

          {/* Start - assignment section */}
          <View style={assignmentStyles.container}>
            <AssignmentHeader number={filteredAssignments.length} />
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
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      colors={["#F04E22", "red"]}
                      progressViewOffset={height / 30}
                    />
                  }
                  data={filteredAssignments}
                  renderItem={({ item }) => (
                    <AssignmentBox
                      code={item.class_id}
                      subject={item.class_name}
                      task={item.assignment_name}
                      dueDate={item.assignment_due_date}
                      refreshing={refreshing}
                    />
                  )}
                />
              )}
            </View>
          </View>
          {/* End - assignment section */}
        </View>
      }
    </SafeAreaView>
  );
};

export default Homepage;
