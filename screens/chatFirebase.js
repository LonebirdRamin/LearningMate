import React, { useState, useEffect, useLayoutEffect, useCallback }from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { collection,addDoc,orderBy,query,onSnapshot } from 'firebase/firestore'
import {signOut} from 'firebase/auth'
import { firebaseAuth, db } from '../database/firebaseDB'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'

export default function chatFirebase() {
    const [messages, setMessages] = useState([])
    const navigation = useNavigation()

    const onSignout = () => {
        signOut(firebaseAuth).catch((error) => {
            console.log(error)
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={onSignout} style={{ marginRight: 10 }}>
                    <AntDesign name="logout" size={24} color="black" style={{marginRight: 10}}/>
                </TouchableOpacity>
            )
        })
    })

    useLayoutEffect(() => {
        const collectionRef = collection(db, 'messages')
        const q = query(collectionRef, orderBy('createdAt', 'desc'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log('snapshot')
            setMessages(
                snapshot.docs.map((doc) => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            )
        })
        return () => unsubscribe()
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const { _id, createdAt, text, user } = messages[0]
        const message = {
            _id,
            createdAt,
            text,
            user
        }
        addDoc(collection(db, 'messages'), message)
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: firebaseAuth?.currentUser?.email,
                avatar: 'https://i.pravatar.cc/300'
            }}
            messagesContainerStyle={{ backgroundColor: '#fff' }}
        />
    )

}