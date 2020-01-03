import React, { Component } from 'react';
import { Picker, View } from 'react-native';
import Label from './Label';
import { withStyles } from 'react-native-ui-kitten';

class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      style,
      title,
      selectedValue,
      onValueChange,
      items,
      showValue,
      selectedKey,
      row,
      themedStyle,
      disabled
    } = this.props;
    const rowStyle = row ? styles.row : {};
    return (
      <View style={[{ flex: 0 }, rowStyle, style]}>
        <Label>{title}</Label>
        <Picker
          selectedValue={selectedValue}
          style={{ flex: row ? 1 : 0, marginLeft: row ? '3%' : 0 }}
          onValueChange={(a, b) => {
            onValueChange(a, b);
          }}
          enabled={!disabled}
        >
          {Object.entries(items).map(([key, value]) => (
            <Picker.Item
              color={
                disabled ? themedStyle.label.disabled : themedStyle.label.active
              }
              label={showValue ? value[showValue] : value}
              value={selectedKey ? value[selectedKey] : key}
              key={key}
            />
          ))}
        </Picker>
      </View>
    );
  }
}

const styles = {
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};

export default withStyles(Selection, theme => ({
  label: {
    active: theme['color-primary-500'],
    disabled: theme['color-basic-700']
  }
}));
