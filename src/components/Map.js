import React, { useEffect, useRef, useState } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

export default ({ data, selected, setSelected }) => {
  const [markers] = useState(data.map(i => useRef(null)));

  const map = useRef(null);

  useEffect(() => {
    if (selected && map.current) {
      const i = data.findIndex(item => item.city === selected.city);
      map.current.leafletElement.flyTo([selected.lat, selected.lng]);
      markers[i].current.leafletElement.openPopup();
    }
  }, [selected, map, data, markers]);

  return (
    <Map
      ref={map}
      center={[data[0].lat, data[0].lng]}
      zoom={11}
      scrollWheelZoom={false}
    >
      <TileLayer
        id="mapbox/streets-v11"
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a> | Playlist on <a href="https://open.spotify.com/playlist/4eR2bW8v5avAXl03qLYWzY?si=adOpXrocSnqoLl87KgfEkw">Spotify</a>'
        tileSize={512}
        zoomOffset={-1}
        accessToken="pk.eyJ1IjoiY2VkbWF4IiwiYSI6ImNpenBrZDhkazAwMTUyd255cWpocjFpMmYifQ.OBuGt4CZx9oezTqD0-JYaw"
      />
      {data.map((item, i) => {
        return (
          <Marker
            onClick={() => setSelected(item)}
            ref={markers[i]}
            key={item.city}
            position={[item.lat, item.lng]}
          >
            <Popup>
              <h3>{item.city}</h3>
              <small>by</small> <strong>{item.artist}</strong>
            </Popup>
          </Marker>
        );
      })}
    </Map>
  );
};
