import React, { useState, useEffect, useMemo } from "react";
import { fetchFilms } from "../../Api";
import "../../Styles/FilmList.css";
import FilmCard from "./FilmCard";
import SelectOptions from "./SelectOptions";

//managing the states for various aspects of the component
function FilmList() {
  const [films, setFilms] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [favouriteFilms, setFavouriteFilms] = useState([]);
  const [addedToFavourites, setAddedToFavourites] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  
  // Fetch film data when the component mounts
  useEffect(() => {
    const fetchData = async () => {       //async func fetched films using fetchdata func
      try {
        setLoading(true);
        // Fetch film data
        const response = await fetchFilms();
        const data = await response.data;
        setFilms(data);
      } catch (error) {
        console.error("Error fetching films:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  //update the favouritefilms state using spread operator- create a new array for fav films 
  function handleAddToFavourites(film) {
    setFavouriteFilms([...favouriteFilms, film]);
    setAddedToFavourites({ ...addedToFavourites, [film.id]: true });

    // Send a POST request to add the film to favourites on the server
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

  
  // Function to remove a film from favourites
  function handleDeleteFromFavourites(filmId) {
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

//films sorted based on the selected sorting options(sortoptions) and order(isAscending)
  const sortedFilms = useMemo(() => {
    let copyFilms = [...films];

    copyFilms.sort((a, b) => {
      switch (sortOption) {
        case "title":
          return isAscending
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        case "year":
          return isAscending
            ? a.release_date.localeCompare(b.release_date)
            : b.release_date.localeCompare(a.release_date);
        case "ratings":
          return isAscending ? a.rt_score - b.rt_score : b.rt_score - a.rt_score;
        case "runningTime":
          return isAscending
            ? a.running_time - b.running_time
            : b.running_time - a.running_time;
        default:
          return 0;
      }
    });

    return copyFilms;
  }, [films, sortOption, isAscending]);




  //handles changes in the selected sorting option, updates the state with the new value- triggers re-render
  function handleSortChange(e) {
    const selectedOption = e.target.value;   //extracts the value of the selected sorting option from the event object
    setSortOption(selectedOption);    //updating the state variable-sortoption 
    setIsAscending((prevIsAscending) => {
      // If the same option is selected, toggle the order
      return selectedOption === sortOption ? !prevIsAscending : true;
    });
  };


  //filters the film based on searchquery-return a new array containing the filtered films
  function filterFilms() {
    return sortedFilms.filter((film) =>
      film.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Render only the filtered films
  const renderedFilms = filterFilms();

  //updates the searchquery state with the new value from the input field triggering re-render 
  function handleSearchInputChange(e) {
    setSearchQuery(e.target.value);
  }
//sets the searchquery state to empty string- clear search results 
  function handleClearSearch() {
    setSearchQuery("");
  }

  return (
    <div className="main-container">
      <h2>Studio Ghibli Films</h2>
      <SelectOptions                   //sorting component receiving props for state management and event handling
        sortOption={sortOption}
        isAscending={isAscending}
        onSortChange={handleSortChange}
        onOrderChange={setIsAscending}
        searchQuery={searchQuery}
        onSearchChange={handleSearchInputChange}
        onClearSearch={handleClearSearch}
      />
      {loading ? (         //conditional rendering when or not to display loading message 
        <p>Loading...</p>
      ) : (
        <div className="film-container">
          {renderedFilms.map((film) => (
            <FilmCard       //film card component for each film displayed- receives props for state management 
              key={film.id}
              film={film}
              addedToFavourites={addedToFavourites}
              onAddToFavourites={handleAddToFavourites}
              onDeleteFromFavourites={handleDeleteFromFavourites}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FilmList;
