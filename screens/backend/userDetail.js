import React, { Component } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Alert } from 'react-native'
import { ListItem, Badge } from 'react-native-elements'
import { db } from '../../database/firebaseDB'
import { getFirestore, collection, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { ThemeProvider, Button, Input, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class UserDetail extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            mobile: '',
            isLoading: true
        }
    }

    componentDidMount() {
        const dbRef = doc(db, 'react-native-crud', this.props.route.params.userKey)
        getDoc(dbRef).then((res) => {
            if (res.exists) {
                const user = res.data();
                this.setState({
                    key: res.id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    isLoading: false
                })
            }
            else {
                console.log("Document doesnt exist!")
            }
        })
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
        console.log(val);
    }

    updateUser() {
        this.setState({
            isLoading: true
        })

        const updateDbRef = doc(db, 'react-native-crud', this.state.key);

        const updatedData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
        }

        updateDoc(updateDbRef, updatedData)
        .then((docRef) => {
            this.setState({
                key: '',
                name: '',
                email: '',
                mobile: '',
                isLoading: false
            })
            this.props.navigation.navigate("User");
        })
        .catch((err) => {
            console.error("Error");
            isLoading: false
        })
    }

    deleteUser() {
        const dbRef = doc(db, 'react-native-crud', this.state.key)
        deleteDoc(dbRef).then((res) => {
            console.log("Item removed from database");
            this.props.navigation.navigate("User");
        })
    }

    openTwoButtonAlert = () => {
        Alert.alert(
            'Delete User',
            'Are you sure?',
            [
                {text: 'Yes', onPress: () => this.deleteUser()},
                {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'}
            ],
            {
                cancelable: true
            }
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E"/>
                </View>
            )
        }
        return(
            <ThemeProvider theme={theme}>
                <ScrollView style={styles.container}>
                    <Input 
                        placeholder={'  Name'}
                        value={this.state.name}
                        color='#F9F6EE'
                        onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                        leftIcon={
                            <Icon
                                name='user-o'
                                size={20}
                                color='#F04E22'
                            />
                        }
                    />
                    <Input
                        placeholder={'  Email'}
                        value={this.state.email}
                        color='#F9F6EE'
                        onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                        leftIcon={
                            <Icon
                                name='envelope-o'
                                size={20}
                                color='#F04E22'
                            />
                        }
                    />
                    <Input
                        placeholder={'  Phone no.'}
                        value={this.state.mobile}
                        color='#F9F6EE'
                        onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
                        leftIcon={
                            <Icon
                                name='mobile'
                                size={30}
                                color='#F04E22'
                            />
                        }
                        />
                    <Button
                    icon={
                        <Icon
                            name="wrench"
                            size={15}
                            color="#fff"
                        />
                    }
                    title=' Update'
                    onPress={() => this.updateUser()}
                    />
                    <Button
                    icon={
                        <Icon
                            name="trash"
                            size={15}
                            color="#fff"
                        />
                    }
                    title=' Delete'
                    onPress={() => this.openTwoButtonAlert()}
                    containerStyle={{
                        marginTop: 10
                    }}
                    buttonStyle={{
                        backgroundColor: "red"
                    }}
                    />
                </ScrollView>
            </ThemeProvider>
        )
    }
}

const theme = {
    Button: {
        raised: true
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        backgroundColor: "#1C1C23"
    },
    preloader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default UserDetail;