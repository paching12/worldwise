import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Maps.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useCities } from "../../contexts/CitiesContext";

const Maps = () => {
  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);
  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const navigate = useNavigate();
  const { cities } = useCities();

  useEffect(() => {
    if (lat && Number(lat) && lng && Number(lng))
      setMapPosition([Number(lat), Number(lng)]);
  }, [lat, lng]);

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
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
      </MapContainer>
    </div>
  );
};

function ChangeCenter({ position }: { position: [number, number] }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Maps;
