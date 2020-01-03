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
import {myTheme} from '../src/assets/styles/Theme'



export class LoginFundacion extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props){
    super(props);
    const {navigation} = props;
    
    this.state = {
        usuario: '',
        contrasena: '',
        
        loading: true,
        show: false,
        
    }

}




     handleUser = (text) => this.setState({usuario: text})

     handlePassword = (text) => this.setState({contrasena: text})

    handleCode = (text) => this.setState({inputcode: text})

    render() {
        return (
            <View style={style.main}>
             
                
                <View style={style.boxheader}>

                    <View style={style.boxlogo}>
                        <Image source={require('../assets/img/fundacionlogo.jpg')} style={style.logo}/>
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
                        keyboardType='ascii-capable'
                        value={this.state.usuario}
                        maxLength={13}
                        placeholderTextColor='black'
                        onChangeText={this. handleUser}
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
                        onChangeText={this. handlePassword}
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
                            colorcustom={myTheme['color-primary-600']}
                            buttonStyle={
                                {
                                    marginTop:10,
                                
                                }

                            } 
                            onPress={()=>{
                                this.props.navigation.navigate('AppFundacion')
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
        marginTop: 10
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
        height: 220,
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
        marginTop: 0,
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

export default LoginFundacion
