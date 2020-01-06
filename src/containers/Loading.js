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
// const firebaseConfig = {
//   apiKey: "AIzaSyBRoF6ypW3TitHAk13ajGnqv_994lQ1IKw",
//   authDomain: "adopcionapppets.firebaseapp.com",
//   databaseURL: "https://adopcionapppets.firebaseio.com",
//   projectId: "adopcionapppets",
//   storageBucket: "adopcionapppets.appspot.com",
//   messagingSenderId: "253581692222",
//   appId: "1:253581692222:web:e82005284fdb2ac504b06f",
//   measurementId: "G-5W6YH22YWX"
// };




   
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

  dataFundaciones = () => {
        let refFoundation = firebase.database().ref('fundaciones')
    refFoundation.set({
      gapclaudiapoppe:{
        name: 'GAP: Claudia Poppe',
        manager: 'Lcda. Monica Santos',
        phone: '0967416653',
        city: 'Guayaquil',
        email: 'gpa.claudiapoppe@gmail.com',
        zone: 'Norte',
        img: 'https://josecruzal.000webhostapp.com/fundaciones/gpaclaudiapoppe.jpg'

      },
      amigosconcola:{
        name: 'Amigos con cola',
        manager: 'Javier Cevallos',
        phone: '0995684828',
        city: 'Guayaquil',
        email: 'amigosconcola@gmail.com',
        zone: 'Centro',
        img: 'https://josecruzal.000webhostapp.com/fundaciones/amigosconcola.jpg'

      },
      pana:{
        name: 'Refugio Protección y Ayuda a Nuestros Animales',
        manager: 'Psi. Katiuska Delgado',
        phone: '0991882949',
        city: 'Guayaquil',
        email: 'refugiopana@gmail.com',
        zone: 'Sur',
        img: 'https://josecruzal.000webhostapp.com/fundaciones/pana.jpg'

      }


    })
  }
  

  componentDidMount() {

    const {navigation} = this.props;
    const email = navigation.getParam('email','');
    const password = navigation.getParam('password','');

    //this.dataFundaciones()
    

    // alert(password)
    if(email == '' || password == ''){
      setTimeout(()=>{
        if(firebase.auth().currentUser){
          const uid = firebase.auth().currentUser.uid
          let refUser = firebase.database().ref('usuarios/'+uid)
          refUser.on('value',(snapshot)=>{
            // alert(JSON.stringify(snapshot,null,4))
            let tipo = snapshot.val().typeUser;
            if(tipo == "adopter")
              this.props.navigation.navigate('AppAdoptante',{user: snapshot.val()})
            else if (tipo == "foundation")
              this.props.navigation.navigate('AppFundacion',{foundation: snapshot.val()})
            else
              this.props.navigation.navigate('Welcome')
          })
        }
        else{
          this.props.navigation.navigate('Welcome')
        }
     },2000)

    }
    else{
      firebase.auth().signInWithEmailAndPassword(email,password).then(
        userCredential =>{
            if(userCredential.user){
                setTimeout(() => {
                  const uid = userCredential.user.uid
                  let refUser = firebase.database().ref('usuarios/'+uid)
                  refUser.on('value',(snapshot)=>{
                    let tipo = snapshot.val().typeUser;
                    if(tipo == "adopter")
                      this.props.navigation.navigate('AppAdoptante',{user: snapshot.val()})
                    else if (tipo == "foundation")
                      this.props.navigation.navigate('AppFundacion',{foundation: snapshot.val()})
                    else
                      this.props.navigation.navigate('Welcome')
                  })
                }, 2000);
                // setTimeout(()=>{
                //     this.props.navigation.navigate('AppAdoptante')
                // },2000)
            }
            // alert(JSON.stringify(userCredential,null,4))
        }
    )

    }
    
    // Initialize Firebase
    // firebase.initializeApp(firebaseConfig,'TesisAdopcion');

    //Si existe un usuario logeado, pasa al Home del Adoptante
    //Caso contrario a la vista de Inicio
    
    
 
     
      
 
  }

  render() {
    return <Load loading={true} />;
  }
}
