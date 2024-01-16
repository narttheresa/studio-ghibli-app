import axios from "axios";  //used to make HTTP requests

//base URL of the backend server
const baseURL = "https://studio-ghibli-xt0j.onrender.com";

//making a GET request to the specified endpoints
export const fetchFilms = () => axios.get(`${baseURL}/films`);
export const fetchPeople = () => axios.get(`${baseURL}/people`);


