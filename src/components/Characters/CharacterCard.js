import React from "react";
import "../../Styles/CharacterCard.css";
import "../../Styles/CharacterList.css";

// CharacterCard component - create this component to display the character details
const CharacterCard = ({ name, gender, age, films }) => (
  
  <div className="main-character-container">
    <div className="character-card">
      <h3>{name}</h3>
      <p><strong>Gender:</strong> {gender} <br/> <strong>Age:</strong> {age}</p>
      <p><strong>Films:</strong></p>
      <ul>
        {films.map((film) => (
          <li key={film}>{film}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default CharacterCard;
