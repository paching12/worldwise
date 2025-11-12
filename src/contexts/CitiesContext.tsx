import { createContext, useState, useEffect, type FC, useContext } from "react";
import type { City } from "../shared/types/City";

const URL = "http://localhost:8001";
type contextTypeValue = {
  isLoading: boolean;
  cities: City[];
  currentCity?: City;
  setCurrentCity: (city: City) => void;
  getCity: (id: string) => void;
};

const CitiesContext = createContext<contextTypeValue>({
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
  const [cities, setCities] = useState([]);
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

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        setCurrentCity,
        getCity,
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
