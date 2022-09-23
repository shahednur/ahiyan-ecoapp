import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from 'react';
import Color from "../../../utils/Color";
import CustomText from "../../../components/UI/CustomText";


const SubSlide = ({ subtitle, des, last, NextSlide, EnterApp }) => {
    const bgColor = last ? "#2CB9B0" : "rgba(12,13,52,0.05)";
    const labelCover = last ? "#ffffff" : Color.text;
    const onPressHandler = last ? EnterApp : NextSlide;

    return (
    <View style={styles.subSlideContainer}>
      <CustomText style={styles.subTitle}>{subtitle}</CustomText>
      <View>
        <Text style={styles.des}>{des}</Text>
      </View>
      <TouchableOpacity onPress={onPressHandler}>
        <View style={[styles.buttonContainer, {backgroundColor: bgColor}]}>
            <Text style={[styles.buttonLabel, { color: labelCover}]}>{last ? "Go to homepage" : "Continue"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SubSlide

const styles = StyleSheet.create({
    subSlideContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
      },
      subTitle: {
        fontSize: 24,
        color: Color.text,
      },
      des: {
        fontSize: 18,
        lineHeight: 30,
        color: Color.text,
        textAlign: "center",
      },
      buttonContainer: {
        marginTop: 10,
        borderRadius: 15,
        height: 50,
        width: 245,
        alignItems: "center",
        justifyContent: "center",
      },
      buttonLabel: {
        fontSize: 16,
        fontWeight: "500",
      },
});