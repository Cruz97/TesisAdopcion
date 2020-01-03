import React, {Component} from 'react';
import {Load} from '../components';
import Database, {RealmObject} from '../../database';
import schema from '../../database/CloudRealm';
import Realm from 'realm';
import Odoo from 'react-native-odoo-promise-based'
import { Alert } from 'react-native';
import firebase from '@react-native-firebase/app'
// import auth from '@react-native-firebase/auth'
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

    // const r = firebase.database()

    this.props.navigation.navigate(false ? 'AppAdoptante' : 'Welcome')

    // alert(JSON.stringify(r,null,4))
    //alert('')
        // alert(JSON.stringify(firebase.app('TesisAdopcion'),null,4))

    // onSignIn()
    // let fire = firebase.app('TesisAdopcion')
    //fire.database('https://adopcionapppets.firebaseio.com/')
    // alert(JSON.stringify(db,null,4))  

    // fire.auth().onAuthStateChanged(user => {
      
          
    //   this.props.navigation.navigate(user ? 'AppAdoptante' : 'Welcome')
    //   // const user = auth().currentUser;

    //   alert(JSON.stringify(user,null,4))
    // })

  //  this.props.navigation.navigate('Welcome')
     
      
 
  }

  render() {
    return <Load loading={true} />;
  }
}
