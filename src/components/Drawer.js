import React, { Component } from 'react';
import { Divider, List, Colors, Drawer } from 'react-native-paper';
import { Layout, withStyles } from 'react-native-ui-kitten';
import CustomIcon from '../../components/CustomIcon';
import {StyleSheet, Text, Platform, ScrollView, Image} from 'react-native';
import {Icon} from 'react-native-elements'
// import Database from '../../database'
import {myTheme} from '../../src/assets/styles/Theme'
import firebase from '@react-native-firebase/app'

const Item = ({ label, color, icon, selected, onPress }) => (
  <Drawer.Item
    style={{marginTop: 10}}
    label={label}
    icon = {()=>(
        <CustomIcon name={icon} size={24} color={selected ? myTheme['color-primary-600'] : null}/>
    )}
    
    theme={{colors: {primary: myTheme['color-primary-600'] }}}
    active={selected}
    onPress={onPress}
  />
);

class DrawerCustom extends Component {
  constructor(props) {
    super(props);
    
    
  }

  componentDidMount(){
  
  }


  state = {
    active: 'Home',
  };

  closeSession = () => {
    Database.LocalDB.deleteAllObjects('User');
    this.props.navigation.navigate('SocioLogin',{intento: 0})

  }

  singOut = () => {
    let fire = firebase.app('TesisAdopcion')
    fire.auth().signOut().then(()=>{
      this.props.navigation.navigate('Welcome')
    })
  }

  goToPage(routeName) {
    this.props.navigation.navigate({ routeName });
    this.props.navigation.closeDrawer();
  }

  render() {
    const {active} = this.state;
    //alert(active)
    //const name = this.props.navigation.state.params;
    const { colors } = this.props.themedStyle;
    const {navigation} = this.props;

    const {state} = this.props.navigation;
    const {routes} = state.routes['0'];
    const {routeName} = routes[routes.length-1]

    return (
      <ScrollView style={{ flex: 1 }}>
        <Layout style={{alignItems: 'center'}} >
       <Image
        source={require('../../assets/img/img_menu.jpeg')}
        style={{resizeMode: 'stretch',
        height: 120,
        width: 250,
        marginTop: 40}
      }
       >

       </Image>
              
     </Layout>
     <Drawer.Section style={{marginLeft: 10}}>
         {/* <Item label="Inicio" icon="menu1" selected={routeName === 'Membresy'} onPress={() => { this.setState({ active: 'MyMembresy' });  this.props.navigation.navigate('MyMembresy')}}/> */}
         <Item label="Inicio" icon="home" selected={routeName === 'HomeAdoptante'} onPress={() => { this.setState({ active: 'HomeAdoptante' }); this.props.navigation.navigate('HomeAdoptante') }}/>
         <Item label="Mascotas" icon="mascota" selected={routeName === 'Mascotas'} onPress={() => { this.setState({ active: 'Mascotas' }); this.props.navigation.navigate('Mascotas') }}/>
         <Item label="Fundaciones" icon="fundacion" selected={routeName === 'Fundaciones'} onPress={() => { this.setState({ active: 'Fundaciones' }); this.props.navigation.navigate('Fundaciones')}}/>
         <Item label="Mis Solicitudes" icon="solicitud" selected={routeName === 'Solicitudes'} onPress={() => { this.setState({ active: 'Solicitudes' }); this.props.navigation.navigate('Solicitudes') }}/>
         <Item label="Donaciones" icon="donacion" selected={routeName === 'Donaciones'} onPress={() => { this.setState({ active: 'Donaciones' }); this.props.navigation.navigate('Donaciones') }}/>
         <Item label="Cerrar Sesión" icon="cerrar" selected={routeName === 'Transactions'} onPress={()=>this.singOut()}/>

      
       </Drawer.Section>
      </ScrollView>
    );
  }
}



const style = StyleSheet.create({
  icon: {
    marginTop: Platform.OS === 'ios' ? 0 : 5,
  },
  texto:{
    paddingLeft: 5
  }

  //Platform.
});

export default withStyles(DrawerCustom, theme => ({
  colors: { text: theme['text-basic-color'] }
  
}));
