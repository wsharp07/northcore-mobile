import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

export default class Temperature extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }

    render() {
        return (
            <SafeAreaView>
                <Text style={styles.version}>Version: {Constants.manifest.version}</Text>
            </SafeAreaView>
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