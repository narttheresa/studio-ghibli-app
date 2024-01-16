import axios from "axios";

function deleteFilmFromFavourites(filmId, setFavouriteFilms) {
  axios.delete(`https://studio-ghibli-xt0j.onrender.com/favourites/${filmId}`)
    .then(() => {
      // Fetch the updated list after successful deletion
      return axios.get("https://studio-ghibli-xt0j.onrender.com/favourites");
    })
    .then((resp) => {
        setFavouriteFilms(resp.data)
    })
    .catch((error) => {
        console.error("Error deleting film:", error);
    });
}

export { deleteFilmFromFavourites };


