import axios from "axios";

const API_BASE = "https://restcountries.com/v3.1";

export const fetchAllCountries = () => axios.get(`${API_BASE}/all`);
export const fetchByName = (name) => axios.get(`${API_BASE}/name/${name}`);
export const fetchByRegion = (region) =>
  axios.get(`${API_BASE}/region/${region}`);
export const fetchByCode = (code) => axios.get(`${API_BASE}/alpha/${code}`);
