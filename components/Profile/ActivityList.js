import { View, Text, Image, Dimensions, FlatList } from 'react-native'
import React from 'react'
import profileStyles from '../../styles/profileStyle'
import DropDown from './DropDown';
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const ActivityList = ({data}) => {
  let i = 0;  
  return (
    <View>
      {/*Start - Semester haeder*/}
      <View style={profileStyles.gradeHeader}>
        
        <View style={[profileStyles.semester, {flex: 1, justifyContent: 'flex-end'}]}>
          <Image
          style={profileStyles.calendar}
          resizeMode="contain"
          source={require("../../assets/icons/calendar.png")}/>
          <Text style={profileStyles.text("#C1C1CD", height * 0.015, "500")}>
            Semester
          </Text>
          <DropDown/>  
        </View>
      </View>
      {/*End - Semester haeder*/}
      
      {/*Start -  Below list*/}
      <View style={profileStyles.list}>
        {/*Start -  List header*/}

        <View style={profileStyles.listHeader}>
            <Text
            style={[
                profileStyles.text("#C1C1CD", height * 0.015, "bold"),
                ,
            ]}
            >
            Activity
            </Text>
            <Text
            style={[
                profileStyles.text("#C1C1CD", height * 0.015, "bold"),
                ,
            ]}
            >
            Hours
            </Text>
        </View>
        {/*End -  List header*/}

        {/*Start - subject mapping */}
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginTop: height*0.01, maxHeight: height>850? height*0.55: height*0.5}}
          data={data}
          renderItem={({item})=>{
            i++;
            return (
              (
                <View style={profileStyles.wrapper} >
                  <View style={profileStyles.mapBox}>
                    <View>
                      <Text
                        style={[
                          profileStyles.text("white", height * 0.02, "600"),
                          { width: width * 0.5 },
                        ]}
                      >
                        {item.act}
                      </Text>
                    </View>
                    {/*Start - GradeCred */}
                    <View style={profileStyles.gradeCred}>
                      <Text
                        style={[
                          profileStyles.text("#F04E22", height * 0.025, "700"),
                        ]}
                      >
                        {item.hrs}
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
  )
}

export default ActivityList