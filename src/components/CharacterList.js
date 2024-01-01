
import React , { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import { fetchPeople } from "../Api";
import axios from "axios";


function CharacterList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPeople();
        const characterData = response.data;

        // Fetch film details for each character
        const updatedCharacterData = await Promise.all(
          characterData.map(async (character) => {
            const filmTitles = await Promise.all(
              character.films.map(async (filmUrl) => {
                const filmResponse = await axios.get(filmUrl);
                return filmResponse.data.title;
              })
            );

            return {
              ...character,
              films: filmTitles,
            };
          })
        );

        setCharacters(updatedCharacterData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Studio Ghibli Characters</h2>
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
  );
};

export default CharacterList;