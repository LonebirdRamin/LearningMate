import { View, Text, Dimensions, FlatList, Image } from "react-native";
import React from "react";
import profileStyles from "../../styles/profileStyle";
import uuid from "react-native-uuid";
import DropDown from "./DropDown";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const GradeList = ({ gpax, gpa, data }) => {
  let i = 0;
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
          source={require("../../assets/icons/calendar.png")}/>
          <Text style={profileStyles.text("#C1C1CD", height * 0.015, "500")}>
            Semester
          </Text>
          <DropDown activityLabel={[{label: "All", value: "0"}]}/>  
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
          style={{ marginTop: height*0.01, maxHeight: height>850? height*0.55: height*0.5}}
          data={data}
          renderItem={({item})=>{
            i++;
            return (
              (
                <View style={profileStyles.wrapper} key={uuid.v4()}>
                  <View style={profileStyles.mapBox}>
                    <View>
                    <Text style={profileStyles.text("#C1C1CD", height * 0.015, "bold")}>
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
                  {i===data.length? <></>:<View style={profileStyles.line} />}
                </View>
              )
            )
          }}
        />
        
        {/*End - subject mapping */}
      </View>
      {/*End -  Below list*/}
    </View>
  );
};

export default GradeList;
