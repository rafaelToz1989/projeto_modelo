import React, { Component } from 'react';
class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pontos: this.props.pontos
    }
  }

  componentDidMount() {
    new window.google.maps.Map(document.getElementById('map'), {
      center: {
        lat: -23.550321,
        lng: -46.633937
      },
      zoom: 10
    });
  }

  componentWillReceiveProps(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {
    var shouldUpdate = false
    // console.log("shouldUpdate")
    // // console.log("pontos: " + JSON.stringify(this.state.pontos))


    // console.log("AQUI:" + this.state.pontos.length, nextProps.pontos.length)
    // if (this.state.pontos.length !== nextProps.pontos.length) {
    //   return true
    // }

    // nextProps.pontos.map((item, i) => {
    //   if (this.props.pontos[i]) {
    //     if (item.lat !== this.props.pontos[i].lat || item.lng !== this.props.pontos[i].lng) {
    //       shouldUpdate = true
    //     }
    //   } else {
    //     shouldUpdate = true
    //   }
    // })

    return shouldUpdate;
  }

  render() {
    new window.google.maps.LatLngBounds()
    if (document.getElementById('map') != null) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: this.props.lat, lng: this.props.lng },
        zoom: 18
      })

      var directionsService = new window.google.maps.DirectionsService();
      var directionsDisplay = new window.google.maps.DirectionsRenderer();

      directionsDisplay.setMap(map);

      var waypts = [];

      for (var i = 1; i < this.props.pontos.length - 1; i++)
        waypts.push({
          location: new window.google.maps.LatLng(this.props.pontos[i].lat, this.props.pontos[i].lng),
          stopover: true
        });

      if (this.props.pontos.length > 1) {
        directionsService.route({
          origin: new window.google.maps.LatLng(this.props.pontos[0].lat, this.props.pontos[0].lng),
          destination: new window.google.maps.LatLng(this.props.pontos[this.props.pontos.length - 1].lat, this.props.pontos[this.props.pontos.length - 1].lng),
          travelMode: 'DRIVING',
          waypoints: waypts,
        }, function (response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);

            directionsDisplay.setMap(map);
            directionsDisplay.setOptions({ suppressMarkers: true })
            var my_route = response.routes[0];
            for (var i = 0; i < my_route.legs.length; i++) {
              new window.google.maps.Marker({
                position: my_route.legs[i].start_location,
                label: {text: "" + (i + 1), color:'white'},
                map: map
              });
            }
          }

          new window.google.maps.Marker({
            position: my_route.legs[i - 1].end_location,
            label: {text: "" + (i + 1), color:'white'},
            map: map
          });
        });
      } else if (this.props.pontos.length === 1) {
        new window.google.maps.Marker({
          position: new window.google.maps.LatLng(this.props.pontos[0].lat, this.props.pontos[0].lng),
          map: map
        })
      }
    }


    return (
      <div id="map" style={{ height: '100%', minHeight: '90.0vh', width: '100%' }} />
    );
  }
};
export default Map;