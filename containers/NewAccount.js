import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Alert } from 'react-native'
import { Icon, Input} from 'react-native-elements';
import {ButtonCustom} from '../components/index'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import {myTheme} from '../src/assets/styles/Theme'

export class NewAccount extends Component {
    static navigationOptions = {
        // title: 'Registrarse',
        header: null
    }

    constructor(props){
        super(props);

        this.state={
            uid: '',
            nombres: '',
            apellidos: '',
            correo: '',
            contrasena: '',
            contrasena2: '',
            
        }
    }

    handleName = (text) => this.setState({nombres: text})
    handleLastName = (text) => this.setState({apellidos: text})
    handleEmail = (text) => this.setState({correo: text})

    handlePassword = (text) => this.setState({contrasena: text})
    handlePassword2 = (text) => this.setState({contrasena2: text})

    createUser = () => {
        const email = this.state.correo;
        const password = this.state.contrasena;
        const name = this.state.nombres;
        const lastname = this.state.apellidos;

        if(name == '' || lastname == '' || email == '' || password == ''){
            Alert.alert('Información Requerida', 'Por favor ingrese toda la información')
            return
        }


        firebase.auth().createUserWithEmailAndPassword(
            email, password
        ).then(userCredentials => {
            //Si es un nuevo usuario
            if(userCredentials.additionalUserInfo.isNewUser){
                //Se guarda en la DB Real Time
                let uid = userCredentials.user.uid;
                let refUser = firebase.database().ref('usuarios/'+uid)
    
                //Crea un objeto usuario sino existe, y si existe modifica sus campos
                refUser.set({
                    // username: 'Josecruz',
                    email: userCredentials.user.email,
                    photo: userCredentials.user.photoURL,
                    phone: userCredentials.user.phoneNumber,
                    displayName: userCredentials.user.displayName,
                    typeUser: 'adopter',
                    name,
                    lastname
                    
                  }).then(()=>{
                      firebase.auth().signInWithEmailAndPassword(
                          userCredentials.user.email,
                          this.state.contrasena
                      ).then(user =>{
                        //   alert(JSON.stringify(user,null,4))
                          this.props.navigation.navigate('Loading')
                      }).catch(error => {
                          alert(error.message)

                      })

                      alert('Usuario creado en la BD Real Time')
                  }).catch(error =>{
                      alert('Ocurrio algo '+JSON.stringify(error,null,4))
                  });

            }

            // let uid = userCredentials.user.uid
            // alert(JSON.stringify(userCredentials.additionalUserInfo,null,4))
        }).catch(error => {
            alert(JSON.stringify(error.code,null,4))
        })
    }

    render() {
        return (
            <View style={style.main}>
                <View style={style.boxlogo}>
                        <Image source={require('../assets/img/img_menu.jpeg')} style={style.logo}/>
                    </View>
                <View style={style.form}>
                <Input
                        
                        placeholder=' Nombres'
                        keyboardType='ascii-capable'
                        // secureTextEntry={true}
                        value={this.state.nombres}
                        onChangeText={this.handleName}
                        placeholderTextColor='black'
                        inputStyle={
                            style.input
                        }
                       
                        />
                <Input
                
                        placeholder=' Apellidos'
                        keyboardType='ascii-capable'
                        // secureTextEntry={true}
                        value={this.state.apellidos}
                        onChangeText={this.handleLastName}
                        placeholderTextColor='black'
                        inputStyle={
                            style.input
                        }
                        
                        />
                {/* <Input
                
                        placeholder=' Dirección'
                        keyboardType='email-address'
                        // secureTextEntry={true}
                        value={this.state.correo}
                        onChangeText={this.handleEmail}
                        placeholderTextColor='black'
                        inputStyle={
                            style.input
                        }
                        
                        /> */}
                <Input
                
                        placeholder=' Correo Electrónico'
                        keyboardType='email-address'
                        // secureTextEntry={true}
                        value={this.state.correo}
                        onChangeText={this.handleEmail}
                        placeholderTextColor='black'
                        inputStyle={
                            style.input
                        }
                        // leftIcon={
                        //     <Icon
                        //     name='email'
                        //     type='material'
                        //     size={20}
                        //     color='black'
                        //     />
                        // }
                        />

                    <Input
                    
                        placeholder=' Contraseña'
                        secureTextEntry={true}
                        value={this.state.contrasena}
                        onChangeText={this.handlePassword}
                        placeholderTextColor='black'
                        inputStyle={
                            style.input
                        }
                        />
                     <Input
                    
                    placeholder=' Confirmar Contraseña'
                    secureTextEntry={true}
                    value={this.state.contrasena2}
                    onChangeText={this.handlePassword2}
                    placeholderTextColor='black'
                    inputStyle={
                        style.input
                    }
                    />

                    <ButtonCustom  
                            title="Registrarse"
                            colorcustom={myTheme['color-primary-700']}
                            buttonStyle={
                                style.button

                            }
                            onPress={()=>{
                                this.createUser()
                                
                            }}
                            
                           />

                    <View style={style.boxterminos}>
                        <Text style={style.terminos}>
                            Acepto los Términos y Condiciones de uso, la Política de Privacidad de los Datos de AdopciónPG
                        </Text>
                    </View>

                </View>
                
            </View>
        )
    }
}

const style = StyleSheet.create({
    main: {
        flex:1,
        
    },
    form:{
        marginTop: 20,
        paddingLeft: 25,
        paddingRight: 25
    },
    boxlogo:{
        marginTop: 50,
        alignItems: 'center'
    },
    logo:{
        resizeMode: 'stretch',
        height: 150,
        width: 300,
      },
      input:{
        color: 'black',
        fontSize: 17,
        marginTop:10
      },
      button:{
        marginTop:20,
        borderRadius: 10,
        
      },
      boxterminos:{
          marginTop: 10,
          alignItems: 'center'
      },
      terminos:{
          textAlign: 'center',
          fontWeight: 'bold'
      }
})

export default NewAccount
