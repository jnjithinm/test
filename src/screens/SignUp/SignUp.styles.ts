import { StyleSheet } from "react-native";
import colors from "../../config/Colors";

const styles=StyleSheet.create({
    container:{
        // justifyContent:'center',
        alignItems:'center',
        marginTop:'10%',
        height:'100%'
    },
    welcomeFont:{
        fontSize:24,
        color:colors.primarydark
    },
    input: {

        borderColor: 'black',
        borderWidth: .7,
        width:'75%',
        marginVertical: 15,
        borderRadius:15,
        paddingHorizontal:5
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