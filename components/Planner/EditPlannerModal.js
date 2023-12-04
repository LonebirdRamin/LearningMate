import {
  View,
  Text,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-native-modal";
import addPlannerModalStyles from "../../styles/addPlannerModalStyles";
import FormText from "../FormText";
import PlannerType from "./PlannerType";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";
import AppButton from "../AppButton";
import DataContext from "../../routes/DataContext";
import editPlan from "../../backend/hooks/editPlan";
import deletePlan from "../../backend/hooks/deletePlan";
const plannerType = ["Work", "Read", "Chill"];

/*
  The component responsible for show the detail of editing planner detail.
*/
const EditPlannerModal = ({
  setMainPageLoad,
  isEditModalVisible,
  setModalVisible,
  setIsChanged,
  selectedPlan,
}) => {
  // Start - Information for plan
  const email = useContext(DataContext);
  const [title, setTitle] = useState();
  const [selectedType, setSelectedType] = useState();
  const [detail, setDetail] = useState();
  const [date, setDate] = useState(
    new Date(selectedPlan.date + " " + selectedPlan.time),
  );
  const [formattedDate, setFormattedDate] = useState(
    date.toLocaleString("default", { year: "numeric" }) +
      "-" +
      date.toLocaleString("default", { month: "2-digit" }) +
      "-" +
      date.toLocaleString("default", { day: "2-digit" }),
  );
  // End - Information for plan

  // Need to be change every time as the plan is selected since the modal information is changed
  useEffect(() => {
    setTitle(selectedPlan.title);
    setSelectedType(selectedPlan.type);
    setDetail(selectedPlan.subtitle);
    setDate(new Date(selectedPlan.date + " " + selectedPlan.time));
  }, [selectedPlan]);

  // New plan that will be edited to the DB
  const [editedPlan, setEditedPlan] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  // Start - Datetime zone
  useEffect(() => {
    setFormattedDate(
      date.toLocaleString("default", { year: "numeric" }) +
        "-" +
        date.toLocaleString("default", { month: "2-digit" }) +
        "-" +
        date.toLocaleString("default", { day: "2-digit" }),
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
  // End - Datetime zone

  // Start - Start adding plan if the newPlan is add
  useEffect(() => {
    if (editedPlan != undefined) {
      setMainPageLoad(true);
      editPlan(editedPlan, setIsLoading, setModalVisible, setIsChanged);
    }
  }, [editedPlan]);
  // End - Start adding plan if the newPlan is add

  const [isLoading, setIsLoading] = useState(false);
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
      isVisible={isEditModalVisible}
      animationInTiming={250}
      animationOutTiming={250}
      backdropTransitionInTiming={250}
      backdropTransitionOutTiming={250}
      style={addPlannerModalStyles.modalView}
    >
      <View
        style={[
          addPlannerModalStyles.modalContent,
          { height: Dimensions.get("screen").height * 0.58 },
        ]}
      >
        <Text style={addPlannerModalStyles.headerText}>Edit plan</Text>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size={60} color="#F04E22" />
          </View>
        ) : (
          <View style={addPlannerModalStyles.formContainer}>
            {/* Start - - Type */}
            <View>
              {/* Start - - Header type */}
              <Text style={addPlannerModalStyles.subHeaderText}>Type</Text>
              {/* End - - Header type */}

              {/* Start - - All type display */}
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
              {/* End - - All type display */}
            </View>
            {/* End - - Type */}

            {/* Start - - Title */}
            <View>
              <Text style={addPlannerModalStyles.subHeaderText}>Title</Text>
              <TextInput
                style={addPlannerModalStyles.textBox}
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                }}
              />
            </View>
            {/* End - - Title */}

            {/* Start - - Detail */}
            <View>
              <Text style={addPlannerModalStyles.subHeaderText}>Detail</Text>
              <TextInput
                value={detail}
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
            {/* End - - Detail*/}

            {/* Start - - date zone */}
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
            {/* End - - date zone */}

            {/* Start - - Time */}
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
                text="Edit"
                textColor="white"
                handlePress={() => {
                  if (title === "" || detail === "") {
                    Alert.alert(
                      "Planner",
                      "Please type in title and detail of this plan",
                      [{ text: "OK" }],
                    );
                  } else {
                    setEditedPlan({
                      plannerId: selectedPlan.id,
                      email: email,
                      eventType: selectedType,
                      plannerName: title,
                      description: detail,
                      dueDate:
                        formattedDate +
                        " " +
                        date.toLocaleTimeString("en-GB").slice(0, 5) +
                        ":00",
                    });
                  }
                }}
              />
              <View
                style={{ marginTop: Dimensions.get("screen").height * 0.02 }}
              >
                <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={() => {
                    Alert.alert(
                      "Delete plan",
                      "Are you sure you want to delete the plan?",
                      [
                        { text: "No" },
                        {
                          text: "Yes",
                          onPress: () => {
                            deletePlan(
                              {
                                plannerId: selectedPlan.id,
                                email: email,
                                title,
                              },
                              setIsLoading,
                              setModalVisible,
                              setIsChanged,
                            );
                          },
                        },
                      ],
                    );
                  }}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default EditPlannerModal;
