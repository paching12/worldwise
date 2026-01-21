// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState, type FormEvent } from "react";
import DatePicker from "react-datepicker";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import { BUTTON_TYPES } from "../Button";
import { BackButton } from "../BackButton";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { Message } from "../Message";
import { Spinner } from "../Spinner";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);

  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [geocodeError, setGeocodeError] = useState<string>("");

  const navigate = useNavigate();
  // const emoji = convertToEmoji(countryName)

  const { createCity, isLoading } = useCities();

  useEffect(() => {
    if (!lat || !lng) return;
    const fetchCityData = async () => {
      try {
        setIsLoadingGeocoding(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error(
            "It does not seem to be a cit. Click somewhere else 😔",
          );
        }
        setCityName(data.city || data.locallity || "");
        setCountryName(data.countryName);
        setCountryCode(data.countryCode);
        setGeocodeError("");
      } catch (err: unknown) {
        console.error(err);
        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
              ? err
              : "Unknown error";
        setGeocodeError(message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };
    fetchCityData();
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat || !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geocodeError) return <Message message={geocodeError} />;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      id: Date.now().toString(),
      cityName,
      country: countryName,
      countryCode,
      date: date.toISOString(),
      notes,
      position: {
        lat: Number(lat),
        lng: Number(lng),
      },
    };

    await createCity(newCity);

    navigate("/app/cities");
  };

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <div className={styles.flag}>
          <span className={`fi fi-${countryCode?.toLowerCase()} `}></span>
        </div>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When didd you go to {cityName}?</label>
        {/* <input
          id="date"
          type="date"
          onChange={(e) =>
            setDate(e.target.value ? new Date(e.target.value) : null)
          }
          value={date ? date.toISOString().substring(0, 10) : ""}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(selectedDate) => setDate(selectedDate)}
          dateFormat="dd/MM/yyyy"
          autoComplete="off"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          type={BUTTON_TYPES.PRIMARY}
          onClick={() => console.log("primary")}
        >
          <strong>Add</strong>
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
