import { StyleSheet,Dimensions } from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
export const COLOR = {

    BLUE: "#1e244a", // email box color
    RED: "#ea4335",
    YELLOW: "#fff673",
    LIGHTBLUE:"#0096da",
    GREEN:"#58d263"

};

export default StyleSheet.create({
    container: {
        flex: 1,
       
      },
      eventcontainer: {
        flex: 1,
        // alignItems:'center'
      marginLeft:10,
      marginRight:10
      },
      cardView: {
        width: width-20,  
        height: height / 2 - 100 ,
        marginTop:30
      },
      eventImgSize: {
        minHeight: 120,
        width:width - 20
      },
      inputView: {
        width : width-20, 
       
        justifyContent:'center',
        height:60,
        //alignItems: 'center',
       
        borderWidth:1,
        paddingLeft:10,
        marginVertical:10
 
    },
    inputView1: {
      width : width-20, 
      justifyContent:'center',
      minHeight:100,
      //alignItems: 'center',
      borderWidth:1,
      paddingLeft:10,
      marginVertical:10

  },
  fontSize:{
    
  }
  
 
   
});