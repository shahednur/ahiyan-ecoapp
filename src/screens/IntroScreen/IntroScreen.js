import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
  Text,
} from "react-native";
//Redux
import { useDispatch } from 'react-redux';
import slides from "../../db/IntroSlides";
import { Ticker, Slide, SubSlide } from "./components";
// import * as CheckFirstTimeAction from '../../reducers/product/checkFirstTimeAction';
import Pagination from "./components/Pagination";

const { height, width } = Dimensions.get("window");

const IntroScreen = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollClick = useRef(null);
    const unmounted = useRef(false);
    useEffect(() => {
      return () => {
        unmounted.current = true;
      };
    }, []);
    const backgroundColor = scrollX.interpolate({
      inputRange: [0, width, width * 2],
      outputRange: ["#BFEAF5", "#BEECC4", "#FFE4D9"],
      extrapolate: "clamp",
    });
    const textTranslate = scrollX.interpolate({
      inputRange: [0, width, width * 2],
      outputRange: [0, width * -1, width * -2],
      extrapolate: "clamp",
    });
  
    const EnterApp = async () => {
      setLoading(true);
      await dispatch(CheckFirstTimeAction.firstOpen());
      if (!unmounted.current) {
        setLoading(false);
      }
    };
  return (
    <View style={styles.container}>
        <Animated.View style={[styles.slider, {backgroundColor}]}>
            <Ticker scrollX={scrollX} />
            <Animated.ScrollView
             ref={scrollClick}
             horizontal
             snapToInterval={width}
             scrollsTo={{x:scrollClick, Animated:true}}
             decelerationRate='fast'
             showsHorizontalScrollIndicator={false}
             bounces={false}
             scrollEventThrottle={1}
             onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false } //
              )}
            >
                {slides.map((slide) => {
            return <Slide key={slide.id} imageUrl={slide.imageUrl} />;
          })}
            </Animated.ScrollView>
        </Animated.View>
        <View style={styles.footer} >
            <Pagination slides={slides} scrollX={scrollX} />
            <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor}]}></Animated.View>
            <Animated.View style={styles.footerContent}>
                <Animated.View
                    style={{
                        flexDirection: "row",
                        width: width*slides.length,
                        transform: [{ translateX: textTranslate}]
                    }}
                >
                    {slides.map(({subtitle, des}, index)=>{
                        return (
                         <SubSlide 
                           key={subtitle}
                           last={index===slides.length-1}
                           EnterApp={EnterApp}
                           des={des}
                           scrollX={scrollX}
                           NextSlide={() => {
                            if (scrollClick.current) {
                              scrollClick.current.scrollTo({ x: width * (index + 1) });
                            }
                          }}
                         />
                        )
                    })}
                </Animated.View>
            </Animated.View>
        </View>
    </View>
  )
}

export default IntroScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
      },
      slider: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
        height: 0.61 * height,
        borderBottomEndRadius: 75,
      },
      footer: {
        flex: 1,
      },
      footerContent: {
        flex: 1,
        borderTopLeftRadius: 75,
        flexDirection: "row",
        backgroundColor: "#ffffff",
      },
});