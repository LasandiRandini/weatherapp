import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar,Image } from 'react-native';
import SearchBar from './SearchBar';
import { haze, rainy, snow, sunny } from '../assets/backgroundImages/index';
import weatherStateIcon from '../assets/backgroundImages/7.png';
import clearSky from '../assets/backgroundImages/6.png';
import clouds from '../assets/backgroundImages/8.png';
import rain from '../assets/backgroundImages/3.png';
import thunder from '../assets/backgroundImages/1.png';

//this is for display relevent images ,backgrounds according to the weather status.
export default function Weather({ weatherData, fetchWeatherData }) {

    const [backgroundImage, setBackgroundImage] = useState(null);
    const [weatherStateIcon, setWeatherStateIcon] = useState('../assets/backgroundImages/7.png');

    const { weather,
            name,
            main: { temp, humidity,  temp_max, temp_min},
            wind: { speed }
    } = weatherData;
    const [{ main }] = weather;

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main));
    }, [weatherData])


    //weather status
    useEffect(() => {
       
        if (weatherData) {
       //thunderstorm   
          switch ((main).toLowerCase()) {
            case 'thunderstorm with light rain':
                setWeatherStateIcon(rain);
                break;
          case 'thunderstorm with rain':
            setWeatherStateIcon(rain);
                break;
          case 'thunderstorm with heavy rain':
            setWeatherStateIcon(rain);
                break;
          case 'rain':
            setWeatherStateIcon(rain);
            break;
          case 'thunderstorm':
            setWeatherStateIcon(rain);
                break;
          case 'heavy thunderstorm':
            setWeatherStateIcon(rain );
                break;
          case 'ragged thunderstorm':
            setWeatherStateIcon(rain);
            break;
         
      
          // Clear
          case 'clear':
            setWeatherStateIcon(clearSky);
                break;
      
          // Clouds
          case 'scattered clouds':
            setWeatherStateIcon(clouds);
                break;
          case 'clouds':
            setWeatherStateIcon(clouds);
                break;
          case 'overcast clouds':
            setWeatherStateIcon(clouds);
                break;
      
          
          // Default weather condition
          default:
            setWeatherStateIcon(thunder);
                break;
        }
        }
      }, [weatherData]);

      //change backgrounds when changing weather
    function getBackgroundImg(weather) {
        if(weather === 'Snow') return snow
        if(weather === 'Clear') return sunny
        if(weather === 'Rain') return rainy
        if(weather === 'Haze') return haze
        return haze;   
    }

    let textColor = backgroundImage !== sunny ? 'white' : 'black'
    
    //for styling the 4 alternative weather conditions
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='black' />
            <ImageBackground 
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'
            >
                <SearchBar fetchWeatherData={fetchWeatherData} />


                <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 46 }}>{name}</Text>
                        <View style={styles.weatherIconContainer}>
                        <Image
                            source={weatherStateIcon}
                            style={styles.weatherStateIcon}
                        />
                        </View>
                        <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold' }}>{main}</Text>
                        <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold' }}>{temp} °C</Text>
                    </View>

                <View style={styles.extraInfo}>
                <View style={styles.extraInfoGrp}> 
                <View style={styles.centeredContent}>
                        <Image
                        source={require('../assets/backgroundImages/humidity.png')}
                        style={styles.weatherIcon}
                        />
                    </View>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Humdity</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{humidity} %</Text>
                    </View>
                   </View>
                   

                   <View style={styles.extraInfoGrp}>
                    <View style={styles.centeredContent}>
                        <Image
                        source={require('../assets/backgroundImages/wind.png')}
                        style={styles.weatherIcon}
                        />
                    </View>

                    <View style={styles.centeredContent}>
                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Wind Speed</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{speed} m/s</Text>
                    </View>
                    </View>
                  </View>  
                   </View>
                

<View style={styles.extraInfo}>
<View style={styles.extraInfoGrp}>
    <View style={styles.centeredContent}>
        <Image
        source={require('../assets/backgroundImages/14.png')}
        style={styles.weatherIcon}
        />
    </View>
               
       <View style={styles.centeredContent}>
         <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Temp MIN</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{temp_min} °C</Text>
                    </View>
                    </View>
                    </View>
                    <View style={styles.extraInfoGrp}>
                    <View style={styles.centeredContent}>
                        <Image
                        source={require('../assets/backgroundImages/13.png')}
                        style={styles.weatherIcon}
                        />
                    </View>

                    <View style={styles.centeredContent}>
                        <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Temp MAX</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{temp_max} °C</Text>
                        </View>
                    </View>
                    </View>
                
                </View>
                    
            </ImageBackground>
        </View>
        
      )
}


//for set the positions
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    headerText: {
        fontSize: 40,
        marginTop: 0,
    },
    extraInfo: {
        flexDirection: 'row',
        
        marginTop: 20,
        justifyContent: 'space-between',
        padding: 10
    },
    info: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center'
    },
    weatherIcon:{
        width: 40,
        height: 40,
        marginTop: 20
    },
    extraInfoGrp: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: 'rgba(132,132,132,0.4)',
        padding: 20,
        borderRadius: 15,
        maxWidth: Dimensions.get('screen').width/2.15,
        justifyContent: 'center', 
      },
     
      centeredContent: {
        
        alignItems: 'center', 
        justifyContent: 'center', 
      },
    
      weatherIcon: {
        
        width: 40, 
        height: 40, 
        },

      info: {
        marginLeft: 10,
      },
      weatherStateIcon: {
        width:Dimensions.get('screen').width/2, 
        height: Dimensions.get('screen').width/2.15, 
        padding: 25
        
    }
});
  
