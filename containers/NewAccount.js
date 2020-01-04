import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Icon, Input} from 'react-native-elements';
import {ButtonCustom} from '../components/index'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

export class NewAccount extends Component {
    static navigationOptions = {
        title: 'Registrarse'
    }

    constructor(props){
        super(props);

        this.state={
            correo: '',
            contrasena: '',
            uid: ''
        }
    }

    handleEmail = (text) => this.setState({correo: text})

    handlePassword = (text) => this.setState({contrasena: text})

    createUser = () => {
        let email = this.state.correo;
        let password = this.state.contrasena;

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
                    typeUser: 'adopter'
                  }).then(()=>{
                      firebase.auth().signInWithEmailAndPassword(
                          userCredentials.user.email,
                          this.state.contrasena
                      ).then(user =>{
                        //   alert(JSON.stringify(user,null,4))
                          this.props.navigation.navigate('HomeAdoptante')
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
                <View style={style.form}>
                <Input
                        placeholder=' Correo Electrónico'
                        keyboardType='email-address'
                        // secureTextEntry={true}
                        value={this.state.correo}
                        onChangeText={this.handleEmail}
                        placeholderTextColor='black'
                        inputStyle={
                            {
                            color: 'black',
                            fontSize: 17
                            }
                        }
                        leftIcon={
                            <Icon
                            name='email'
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
                            title="Crear"
                            primary
                            buttonStyle={
                                {
                                    marginTop:10,
                                    borderRadius: 20
                                
                                }

                            }
                            onPress={()=>{
                                this.createUser()
                                
                            }}
                            
                           />

                </View>
                
            </View>
        )
    }
}

const style = StyleSheet.create({
    main: {
        flex:1
    },
    form:{
        marginTop: '30%',
        paddingLeft: 50,
        paddingRight: 50
    }
})

export default NewAccount
