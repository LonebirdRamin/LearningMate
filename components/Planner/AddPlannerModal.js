import { View, Text, Dimensions, FlatList,TextInput   } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import addPlannerModalStyles from "../../styles/addPlannerModalStyles";
import FormText from "../FormText";
import PlannerType from "./PlannerType";

const plannerType = ["Work", "Read", "Chill"];

const AddPlannerModal = ({ isModalVisible, setModalVisible }) => {
  const [title, setTitle] = useState("")
  const [selectedType, setSelectedType] = useState("Work");
  const [detail, setDetail] = useState("");
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
        <Text style={addPlannerModalStyles.headerText}>Add plan</Text>
        <View style={addPlannerModalStyles.formContainer}>

          {/* Start - Type */}
          <View>
          {/* Start - Header type */}
          <Text style={addPlannerModalStyles.subHeaderText}>Type</Text>
          {/* End - Header type */}

          {/* Start - All type display */}
          <View style={addPlannerModalStyles.typeContainer}>
              <FlatList
                keyExtractor={item=>item}
                contentContainerStyle={{columnGap: 10}}
                horizontal
                data={plannerType}
                renderItem={({item})=>{
                  return (
                    <>
                    <PlannerType
                      text={item}
                      selectedType={selectedType}
                      value={item}
                      setSelectedType={setSelectedType}
                    />
                    
                    </>
                  )
                }
                }
              />
          </View>
          {/* End - All type display */}
          </View>
          {/* Start - Type */}

          {/* Start - Title */}
          <View>
            <Text style={addPlannerModalStyles.subHeaderText}>
              Title
            </Text>
            <TextInput  style={addPlannerModalStyles.textBox} onChangeText={(text)=>{setTitle(text);}}/>
          </View>
          {/* End - Title */}

          {/* Start - Detail */}
          <View>
            <Text style={addPlannerModalStyles.subHeaderText}>
              Detail
            </Text>
            <TextInput  style={[addPlannerModalStyles.textBox, {height: Dimensions.get("screen").height*0.08}]} onChangeText={(text)=>{setDetail(text)}}/>
          </View>
          {/* End - Detail*/}

                

        </View>
      </View>
    </Modal>
  );
};

export default AddPlannerModal;
