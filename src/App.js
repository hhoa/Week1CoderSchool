import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { StackNavigator } from 'react-navigation';

import NP from './NP';
import TR from './TR';
import Movie from './Movie';

const FirstRoute = () => <View style={[ styles.container, { backgroundColor: '#8080ff' } ]}><NP /></View>;
const SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#673ab7' } ]}><TR /></View>;
class App extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: '1', title: 'Now Playing' },
            { key: '2', title: 'Top Rated' },
        ],
    };

    _handleChangeTab = index => this.setState({ index });

    _renderFooter = props => <TabBar {...props} />;

    _renderScene = SceneMap({
        '1': FirstRoute,
        '2': SecondRoute,
    });

    render() {
        return (
            <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderFooter={this._renderFooter}
                onRequestChangeTab={this._handleChangeTab}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default App;