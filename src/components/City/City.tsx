import { useEffect, type FC } from "react";
import type { CityProps } from "./City.types";
import { useParams } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
import styles from "./City.module.css";
import { formatDate } from "../../shared/utils/Dates";
import { Spinner } from "../Spinner";
import { BackButton } from "../BackButton";

const City: FC<CityProps> = () => {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  useEffect(() => {
    getCity(id || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{currentCity?.emoji}</span> {currentCity?.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {currentCity?.cityName} on</h6>
        <p>{formatDate(currentCity?.date || new Date().toISOString())}</p>
      </div>

      {currentCity?.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{currentCity.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${currentCity?.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {currentCity?.cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
};

export default City;
