import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class HomeFundacion extends Component {

    static navigationOptions = {
        title: 'Inicio Fundacion',
        hideRightComponent: 'hide',
    }

    render() {
        return (
            <View>
                <Text> Home Fundacion </Text>
            </View>
        )
    }
}

export default HomeFundacion
