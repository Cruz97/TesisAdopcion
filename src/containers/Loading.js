import React, {Component} from 'react';
import {Load} from '../components';
import Database, {RealmObject} from '../../database';
import schema from '../../database/CloudRealm';
import Realm from 'realm';
import Odoo from 'react-native-odoo-promise-based'
import { Alert } from 'react-native';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

const schemaName = 'User';
const firebaseConfig = {
  apiKey: "AIzaSyBRoF6ypW3TitHAk13ajGnqv_994lQ1IKw",
  authDomain: "adopcionapppets.firebaseapp.com",
  databaseURL: "https://adopcionapppets.firebaseio.com",
  projectId: "adopcionapppets",
  storageBucket: "adopcionapppets.appspot.com",
  messagingSenderId: "253581692222",
  appId: "1:253581692222:web:e82005284fdb2ac504b06f",
  measurementId: "G-5W6YH22YWX"
};




   
// const fire = firebase.app('TesisAdopcion')

async function onSignIn() {
  // Get the users ID
  // const uid = fire.auth().currentUser.uid;

  //firebase.database(fire).ref(`/users/${uid}`);


  // alert(uid)
  // Create a reference
  // const ref = fire.database().ref(`/users/${uid}`);
  //var otherDatabase = firebase.database(fire);
  // // Fetch the data snapshot
  // const snapshot = await ref.once('value');
 
  // console.log('User data: ', snapshot.val());
}


export default class Loading extends Component {
  static navigationOptions = {
    header: 'null',
  };

  constructor(props) {
    super(props);
    const {navigation} = props;
    const username = navigation.getParam('username','');
    
    
    this.state = {
      username: username,
      
    };
  }

  

  componentDidMount() {
    
    // Initialize Firebase
    
    firebase.initializeApp(firebaseConfig,'TesisAdopcion');

    //Si existe un usuario logeado, pasa al Home del Adoptante
    //Caso contrario a la vista de Inicio
    setTimeout(()=>{
      this.props.navigation.navigate(firebase.auth().currentUser ? 'AppAdoptante' : 'Welcome')
   },2000)
    
 
     
      
 
  }

  render() {
    return <Load loading={true} />;
  }
}
