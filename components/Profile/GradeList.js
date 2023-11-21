import { View, Text, Dimensions, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import profileStyles from "../../styles/profileStyle";
import uuid from "react-native-uuid";
import DropDown from "./DropDown";


const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const GradeList = ({ gpax, data, currentSem }) => {
  const [selectedSem, setSelectedSem] = useState(
    currentSem.class_period_semester + "/" + currentSem.class_period_year
  );
  const [gpa, setGpa] = useState("-");
  const [displayData, setDisplayData] = useState()
  useEffect(()=>{
    let temp = data.filter((item)=> item.class_period_semester+"/"+item.class_period_year === selectedSem)
    setDisplayData(temp)
    
  },[selectedSem])
  useEffect(()=>{
    if(displayData !== undefined)
    {
        if(displayData.length === 0)
        {
          setGpa("-")
        }
        else
        {
    
          setGpa(calculateAverage(displayData))
        }

    }
  },[displayData])
  const calculateAverage = (grades) => {
    // Implement your GPA calculation logic here
    // Assuming grades have a numeric value, you can calculate the average
    const totalCredits = grades.reduce((total, grade) => total + parseFloat(grade.class_credit), 0);
    const totalGradePoints = grades.reduce((total, grade) => total + (parseFloat(grade.grade) * parseFloat(grade.class_credit)), 0);
    
    const average = totalGradePoints / totalCredits;
    return average.toFixed(2); // Round to two decimal places
  }

  return (
    <View>
      {/*Start - GPAX*/}
      <View style={profileStyles.gradeHeader}>
        <Text style={profileStyles.text("white", height * 0.025, "bold")}>
          GPAX {gpax}
        </Text>
        <View style={profileStyles.semester}>
          <Image
            style={profileStyles.calendar}
            resizeMode="contain"
            source={require("../../assets/icons/calendar.png")}
          />
          <Text style={profileStyles.text("#C1C1CD", height * 0.015, "500")}>
            Semester
          </Text>
          <DropDown
            setSelectedSem={setSelectedSem}
            activityLabel={[
              {
                label:
                  currentSem.class_period_semester +
                  "/" +
                  currentSem.class_period_year,
                value:
                  currentSem.class_period_semester +"/"+
                  currentSem.class_period_year,
              },
              {
                label: "2/2022",
                value: "2/2022",
              }
            ]}
          />
        </View>
      </View>
      {/*End - GPAX */}

      {/*Start -  Below list*/}
      <View style={profileStyles.list}>
        {/*Start -  GPA*/}

        <Text
          style={[
            profileStyles.text("white", height * 0.025, "bold"),
            { paddingTop: height * 0.04 },
          ]}
        >
          GPA {gpa}
        </Text>
        {/*End -  GPA*/}

        {/*Start - subject mapping */}
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: height * 0.01,
            maxHeight: height > 850 ? height * 0.55 : height * 0.5,
          }}
          data={displayData}
          renderItem={({ item, index }) => {
            

            return (
              <View style={profileStyles.wrapper} key={uuid.v4()}>
                <View style={profileStyles.mapBox}>
                  <View>
                    <Text
                      style={profileStyles.text(
                        "#C1C1CD",
                        height * 0.015,
                        "bold"
                      )}
                    >
                      {item.class_id}
                    </Text>
                    <Text
                      style={[
                        profileStyles.text("white", height * 0.02, "600"),
                        { width: width * 0.5 },
                      ]}
                    >
                      {item.class_name}
                    </Text>
                  </View>
                  {/*Start - GradeCred */}
                  <View style={profileStyles.gradeCred}>
                    <Text
                      style={[
                        profileStyles.text("#F04E22", height * 0.025, "700"),
                      ]}
                    >
                      {item.grade}
                    </Text>
                    <Text
                      style={[
                        profileStyles.text("#C1C1CD", height * 0.015, "bold"),
                      ]}
                    >
                      {item.class_credit} Credits
                    </Text>
                  </View>
                  {/*End - GradeCred */}
                </View>
                {index == displayData.length-1 ? (
                  <></>
                ) : (
                  <View style={profileStyles.line} />
                )}
              </View>
            );
          }}
        />

        {/*End - subject mapping */}
      </View>
      {/*End -  Below list*/}
    </View>
  );
};

export default GradeList;
