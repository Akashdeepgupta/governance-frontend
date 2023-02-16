import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import { NavigationControl } from "mapbox-gl";
import React, { useEffect, useRef } from "react";

function MapComponent({ lng, lat }) {
  mapboxgl.accessToken = "pk.eyJ1Ijoic2FtYXJ0MzAxMCIsImEiOiJjbDdnbDQxYmQwNW1uM3BvYWRxd3o2anh2In0.zZC0WmrRiMG-ARCwS8QyoQ";
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom: 14,
    });
    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: true,
        collapsed: true,
      })
    );

    map.current.addControl(new NavigationControl(), "top-left");
    map.current.addControl(
      new mapboxgl.FullscreenControl({
        container: document.querySelector("root"),
      })
    );

    new mapboxgl.Marker({
      color: "#030303",
    })
      .setLngLat([lng, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank" >see on google map</a>`
        )
      )
      .addTo(map.current);
  }, [lng, lat, mapContainer]);
  return (
    <div
      ref={mapContainer}
      className="w-full h-72 rounded-md shadow-lg border-2 border-zinc-300"
    ></div>
  );
}

export default MapComponent;
