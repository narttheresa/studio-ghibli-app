import React, { useState, useEffect } from "react";
import { fetchFilms } from "../Api";
import "../Styles/FilmList.css";
import FavouriteList from "./FavouriteList";

function FilmList() {
  const [films, setFilms] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [favouriteFilms, setFavouriteFilms] = useState([]);
  const [addedToFavourites, setAddedToFavourites] = useState({});

  const addFilmToFavourites = (film) => {
    setFavouriteFilms([...favouriteFilms, film]);
    setAddedToFavourites({ ...addedToFavourites, [film.id]: true });

    // Send a POST request to add the film to favorites on the server
    fetch("https://studio-ghibli-xt0j.onrender.com/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: film.id,
        title: film.title,
        description: film.description,
        releaseDate: film.release_date,
        runningTime: film.running_time,
        ratingScore: film.rt_score,
        img: film.image,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error("Error adding film to favorites:", error);
      });
  };

  // Fetch film data when the component mounts
  useEffect(() => {
    fetchFilms()
      .then((response) => response.data)
      .then((data) => {
        setFilms(data);
      })
      .catch((error) => {
        console.error("Error fetching films:", error);
      });
  }, []);

  // Function to remove a film from favorites
  const deleteFilmFromFavourites = (filmId) => {
    setFavouriteFilms(favouriteFilms.filter((film) => film.id !== filmId));
    setAddedToFavourites({ ...addedToFavourites, [filmId]: false });

    // Send a DELETE request to remove the film from favorites on the server
    fetch(`https://studio-ghibli-xt0j.onrender.com/favourites/${filmId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error("Error deleting film:", error);
      });
  };

  // Fetch the film data again when the component mounts
  useEffect(() => {
    fetchFilms()
      .then((response) => response.data)
      .then((data) => {
        setFilms(data);
      })
      .catch((error) => {
        console.error("Error fetching films:", error);
      });
  }, []);

  function starRating(rt_score) {
    const fullStars = Math.floor(rt_score / 20);
    const halfStars = rt_score % 20 >= 10 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }

    if (halfStars) {
      stars.push(
        <span key="half" style={{ width: "10px" }}>
          &#9733;
        </span>
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`}>&#9734;</span>);
    }

    return stars;
  }

  useEffect(() => {
    sortFilms();
  }, [sortOption, isAscending]);

  function sortFilms() {
    let sortedFilms = [...films];
    switch (sortOption) {
      case "title":
        sortedFilms.sort((a, b) =>
          isAscending
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
        break;
      case "year":
        sortedFilms.sort((a, b) =>
          isAscending
            ? a.release_date.localeCompare(b.release_date)
            : b.release_date.localeCompare(a.release_date)
        );
        break;
      case "ratings":
        sortedFilms.sort((a, b) =>
          isAscending ? a.rt_score - b.rt_score : b.rt_score - a.rt_score
        );
        break;
      case "runningTime":
        sortedFilms.sort((a, b) =>
          isAscending
            ? a.running_time - b.running_time
            : b.running_time - a.running_time
        );
        break;
      default:
        break;
    }

    setFilms(sortedFilms);
  }

  function handleSortChange(e) {
    setSortOption(e.target.value);
  }
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
            <p>Rating: {starRating(film.rt_score)}</p>
            <small>
              {film.release_date} | {film.running_time}min
            </small>
            <p className="description">{film.description}</p>
            <button
              onClick={() => {
                addFilmToFavourites(film);
              }}
            >
              Add to Favourites
            </button>
            {addedToFavourites[film.id] && (
              <button
                onClick={() => {
                  deleteFilmFromFavourites(film.id);
                }}
              >
                Remove from Favourites
              </button>
            )}
          </div>
        ))}
      </div>
      <FavouriteList
        favouriteFilms={favouriteFilms}
        setFavouriteFilms={setFavouriteFilms}
      />
    </div>
  );
}

export default FilmList;
