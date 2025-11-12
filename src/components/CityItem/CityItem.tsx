import type { FC } from "react";
import styles from "./CityItem.module.css";
import type { CityProps } from "./CityItem.types";
import { Link } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    // weekday: "long",
  }).format(new Date(date));

const CityItem: FC<CityProps> = ({ city }) => {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity } = useCities();

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity?.id == id ? styles.cityItemActive : ""
        }`}
        to={`/app/cities/${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;
