import type { City } from "../types/City";
import citiesData from "../../../data/cities.json";

// const isDevelopment = import.meta.env.DEV;
// const API_URL = "http://localhost:8001";
const STORAGE_KEY = "worldwise_cities";

// Inicializar localStorage con datos si está vacío
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(citiesData));
  }
};

export const citiesAPI = {
  async fetchCities(): Promise<City[]> {
    // if (isDevelopment) {
    //   const res = await fetch(`${API_URL}/cities`);
    //   if (!res.ok) throw new Error("Failed to fetch cities");
    //   return res.json();
    // } else {
    // En producción, usar localStorage
    initializeStorage();
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : citiesData;
    return parsed.cities || parsed;
    // }
  },

  async fetchCity(id: string): Promise<City> {
    // if (isDevelopment) {
    //   const res = await fetch(`${API_URL}/cities/${id}`);
    //   if (!res.ok) throw new Error("Failed to fetch city");
    //   return res.json();
    // } else {
    initializeStorage();
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : citiesData;
    const cities = parsed.cities || parsed;
    const city = cities.find((c: City) => c.id === id);
    if (!city) throw new Error("City not found");
    return city;
    // }
  },

  async createCity(newCity: Omit<City, "id"> & { id?: string }): Promise<City> {
    // if (isDevelopment) {
    //   const res = await fetch(`${API_URL}/cities`, {
    //     method: "POST",
    //     body: JSON.stringify(newCity),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   if (!res.ok) throw new Error("Failed to create city");
    //   return res.json();
    // } else {
    // En producción, agregar a localStorage
    initializeStorage();
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : citiesData;
    const cities = parsed.cities || parsed;
    const id = newCity.id || Date.now().toString();
    const cityWithId = { ...newCity, id };
    const updatedCities = [...cities, cityWithId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCities));
    return cityWithId as City;
    // }
  },

  async deleteCity(id: string): Promise<void> {
    // if (isDevelopment) {
    //   const res = await fetch(`${API_URL}/cities/${id}`, {
    //     method: "DELETE",
    //   });
    //   if (!res.ok) throw new Error("Failed to delete city");
    // } else {
    // En producción, eliminar de localStorage
    initializeStorage();
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : citiesData;
    const cities = parsed.cities || parsed;
    const filteredCities = cities.filter((c: City) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCities));
    // }
  },
};
