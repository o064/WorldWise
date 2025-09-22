import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import styles from "./Map.module.css";
import { useCity } from "../contexts/CityContext";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button"
import { useURLPosition } from "../hooks/useURLPosition";
function Map() {
  const [mapPosition, setmapPosition] = useState([45,0]);
  const { cities } = useCity();
  const {isLoading : isLoadingGeolocation , position : geolocationPostion,getPosition } = useGeolocation();
  const [mapLat,mapLng]  = useURLPosition();

  useEffect(()=>{
    if(geolocationPostion) setmapPosition(geolocationPostion);
  } , [geolocationPostion ]);

  useEffect(()=>{
    if(mapLng && mapLat) setmapPosition([mapLat,mapLng])
  }, [mapLat,mapLng]);

  return (
    <div className={styles.mapContainer}>
      {/* <User /> */}
      {!geolocationPostion &&
      <Button type="position" onClick={getPosition}>
        {isLoadingGeolocation ? "Loading......" : "use your geolocation"}
        </Button> }
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker position={city.position} key={city.id}>
              <Popup>
                <span>{city.emoji} </span> <span>{city.cityName} </span>
              </Popup>
            </Marker>
          );
        })}
        <ChangePosition position={mapPosition} />
        <DetectClick /> 
      </MapContainer>
    </div>
  );
}
function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick(){
  const navigate = useNavigate();
  useMapEvents({
    click : e => {
      const {lat , lng} = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    }
  })
}

export default Map;
