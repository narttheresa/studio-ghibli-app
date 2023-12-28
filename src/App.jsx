import React from "react";
import NavBar from "./components/NavBar"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import FilmList from "./components/FilmList";
import PersonList from "./components/PersonList";
import FavouriteList from "./components/FavouriteList";
import Quiz from "./components/Quiz";
import "./App.css"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/films" element={<FilmList />} />
            <Route path="/people" element={<PersonList />} />
            <Route path="/favourites" element={<FavouriteList />} />
            <Route path="/quiz" element={<Quiz />} />
            
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
