import React, { useState  } from 'react'
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'; 

export default function SearchBar({ fetchWeatherData }) {

    //for search bar changes
    const [cityName, setCityName] = useState('');

    return (
        <View style={styles.searchBar}>
            <TextInput 
                placeholder='Enter Your City Name'
                value={cityName}
                onChangeText={(text) => setCityName(text)}
            />
            <EvilIcons name="search" size={28} color="black"  onPress={() => fetchWeatherData(cityName)}/>
        </View>
    )
}

//styling search bar
const styles = StyleSheet.create({
    searchBar: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 20,
        borderWidth: 1.5,
        paddingVertical: 10,
        borderRadius: 25,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        backgroundColor: 'lightgray',
        borderColor: 'gray',
        
        
    }
})
