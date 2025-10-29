import type { FC } from "react";
import styles from "./CountryItem.module.css";
import type { CountryItemProps } from "./CountryItem.types";

const CountryItem: FC<CountryItemProps> = ({ country }) => {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
};

export default CountryItem;
