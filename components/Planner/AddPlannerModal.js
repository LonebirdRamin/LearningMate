import { View, Text } from 'react-native'
import React from 'react'
import Modal from "react-native-modal"
import addPlannerModalStyles from '../../styles/addPlannerModalStyles'

const AddPlannerModal = ({isModalVisible, setModalVisible}) => {
  return (
    <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        swipeDirection="down"
        
        animationInTiming={250}
        animationOutTiming={250}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={250}
        style={addPlannerModalStyles.modalView}
      >
        {/* <View style={modalStyles.modalContent}>
          <View style={modalStyles.center}>
            <View style={modalStyles.barIcon} />
            <View style={modalStyles.wrapper}>
              <Text style={modalStyles.text}>Comfirm registration</Text>
              <AppButton handlePress={handleConfirm} text="Confirm" textColor="white" height={60}/>
              <AppButton handlePress={handleDecline} text="Decline" textColor="white" height={60} bgColor={false} style={{borderWidth: 0.4, borderColor: 'rgba(255,255,255, 0.3)'} }/>

            </View>
          </View>
        </View> */}
        <View style={addPlannerModalStyles.modalContent}>
            <Text>
                Modal
            </Text>
        </View>
      </Modal>
  )
}

export default AddPlannerModal