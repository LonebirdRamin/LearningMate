import {
  View,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
  BackHandler,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import customStyles from "../styles/customStyles";
import globleStyles from "../styles/globleStyles";
import Calendar from "../components/Calendar";
import EventList from "../components/EventList";
import assignmentStyles from "../styles/assignmentStyles";
import AssignmentHeader from "../components/Homepage/AssignmentHeader";
import AssignmentBox from "../components/Homepage/AssignmentBox";
import { SafeAreaView } from "react-native-safe-area-context";
import SeeAllModal from "../components/Eventlist/SeeAllModal";
import querySchedule from "../backend/hooks/querySchedule";
import moment  from 'moment';

const mockUpData = [
  {
    color: "red",
    code: "CPE111",
    subject: "HHAHAH",
    task: "BLALBALA",
    dueDate: "11 Fuc xxxx",
  },
  {
    color: "green",
    code: "CPE110",
    subject: "Hoooo",
    task: "EIEIEIE",
    dueDate: "11 Fuck x0x0",
  },
  {
    color: "blue",
    code: "CPE123",
    subject: "Huhhhh",
    task: "Lab kuiay",
    dueDate: "69 Lucifer xxx",
  },
  {
    color: "pink",
    code: "CPE191",
    subject: "Police",
    task: "Fuck off",
    dueDate: "19 Jane 2003",
  },
];

// const events = [
//   {
//     'code':'CPE123',
//     'name':'Aerospace engineering',
//     'time':'00:00 - 05:00',
//   },
//   {
//     'code':'CPE456',
//     'name':'Chicken engineering',
//     'time':'06:00 - 07:00',
//   },
//   {
//     'code':'CPE888',
//     'name':'noidea',
//     'time':'12:00 - 13:00',
//   },
//   {
//     'code':'CPE015',
//     'name':'Kitchen simulation',
//     'time':'20:00 - 21:00',
//   },
// ]


const Homepage = () => {
  const [seeAll,setSeeAll] = useState(false)
  const [isloading,setIsLoading] = useState(true)
  const [schedule,setSchedule] = useState(null)
  // const [date,setDate] = useState(moment().format('DD')) //Numerical date
  const [day,setDay] = useState(moment().format('dddd')) //Day such as Wednesday

  const email = 'pannawat.duro@kmutt.ac.th'

  useEffect(()=>{
    const fetchData = async ()=>{
    const data = await querySchedule(email,setIsLoading,day)
    setSchedule(data)
    }

    fetchData()
  },[day])

  return (
    <SafeAreaView>
      { isloading ? 
      (<View style={[customStyles.pageBackground,{display:'flex',justifyContent:'center'}]}>
        <View style={globleStyles.loading}>
          <ActivityIndicator size={100} color="#F04E22"></ActivityIndicator>
        </View>
      </View>):
      (<View style={customStyles.pageBackground}>
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
                onPress={() => console.log("Notfication Pressed")}
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
          <EventList data={schedule}></EventList>
          
          <View style={{display:'flex',justifyContent:'center',flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>setSeeAll(!seeAll)}>
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
          <AssignmentHeader number={5} />
          <View style={assignmentStyles.list}>
            <FlatList
              data={mockUpData}
              renderItem={({ item }) => (
                <AssignmentBox
                  iconColor={item.color}
                  code={item.code}
                  subject={item.subject}
                  task={item.task}
                  dueDate={item.dueDate}
                />
              )}
            />
          </View>
        </View>
      </View>)
      }
      
    </SafeAreaView>
  );
};

export default Homepage;
