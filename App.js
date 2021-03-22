import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Animated, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';

const { width, height } = Dimensions.get('screen')


const data = [
  require('./images/1.jpg'),
  require('./images/2.jpg'),
  require('./images/3.jpg')
]

const FlatListComponents = ({ imageName }) => {
  return (


    <View style={{ flex: 1, width }}>
      <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={imageName}
          style={{ width: width * 0.85, height: height * 0.45 }}
          resizeMode='cover'
        />

      </View>


      <LinearGradient colors={['#bed1fA', '#3735ca']}
        style={{
          flex: 1.4,
          borderRadius: 32,
          alignItems: 'center',
          top: 30
        }}
        start={[-2, 0]}
        end={[1, 0]}
      >
        <View style={{ top: 30 }}>
          <Text
            numberOfLines={2}

            style={{
              marginHorizontal: 20,
              top: 45,
              fontSize: 38,
              fontWeight: '700',
              color: 'white',
              textAlign: 'left',
              letterSpacing: 1.6,
            }}
          >
            Lorem ipsum dolor sit amet..
        </Text>

          <Text
            numberOfLines={2}
            style={{
              top: 65,
              fontWeight: '300',
              marginHorizontal: 20,
              textAlign: 'justify',
              color: 'white',
              letterSpacing: 0.4,
              width: width * 0.8,
              lineHeight: 20,
              fontSize: 13,
              letterSpacing: 0.5,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </Text>
        </View>
      </LinearGradient>
    </View>
  )
}


const App = () => {

  const flatlistref = React.useRef()
  const [index, activeIndex] = useState(0)
  const scrollX = new Animated.Value(0)
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'black'} />
      <Animated.FlatList
        ref={flatlistref}
        data={data}
        keyExtractor={(_, index) => index}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: ev => activeIndex(ev.nativeEvent.contentOffset.x / width) }
        )}
        renderItem={({ item, index }) => {
          return (
            <FlatListComponents imageName={item} />
          )
        }}
      />

      <View style={{
        height: height * 0.08,
        width,
        top: height * 0.19,
        position: 'absolute',
        top: height * 0.9
      }}>
        <View style={{
          flexDirection: 'row',
          width: width * 0.2,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 20,
          top: height * 0.08 / 2
        }}>
          {
            data.map((_, index) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width
              ]
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.4, 1, 0.4],
                extrapolate: 'clamp',
              })
              return (
                <Animated.View
                  style={{
                    width: height * 0.01,
                    height: height * 0.01,
                    borderRadius: height * 0.015 / 2,
                    backgroundColor: 'white',
                    marginRight: 10,
                    opacity,

                  }}
                />
              )
            })
          }
        </View>
        <TouchableOpacity onPress={() => {
          if (flatlistref.current) {
            flatlistref.current.scrollToOffset({
              offset: (index + 1) * width,
              animated: true
            })
          }
        }}>
          <View style={{
            backgroundColor: 'white',
            width: height * 0.06,
            height: height * 0.06,
            borderRadius: 10,
            left: width * 0.82,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <FontAwesome5 name="arrow-right" size={30} color="#3735ca" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
  },
});

export default App;
