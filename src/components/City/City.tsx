import type { FC } from "react";
import type { CityProps } from "./City.types";
import { useParams } from "react-router-dom";

const City: FC<CityProps> = () => {
  //   const { cityName, emoji, date } = city;

  const { id } = useParams();

  return (
    <div>City {id}</div>
    // <li className={styles.cityItem}>
    //   <span className={styles.emoji}>{emoji}</span>
    //   <h3 className={styles.name}>{cityName}</h3>
    //   <time className={styles.date}>{formatDate(date)}</time>
    //   <button className={styles.deleteBtn}>&times;</button>
    // </li>
  );
};

export default City;
