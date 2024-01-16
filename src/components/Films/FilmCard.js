import React, { useEffect, useState } from "react";
import axios from "axios";



function FilmCard({   //props passed through from filmlist comp
  film,
  onAddToFavourites,
  onDeleteFromFavourites,
}) {

  const [isInFavourites, setIsInFavourites] =useState(false);

 useEffect(() => {
    axios.get(`https://studio-ghibli-xt0j.onrender.com/favourites?title=${film.title}`)
      .then((resp) => setIsInFavourites(resp.data.length))
      .catch((error) => console.error("Error fetching favourites:", error))
 }, [film.title]);

  function starRating(rt_score) {
    const fullStars = Math.floor(rt_score / 20);        //each star represents 20 points
    const halfStars = rt_score % 20 >= 10 ? 1 : 0;      //if remainder after dividing by 20 is >10 
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];       //empty array to store star elements

// loops for full stars and appends a full star to the star array 
//conditional statement: if halfstar is 1 it appends a halfstar icon with a smaller width
//loops for empty stars
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

  function handleToggleFavourites() {
    if (isInFavourites) {
      onDeleteFromFavourites(film.id);
    } else {
      onAddToFavourites(film);
    }

    // Toggle the state after the button click
    setIsInFavourites((prevIsInFavourites) => !prevIsInFavourites);
  };
  

  return (
    <div className={`film-card ${isInFavourites ? "added-to-favourites" : ""}`}>
      <img src={film.image} alt={film.title} />
      <h3>{film.title}</h3>
      <p>Rating: {starRating(film.rt_score)}</p>
      <small>
        {film.release_date} | {film.running_time}min
      </small>
      <p className="description">{film.description}</p>
      <button onClick={handleToggleFavourites}>
        {isInFavourites ? "Remove from Favourites" : "Add to Favourites"}
      </button>
    </div>
  );
}

export default FilmCard;
