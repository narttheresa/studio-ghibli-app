import React, { useEffect, useState } from "react";
import "../Styles/FavouriteList.css";

function FavouriteList() {
  //state variable for favourite films
  const [favouriteFilms, setFavouriteFilms] = useState([]);
  
//asynchronous data fetching when component mounts
//fetch to retrieve a list of favourite films from the specified api endpoint 
  useEffect(() => {
    fetch("https://studio-ghibli-xt0j.onrender.com/favourites")
      .then((resp) => resp.json())
      .then((data) => setFavouriteFilms(data))
      .catch((error) =>
        console.error("Error fetching favourite films:", error)
      );
  }, []);

//removing a film from the list of favourite films
  function handleRemoveFromFavourites(id) {
    fetch(`https://studio-ghibli-xt0j.onrender.com/favourites/${id}`,{
        method: 'DELETE',
    })
        .then((resp) => {
            if(!resp.ok) {
                throw new Error(`HTTP error. Status: ${resp.status}`);
            }
            return fetch('https://studio-ghibli-xt0j.onrender.com/favourites')
        })
        .then((resp) => resp.json())
        .then((data) => setFavouriteFilms(data) )
        .catch((error) => {
            console.error('Error removing film from favourites:', error);
        })
  }

  return (
    <div className="favourite-main-container">
      <h2>Favourite Films</h2>
      <h4>Add your favourite films below!</h4>
      <div className="favourite-film-container">
        {favouriteFilms.map((film) => (
          <div key={film.id} className="favourite-film-card">
            <img src={film.img} alt={film.title} />
            <div>
              <h3>{film.title}</h3>
              <small>
                {film.releaseDate} | {film.runningTime}min
              </small>
              <p className="description">{film.description}</p>
              <button onClick={() => handleRemoveFromFavourites(film.id)}>
                Remove from Favourites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavouriteList;
