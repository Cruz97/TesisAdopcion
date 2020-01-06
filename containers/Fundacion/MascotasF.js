import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity,ScrollView } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {Image,Icon} from 'react-native-elements'
import ActionButton from 'react-native-action-button'
import { myTheme } from '../../src/assets/styles/Theme'
import Selection from '../../src/components/Selection'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'


const dropdownlist = [
    {
        key: '1',
        value: '1'
    },
    {
        key: '2',
        value: '2'
    }
]

export class MascotasF extends Component {

    static navigationOptions = {
        title: 'Mascotas',
        hideRightComponent: 'hide',
    }

    constructor(props){
        super(props);
        this.state={
            selected:'',
            fundaciones: []
        }
    }
    componentDidMount(){
        let arrayfoundation = []
        let refFoundation = firebase.database().ref('fundaciones')
        refFoundation.on('value',snapshot => {
         //    alert(JSON.stringify(snapshot.child('amigosconcola').val()))
         snapshot.forEach((data)=>{
             let fundacion = data.val()
             arrayfoundation.push(fundacion)
             // alert(JSON.stringify(data.val(),null,4))
         })
    
         this.setState ( {
             fundaciones: arrayfoundation
         })
        //  alert(JSON.stringify(arrayfoundation,null,4))
        })
    
       }
    render() {
        const fundaciones = Array.from(this.state.fundaciones)
        return (
        <View style={{flex:1}}>
            <ScrollView style={{flex:1}}>
            <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
            {
                    fundaciones.map((item)=>{
                       return(
                           
                                this.renderItem(item)
                           
                       )
                    })
                }
                 </View>
                {/* <Selection  
                items={dropdownlist} 
                title='Tipos' 
                selectedKey={false}   
                selectedValue={this.state.selected}  
                showValue={false}
                onValueChange={(itemValue, itemIndex) => {
                    this.setState({
                      selected: itemValue
                    })
                   
                }} */}
               
                {/* /> */}
            </ScrollView>
            <ActionButton
                    buttonColor={myTheme['color-primary-700']}
                    onPress={() => this.props.navigation.navigate('Publication') }
                    
                    position='right'
                    offsetX={10}
                    
                    />
            
            </View>
        )
    }

    renderItem = (item) => {
        
        return(
            <View style={style.boxitem}>
           
        <View style={style.item}>

        
               <View style={[style.boximg]}>
                       <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={()=> {}} >
                           <Image style={style.img} source={{uri: item.img}}  />
                       </TouchableOpacity>
               </View>
               <View style={style.boxinfo}>
                    <Text style={style.title}>Nombre Mascota</Text>
               </View>
               
               

           </View>
        </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor: 'red'
        // backgroundColor: '#f2f2f2',
        //paddingBottom: 40
    },
    boxitem:{
        //flex:2,
        // backgroundColor: 'blue',    
        //height: 250,
        width: '33%'
    },
    item:{
        flex: 2,
       // width: '100%',
        flexDirection: 'column',
        marginBottom: 20,
        marginLeft: 5,
        marginRight:5,
        marginTop: 10,
        borderRadius: 20,
        //resizeMode: 'c',
        overflow: 'hidden',
        height: 190,
        //width: '30%',
        borderColor: 'rgba(0,0,0,0.6)',
        backgroundColor: '#fff',
        
    
        shadowColor: "#8c8c8c",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
        height: 1,
        width: 1,
    },
    elevation: 10
       },
       boximg:{
        width: '100%',
        height: 150
        
       },
       boxinfo:{
        //flex:1,
        //paddingBottom: 60,
        //marginTop: 10
       },
       img:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        
       },
       title:{
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        //marginTop: 5,
        //marginBottom: 10
    },
    infofundacion:{
        fontSize: 13,
        textAlign: 'left',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10
    },
})

export default MascotasF
