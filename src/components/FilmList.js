import React, { useState, useEffect } from "react";
import { fetchFilms } from "../Api";
import "../Styles/FilmList.css";


function FilmList() {

    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetchFilms()
            .then(resp => {
                setFilms(resp.data);
            })
            .catch(error => {
                console.log("Error fetching films:" , error);
            })
    },[]);

    return (
        <div className="main-container">
            <h2>Studio Ghibli Films</h2>
            <div className="film-container">
                {films.map((film) => (
                    <div key={film.id} className="film-card">
                        <img src={film.image} alt={film.title} />
                        <h3>{film.title}</h3> 
                        <small>{film.release_date} | {film.running_time}min</small>
                        <p>{film.description}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}


export default FilmList;