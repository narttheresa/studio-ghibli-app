import React, { useState, useEffect } from "react";
import { fetchFilms } from "../Api";
import "../Styles/FilmList.css";


function FilmList() {
  const [films, setFilms] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    fetchFilms()
      .then((resp) => {
        setFilms(resp.data);
      })
      .catch((error) => {
        console.log("Error fetching films:", error);
      });
  }, []);

  useEffect(() => {
    sortFilms();
  }, [sortOption, isAscending]);

  function sortFilms() {
    let sortedFilms = [...films];
    switch (sortOption) {
      case "title":
        sortedFilms.sort((a, b) => 
        (isAscending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
        break;
      case "year":
        sortedFilms.sort((a, b) => 
        (isAscending ? a.release_date.localeCompare(b.release_date) : b.release_date.localeCompare(a.release_date) )
        );
        break;
      case "ratings":
        sortedFilms.sort((a, b) => 
        (isAscending ? a.rt_score - b.rt_score : b.rt_score - a.rt_score));
        break;
      case "runningTime":
        sortedFilms.sort((a, b) => 
        (isAscending ? a.running_time - b.running_time : b.running_time - a.running_time));
        break;
      default:
        break;
    }
    

    setFilms(sortedFilms);
  }

  function handleSortChange(e) {
    setSortOption(e.target.value);
  };
  return (
    <div className="main-container">
      <h2>Studio Ghibli Films</h2>
      <div className="sort-wrapper">
        <label htmlFor="sortOption">Sort by:</label>
        <select id="sortOption" value={sortOption} onChange={handleSortChange}>
          <option value="">Select an option</option>
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="ratings">Ratings</option>
          <option value="runningTime">Running Time</option>
        </select>
        <div>
          <label>
            <input
              type="radio"
              name="order"
              value="ascending"
              checked={isAscending}
              onChange={() => setIsAscending(true)}
            />
            Ascending
          </label>
          <label>
            <input
              type="radio"
              name="order"
              value="descending"
              checked={!isAscending}
              onChange={() => setIsAscending(false)}
            />
            Descending
          </label>
        </div>
      </div>
      <div className="film-container">
        {films.map((film) => (
          <div key={film.id} className="film-card">
            <img src={film.image} alt={film.title} />
            <h3>{film.title}</h3>
            <p>Rating: {film.rt_score} / 100</p>
            <small>
              {film.release_date} | {film.running_time}min
            </small>
            <p className="description">{film.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilmList;
