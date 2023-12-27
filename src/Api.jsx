import axios from "axios";  //used to make HTTP requests to APIs

//base URL of the ghibli API
const baseURL = "https://ghibliapi.dev";

//making a GET request to the specified endpoints
export const fetchFilms = () => axios.get(`${baseURL}/films`);
export const fetchPeople = () => axios.get(`${baseURL}/people`);