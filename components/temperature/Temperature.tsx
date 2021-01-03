import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { AIO_KEY, USERNAME } from 'react-native-dotenv'

export interface State  {
  isLoading: boolean,
  temperature: AIOResponse,
  humidity: AIOResponse
}

export interface AIOResponse {
  id: number,
  title: string,
  icon: string,
  value: number,
  updatedAt: string
}

export default class Temperature extends React.Component<{}, State> {
  
  intervalID;
  headers = {
    'X-AIO-Key': AIO_KEY,
    'Content-Type': 'application/json'
  };
  tempUrl = `https://io.adafruit.com/api/v2/${USERNAME}/feeds/northcore.temperature/data/last`
  humidityUrl = `https://io.adafruit.com/api/v2/${USERNAME}/feeds/northcore.humidity/data/last`

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true, 
      temperature: {} as AIOResponse,
      humidity: {} as AIOResponse
    }
  }

  formatValue(value) {
    return Math.round( value * 10) / 10
  }

  formatDate(date) {
    return new Date(date).toLocaleString();
  }

  getData = () => {

    let temp = fetch(this.tempUrl, {
      headers: this.headers
    })
    .then((res) => res.json())
    .then((resJson) => {
      this.setState({
        temperature: {
          id: 1,
          title: 'Temperature',
          icon: 'temperature-fahrenheit',
          value: this.formatValue(resJson.value),
          updatedAt: this.formatDate(resJson.updated_at)
        }
      })
    })

    let humidity = fetch(this.humidityUrl, {
      headers: this.headers
    })
    .then((res) => res.json())
    .then((resJson) => {
      this.setState({
        humidity: {
          id: 2,
          title: 'Humidity',
          icon: 'water',
          value: this.formatValue(resJson.value),
          updatedAt: this.formatDate(resJson.updated_at)
        }
      })
    })

    return Promise.all([temp, humidity])
      .then(() => {
        this.setState({
          isLoading: false,
        }, function(){

        });
      });
  }

  async componentDidMount() {
    this.getData();

    this.intervalID = setInterval(this.getData.bind(this), 30000);
  }

  async componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View>      
        <ListItem key={1} bottomDivider>
          <Icon style={styles.icon} name={this.state.temperature.icon} />
          <ListItem.Content>
            <ListItem.Title>{this.state.temperature.title}</ListItem.Title>
            <ListItem.Subtitle>{<Text style={styles.subtitle}>{this.state.temperature.updatedAt}</Text>}</ListItem.Subtitle>
          </ListItem.Content>
          <Text style={styles.icon}>{this.state.temperature.value}</Text>
        </ListItem>

        <ListItem key={2} bottomDivider>
          <Icon style={styles.icon} name={this.state.humidity.icon} />
          <ListItem.Content>
            <ListItem.Title>{this.state.humidity.title}</ListItem.Title>
            <ListItem.Subtitle>{<Text style={styles.subtitle}>{this.state.humidity.updatedAt}</Text>}</ListItem.Subtitle>
          </ListItem.Content>
          <Text style={styles.icon}>{this.state.humidity.value}</Text>
        </ListItem>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subtitle: {
    color: '#999'
  },
  icon: {
    fontSize: 20,
  },
});