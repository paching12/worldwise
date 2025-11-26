import { ActionPayloadTypes, type ActionReducer } from "../../actions/cities";
import type { CityStateType } from "./cityReducer.types";

export const initialState = {
  cities: [],
  isLoading: false,
  currentCity: undefined,
  error: undefined,
};

export const CityReducer = (state: CityStateType, action: ActionReducer) => {
  switch (action.type) {
    case ActionPayloadTypes.LOAD_CITY:
      return {
        ...state,
        isLoading: true,
      };

    case ActionPayloadTypes.LOADED_CITIES:
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case ActionPayloadTypes.LOADED_CITY:
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case ActionPayloadTypes.DELETE_CITY:
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((item) => item.id != action.payload),
        currentCity: undefined,
      };
    case ActionPayloadTypes.CREATE_CITY:
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
      break;
    case ActionPayloadTypes.REJECTED_CITY:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type sent on CityReducer");
  }
};
