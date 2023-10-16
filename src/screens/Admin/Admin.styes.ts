import { StyleSheet } from "react-native";
import colors from "../../config/Colors";

const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    dobFont:{
        fontSize:17,
        color:colors.black
    },
    userNameFont:{
        fontSize:25,
        color:colors.lineargradientbutton2,
        fontWeight:'600'
    },
    mobileNumberFont:{
        fontSize:17,
        color:colors.black,
        fontWeight:'600'
    },
    emailIdFont:{
        fontSize:17,
        color:colors.primarydark
    }

})

export default styles