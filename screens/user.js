import React, { Component } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native'
import { ListItem, Badge } from 'react-native-elements'
import { db } from '../database/firebaseDB'
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore'

class User extends Component {
    constructor() {
        super();

        this.firestoreRef = query(collection(db, 'react-native-crud'));
        this.state = {
            isLoading: true,
            userArr: []
        }
    }

    componentDidMount() {
        this.unsubscribe = onSnapshot(this.firestoreRef, this.getCollection);
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    getCollection = (querySnapShot) => {
        const userArr = [];
        querySnapShot.forEach((res) => {
            const { name, email, mobile } = res.data();
            userArr.push({
                key: res.id,
                res,
                name,
                email,
                mobile
            })
            this.setState({
                userArr,
                isLoading: false
            })
        })
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={StyleSheet.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E"/>
                </View>
            )
        }

        return(
            <ScrollView>
                {
                    this.state.userArr.map((item, i) => {
                        return (
                            <ListItem
                                key={i}
                                bottomDivider
                                onPress={() => {
                                    this.props.navigation.navigate('UserDetail', {
                                        userKey: item.key
                                    })
                                }}
                            >
                                <Badge
                                    value={i+1}
                                />
                                <ListItem.Content>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                    <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron/>
                            </ListItem>
                        ) 
                    })
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1C1C23',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default User;