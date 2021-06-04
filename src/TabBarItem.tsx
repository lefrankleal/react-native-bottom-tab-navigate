import React, { Children, ComponentType, useEffect } from 'react'
import { View } from 'react-native'
import { TabBarItemProps } from '../types'

const TabBarItem: ComponentType<TabBarItemProps> = ({ children }) => {



  useEffect(() => {
    let child = Children.toArray(children)
    if (child.length && child.length > 0) {
      throw new Error('onlyChild must be passed a children with exactly one child.')
    }
  })

  return (
    <View style={{ flex: 1 }}>
      {children}
    </View>
  )
}

export default TabBarItem