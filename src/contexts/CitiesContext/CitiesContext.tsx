import {
  createContext,
  useEffect,
  type FC,
  useContext,
  useReducer,
  useCallback,
} from "react";
import type {
  CitiesContextProvider,
  ContextTypeValue,
} from "./CitiesContext.types";
import { ActionPayloadTypes } from "../../actions/cities";
import {
  CityReducer,
  initialState,
} from "../../reducers/cityReducer/cityReducer";
import type { City } from "../../shared/types/City";

const URL = "http://localhost:8001";

const CitiesContext = createContext<ContextTypeValue>({
  createCity: () => {},
  deleteCity: () => {},
  isLoading: false,
  cities: [],
  currentCity: undefined,
  getCity: () => {},
});

const CitiesProvider: FC<CitiesContextProvider> = ({ children }) => {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    CityReducer,
    initialState,
  );

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({
        type: ActionPayloadTypes.LOAD_CITY,
        payload: undefined,
      });

      try {
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        dispatch({
          type: ActionPayloadTypes.LOADED_CITIES,
          payload: data,
        });
      } catch {
        alert("There was an error loading data");
        dispatch({
          type: ActionPayloadTypes.REJECTED_CITY,
          payload: "There was an error loading data",
        });
      }
    };

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id: string) {
      if (id === currentCity?.id) return;
      dispatch({
        type: ActionPayloadTypes.LOAD_CITY,
        payload: undefined,
      });

      try {
        const res = await fetch(`${URL}/cities/${id}`);
        const data = await res.json();
        dispatch({
          type: ActionPayloadTypes.LOADED_CITY,
          payload: data,
        });
      } catch {
        dispatch({
          type: ActionPayloadTypes.REJECTED_CITY,
          payload: "There was an error loading data",
        });
      }
    },
    [currentCity?.id],
  );

  const createCity = async (newCity: Omit<City, "id"> & { id?: string }) => {
    dispatch({
      type: ActionPayloadTypes.LOAD_CITY,
      payload: undefined,
    });
    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: City = await res.json();

      dispatch({
        type: ActionPayloadTypes.CREATE_CITY,
        payload: data,
      });
    } catch (err: unknown) {
      console.error(err);
      dispatch({
        type: ActionPayloadTypes.REJECTED_CITY,
        payload: "There was an error creating a city",
      });
    }
  };

  const deleteCity = async (id: string) => {
    dispatch({
      type: ActionPayloadTypes.LOAD_CITY,
      payload: undefined,
    });

    try {
      const res = await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });

      const data: City = await res.json();
      console.log("post data", data);

      dispatch({
        type: ActionPayloadTypes.DELETE_CITY,
        payload: id,
      });
    } catch (err: unknown) {
      console.error(err);
      dispatch({
        type: ActionPayloadTypes.REJECTED_CITY,
        payload: "There was an error deleting a city",
      });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
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
