import React, { Component } from 'react';
import { Divider, List, Colors, Drawer } from 'react-native-paper';
import { Layout, withStyles } from 'react-native-ui-kitten';
import CustomIcon from '../../components/CustomIcon';
import {StyleSheet, Text, Platform, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements'
import Database from '../../database'




const Item = ({ label, color, icon, selected, onPress }) => (
  <Drawer.Item
    label={label}
    icon = {()=>(
        <CustomIcon name={icon} size={30} color={selected ? '#A88C3D': null}/>
    )}
    theme={{colors: {primary: '#A88C3D'}}}
    active={selected}
    onPress={onPress}
  />
);

// const ItemClose = ({ label, color, icon, selected, onPress }) => (
//   <Drawer.Item
//     label={label}
//     // icon = {()=>(
//     //   <Icon
//     //   name='exit-to-app'
//     //   type='material'
//     //   size={30}
//     //   iconStyle={
//     //     {
//     //       //width:2,
//     //       color: '#4c4c4c',
//     //       fontSize: 27
          
//     //     }
//     //   }
//     //   color={selected ? '#A88C3D': null}
//     //   />

//     // )}
//     theme={{colors: {primary: '#A88C3D'}}}
//     active={selected}
//     onPress={onPress}
//   />
// );

class DraweFundacion extends Component {
  constructor(props) {
    super(props);
    //const {navigation} = this.props;
    
    //const uuid = navigation.state.params.userid;
    //alert('drawer: '+uuid)
    //navigation.navigate('MyMembresy',{uuid: uuid});
    
    
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
    //const uuid = navigation.getParam('uuid','drawer');
    //const uuid = "ec366d60-0a9b-11ea-82b1-e37e650f4e3b";
    //alert(JSON.stringify(navigation.state.params))

    //alert(JSON.stringify(navigation.state,null,2))
    //alert(navigation.state.params.userid)
    //const uuid = navigation.state.params.userid;

    const {state} = this.props.navigation;
    const {routes} = state.routes['0'];
    const {routeName} = routes[routes.length-1]

    return (
      <ScrollView style={{ flex: 1 }}>
        <Layout  >
       
       <Drawer.Section title="Menu">
         {/* <Item label="Inicio" icon="menu1" selected={routeName === 'Membresy'} onPress={() => { this.setState({ active: 'MyMembresy' });  this.props.navigation.navigate('MyMembresy')}}/> */}
         <Item label="Mi Membresia" icon="menu2" selected={routeName === 'MyMembresy'} onPress={() => { this.setState({ active: 'MyMembresy' }); this.props.navigation.navigate('MyMembresy') }}/>
         <Item label="Certificados" icon="menu3" selected={routeName === 'Certificates'} onPress={() => { this.setState({ active: 'Certificates' }); this.props.navigation.navigate('Certificates') }}/>
         <Item label="Transacciones" icon="menu4" selected={routeName === 'Transactions'} onPress={() => { this.setState({ active: 'Transactions' }); this.props.navigation.navigate('Transactions')}}/>
         {/* <Item label="Tarjeta Club Oro Verde" icon="menu5" selected={routeName === 'CardClub'} onPress={() => { this.setState({ active: 'CardClub' }); this.props.navigation.navigate('CardClub') }}/> */}
       </Drawer.Section>

       {/* <Drawer.Section title="Destinos">
        
         <Item label="Hoteles" icon="menu6" selected={routeName === 'Hotels2'} onPress={() => { this.setState({ active: 'Hotels2' }); this.props.navigation.navigate('Hotels2')}}/>
         <Item label="Centros de consumo" icon="menu7" selected={routeName === 'Restaurants'} onPress={() => { this.setState({ active: 'Restaurants' }); this.props.navigation.navigate('Restaurants')}}/>
         <Item label="Ofertas" icon="menu8" selected={routeName === 'Offer'} onPress={() => { this.setState({ active: 'Offer' }); this.props.navigation.navigate('Offer')}}/>
         <Item label="Beneficios" icon="menu9" selected={routeName === 'Benefits'} onPress={() => { this.setState({ active: 'Benefits' }); this.props.navigation.navigate('Benefits')}}/>
     
     </Drawer.Section> */}

       <Drawer.Section title="Acerca de">
         <Item label="Contacto" icon="menu10" selected={routeName === 'Contact'} onPress={() => { this.setState({ active: 'Contact' }); this.props.navigation.navigate('Contact') }}/>
         <Item label="Cerrar Sesión"  icon = "menuexit"  onPress={() => { this.setState({ active: 'Tools' }); this.closeSession()}}/>
    </Drawer.Section>

     
      
     </Layout>
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

export default withStyles(DraweFundacion, theme => ({
  colors: { text: theme['text-basic-color'] }
  
}));
