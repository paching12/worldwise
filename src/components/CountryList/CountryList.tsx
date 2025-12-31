import { type FC } from "react";
import styles from "./CountryList.module.css";
import { Spinner } from "../Spinner";
import { Message } from "../Message";
import type { CountryListProps } from "./CountryList.types";
import CountryItem from "../CountryItem/CountryItem";
import { useCities } from "../../contexts/CitiesContext";

const CountryList: FC<CountryListProps> = () => {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length) {
    return (
      <Message message="Add your first country by clicking on a city on the map" />
    );
  }

  const countries = [
    ...new Set(
      cities.map((city) => ({
        country: city.country,
        countryCode: city.countryCode.toLowerCase(),
        id: city.id,
      }))
    ),
  ];

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={`country-${country.id}`} />
      ))}
    </ul>
  );
};

export default CountryList;
