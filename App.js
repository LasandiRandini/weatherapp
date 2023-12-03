import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';

//API call
const API_KEY = "0ac4dae94ae89e91327c3bc02f6294e6";


export default function App() {

    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    async function fetchWeatherData(cityName) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        try {
            const response = await fetch(API);
            if(response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
            
        } catch (error) {
            console.log(error);
        }
    }

   //default weather interface setting
    useEffect(() => {
        fetchWeatherData('Colombo');
    }, [])
    

    if(!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='white'  size={36} />
            </View>

        )
    }

    //when searched city is cant found
    else if(weatherData === null) {
        return (
            <View style={styles.container}>
                <SearchBar fetchWeatherData={fetchWeatherData}/>
                <Text style={{ ...styles.primaryText, fontWeight: 'bold' }}>City Not Found!</Text>
            </View>


        )
    }

    return (
        <View style={styles.container}>
            <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}  />
        </View>
    );
}


//for styling error page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    
  },
  primaryText: {
      margin: 20,
      fontSize: 28
  }
});
