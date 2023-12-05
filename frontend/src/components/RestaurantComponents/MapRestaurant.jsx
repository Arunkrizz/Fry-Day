import React, { useEffect, useRef, useState } from 'react';
import H from '@here/maps-api-for-javascript';
import { useSelector } from 'react-redux';

const MapRestaurant = ( props ) => {
    const mapRef = useRef(null);
    const map = useRef(null);
    const platform = useRef(null)
    // const {  userPosition, restaurantPositions } = props;
     const { hotelInfo } = useSelector((state) => state.hotelAuth);
     const [showMap,setShowMap] = useState(false)

    const restaurantLocation = {lat: hotelInfo.hotelInfo.latitude, lng: hotelInfo.hotelInfo.longitude}

    console.log(restaurantLocation,"res loc")

    const apikey =import.meta.env.VITE_HERE_MAP_API_KEY

    console.log(apikey ,"api")

     
   
    useEffect(
    () => {
      setTimeout(()=>{
        setShowMap(true)
      },1000)

      // console.log("res pos",props);
      if (showMap) {
        // console.log("res pos",restaurantPositions);
        calculateRoute(platform.current, map.current, restaurantLocation, restaurantLocation);
    }

      function calculateRoute(platform, map, start, destination) {
        // console.log("calc route");
        function routeResponseHandler(response) {
            
            map.addObjects([
                // Add a marker for the user
                new H.map.Marker(start, {
                    icon: getMarkerIcon('red')
                }),
               
            ]);
        }
    
        // Get an instance of the H.service.RoutingService8 service
        const router = platform.getRoutingService(null, 8);
    
        // Define the routing service parameters
        const routingParams = {
            'origin': `${start.lat},${start.lng}`,
            'destination': `${destination.lat},${destination.lng}`,
            'transportMode': 'car',
            'return': 'polyline'
        };
        // Call the routing service with the defined parameters
        router.calculateRoute(routingParams, routeResponseHandler, console.error);
    }
    

            function getMarkerIcon(color) {
            const svgCircle = `<svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="marker">
                <circle cx="10" cy="10" r="7" fill="${color}" stroke="${color}" stroke-width="4" />
                <!-- Add a smaller circle inside with a different color -->
                <circle cx="10" cy="10" r="4" fill="blue" />
                <!-- Add a triangle on top of the circle -->
                <polygon points="10,3 6,14 14,14" fill="green" />
            </g>
        </svg>`;
            return new H.map.Icon(svgCircle, {
                anchor: {
                    x: 10,
                    y: 10
                }
            });
        }
    
      // Check if the map object has already been created
      if (!map.current) {
        // Create a platform object with the API key
        platform.current = new H.service.Platform({ apikey });
        // Create a new Raster Tile service instance
        const rasterTileService = platform.current.getRasterTileService({
          queryParams: {
            style: "explore.day",
            size: 512,
          },
        });
        // Creates a new instance of the H.service.rasterTile.Provider class
        // The class provides raster tiles for a given tile layer ID and pixel format
        const rasterTileProvider = new H.service.rasterTile.Provider(
          rasterTileService
        );
        // Create a new Tile layer with the Raster Tile provider
        const rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider);
        // Create a new map instance with the Tile layer, center and zoom level
        const newMap = new H.Map(
          mapRef.current,
          rasterTileLayer, {
              pixelRatio: window.devicePixelRatio,
              center: restaurantLocation,
              zoom: 14,
          },
      );
      
  
        // Add panning and zooming behavior to the map
        const behavior = new H.mapevents.Behavior(
          new H.mapevents.MapEvents(newMap)
        );

  
        // Set the map object to the reference
        map.current = newMap;
      }
    },
    // Dependencies array
    [apikey,showMap]
  );
  
  // Return a div element to hold the map
  return <div style={ { width: "100%", height: "500px" } } ref={mapRef} />;
   }

  

  
  export default MapRestaurant;
