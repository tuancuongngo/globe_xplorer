import "./App.css";
import * as React from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
    return (
        <div>
            <Map
            container = {"map"}
            projection = {"globe"}
            initialViewState = {{}}
            mapboxAccessToken = {[process.env.REACT_APP_TOKEN]}
            style = {{width:"100vw", height:"100vh"}}
            mapStyle = "mapbox://styles/ngoct/clf4kfkc4004w01p7nl01fbw3"
            >

            </Map>
            <h1>Hello world!</h1>
        </div>
    );
}

export default App;
