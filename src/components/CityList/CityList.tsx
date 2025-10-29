import { type FC } from "react";
import styles from "./CityList.module.css";
import type { CityListProps } from "./CityList.types";
import { Spinner } from "../Spinner";
import { CityItem } from "../City";
import { Message } from "../Message";

const CityList: FC<CityListProps> = ({ cities, isLoading }) => {
  if (isLoading) return <Spinner />;

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default CityList;
