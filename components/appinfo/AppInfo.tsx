import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default class Temperature extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.version}>Version: {Constants.manifest.version}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    version: {
        textAlign: 'center',
        fontSize: 11,
        color: '#666'
    }
});