import {StyleSheet, Dimensions } from 'react-native'

const height = Dimensions.get("screen").height
const width = Dimensions.get("screen").width

const customStyles = new StyleSheet.create({

    
    pageBackground:{ //For main page background
        backgroundColor: '#1C1C23',
        width: '100%',
        height: '100%'
    },

    pageTitleContainer:{ //Wrapper of page title
        width:'100%',
        justifyContent:'center',
        display:'flex',
        flexDirection: 'row',
        paddingTop: 32,
    }, 
    
    pageTitle: { //For title page on the top
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
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
        alignItems:'center',
        justifyContent: 'space-evenly'  
    },

    calendarContainer:{ //Wrapper for calendars widget
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    h1:{ //h1 fonts according to Figma (Use dev mode to see)
        color: '#FFF',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
    },

    h2: { //h2 fonts according to Figma (Use dev mode to see)
        color: '#FFF',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '600',
      },

    h3: { //h3 fonts according to Figma (Use dev mode to see)
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        letterSpacing: 0, 
        color: '#FFF', 
    },

    h4:{ //h4 fonts according to Figma (Use dev mode to see)
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0,
        color: '#FFF',
    },

    bodySmall: { //bodySmall fonts according to Figma (Use dev mode to see)
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
        letterSpacing: 0.2,
        color: '#A2A2B5',
    },

    customBox1:{ //A variant for dialog box ie. on top of home page wrapping the schedule.
        //Customize size or border radius using inline style
        borderRadius: 24,
        backgroundColor: '#353542',
    },

    eventsContainer:{ //Wrapper for the 2 upcoming events under the calendar
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 0.96,
    },

    eventWidget:{ //Each box for the event details
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 13,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },

    eventDetails:{ //Wrapper for the details in each event -> icons, name, and duration
        flexGrow:1,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },

    eventIcon:{ //Event box that contains the code such as CPE123
        width: 40,
        height: 40,
        flexShrink: 0,
        borderRadius: 12,
    },

    notficationIcon:{ //Bell icon on top right of page
        position:'absolute',
        right:23,
        top:33
    },

    classWidget: { //Class wrapper for LearningZone (Pre-select class)
        backgroundColor: 'rgba(78,78,97,0.2)',
        height: height*0.10,
        width: width*0.9,
        paddingVertical: height*0.014,
        paddingHorizontal: 17,
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: 'rgba(207,207,252, 0.2)',
        marginBottom: height*0.02
    },
})

export default customStyles