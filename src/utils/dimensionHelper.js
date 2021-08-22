import {
  Dimensions,
} from 'react-native'
    
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')
    
/**
 * 
 * @param {Number} percentage Percentage of Total width of window
 */
export const ratioWidth = (percentage) => {
    const value = (percentage * viewportWidth) / 100
    return Math.round(value)
}

/**
 * 
 * @param {Number} percentage Percentage of Total heigth of window
 */
export const ratioHeight = (percentage) => {
    const value = (percentage * viewportHeight) / 100
    return Math.round(value)
}

const standardWidth = 375.0
const standardHeight = 667.0

export const widthScale = dimension => (dimension / standardWidth) * viewportWidth

export const heightScale = dimension => (dimension / standardHeight) * viewportHeight
    