import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const customStyles = new StyleSheet.create({
    
    pageBackground:{
        backgroundColor: '#1C1C23',
        width: '100%',
        height: '100%'
    },
    
    pageTitle: { //For title page on the top
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 24, 
        letterSpacing: 0.2,
        color: '#A2A2B5',
        textAlign: 'center',
    },

    calendarWidget:{ //For interactable calendar blocks
        width: 42,
        height: 85,
        flexShrink: 0,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        backgroundColor: '#4E4E61',        
    },

    calendarContainer:{ //Wrapper for calendars widget
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    h3: { //h3 fonts according to Figma (Use dev mode to see)
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0, 
        color: '#FFF', 
    },

    h4:{ //h4 fonts according to Figma (Use dev mode to see)
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 32,
        letterSpacing: 0,
        color: '#FFF',
        textAlign: 'center',
    },

    bodySmall: { //bodySmall fonts according to Figma (Use dev mode to see)
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 0.2,
        color: '#A2A2B5',
        textAlign: 'center',
    },

    customBox1:{ //A variant for dialog box ie. on top of home page wrapping the schedule.
        //Customize size or border radius using inline style
        borderRadius: 24,
        backgroundColor: '#353542',
    }
})

export default customStyles