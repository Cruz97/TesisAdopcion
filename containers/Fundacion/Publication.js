import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import {Input, ButtonGroup} from 'react-native-elements'
import { RadioButton,Title,Headline } from 'react-native-paper';
import ButtonCustom from '../../components/ButtonCustom'
import {myTheme} from '../../src/assets/styles/Theme'

export class Publication extends Component {

    static navigationOptions = {
        title: 'Publicación de mascota',
        hideRightComponent: 'hide'
    }

    constructor(props){
        super(props)
        this.state = {
            selectedIndexGender: -1,
            selectedIndexType: -1
          }
          this.updateIndexGender = this.updateIndexGender.bind(this)
          this.updateIndexType = this.updateIndexType.bind(this)
    }

    updateIndexGender (selectedIndexGender) {
        this.setState({selectedIndexGender})
      }
      updateIndexType (selectedIndexType) {
        this.setState({selectedIndexType})
      }
      

    render() {
        const buttonsGender = ['Hembra', 'Macho']
        const buttonsType = ['Perro', 'Gato']
        const { selectedIndexGender } = this.state
        const { selectedIndexType } = this.state
        return (
            <SafeAreaView style={style.main}>
                <View>
                   
                        <Input
                        //style={{flex:1}}
                        placeholder='Nombre de la mascota'
                        keyboardType='ascii-capable'
                        value={''}
                        // onChangeText={this.handleLastName}
                        placeholderTextColor='black'
                        inputStyle={style.input}
                        />
                        <Input
                        //style={{flex:3}}
                        placeholder='Edad'
                        keyboardType='number-pad'
                        value={''}
                        // onChangeText={this.handleLastName}
                        placeholderTextColor='black'
                        inputStyle={style.input}
                        />

                        <Input
                        //style={{flex:3}}
                        placeholder='Tamaño'
                        keyboardType='ascii-capable'
                        value={''}
                        // onChangeText={this.handleLastName}
                        placeholderTextColor='black'
                        inputStyle={style.input}
                        />
                    
                   <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center'}}>
                   <Text>Tipo</Text>
                    <ButtonGroup
                        onPress={this.updateIndexType}
                        selectedIndex={selectedIndexType}
                        buttons={buttonsType}
                        textStyle={{
                            fontSize: 13
                        }}
                        containerStyle={{height: 30,width: '50%',borderRadius:20,borderColor:'black'}}
                    />
                   </View>

                   <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center'}}>

                    <Text>Género</Text>
                    <ButtonGroup
                        onPress={this.updateIndexGender}
                        selectedIndex={selectedIndexGender}
                        buttons={buttonsGender}
                        textStyle={{
                            fontSize: 13
                        }}
                        containerStyle={{height: 30,width: '50%',borderRadius:20,borderColor:'black'}}
                    />
                    </View>
                   <View style={{alignItems: 'center'}}>
                   <ButtonCustom  
                            title="Publicar"
                            colorcustom={myTheme['color-success-600']}
                            buttonStyle={
                                {
                                    marginTop:10,
                                    borderRadius: 0,
                                    width: 200,
                                    
                                
                                }

                            }
                            onPress={()=>{
                                
                            }}
                            
                           />
                   </View>
                </View>

               
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    main: {
        flex:1
    },
    input:{
        //flex:1,
        color: 'black',
        fontSize: 15,
        marginTop:10,
        paddingBottom:0
      },
})

export default Publication
