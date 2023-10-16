import { StyleSheet } from "react-native";
import colors from "../../config/Colors";

const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
    },
    welcomeFont:{
        fontSize:24,
        color:colors.primarydark
    },
    input: {
        width: 340,
        // height: 100,
        borderColor: 'black',
        borderWidth: .7,
        margin: 20,
        // padding:20
    },
    button: {
        backgroundColor: 'grey',
        width: 100,
        height: 30,
        alignItems: 'center'
    },
})

export default styles