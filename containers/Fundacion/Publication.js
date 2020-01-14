import React, { Component } from 'react'
import { Text, View, StyleSheet,TextInput, Picker} from 'react-native'

import { SafeAreaView } from 'react-navigation'
import { ButtonGroup} from 'react-native-elements'
import { RadioButton,Title,Headline } from 'react-native-paper';
import ButtonCustom from '../../components/ButtonCustom'
import {myTheme} from '../../src/assets/styles/Theme'
import {Autocomplete} from 'react-native-autocomplete-input'
import { Layout } from 'react-native-ui-kitten';
import {ImagePicker} from '../../src/components/ImagePicker'

const DATA = [
    { id: 1, title: 'Star Wars', releaseYear: 1977 },
    { id: 2, title: 'Back to the Future', releaseYear: 1985 },
    { id: 3, title: 'The Matrix', releaseYear: 1999 },
    { id: 4, title: 'Inception', releaseYear: 2010 },
    { id: 5, title: 'Interstellar', releaseYear: 2014 },
  ];


export class Publication extends Component {

    static navigationOptions = {
        title: 'Publicación de mascota',
        hideRightComponent: 'hide'
    }

    constructor(props){
        super(props)
        this.state = {
            selectedIndexGender: -1,
            selectedIndexType: -1,
            name: '',
            raza: '',
            query: '',
            data: DATA
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
    handleName = (text) => {
        this.setState({
            name: text
        })
    }

    handleRaza = (value) => {
        this.setState({
            raza: value
        })
    }

    onChangeText = (query) => {
        this.setState({
            value: query,
            data: DATA.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
        })
        //setData(DATA.filter(item => item.title.toLowerCase().includes(query.toLowerCase())));
      };
    
      onSelect = ({ title }) => {
        this.setState({
            value: title
        })
      };
    
      _filterData = (query) => {
        if (query === '') {
            return [];
          }
        const { data } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return data.filter(data => data.title.search(regex) >= 0);
      }
      

    render() {
        const { query } = this.state;
        const data = this._filterData(query);
       
        const buttonsGender = ['Hembra', 'Macho']
        const buttonsType = ['Perro', 'Gato']
        const { selectedIndexGender } = this.state
        const { selectedIndexType } = this.state
        return (
            <View style={style.main}>
                <View style={style.form}>
                        
                        {/* <View style={style.boxinput}> */}
                        
                        <TextInput style = {style.input}
                        
                            underlineColorAndroid = "transparent"
                            placeholder = "Nombre de la mascota"
                            placeholderTextColor = {myTheme['color-primary-700']}
                            autoCapitalize = "none"
                            onChangeText = {this.handleName}/>

                          


                            
                        {/* </View> */}
                    <View style={style.boxinput}>
                        <Text style={style.label}>Especie</Text>
                        <ButtonGroup
                        onPress={this.updateIndexType}
                        selectedIndex={selectedIndexType}
                        buttons={buttonsType}
                        textStyle={style.txtbtngroup}
                        containerStyle={style.buttongroup}
                    />

                    
                    </View>

                    <View style={style.boxinput}>
                        <Text style={style.label}>Género</Text>
                        <ButtonGroup
                            onPress={this.updateIndexGender}
                            selectedIndex={selectedIndexGender}
                            buttons={buttonsGender}
                            textStyle={style.txtbtngroup}
                            containerStyle={
                                style.buttongroup
                            }
                        />

                    </View>
                    {/* <View style={style.boxinput}>
                    <Text style={style.label}>Raza</Text>

                    <Picker 
                        style={style.pickerRaza}
                        mode='dropdown'
                        itemStyle={style.itemPickerRaza}
                        selectedValue = {this.state.raza} 
                        onValueChange = {this.handleRaza}>
                        <Picker.Item label = "Pastor Aleman" value = "steve" />
                        <Picker.Item label = "Bulldog" value = "ellen" />
                        <Picker.Item label = "Chihuahua" value = "maria" />
                    </Picker>
                    </View> */}

                    <View style={style.rowContainer}>
                    <Text style={style.label}>Raza</Text>
                        <Picker
                            style={style.internalPickerContainer}
                            
                            mode="dropdown"
                            iosHeader="Select Raza"
                            selectedValue={this.state.raza}
                            onValueChange={this.handleRaza}
                            //
                            itemStyle={style.pickerIosListItemContainer}
                            itemTextStyle={style.pickerIosListItemText}
                        >
                            <Picker.Item label="Pastor Aleman" value={1} />
                            <Picker.Item label="Chihuahua" value={2} />
                            <Picker.Item label="Bulldog" value={3} />
                        </Picker>
                        </View>


                    <ImagePicker  />

                    

                   
                       

                       
                    
                

                 
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

               
            </View>
        )
    }
}

const style = StyleSheet.create({
    main: {
        flex:1
    },
    form:{
        paddingLeft: 25,
        paddingRight: 25
    },
    buttongroup:{
        height: 40,
        width: '50%',
        borderRadius:20,
        borderColor:myTheme['color-primary-700']
    },
    txtbtngroup:{
        fontSize: 16,
        color: myTheme['color-primary-700']
    },
    input:{
        //flex:1,
        //color: 'black',
        //fontSize: 15,
        //marginTop:10,
        //marginRight: 60,
        //paddingBottom:0,
        //height: 5
        //flex:1
        fontSize: 17,
        color: myTheme['color-primary-700'],
        margin: 10,
      height: 40,
      borderColor: myTheme['color-primary-600'],
      borderWidth: 1,
      borderRadius: 15,
      textAlign: 'center'
       
      },
      boxinput:{
          //flex:1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
         
          marginTop: '4%',
          
      },
      label:{
          fontSize: 16,
          fontWeight: 'bold',
          
      },
      pickerRaza:{
        flex:1,
        color: '#6D6D6D',
        backgroundColor: '#FFF',
        marginBottom: 20,
        alignItems: 'flex-end',
          
          color: myTheme['color-primary-700']
      },
      itemPickerRaza: {
        color: myTheme['color-primary-700'],
        textAlign: 'center',
        fontWeight: 'bold',
       
        
        //fontSize: 25
      },
      containerRaza: {
        minHeight: 228,
      },
      autocompleteRaza: {
        margin: 8,
      },
      rowContainer: {
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
        color: myTheme['color-primary-700']
      },
      internalPickerContainer: {
        flex: Platform.OS === 'ios' ? 1 : null, // for Android, not visible otherwise.
        width: Platform.OS === 'ios' ? undefined : 220,
        color: myTheme['color-primary-700'],
        //fontSize: 18,
        //fontWeight: 'bold',
        borderWidth: 2,
        borderColor: 'black'
      },
      pickerIosListItemContainer: {
        flex: 1,
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        color: myTheme['color-primary-700']
        
      },
      pickerIosListItemText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: myTheme['color-primary-700']

      },
})

export default Publication
