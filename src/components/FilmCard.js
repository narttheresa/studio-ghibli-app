import React from "react";

function FilmCard({
  film,
  addedToFavourites,
  onAddToFavourites,
  onDeleteFromFavourites,
}) {
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

  return (
    <div
      className={`film-card ${
        addedToFavourites[film.id] ? "added-to-favourites" : ""
      }`}
    >
      <img src={film.image} alt={film.title} />
      <h3>{film.title}</h3>
      <p>Rating: {starRating(film.rt_score)}</p>
      <small>
        {film.release_date} | {film.running_time}min
      </small>
      <p className="description">{film.description}</p>
      <button onClick={() => onAddToFavourites(film)}>
        {addedToFavourites[film.id]
          ? "Added to Favourites"
          : "Add to Favourites"}
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
