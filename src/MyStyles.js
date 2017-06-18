import {Dimensions, Platform, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('window')

export const Screen = {
    width: width,
    height: Platform.OS === 'ios' ? height : height - StatusBar.currentHeight
}
