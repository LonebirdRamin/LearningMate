import {
  View,
  Text,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import addPlannerModalStyles from "../../styles/addPlannerModalStyles";
import FormText from "../FormText";
import PlannerType from "./PlannerType";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";
import AppButton from "../AppButton";

const plannerType = ["Work", "Read", "Chill"];

const AddPlannerModal = ({ isModalVisible, setModalVisible, setIsAdded }) => {
  const [title, setTitle] = useState("");
  const [selectedType, setSelectedType] = useState("Work");
  const [detail, setDetail] = useState("");
  const [date, setDate] = useState(new Date(moment().format()));
  const [formattedDate, setFormattedDate] = useState(
    date.toLocaleString("default", { year: "numeric" }) +
      "-" +
      date.toLocaleString("default", { month: "2-digit" }) +
      "-" +
      date.toLocaleString("default", { day: "2-digit" })
  );
  const [newPlan, setNewPlan] = useState({});
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  useEffect(() => {
    setFormattedDate(
      date.toLocaleString("default", { year: "numeric" }) +
        "-" +
        date.toLocaleString("default", { month: "2-digit" }) +
        "-" +
        date.toLocaleString("default", { day: "2-digit" })
    );
  }, [date]);

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <Modal
      onBackdropPress={() => {
        setModalVisible(false);
        setDate(new Date(moment().format()));
        setSelectedType("Work");
        
      }}
      onBackButtonPress={() => {
        setModalVisible(false);
        setDate(new Date(moment().format()));
        setSelectedType("Work");

      }}
      isVisible={isModalVisible}
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
                keyExtractor={(item) => item}
                contentContainerStyle={{ columnGap: 10 }}
                horizontal
                data={plannerType}
                renderItem={({ item }) => {
                  return (
                    <>
                      <PlannerType
                        text={item}
                        selectedType={selectedType}
                        value={item}
                        setSelectedType={setSelectedType}
                      />
                    </>
                  );
                }}
              />
            </View>
            {/* End - All type display */}
          </View>
          {/* Start - Type */}

          {/* Start - Title */}
          <View>
            <Text style={addPlannerModalStyles.subHeaderText}>Title</Text>
            <TextInput
              style={addPlannerModalStyles.textBox}
              onChangeText={(text) => {
                setTitle(text);
              }}
            />
          </View>
          {/* End - Title */}

          {/* Start - Detail */}
          <View>
            <Text style={addPlannerModalStyles.subHeaderText}>Detail</Text>
            <TextInput
              textAlignVertical="top"
              multiline={true}
              style={[
                addPlannerModalStyles.textBox,
                {
                  height: Dimensions.get("screen").height * 0.08,
                  paddingVertical: Dimensions.get("screen").height * 0.01,
                },
              ]}
              onChangeText={(text) => {
                setDetail(text);
              }}
            />
          </View>
          {/* End - Detail*/}

          {/* Start - date zone */}
          <View style={addPlannerModalStyles.dateTimeContainer}>
            <TouchableOpacity
              onPress={showDatepicker}
              style={addPlannerModalStyles.date}
            >
              <Image
                style={addPlannerModalStyles.icon}
                resizeMode="contain"
                source={require("../../assets/icons/calendar.png")}
              />
              <Text style={addPlannerModalStyles.dateTimeText}>Date:</Text>
              <Text style={addPlannerModalStyles.dateTimeText}>
                {formattedDate}
              </Text>
            </TouchableOpacity>
          </View>
          {/* End - date zone */}

          {/* Start - Time */}
          <View style={addPlannerModalStyles.dateTimeContainer}>
            <TouchableOpacity
              onPress={showTimepicker}
              style={addPlannerModalStyles.date}
            >
              <Image
                style={addPlannerModalStyles.icon}
                resizeMode="contain"
                source={require("../../assets/icons/clock.png")}
              />
              <Text style={addPlannerModalStyles.dateTimeText}>Time:</Text>
              <Text style={addPlannerModalStyles.dateTimeText}>
                {date.toLocaleTimeString("en-GB").slice(0, 5)}
              </Text>
            </TouchableOpacity>
          </View>
          {/* End- Time */}

          <View style={addPlannerModalStyles.buttonContainer}>
            <AppButton
              text="Add"
              textColor="white"
              handlePress={() => {
                // if(title === "" || detail === "")
                // {
                //   Alert.alert("Planner", "Please type in title and detail of this plan", [{text: 'OK'}])
                // }
                console.log(
                  selectedType +
                    " " +
                    title +
                    " " +
                    detail +
                    " " +
                    formattedDate +
                    " " +
                    date.toLocaleTimeString("en-GB").slice(0, 5)
                );
                
                setIsAdded(true);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddPlannerModal;
