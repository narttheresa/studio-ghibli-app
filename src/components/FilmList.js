import React, { useState, useEffect } from "react";
import { fetchFilms } from "../Api";
import "../Styles/FilmList.css";
import FilmCard from "./FilmCard";
import SelectOptions from "./SelectOptions";

function FilmList() {
  const [films, setFilms] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [favouriteFilms, setFavouriteFilms] = useState([]);
  const [addedToFavourites, setAddedToFavourites] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToFavourites = (film) => {
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
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
        }
      })
      .catch((error) => {
        console.error("Error adding film to favorites:", error);
      });
  };

  // Fetch film data when the component mounts
  useEffect(() => {
    fetchFilms()
      .then((resp) => resp.data)
      .then((data) => {
        setFilms(data);
      })
      .catch((error) => {
        console.error("Error fetching films:", error);
      });
  }, []);

  // Function to remove a film from favorites
  const handleDeleteFromFavourites = (filmId) => {
    setFavouriteFilms(favouriteFilms.filter((film) => film.id !== filmId));
    setAddedToFavourites({ ...addedToFavourites, [filmId]: false });

    // Send a DELETE request to remove the film from favorites on the server
    fetch(`https://studio-ghibli-xt0j.onrender.com/favourites/${filmId}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
        }
      })
      .catch((error) => {
        console.error("Error deleting film:", error);
      });
  };

  // Fetch the film data again when the component mounts
  useEffect(() => {
    fetchFilms()
      .then((resp) => resp.data)
      .then((data) => {
        setFilms(data);
      })
      .catch((error) => {
        console.error("Error fetching films:", error);
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

  function filterFilms() {
    return films.filter((film) =>
      film.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Render only the filtered films
  const renderedFilms = filterFilms();

  function handleSearchInputChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleClearSearch() {
    setSearchQuery("");
  }

  return (
    <div className="main-container">
      <h2>Studio Ghibli Films</h2>
      <SelectOptions
        sortOption={sortOption}
        isAscending={isAscending}
        onSortChange={handleSortChange}
        onOrderChange={setIsAscending}
        searchQuery={searchQuery}
        onSearchChange={handleSearchInputChange}
        onClearSearch={handleClearSearch}
      />
      <div className="film-container">
        {renderedFilms.map((film) => (
          <FilmCard
            key={film.id}
            film={film}
            addedToFavourites={addedToFavourites}
            onAddToFavourites={handleAddToFavourites}
            onDeleteFromFavourites={handleDeleteFromFavourites}
          />
        ))}
      </div>
    </div>
  );
}

export default FilmList;
