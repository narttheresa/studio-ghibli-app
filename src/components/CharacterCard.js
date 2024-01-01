import React  from "react";



// CharacterCard component - create this component to display the character details
const CharacterCard = ({ name, gender, age, films }) => (
  <div className="main-character-card">
    <div className="">
    <h3>{name}</h3>
    <p>Gender: {gender}</p>
    <p>Age: {age}</p>
    <p>Films:</p>
    <ul>
      {films.map((film) => (
        <li key={film}>{film}</li>
      ))}
    </ul>
  </div>
  </div>
  
);

export default CharacterCard;
