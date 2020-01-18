import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity,ScrollView, FlatList } from 'react-native'
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

export class HomeAdoptante extends Component {

    static navigationOptions = {
        title: 'Mascotas',
        hideRightComponent: 'hide',
    }

    constructor(props){
        super(props);
        this.state = {
            mascotas: []
        }
       

        
       //alert(JSON.stringify(mascotas))

        // this.state={
        //     selected:'',
        //     mascotas: mascotas
        // }
    }

    // componentDidUpdate(prevProps){
    //     if(this.state.mascotas !== prevProps.mascotas){
    //         //this.setState({mascotas: prevProps.mascotas})
    //     }
    //     else{
    //         this.setState({mascotas: []})
    //     }
    // }

    componentDidMount(){
        const fundacion = firebase.auth().currentUser;
        let mascotas = [];
        let refFoundation = firebase.database().ref('publicaciones/')
        //alert(refFoundation.key);
        refFoundation.on('value',(snapshot) => {
            var arrayKeyFoundation = [];
            snapshot.forEach((childSnapshot) =>{
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                arrayKeyFoundation.push(key)
            });
            let refMascotas = firebase.database().ref('publicaciones/'+arrayKeyFoundation[0]);
            refMascotas.on('value',(snapshot)=>{
                let arraymascotas = [];
                snapshot.forEach((childSnapshot) =>{
                    // key will be "ada" the first time and "alan" the second time
                    //var key = childSnapshot.key;
                    // childData will be the actual contents of the child
                    var dataMascota = childSnapshot.val();
                    arraymascotas.push(dataMascota)
                });
                //alert(JSON.stringify(arraymascotas,null,4))
               // mascotas = arraymascotas;
                this.setState({
                    mascotas: arraymascotas
                })
            })
            //alert(arrayKeyFoundation)
        })
        
    }



    _keyExtractor = item => item.name;
    
    _renderItem = ({ item }) => this.renderItemPet(item)
    
    render() {
        const mascotas = this.state.mascotas
        //alert(JSON.stringify(mascotas,null,4))
        return (
        <View style={{flex:1}}>
            {/* <ScrollView style={{flex:1}}> */}
            {/* <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
            {
                    mascotas.map((item)=>{
                       return(
                           
                                this.renderItem(item)
                           
                       )
                    })
                }
                 </View> */}

                 
                     <FlatList
                     style={{flex:1}}
                     data={this.state.mascotas}
                     keyExtractor={this._keyExtractor}     //has to be unique   
                     renderItem={this._renderItem} //method to render the data in the way you want using styling u need
                     horizontal={false}
                     numColumns={3}
                               />
                    

                
            
            


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
            {/* </ScrollView> */}
            <ActionButton
                    buttonColor={myTheme['color-primary-700']}
                    onPress={() => this.props.navigation.push('Publication') }
                    
                    position='right'
                    offsetX={10}
                    offsetY={5}
                    
                    />
            
            </View>
        )
    }

    renderItemPet = (item) => {
        
        return(
            <View style={style.boxitem}>
           
        <View style={style.item}>

        
               <View style={[style.boximg]}>
                       <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={()=> {}} >
                           <Image style={style.img} source={{uri: item.picture}}  />
                       </TouchableOpacity>
               </View>
               <View style={style.boxinfo}>
                    <Text style={style.title}>{item.name}</Text>
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
        marginBottom: 5,
        marginLeft: 2,
        marginRight:2,
        marginTop: 2,
        borderRadius: 0,
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
           
        flex:1,
        backgroundColor: myTheme['color-primary-600'],
        justifyContent: 'center'
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
        color: '#FFF'
       
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

export default HomeAdoptante;
