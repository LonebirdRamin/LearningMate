import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import customStyles from '../../styles/customStyles'
const height = Dimensions.get("screen").height
const width = Dimensions.get("screen").width

const ClassList = ({data,navigation,destination}) => {

    const maxLength = 30;
    const truncate = (text,maxLength)=>{
      if(text.length > maxLength){
        return text.slice(0,maxLength)+'...'
      }
      return text
    }


  return (
    <View style={customStyles.eventsContainer}>
        <FlatList
        style={{marginBottom: height*0.1}}
        data={data}
        renderItem={({item})=>(
            <TouchableOpacity style={customStyles.classWidget} 
            onPress={()=>navigation.navigate(destination,{class_:item})}>
                <View style={customStyles.eventDetails}>
                    <View style={[customStyles.eventIcon,{backgroundColor:'#F04E22',alignItems:'center'}]}>
                        <Text style={customStyles.h2}>{item.class_id.substring(0,3)}</Text>
                        <Text style={customStyles.h2}>{item.class_id.substring(3,6)}</Text>
                    </View>
                    <View style={{display:'flex',flexGrow:1,paddingLeft:10}}>
                        <Text style={customStyles.h2}>{truncate(item.class_name,maxLength)}</Text>
                    </View>
                    <Image source={require('../../assets/icons/arrowRight.png')}></Image>
                </View>
            </TouchableOpacity>
        )}
        ></FlatList>
    </View>
        )
}

export default ClassList