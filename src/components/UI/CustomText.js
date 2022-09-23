import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomText = (props) => {
  return (
    <Text
      allowFontScaling={false}
      selectable={props.selectable}
      style={{...styles.text, ...props.style}}
    >
        {props.children}
    </Text>
  )
}

export default CustomText

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        // fontFamily: "Roboto-Regular",
      },
});