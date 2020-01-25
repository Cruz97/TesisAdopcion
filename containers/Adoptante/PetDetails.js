import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import {Card, Button, Divider} from 'react-native-paper';
import { myTheme } from '../../src/assets/styles/Theme'
import { Avatar, Icon } from "react-native-elements";
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

export class PetDetails extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        const {navigation} = this.props;
        const pet = navigation.getParam('pet', null)
        var foundation = null;
        let refFoundation= firebase.database().ref('fundaciones/'+pet.keyfoundation);
        refFoundation.on('value',(snapshot)=>{
            //alert(JSON.stringify(snapshot,null,4))
            foundation = snapshot.val();
        })
        //alert(JSON.stringify(pet,null,4))
        //this.setState({pet})
        this.state={
            pet: pet,
            foundation: foundation
        }
    }

    componentDidMount(){
        const {navigation} = this.props;
        const pet = navigation.getParam('pet', null)
        var foundation = {};
        let refFoundation= firebase.database().ref('fundaciones/'+pet.keyfoundation);
        //alert(refFoundation)
        refFoundation.on('value',(snapshot)=>{
            //alert(JSON.stringify(snapshot,null,4))
            foundation = snapshot.val();
            this.setState({foundation})
            
        })
        //alert(JSON.stringify(foundation))
        this.setState({pet})
        //al
        //alert(JSON.stringify(pet,null,4))
        
    }

    render() {
        const pet = this.state.pet;
        //alert(this.state.foundation)
        // const foundation = this.state.foundation ? {} : ;
        //const {img} = this.state.foundation
        return (
            <View style={style.main}>
                 <View style={[style.boximg]}>
                      
                           <Image style={style.img} source={{uri: pet.value.picture}}  />
                       
               </View>
               <View style={[style.info]}>
                   <View style={style.boxIconFoundation}>
                    {/* <Text style={style.name}>{ pet.value.name }</Text> */}
                    <Avatar
                    size={90}
                    source={{uri: this.state.foundation === null ? 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' : this.state.foundation.img}}
                    rounded
                    containerStyle={{borderWidth:1, borderColor: myTheme['color-primary-800']}}
                    //title="MT"
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                    />
                   </View>
                   
               </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    main: {
        flex:1
    },
    boximg:{
        width: '100%',
        height: 250
        
       },
       img:{
           flex:1, 
           //width: undefined,
           //height: undefined,
           //resizeMode: 'stretch',
           //transform: [{scale: 0.5}]
           resizeMode: 'cover'
        //width: '100%',
        //height: '100%',
        //resizeMode: 'cover',
        
       },
    info: {
        //width: '100%',
        //height: 50,
        backgroundColor: myTheme['color-primary-700'],
        alignItems: 'flex-end',
        //marginRight: 40
    },
    boxIconFoundation:{
        position: 'absolute',
        top: -50,
        right: 20
        //marginHorizontal: 10,
        //marginVertical: 20,
        //alignContent: 'center'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#fff'
    }
})

export default PetDetails
