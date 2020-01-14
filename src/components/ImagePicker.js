import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import ImagePicker  from 'react-native-image-picker';
import { Button, withStyles } from 'react-native-ui-kitten';
import { Icon } from 'react-native-elements';
import Label from './Label';

class ImagenPicker extends Component {
  state = {
    width: 0,
    height: 0,
    selectedIndex: -1
  };
  render() {
    const { limit = 20, disabled, title, images = [] } = this.props;
    return (
      <View style={{ marginBottom: '5%' }}>
        {title ? <Label>{title}</Label> : undefined}
        <View
          style={{ flexWrap: 'wrap', flexDirection: 'row', marginBottom: '2%' }}
          onLayout={event => {
            const { width, height } = event.nativeEvent.layout;
            this.setState({ width, height });
          }}
        >
          {this.renderImages()}
        </View>
        {images.length < limit && !disabled ? (
          <Button
            disabled={disabled}
            onPress={() => this.selectImage()}
            size={'small'}
            icon={() => <Icon name={'photo-camera'} color={'#FFF'} size={20} />}
          >
            Añadir foto
          </Button>
        ) : (
          undefined
        )}
      </View>
    );
  }

  renderImages() {
    let { width } = this.state;
    const { themedStyle, disabled } = this.props;
    width *= 0.333;
    return this.props.images.map((image, index) => {
      const isSelected = index === this.state.selectedIndex;
      return (
        <View key={index}>
          <TouchableOpacity
            style={{ width, height: width, padding: 4 }}
            activeOpacity={0.65}
            onLongPress={() =>
              this.setState({ selectedIndex: isSelected ? -1 : index })
            }
            disabled={disabled}
          >
            <Image
              style={{ width: null, height: null, flex: 1, borderRadius: 10 }}
              resizeMode={'cover'}
              source={{ uri: 'data:image/jpeg;base64,' + image }}
            />
          </TouchableOpacity>
          {isSelected ? (
            <Icon
              reverse
              name={'remove'}
              color={themedStyle.colors.primary}
              size={9}
              containerStyle={{ position: 'absolute', top: -7, right: -7 }}
              onPress={() => this.removeImage(index)}
            />
          ) : (
            undefined
          )}
        </View>
      );
    });
  }

  removeImage(index) {
    const images = this.props.images.filter((item, i) => i !== index);
    this.setState({ selectedIndex: -1 });
    this.props.onChangeImages(images);
  }

  onSelectImage(response) {
    if (response.data) {
      let images = this.props.images;
      images.push(response.data);
      this.props.onChangeImages(images);
    }
  }

  selectImage() {
    const { mode = 'both' } = this.props;
    const options = {
      title: 'Añadir foto',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tomar foto',
      chooseFromLibraryButtonTitle: 'Elegir desde galería',
      maxWidth: 800,
      maxHeight: 800
    };

    switch (mode) {
      case 'both':
        ImagePicker.showImagePicker(options, this.onSelectImage.bind(this));
        break;
      case 'photo':
        
        ImagePicker.launchCamera(options, this.onSelectImage.bind(this));
        break;
      case 'picture':
        ImagePicker.launchImageLibrary(options, this.onSelectImage.bind(this));
        break;
    }
  }
}

export default withStyles(ImagenPicker, theme => ({
  colors: {
    primary: theme['color-primary-500']
  }
}));
