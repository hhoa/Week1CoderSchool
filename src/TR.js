import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ListView,
    TouchableOpacity,
    TextInput,
    RefreshControl
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';

import Movie from './Movie';
import {Screen} from './MyStyles.js';

class TR extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            searchText: '',
            listOfMovie: null
        };

        this.renderRow = this.renderRow.bind(this);
        console.log(this.props);
        const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed';

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: this.state.dataSource.cloneWithRows(responseJson.results),
                    listOfMovie: responseJson
                }, function() {
                    // do something with new state
                });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    _onRefresh() {
        this.setState({refreshing: true});
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: this.state.dataSource.cloneWithRows(responseJson.results),
                    listOfMovie: responseJson,
                    refreshing: false
                }, function() {
                    // do something with new state
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    setSearchText(event) {
        let searchText = event.nativeEvent.text;
        this.setState({searchText});

        let filteredData = this.filterNotes(searchText, this.state.listOfMovie);
        if (filteredData !== undefined) {
            this.setState({
                isLoading: false,
                dataSource: this.state.dataSource.cloneWithRows(filteredData)
            });
        } else {
            this.setState({
                isLoading: false,
                dataSource: this.state.dataSource.cloneWithRows(this.state.listOfMovie.results)
            });
        }


    }

    filterNotes(searchText, data) {
        let text = searchText.toLowerCase();
        console.log(text);
        let arr = new Array();
        data.results.map(item =>
            {

                if (item.title.toLowerCase().indexOf(text) >= 0){
                    arr.push((item));
                }
            }
        );

        return arr;
    }



    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.spinnerStyle}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }

        return (
            <View>
                <View>
                    <TextInput
                        style={styles.searchBar}
                        value={this.state.searchText}
                        onChange={this.setSearchText.bind(this)}
                        placeholder='Search' />
                    <ListView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => this.renderRow(rowData)}
                        enableEmptySections={true}
                        style={{marginBottom: 100}}
                    />
                </View>
            </View>
        );
    }

    renderRow(row) {
        const { navigate } = this.props.navigation;
        return (
            <View style={{margin: 10}}>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => navigate('Movie', { data: row })}>
                    <View>
                        <Image
                            indicator={Progress}
                            style={{width: Screen.width / 4, justifyContent: 'flex-start', height: 100}}
                            source={{uri: 'https://image.tmdb.org/t/p/w342' + row.poster_path}}
                        />
                    </View>
                    <View style={{marginHorizontal: 15}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 15}}>{row.title}</Text>
                        <Text>{row.overview}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    searchBar: {
        paddingLeft: 30,
        fontSize: 22,
        height: 50,
        borderColor: '#E4E4E4',
    },
});

const SimpleApp = StackNavigator({
    Home: { screen: TR },
    Movie: { screen: Movie },
}, {
    headerMode: 'none',
});

export default SimpleApp;