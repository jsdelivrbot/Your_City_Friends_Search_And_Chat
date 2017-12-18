import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import axios from '../axios';
// import Autocomplete from 'react-google-autocomplete'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick(props, marker, e) {
    console.log('marker clicked');
    this.setState({selectedPlace: props, activeMarker: marker, showingInfoWindow: true});
  }

  render() {
    const style = {
      width: '50vw',
      height: '100vh',
      border: '1px solid yellow'
    }
    return (
        <Map google={this.props.google} style={style}>
        <Marker onClick={this.onMarkerClick} name={'SOMA'} position={{
          lat: 41.90278349999999,
          lng: 12.496365500000024
        }}/>
        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
        <h1>You Here</h1>
        </InfoWindow>
        </Map>);

  }
}
//
// export default GoogleApiWrapper({apiKey: ("AIzaSyCYnCrdS4AwE6GbSG-jy-4hYB1ltz7t0UY")})(MapContainer)


export default GoogleApiWrapper({apiKey: ("AIzaSyDHZNR4-XRReuegKHkRHjNczCKnB_E8nho")})(MapContainer)
