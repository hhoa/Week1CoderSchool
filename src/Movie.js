import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Animated,
    ScrollView,
    LayoutAnimation,
    TouchableOpacity
} from 'react-native';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';

import {Screen} from './MyStyles.js';

class Movie extends React.Component {
    static navigationOptions = {
        title: 'Chat with Lucy',
    };
    constructor() {
        super();
        this.state = {
            height: 200,
            marginScroll: 500
        }
    }

    clickToOpen(){
        var height = this.state.height;
        var line = this.state.line;
        var marginScroll = this.state.marginScroll;
        if(height == 200){
            height = 50;
            marginScroll = 100
        }else{
            height = 200;
            marginScroll = 500
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({
            height,
            marginScroll
        })
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Image
                    indicator={Progress}
                    style={{width: Screen.width, height: Screen.height, position: 'absolute'}}
                    source={{uri: 'https://image.tmdb.org/t/p/w342' + params.data.poster_path}}
                />

                <View style={[styles.container,{marginTop: this.state.marginScroll}]}>
                    <ScrollView
                        style={{}}>
                        <TouchableOpacity onPress={() => this.clickToOpen()}>

                            <View>
                                <Text style={styles.title}>
                                    {params.data.title}
                                </Text>
                                <Text style={styles.text}>
                                    Release date: {params.data.release_date}
                                </Text>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={styles.text}>
                                        Love: {params.data.vote_average}%
                                    </Text>
                                    <Text style={styles.text}>
                                        Vote: {params.data.vote_count}
                                    </Text>
                                </View>
                                <Text style={[styles.text, {marginTop: 5}]}>
                                    {params.data.overview}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00001a',
        opacity: 0.5,
        flexDirection: 'column-reverse',
        flex: 1,
        position: 'absolute',
        marginHorizontal: 10,
        borderRadius: 20,
        padding: 20
    },
    page: {
        alignItems: 'flex-end',
        flexDirection: 'column-reverse'
    },
    title: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
        marginBottom: 15
    },
    text: {
        color: 'white',
        fontSize: 16,
    }
});

export default Movie;