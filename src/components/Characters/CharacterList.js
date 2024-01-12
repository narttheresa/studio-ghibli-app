import React, { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import "../../Styles/CharacterList.css";
import "../../Styles/CharacterCard.css";

function CharacterList() {
  //state variables for characters, loading status, error and search query
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  //fetching data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      //send a request to the API
      try {
        const resp = await fetch(
          "https://studio-ghibli-xt0j.onrender.com/people"
        );

        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
        }

        const characterData = await resp.json();

        // Fetch film details for each character
        const updatedCharacterData = await Promise.all(
          characterData.map(async (character) => {
            const filmDetails = await Promise.all(
              character.films.map(async (filmUrl) => {
                const filmResp = await fetch(filmUrl);
                const filmData = await filmResp.json();
                return filmData.title;
              })
            );

            return {
              ...character,
              films: filmDetails,
            };
          })
        );

        setCharacters(updatedCharacterData); //update state with the processed data
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false); //handle errors and update state accordingly
      }
    };

    fetchData();
  }, []);


  //filters characters based on the searchquery - returns a new array of characters matching the search criteria
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  //updates the searchquery state based on the input value
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  //reset the searchquery when clear button is clicked
  const handleClearSearch = () => {
    setSearchQuery("");
  };


  // conditional rendering for loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="character-list-wrapper">
      <h2>Studio Ghibli Characters</h2>
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search characters..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleClearSearch}>Clear</button>
      </div>
      <div className="character-container">
        {filteredCharacters.map((character) => (
          <CharacterCard                            //charactercard component to display details for each character
            key={character.id}
            name={character.name}
            gender={character.gender}
            age={character.age}
            films={character.films}
          />
        ))}
      </div>
    </div>
  );
}

export default CharacterList;
