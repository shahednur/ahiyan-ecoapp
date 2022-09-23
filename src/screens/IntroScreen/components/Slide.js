import { View, Dimensions, StyleSheet, Image } from "react-native";
import React from 'react';
const { height, width } = Dimensions.get("window");

const Slide = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image style={{
        resizeMode: "contain",
        width: "90%",
        height: height/2,
      }}
      source={imageUrl}
      />
    </View>
  )
}

export default Slide

const styles = StyleSheet.create({
    container: {
        marginTop: 45,
        flex: 1,
        width,
        alignItems: "center",
      },
})