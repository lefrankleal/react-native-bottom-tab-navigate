import React, { Children, ComponentType, ReactNode, useEffect, useState } from 'react'
import {
  View,
  TouchableHighlight,
  Animated,
  Image,
} from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import { TabBarItemProps } from '../types';
import TabBarStyles from './styles/TabBarStyles';

const TabBar: ComponentType<TabBarItemProps> = (props) => {

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedPath = Animated.createAnimatedComponent(Path);

  useEffect(() => {
    if (Children.toArray(props.children).length !== 3) {
      throw new Error('Three tab should be work.');
    }
  }, [])

  const [selectedIndex, setSelectedIndex] = useState<number>(1)
  let circleRadius = new Animated.Value(546)
  let _myCircle: any
  const pathD = new Animated.Value(357)
  const [pathX, setPathX] = useState<string>('357')
  const [pathY, setPathY] = useState<string>('675')
  const [pathA, setPathA] = useState<string>('689')
  const [pathB, setPathB] = useState<string>('706')
  const [_d, setD] = useState<string>('')
  const [showIcon, setShowIcon] = useState<boolean>(true)

  useEffect(() => {
    circleRadius.addListener((circleRadius) => {
      _myCircle.setNativeProps({ cx: circleRadius.value.toString() })
    })

    pathD.addListener(a => {
      setPathX(a.value.toString())
      setPathY((318 + a.value).toString())
      setPathA((330 + a.value).toString())
      setPathB((350 + a.value).toString())
    });
  }, [])

  useEffect(() => {
    if (pathY == '' && pathA == '' && pathB == '') {
      setD('1c-1.1-17.2,12.7-31.7,29.9-31.7h21.3c16.6')
    } else {
      setD(`M30,60h${pathX}.3c17.2,0,31,14.4,30,31.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1c-1.1-17.2,12.7-31.7,29.9-31.7h21.3c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z`)
    }
  }, [pathY, pathA, pathB])

  const { children, bgNavBar, bgNavBarSelector, stroke, style } = props

  const update = (index: number) => {
    setSelectedIndex(index)
    setShowIcon(false)
    if (index === 0) {
      Animated.spring(pathD, { toValue: 22, speed: 10, friction: 10, useNativeDriver: true }).start()
      setTimeout(() => { setShowIcon(true) }, 100)
      Animated.spring(circleRadius, { toValue: 211, friction: 10, useNativeDriver: true }).start()
    } else if (index === 2) {
      Animated.spring(pathD, { toValue: 691, speed: 10, friction: 10, useNativeDriver: true }).start()
      setTimeout(() => { setShowIcon(true) }, 100)
      Animated.spring(circleRadius, { toValue: 880, friction: 10, useNativeDriver: true }).start()
    } else {
      Animated.spring(pathD, { toValue: 357, speed: 10, friction: 10, useNativeDriver: true }).start()
      setTimeout(() => { setShowIcon(true) }, 100)
      Animated.spring(circleRadius, { toValue: 546, friction: 10, useNativeDriver: true }).start()
    }
  }

  return (
    <View style={[
      TabBarStyles.container,
      style,
      children[selectedIndex].props.screenBackgroundColor ? children[selectedIndex].props.screenBackgroundColor : '#008080',
    ]}>

      {children[selectedIndex]}

      <View style={[TabBarStyles.content]}>
        <View style={TabBarStyles.subContent}>
          {
            Children.map(children, (child: any, i) => {
              const imgSrc = selectedIndex === i && showIcon ?
                <View style={TabBarStyles.circle}>
                  <Image
                    style={TabBarStyles.navImage}
                    resizeMode="cover"
                    source={child.props.selectedIcon} />
                </View>
                :
                <Image
                  style={TabBarStyles.navImage}
                  resizeMode="cover"
                  source={child.props.icon} />
              return (
                <TouchableHighlight
                  key={i}
                  underlayColor={'transparent'}
                  style={TabBarStyles.navItem}
                  onPress={() => update(i)}>
                  {imgSrc}
                </TouchableHighlight>
              );
            })
          }
        </View>
        <Svg id="bottom-bar" x="0px" y="0px" width="100%" height="100" viewBox="0 0 1092 260">
          <AnimatedPath
            fill={bgNavBar ? bgNavBar : '#f0f0f0'}
            stroke={stroke ? stroke : '#f0f0f0'}
            d={`M30,60h${pathX}.3c17.2,0,31,14.4,30,31.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1C${pathY}.7,74.5,${pathA}.5,60,${pathB}.7,60H1062c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z`} />
          <AnimatedCircle
            ref={ref => _myCircle = ref}
            fill={bgNavBarSelector ? bgNavBarSelector : '#f0f0f0'}
            stroke={stroke ? stroke : '#f0f0f0'}
            cx="546" cy="100"
            r="100" />
        </Svg>
      </View>
    </View>
  )
}

export default TabBar