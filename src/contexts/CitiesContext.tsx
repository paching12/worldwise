import { createContext, useState, useEffect, type FC, useContext } from "react";
import type { City } from "../shared/types/City";

const URL = "http://localhost:8001";
type contextTypeValue = {
  isLoading: boolean;
  cities: City[];
  currentCity?: City;
  setCurrentCity: (city: City) => void;
  getCity: (id: string) => void;
  createCity: (city: City) => void;
};

const CitiesContext = createContext<contextTypeValue>({
  createCity: () => {},
  isLoading: false,
  cities: [],
  currentCity: undefined,
  setCurrentCity: () => {},
  getCity: () => {},
});

type CitiesContextProvider = {
  children: React.ReactNode;
};

const CitiesProvider: FC<CitiesContextProvider> = ({ children }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<City | undefined>(undefined);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  async function getCity(id: string) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading the data...");
    } finally {
      setIsLoading(false);
    }
  }

  const createCity = async (newCity: Omit<City, "id"> & { id?: string }) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: City = await res.json();
      console.log("post data", data);

      setCities((cities: City[]) => [...cities, data]);
    } catch (err: unknown) {
      console.error(err);
      // const message =
      //   err instanceof Error
      //     ? err.message
      //     : typeof err === "string"
      //     ? err
      //     : "Unknown error";
      // setGeocodeError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        setCurrentCity,
        getCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities Context was used outside the CitiesProvider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
