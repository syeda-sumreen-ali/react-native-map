import React, {Component} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';

import MapView, {
  Marker,
  Callout,
  Polygon,
  PROVIDER_GOOGLE,
  Circle,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import RNGooglePlaces from 'react-native-google-places';
class App extends Component {
  state = {
    coordinates: [
      // {name: 0, latitude: 37.8925259, longitude: -122.345558},
      {name: '1', latitude: 37.8025259, longitude: -122.4351431},
      {name: '2', latitude: 37.7896386, longitude: -122.421646},
      {name: '3', latitude: 37.7665248, longitude: -122.4161628},
      {name: '4', latitude: 37.7734153, longitude: -122.44577787},
      {name: '5', latitude: 37.8025259, longitude: -122.4590665},
    ],
    currentLocation: {
      latitude: 0,
      longitude: 0,
    },
  };
  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        console.log(place);
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
      })
      .catch((error) => console.log(error.message)); // error is a Javascript Error object
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        this.setState(
          {
            currentLocation: {
              latitude: currentLatitude,
              longitude: currentLongitude,
            },
          },
          () => {
            console.log(`location updated ${this.state.currentLocation}`);
          },
        );
      },
      (error) => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.openSearchModal()}>
          <Text>Pick a Place</Text>
        </TouchableOpacity>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Polygon
            coordinates={this.state.coordinates}
            fillColor={'rgba(0,0,0,0.3)'}
            strokeWidth={2}
          />
          <Circle
            center={{latitude: 37.7825259, longitude: -122.4351431}}
            radius={1000}
            fillColor={'rgba(233,30,99,0.5)'}
          />
          <Marker
            draggable
            coordinate={{latitude: 37.7825259, longitude: -122.4351431}}
            // title="San Francisco"
          >
            <Callout>
              <Image
                style={{height: 50, width: 80}}
                source={require('./img.jpg')}
              />
              <Text>an interesting city</Text>
            </Callout>
            {/* <Image
              style={{height: 50, width: 80}}
              source={require('./img.jpg')}
              resizeMode="contain"
            /> */}
          </Marker>
          {this.state.coordinates.map((marker) => (
            <Marker
              key={marker.name}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.name}>
              <Callout>
                <Image
                  style={{height: 50, width: 80}}
                  source={require('./img.jpg')}
                />
                <Text>an interesting city</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    padding: 30,
    margin: 30,
  },
});
