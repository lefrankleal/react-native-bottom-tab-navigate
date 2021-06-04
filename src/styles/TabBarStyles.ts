import { Dimensions, StyleSheet } from 'react-native'

const TabBarStyles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'column',
    zIndex: 0,
    width: (Dimensions.get('window').width - 30),
    // marginBottom: '4%',
    // left: '4%',
    // right: '4%',
    position: 'absolute',
    bottom: '1%',
  },
  subContent: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    zIndex: 1,
    position: 'absolute',
    bottom: 5,
  },
  navItem: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 6,
    alignItems: 'center',
    zIndex: 0,
  },
  navImage: {
    width: 45,
    height: 45,
  },
  circle: {
    bottom: 18,
  },
})

export default TabBarStyles