import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import FilmList from "./components/FilmList";
import CharacterList from "./components/CharacterList";
import FavouriteList from "./components/FavouriteList";
import Quiz from "./components/Quiz";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/films" element={<FilmList />} />
            <Route path="/people" element={<CharacterList />} />
            <Route path="/favourites" element={<FavouriteList />} />
            <Route path="/quiz" element={<Quiz />} />
            
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
