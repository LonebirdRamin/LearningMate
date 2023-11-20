import { 
  View,
  Text, 
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image } from 'react-native'
import React from 'react'
import profileStyles from '../../styles/profileStyle'
import customStyles from '../../styles/customStyles'
const height = Dimensions.get("screen").height
const width = Dimensions.get("screen").width

const FileRecordList = ({data, type = 'student'}) => {
    const maxLength = 25;
    const truncate = (text,maxLength)=>{
      if(text.length > maxLength){
        return text.slice(0,maxLength)+'...'
      }
      return text
    }

    const formatDate = (data)=>{
      const date = new Date(data);
      return date.toLocaleDateString('en-GB');
    }

    if(data.length == 0){
      return (
        <View>
          <View style={{display:'flex',
          flexDirection:'row',alignItems:'center',justifyContent:'center',paddingVertical:'5%'}}>
            <Text style={customStyles.h2}>No file</Text>
          </View>
        </View>
      )
    }
  
  
    return (
      <FlatList
      data={data}
      nestedScrollEnabled={true}
      renderItem={({item,index})=>(
        <View>
          <View style={{display:'flex',
          flexDirection:'row',alignItems:'center',paddingTop:'5%'}}>
            <Text style={[customStyles.h2,{flex:1}]}>{truncate('Name here Bla bla bla bla bla bla bla',maxLength)}</Text>
            <TouchableOpacity>
              <Image
                source={type == 'student'? (require("../../assets/icons/download.png")):
              (require('../../assets/icons/threedots.png'))}
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={{display:'flex',
          flexDirection:'row',alignItems:'center',paddingBottom:'5%',paddingTop:'2%'}}>
            <View style={[customStyles.assignmentButton,
                { borderWidth: 1, borderStyle: 'solid', borderColor: '#353542',
                  display:'flex',flexDirection:'row', width:'100%',
                  justifyContent:'space-between' }]}>
                <Text style={customStyles.h2}>UPLOAD DATE</Text>
                <Text style={customStyles.h2}>69/69/6969</Text>
            </View>
          </View>
            {index!=data.length -1 && <View style={profileStyles.line}/>}
        </View>
        )}
        />
    )
}

export default FileRecordList