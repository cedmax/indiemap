import React, { useEffect, useRef, useState } from "react";
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet.marker.slideto";

export default ({ data, selectedItem, setSelected }) => {
  if (!selectedItem) return null;
  const [prevSelected, setPrevSelected] = useState(data[0]);
  const map = useRef(null);

  useEffect(() => {
    L.marker([prevSelected.lat, prevSelected.lng])
      .on("click", () => {
        setSelected(prevSelected.city);
      })
      .addTo(map.current.leafletElement)
      .bindPopup(
        L.popup().setContent(
          `<h3>${prevSelected.city}</h3><small>by</small> <strong>${prevSelected.artist}</strong>`
        )
      )
      .openPopup();
    if (selectedItem && map.current) {
      const marker = L.marker([prevSelected.lat, prevSelected.lng], {
        icon: L.divIcon({ className: "my-icon" })
      });

      marker
        .addTo(map.current.leafletElement)
        .slideTo([selectedItem.lat, selectedItem.lng], {
          duration: 2000,
          keepAtCenter: true
        })
        .on("moveend", () => {
          const popup = L.popup().setContent(
            `<h3>${selectedItem.city}</h3><small>by</small> <strong>${selectedItem.artist}</strong>`
          );
          L.marker([selectedItem.lat, selectedItem.lng])
            .on("click", function() {
              setSelected(selectedItem.city);
            })
            .addTo(map.current.leafletElement)
            .bindPopup(popup)
            .openPopup();
          map.current.leafletElement.removeLayer(marker);
        });

      // const marker = L.marker([selectedItem.lat, selectedItem.lng]);

      // const route = L.layerGroup(
      //   [
      //     L.marker([prevSelected.lat, prevSelected.lng]),
      //     L.polyline(
      //       [
      //         [prevSelected.lat, prevSelected.lng],
      //         [selectedItem.lat, selectedItem.lng]
      //       ],
      //       { snakingSpeed: 500 }
      //     ),
      //     marker
      //   ],
      //   { snakingPause: 0 }
      // );
      // route.on("snakeend", () => {
      //   const popup = L.popup().setContent(
      //     `<h3>${selectedItem.city}</h3><small>by</small> <strong>${selectedItem.artist}</strong>`
      //   );
      //   marker.bindPopup(popup).openPopup();
      //   map.current.leafletElement.flyTo([selectedItem.lat, selectedItem.lng]);
      // });

      // route.addTo(map.current.leafletElement).snakeIn();

      setPrevSelected(selectedItem);
    }
  }, [selectedItem, map, data]);

  return (
    <div className="map">
      <Map
        ref={map}
        center={[data[0].lat, data[0].lng]}
        zoom={3}
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
      </Map>
    </div>
  );
};
