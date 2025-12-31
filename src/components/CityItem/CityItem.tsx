import type { FC, MouseEvent } from "react";
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
  const { cityName, countryCode, date, id, position } = city;
  const { currentCity, deleteCity } = useCities();

  const onDeleteClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteCity(id);
  };

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity?.id == id ? styles.cityItemActive : ""
        }`}
        to={`/app/cities/${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {/* Flag */}
        <div className={styles.emoji}>
          <span className={`fi fi-${countryCode?.toLowerCase()}`}></span>
        </div>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={onDeleteClickHandler}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
