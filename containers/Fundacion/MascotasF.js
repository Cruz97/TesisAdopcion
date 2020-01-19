import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity,ScrollView, FlatList, PickerIOSItem } from 'react-native'
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
        const fundacion = firebase.auth().currentUser;
        let arraymascotas = []
        let refFoundation = firebase.database().ref('publicaciones/'+fundacion.uid)
        refFoundation.once('value',snapshot => {
         //    alert(JSON.stringify(snapshot.child('amigosconcola').val()))
         snapshot.forEach((data)=>{
             let mascota = data.val()
             arraymascotas.push(mascota)
             // alert(JSON.stringify(data.val(),null,4))
         })

         //alert(JSON.stringify(arrayfoundation,null,4))
    
        //  this.setState ( {
        //      mascotas: Array.from(arraymascotas)
        //  })
        //  alert(JSON.stringify(arrayfoundation,null,4))
        })
        this.state={
            selected:'',
            mascotas: arraymascotas
        }
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
        let arraymascotas = []
        let refFoundation = firebase.database().ref('publicaciones/'+fundacion.uid)
        refFoundation.on('child_added',snapshot => {
           // alert(JSON.stringify(snapshot,null,4))
            arraymascotas.push({key: snapshot.key,value: snapshot.val()})
         //    alert(JSON.stringify(snapshot.child('amigosconcola').val()))
        //  snapshot.forEach((data)=>{
        //      let mascota = data.val()
        //      arraymascotas.push(mascota)
        //      // alert(JSON.stringify(data.val(),null,4))
        //  })

         //alert(JSON.stringify(arrayfoundation,null,4))
    
         this.setState ( {
             mascotas: Array.from(arraymascotas)
         })
        //  alert(JSON.stringify(arrayfoundation,null,4))
        })

        refFoundation.on('child_changed',snapshot => {
            // alert(JSON.stringify(snapshot,null,4))
            //alert('algo cambio')
            let arrayAcual = this.state.mascotas;
            arrayAcual.map((item,index)=>{
                if(item.key === snapshot.key){
                    //alert('encontro el key :'+item.key+' => '+snapshot.key)
                    arrayAcual[index] = {key: snapshot.key, value: snapshot.val()}
                }
            })
            this.setState({mascotas: arrayAcual})

            //alert(JSON.stringify(snapshot,null,4))
            //  arraymascotas.push({key: snapshot.key,value: snapshot.val()})
          //    alert(JSON.stringify(snapshot.child('amigosconcola').val()))
         //  snapshot.forEach((data)=>{
         //      let mascota = data.val()
         //      arraymascotas.push(mascota)
         //      // alert(JSON.stringify(data.val(),null,4))
         //  })
 
          //alert(JSON.stringify(arrayfoundation,null,4))
     
        //   this.setState ( {
        //       mascotas: Array.from(arraymascotas)
        //   })
         //  alert(JSON.stringify(arrayfoundation,null,4))
         })
       
        
    }



    _keyExtractor = item => item.key;
    
    _renderItem = ({ item }) => this.renderItemPet(item)
    
    render() {
        //const mascotas = Array.from(this.state.mascotas)

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
                     numColumns={2}
                               />
                    

            
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
        const {key,value} = item;
        return(
            <View style={style.boxitem}>
           
        <View style={style.item}>

            {/* <TouchableOpacity> */}
               <View style={[style.boximg]}>
                       <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={()=> {alert(key)}} >
                           <Image style={style.img} source={{uri: value.picture}}  />
                       </TouchableOpacity>
               </View>
              
              <View style={style.boxinfo}>
                    <Text style={style.title}>{value.name}</Text>
                    <TouchableOpacity style={{marginRight: 10}}
                        onPress={()=>{
                            this.props.navigation.navigate('Publication',{pet: item, action: 'edit'})
                        }}
                    >
                        <Icon name='edit' size={26} color={myTheme['color-material-primary-400']} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name='delete-sweep' size={26} color={myTheme['color-material-primary-400']} />
                    </TouchableOpacity>
               </View>
              
               {/* </TouchableOpacity> */}
               
               

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
        width: '50%',
        //marginHorizontal: 10,
        
    },
    item:{
        //flex: 2,
       // width: '100%',
        flexDirection: 'column',
        marginBottom: 5,
        //marginLeft: 15,
        //marginRight:15,
        marginTop: 10,
        marginHorizontal: '5%',
        borderRadius: 5,
        //resizeMode: 'c',
        overflow: 'hidden',
        height: 210,
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
        height: 160,
       
        
       },
       boxinfo:{
           
        // flex:1,
        paddingVertical:10,
        paddingHorizontal: 10,
        
        flexDirection: 'row',
        //backgroundColor: myTheme['color-primary-600'],
        justifyContent: 'flex-start',
        //paddingBottom: 60,
        //marginTop: 10
       },
       img:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        
       },
       title:{
           flex:1,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'left',
        marginHorizontal: 10,
        color: myTheme['color-material-primary-500']
        //color: '#FFF'
       
        //marginTop: 5,
        //marginBottom: 10
    },
    infofundacion:{
        fontSize: 13,
        textAlign: 'left',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
    },
})

export default MascotasF
