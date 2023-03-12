import "./App.css";
import * as React from "react";
import {Map, NavigationControl, Marker, Popup} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import {format} from "timeago.js"

function App() {

  const [pins, setPins] = React.useState([]);
  const [viewPort, setViewPort] = React.useState({
    longitude : 12.4,
    latitude : 37.8,
    zoom : 14 
  });

  const [currentPlaceId, setCurrentPlaceId] = React.useState(null);

  const handleMarkerClicked = (id, lat, long) => {
    console.log(lat);
    console.log(long);
    setCurrentPlaceId(id);
  }

  React.useEffect(() => {
    const getPins = async() => {
      try {
        // using axios to make a GET request to /api/pins/ router
        // Path . -> server/index.js -> /api/pins router
        const response = await axios.get("/pins/");
        //console.log(response);
        setPins(response.data);

      } catch(err) {
        console.log(err);
      }
    }

    getPins()

  },[]);

    return (
        <div>
            <Map
            container = {"map"}
            projection = {"globe"}
            initialViewState = {{viewPort}}
            mapboxAccessToken = {[process.env.REACT_APP_TOKEN]}
            style = {{width:"100vw", height:"100vh"}}
            mapStyle = "mapbox://styles/ngoct/clf4kfkc4004w01p7nl01fbw3"
            >
              <NavigationControl/>
              {
                pins.map(p => (
                  <>
                    <Marker
                    longitude = {p.long}
                    latitude = {p.lat}
                    anchor = "center">
                      <LocationOnIcon
                      className='icon'
                      onClick = {() => handleMarkerClicked(p._id, p.lat, p.long)}
                      style = {{fontSize : viewPort.zoom * 2, color : "slateblue"}}
                      />
                    </Marker>

                    {
                      p._id === currentPlaceId &&
                      (
                        <Popup
                        longitude = {p.long}
                        latitude = {p.lat}
                        closeOnClick = {false}
                        closeOnMove = {false}
                        anchor = "left"
                        >
                          <div className = "card">
                            <label>Place</label>
                            <h4 className = "place">{p.title}</h4>
                            <label>Review</label>
                            <p className = 'desc'>{p.desc}</p>
                            <label>Rating</label>
                            <div className="stars">
                              {Array(p.rating).fill(<StarIcon className = "star"/>)}
                            </div>

                            <label>Info</label>
                            <div className = "info">
                              <span className = "username">Created by <b>{p.username}</b></span>
                              <span className = "date">{format(p.createdAt)}</span>
                            </div>
                            

                          </div>

                        </Popup>
                      )
                    }


                  </>
                ))
              }
            </Map>
        </div>
    );
}

export default App;
