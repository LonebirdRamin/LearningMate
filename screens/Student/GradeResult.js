import { View, Text, Dimensions, ScrollView, FlatList } from "react-native";
import React from "react";
import globleStyles from "../../styles/globleStyles";
import InfoBox from "../../components/Profile/InfoBox";
import profileStyles from "../../styles/profileStyle";
import InfoBoxLineStudent from "../../components/Profile/InfoBoxLineStudent";
import GradeList from "../../components/Profile/GradeList";
import DropDownGrade from "../../components/Profile/DropDownGrade";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const data = [
  {
    code: "CPE301",
    sub: "Professional Issues For Engineers",
    grade: "A",
    credit: 1
  },
  {
    code: "CPE333",
    sub: "Operating System",
    grade: "A",
    credit: 3
  },
  {
    code: "CPE334",
    sub: "Software Engineering",
    grade: "F",
    credit: 3
  },
  {
    code: "CPE371",
    sub: "Big Data Engineering",
    grade: "B+",
    credit: 3
  },
  {
    code: "GEN241",
    sub: "Beauty Of Life",
    grade: "A",
    credit: 3
  },
  {
    code: "GEN341",
    sub: "Thai Indiginous Knowledge",
    grade: "C",
    credit: 3
  },
  
  {
    code: "PRE380",
    sub: "Engineering Economics",
    grade: "D",
    credit: 3
  },
  {
    code: "PRE380",
    sub: "Engineering Economics",
    grade: "D",
    credit: 3
  },
  {
    code: "PRE380",
    sub: "Engineering Economics",
    grade: "D",
    credit: 3
  },
]

const GradeResult = () => {
  return (
    <View style={[globleStyles.pageContainer, { paddingTop: height * 0.03 }]}>
        <View style={[profileStyles.scrollContainer]}>
                <GradeList data={data} gpa={3.92} gpax={3.81}/>
            
        </View>
    </View>
  );
};

export default GradeResult;
