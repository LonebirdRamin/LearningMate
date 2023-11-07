import { View, Text, StyleSheet, Pressable, TouchableOpacity, Touchable, FlatList } from 'react-native'
import { React, useState } from 'react'
import customStyles from '../styles/customStyles'

const EventList = (props) => {

  return (
    <View style={customStyles.eventsContainer}>
      <FlatList
        data={props.events}
        renderItem={({item})=>(
          <TouchableOpacity style={customStyles.eventWidget}>
            <View style={customStyles.eventDetails}>
              <View style={[customStyles.eventIcon,{backgroundColor:'#F04E22',alignItems:'center'}]}>
                <Text style={customStyles.h2}>{item.code.substring(0,3)}</Text>
                <Text style={customStyles.h2}>{item.code.substring(3,6)}</Text>
              </View>
                <Text style={customStyles.h2}>{item.name}</Text>
                <Text style={[customStyles.h1,{lineHeight: 20.5}]}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      
      {/* <TouchableOpacity onPress={()=>setSeeAll(!seeAll)}>
        <Text style={customStyles.bodySmall}>See all...</Text>
      </TouchableOpacity>

      <SeeAllModal 
      isVisible={seeAll}
      toggleModal={setSeeAll}
      ></SeeAllModal> */}
    </View>
  )
}

export default EventList