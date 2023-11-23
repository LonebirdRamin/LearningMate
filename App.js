import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, params } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddUserScreen from './screens/addUser';
import User from './screens/user';
import UserDetail from './screens/userDetail';
import loginScreen from './screens/login';
import departmentList from './screens/departmentList';
import ScheduleScreen from './screens/scheduleScreens';
import AssignmentPage from './screens/assignmentGuide';
import PostAssignment from './screens/postAssignment';
import PlannerScreen from './screens/plannerScreen';
import SubmitAssignment from './screens/submitAssignment';
import GradeScreen from './screens/gpax_hook';
import PostAnnouncement from './screens/postAnnouncement';
import UploadMedia from './screens/uploadMedia';
import chatFirebase from './screens/chatFirebase';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Stack = createStackNavigator();

const CustomHeader = ({ title }) => (
  <View style={{ backgroundColor: '#353542', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 60 }}>
    {/* Use the title prop here */}
    <CenteredTitle title={title} />
  </View>
);

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
      header: (props) => (
        // Use route.name to get the active screen name
        <CustomHeader title={route.name} />
        ),
        headerStyle: {
          backgroundColor: '#353542'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
      })}
      >
        {/* <Stack.Screen
          name="ChatFirebase"
          component={chatFirebase}
          options={{title: 'Chat Screen'}}
        /> */}
        {/* <Stack.Screen
          name="Chat"
          component={Chat}
          options={{title: 'Chat Screen'}}
        /> */}
        <Stack.Screen
          name="UploadMedia"
          component={UploadMedia}
          options={{title: 'Upload Media'}} 
        />
        <Stack.Screen
          name="LoginScreen"
          component={loginScreen}
          options={{title: 'Register/Login'}}
        />
        <Stack.Screen
          name="departmentList"
          component={departmentList}
          options={{title: 'Department List'}}
        />
        <Stack.Screen
          name="AssignmentPage"
          component={AssignmentPage}
          options={{title: 'Assignment Page'}}
        />
        <Stack.Screen
          name="AddUserScreen"
          component={AddUserScreen}
          options={{title: 'Add User'}}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{title: 'User'}}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetail}
          options={{title: 'User Details'}}
        />
        <Stack.Screen
          name="ScheduleScreen"
          component={ScheduleScreen}
          options={{title: 'Schedule'}}
        />
        <Stack.Screen
          name="PostAssignment"
          component={PostAssignment}
          options={{title: 'Post assignment'}}
        />
        <Stack.Screen
          name="PlannerScreen"
          component={PlannerScreen}
          options={{title: 'Planner Screen'}}
        />
        <Stack.Screen
          name="SubmitAssignment"
          component={SubmitAssignment}
          options={{title: 'Submit Assignment'}}
        />
        <Stack.Screen
          name="GradeScreen"
          component={GradeScreen}
          options={{title: 'Grade'}}
        />
        <Stack.Screen
          name="PostAnnouncement"
          component={PostAnnouncement}
          options={{title: 'Post Announcement'}} 
        />
        {/* <Stack.Screen
          name="chat"
          component={chat}
          options={{title: 'Chat Screen'}}
        /> */}
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C23',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CenteredTitle = ({ title }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
  </View>
);