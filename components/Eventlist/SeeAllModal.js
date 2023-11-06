import { View, Text, Pressable} from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import customStyles from '../../styles/customStyles'
import AppButton from '../AppButton'
import EventList from '../EventList'


const SeeAllModal = (props) => {
  return (
    <Modal
    isVisible={props.isVisible}
    onBackButtonPress={()=>props.toggleModal(false)}
    onBackdropPress={()=>props.toggleModal(false)}
    >
        <View style={[customStyles.customBox1,{height:'80%',width:'100%',display:'flex',
        alignItems:'center'}]}>
            <EventList events={props.data}></EventList>
            <AppButton
            text="Close"
            bgColor={true}
            textColor="white"
            height={55}
            handlePress={()=>props.toggleModal(false)}
            style={{width:'90%'}}
            />
        </View>
    </Modal>
  )
}

export default SeeAllModal