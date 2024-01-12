import React from "react";

function FilmCard({   //props passed through from filmlist comp
  film,
  addedToFavourites,
  onAddToFavourites,
  onDeleteFromFavourites,
}) {


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
//conditional classname if the film is in favouriteslist container or not
//conditional displays either add/remove to favourites based on the film's favourite status- triggers the listed functions when clicked
  return (
    <div className={`film-card ${addedToFavourites[film.id] ? "added-to-favourites" : ""}`}>   
      <img src={film.image} alt={film.title} />
      <h3>{film.title}</h3>
      <p>Rating: {starRating(film.rt_score)}</p>
      <small>
        {film.release_date} | {film.running_time}min
      </small>
      <p className="description">{film.description}</p>
      <button onClick={() => onAddToFavourites(film)}>
        {addedToFavourites[film.id] ? "Added to Favourites" : "Add to Favourites"}
      </button>
      {addedToFavourites[film.id] && (
        <button onClick={() => onDeleteFromFavourites(film.id)}>
          Remove from Favourites
        </button>
      )}
    </div>
  );
}

export default FilmCard;
