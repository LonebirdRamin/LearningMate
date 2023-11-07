import React, { Component } from 'react'
import { StyleSheet , ScrollView, ActivityIndicator, View, Text } from 'react-native'
import { db } from '../../database/firebaseDB'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'
import { ThemeProvider, Button, Input, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'


class AddUserScreen extends Component {
    constructor() {
        super();
        this.dbRef = collection(db, 'react-native-crud');
        this.state = {
            name: "",
            email: "",
            mobile: "",
            isLoading: false
        }
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
        console.log(val);
    }

    async storeUser() {
        if (this.state.name === '') {
            alert('Please fill your name!');
        } else {
            this.setState({
                isLoading: true,
            });

            try {
                const newDocRef = doc(this.dbRef); // Create a new document reference
                await setDoc(newDocRef, {          // setDoc => update in new document
                    name: this.state.name,
                    email: this.state.email,
                    mobile: this.state.mobile,
                });

                this.setState({
                    name: '',
                    email: '',
                    mobile: '',
                    isLoading: false,
                });

                this.props.navigation.navigate('User');
            } catch (error) {
                console.error('Error adding document: ', error);

                this.setState({
                    isLoading: false,
                });
            }
        }
    }

    render() {
        return(
            <ThemeProvider theme={theme}>
                <ScrollView style={styles.container}>
                    <Image
                        source={{uri: 'https://cdn.discordapp.com/attachments/961842219730485250/1169679241768611970/download_4.jpg?ex=655647ae&is=6543d2ae&hm=e6b3d5f6ece76821daf7386992fee44397f8f1a53b3c11363b810716e394b243&'}}
                        style={{width: 200, height: 200}}
                        containerStyle={{marginLeft:'auto', marginRight: 'auto'}}
                    />
                    <Input
                        leftIcon={
                            <Icon
                                name='user-o'
                                size={20}
                                color='#F04E22'
                            />
                        }
                        placeholder={"  Name"}
                        value={this.state.name}
                        color='#F9F6EE'
                        onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                    />
                    <Input
                        leftIcon={
                            <Icon
                                name='envelope-o'
                                size={20}
                                color='#F04E22'
                            />
                        }
                        placeholder={"  Email"}
                        value={this.state.email}
                        color='#F9F6EE'
                        onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                    />
                    <Input
                        leftIcon={
                            <Icon
                                name='mobile'
                                size={30}
                                color='#F04E22'
                            />
                        }
                        placeholder={"  Phone no."}
                        value={this.state.mobile}
                        color='#F9F6EE'
                        onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}mobile
                    />
                    <Button
                        icon={
                            <Icon
                                name='check'
                                size={15}
                                color='white'
                            />
                        }
                        title=' Add user'
                        onPress={() => this.storeUser()}
                        buttonStyle={{
                            backgroundColor: "#F04E22"
                        }}
                    />
                    <Button
                        icon={
                            <Icon
                                name='users'
                                size={15}
                                color='white'
                            />
                        }
                        title=' Go to User list'
                        onPress={() => this.props.navigation.navigate('User')}
                        containerStyle={{
                            marginTop: 10
                        }}
                        buttonStyle={{
                            backgroundColor: "#393A3F"
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


export default AddUserScreen;