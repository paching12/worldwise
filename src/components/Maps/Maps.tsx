/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Maps.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../../contexts/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import { Button, BUTTON_TYPES } from "../Button";
import { useUrlPosition } from "../../hooks/useUrlPosition";

const Maps = () => {
  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);
  // const [searchParams] = useSearchParams();
  const [lat, lng] = useUrlPosition();

  const {
    isLoading: isLoadingPostion,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const navigate = useNavigate();
  const { cities } = useCities();

  useEffect(() => {
    if (lat && Number(lat) && lng && Number(lng))
      setMapPosition([Number(lat), Number(lng)]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      {!geoLocationPosition && (
        <Button type={BUTTON_TYPES.POSITION} onClick={getPosition}>
          <p>{isLoadingPostion ? "Loading..." : "Use your position"}</p>
        </Button>
      )}
      <MapContainer
        {...({
          center: [
            lat ? Number(lat) : mapPosition[0],
            lng ? Number(lng) : mapPosition[1],
          ],
          zoom: 6,
          scrollWheelZoom: true,
          className: styles.map,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)}
      >
        {/* TileLayer props typing mismatch in some react-leaflet versions; cast to any to satisfy TypeScript */}
        <TileLayer
          {...({
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any)}
        />

        {/* Markers */}
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

function ChangeCenter({ position }: { position: [number, number] }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e: {
      latlng: {
        lat: number;
        lng: number;
      };
      // Leaflet event exposes the original DOM event under `originalEvent`.
      // Keep typing loose here since react-leaflet typings may vary.
      originalEvent?: Event & { stopPropagation?: () => void };
    }) => {
      // Stop the React parent `onClick` on the container from also firing.
      // Leaflet exposes the underlying DOM event as `originalEvent`.
      try {
        // Access originalEvent without `any` to satisfy ESLint. Cast via unknown -> typed shape.
        (
          e as unknown as { originalEvent?: { stopPropagation?: () => void } }
        ).originalEvent?.stopPropagation?.();
      } catch (err) {
        // swallow if not available
        console.error(err);
      }
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
export default Maps;
