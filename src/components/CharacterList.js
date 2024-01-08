import React, { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import axios from "axios";
import "../Styles/CharacterList.css";
import "../Styles/CharacterCard.css";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://studio-ghibli-xt0j.onrender.com/people"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const characterData = await response.json();

        // Fetch film details for each character
        const updatedCharacterData = await Promise.all(
          characterData.map(async (character) => {
            const filmDetails = await Promise.all(
              character.films.map(async (filmUrl) => {
                const filmResponse = await fetch(filmUrl);
                const filmData = await filmResponse.json();
                return filmData.title;
              })
            );

            return {
              ...character,
              films: filmDetails,
            };
          })
        );

        setCharacters(updatedCharacterData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="character-list-wrapper">
      <h2>Studio Ghibli Characters</h2>
      <div className="character-container">
        {characters.map((character) => (
          <CharacterCard
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
