import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight ,ActivityIndicator, Alert } from 'react-native'
// import {TouchableOpacity} from 'react-native-gesture-handler'
import { Avatar, Icon, Input, Button } from 'react-native-elements';
import Database from '../database'
import {WebView} from 'react-native-webview'
import * as validUrl from 'valid-url';
import Odoo from 'react-native-odoo-promise-based'
import {Dialog} from 'react-native-simple-dialogs'
import moment from 'moment';
import {ButtonCustom} from '../components/index'
// import auth from '@react-native-firebase/auth';

//import * as firebase from 'firebase';
// import firebase from 'react-native-firebase';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

 


// var firebaseConfig = {
//     apiKey: "AIzaSyA-SF_q7fsX-AHXjqTCkh-V5kieN_EVWFU",
//     //authDomain: "tesisadopcion-2525f.firebaseapp.com",
//     databaseURL: "https://adopcionapppets.firebaseio.com",
//     projectId: "adopcionapppets",
//     storageBucket: "adopcionapppets.appspot.com",
//     messagingSenderId: "253581692222",
//     appId: "1:253581692222:android:32b2eccd99b1036904b06f",
//     //measurementId: "G-CN49WCNDPZ"
//   };
  // Initialize Firebase
  
  
  //firebase.app()
  //firebase.analytics();



export class LoginAdoptante extends Component {
  static navigationOptions = {
    header: null
  }
  componentDidMount(){
    
    // let user = {
    //     username: 'grace',
    //     password: '123'
    // }

        // Create a reference to the cities collection
    // let citiesRef = firebase.database()
    // alert(JSON.stringify(citiesRef,null,4))

    // Create a query against the collection
    // let queryRef = citiesRef.where('capital', '==', true);

    //let rootRef = firebase.database.ref();
    //let usersRef = rootRef.child("usuarios");
    

    let refUser = firebase.database().ref('usuarios')
    const arrayUser = refUser.on('value',snapshot => {
        // let snap = snapshot.val()
         alert(JSON.stringify(snapshot,null,4))
    })
    //alert(JSON.stringify(arrayUser,null,4))
    // const newUser = refUser.push()
    // newUser.set(user)
    

    //   fire.auth().signInWithEmailAndPassword('jose.cruz.alv97@gmail.com','reconocer97').then((user)=>{
    //              alert(JSON.stringify(user,null,4))
    //          }).catch((e)=>{
    //             alert('catch: '+JSON.stringify(e.message,null,4))
    //          });



    //   alert(JSON.stringify(firebase,null,4))
    //   firebase.auth().signInWithEmailAndPassword('jose.cruz.alv97@gmail.com','reconocer97').then((user)=>{
    //          alert(JSON.stringify(user,null,4))
    //      }).catch((e)=>{
    //         alert('catch: '+JSON.stringify(e,null,4))
    //      });

    //   firebase.analytics();
  }

  constructor(props){
    super(props);
    const {navigation} = props;

    // const user = auth().currentUser;
    // alert(user)

    
    // let app = 
    //firebase.app('AdopcionAppPets')
    // let app = firebase.initializeApp(firebaseConfig,'AdopcionAppPets')

    // alert(firebase.auth.length)

//    firebase.initializeApp()
    // firebase.initializeApp(firebaseConfig)
    // alert(JSON.stringify(app,null,4))
    // let app = firebase.initializeApp(firebaseConfig)
    // alert(JSON.stringify(app,null,4))
    //  app.auth().signInWithEmailAndPassword('jose.cruz.alv97@gmail.com','reconocer97').then((user)=>{
    //      alert(JSON.stringify(user,null,4))
    //  }).catch((e)=>{
    //     alert('catch: '+JSON.stringify(e,null,4))
    //  });
     //new Promise()
    //  alert(JSON.stringify(r,null,4))
    // alert(JSON.stringify(app,null,4))
    //app.auth().signInWithEmailAndPassword('jose.cruz.alv97@gmail.com','reconocer97')
    // firebase.auth().signInWithEmailAndPassword('jose.cruz.alv97@gmail.com','reconocer97')
    // let res = register('jose.cruz.alv97@gmail.com','reconocer97');
    // alert(JSON.stringify(r,null,4))
    
    this.unsubscriber = null;
    
    
    this.state = {
        usuario: '',
        contrasena: '',
        
        loading: true,
        show: false,
        user: null,
        
        
    }



}

// componentDidMount() {
//     this.unsubscriber = app.auth().onAuthStateChanged((user) => {
//       this.setState({ user });
//     });
//   }

//   componentWillUnmount() {
//     if (this.unsubscriber) {
//       this.unsubscriber();
//     }
//   }



    Login = () =>{
        // let fire = firebase.app('TesisAdopcion')

        // let email = this.state.usuario;
        // let password = this.state.contrasena;

        // fire.auth().signInWithEmailAndPassword(email,password).then((user)=>{
        //         this.props.navigation.navigate('AppAdoptante')
        //          alert(JSON.stringify(user,null,4))
        //      }).catch((e)=>{
        //         alert('catch: '+JSON.stringify(e.message,null,4))
        //      });




    }


     handleUser = (text) => this.setState({usuario: text})

     handlePassword = (text) => this.setState({contrasena: text})

    handleCode = (text) => this.setState({inputcode: text})

    render() {
        return (
            <View style={style.main}>
             
                
                <View style={style.boxheader}>

                    <View style={style.boxlogo}>
                        <Image source={require('../assets/img/img_menu.jpeg')} style={style.logo}/>
                    </View>
                

                    {/* <Image 
                    source={require('../assets/img/Mascotas-Felices-1.jpg')} 
                    style={style.picture}
                    resizeMode='cover'   
                    resizeMethod='auto'
                    /> */}
                     {/* <View style={style.box}>
                    

                    </View> */}

                    <View style={style.form}>
                    <Input
                        placeholder=' Usuario'
                        ref='usuarioInput'
                        keyboardType='email-address'
                        value={this.state.usuario}
                        // maxLength={13}
                        placeholderTextColor='black'
                        onChangeText={this.handleUser}
                        inputStyle={
                            {
                            color: 'black',
                            fontSize: 17
                            }
                        }
                        leftIcon={
                            <Icon
                            name='account-circle'
                            type='material'
                            size={20}
                            color='black'
                            />
                        }
                        
                        
                        />

                        <Input
                        placeholder=' Contraseña'
                        secureTextEntry={true}
                        value={this.state.contrasena}
                        onChangeText={this.handlePassword}
                        placeholderTextColor='black'
                        inputStyle={
                            {
                            color: 'black',
                            fontSize: 17
                            }
                        }
                        leftIcon={
                            <Icon
                            name='vpn-key'
                            type='material'
                            size={20}
                            color='black'
                            />
                        }
                        />
                        
                        <ButtonCustom  
                            title="Ingresar"
                            primary
                            buttonStyle={
                                {
                                    marginTop:10,
                                    borderRadius: 20
                                
                                }

                            }
                            onPress={()=>{
                                this.Login()
                            }}
                            
                           />
                    </View>

                </View>
 
            </View>
        )
    }
}


const style = StyleSheet.create({
    main:{
        flex:1,
    },
    boxheader:{
        flex:2,
        //width: '50%',
        //backgroundColor: 'skyblue',
        //borderBottomStartRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#A88C3D',
        //borderWidth: 4
        //height: 200
    },

    boxinfo:{
        flex: 6,
        borderTopColor: '#A88C3D',
        borderTopWidth: 4,
        //backgroundColor: 'red',
        zIndex: -1
    },
    picture:{
        width: '100%',
        height: '100%'
        //flex:1,
        //width: undefined, height: undefined
        
    },
    boxlogo1:{
        
        position:'absolute',
        top: 30, 
        left: 10,
        zIndex: 1001, 

    },
    boxlogo2:{
        
        position:'absolute',
        top: 10, 
        right: 30,
        zIndex: 1001, 

    },
    boxlogo:{
        marginTop: 20
       // position:'absolute',
        //top: 110, 
        
        //right: 30,
        //zIndex: 1001, 

    },
    box:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        // backgroundColor: 'rgba(0,31,77,0.78)',
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    logo:{
        resizeMode: 'stretch',
        height: 150,
        width: 300,
        //backgroundColor: 'white',
        //marginTop:20,
        //marginLeft: 25
        
      },
    logopasaport:{
        resizeMode: 'stretch',
        height: 60,
        width: 100,
        marginTop:20,
        //marginLeft: 25
        
      },
      logohotel:{
        resizeMode: 'stretch',
        width: 60,
        height: 55,
        marginTop: 20,
        //marginRight: 35
        
      },
      form:{
        // position: 'absolute',
        width: '70%',
        height: '30%',
        marginTop: 20,
        //top: 150,
        ///backgroundColor: 'rgba(255,255,255,0.8)',
        //backgroundColor: 'rgba(0,31,77,0.9)',
        borderRadius: 5
      },
      forgettext:{
          color: 'white',
          fontSize: 12,
          textAlign: 'center'
      },
      boxforget:{
          marginTop: 20
      },
      security:{
        width: 60,
        height: 60,
        //marginTop: 20
        
      },
      txtsec:{
        marginTop: 20,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold'
      },
      txtcontrasena:{
        marginTop: 20,
        textAlign: 'center',
        fontSize: 15,
        // fontWeight: 'bold'
      },
      txtwar:{
        fontSize: 12,
        marginTop: 5
      }
      
    
})

export default LoginAdoptante
