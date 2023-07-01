import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About"
import RecipeAdd from "./pages/AddRecipes";
import Navbar from "./components/Navbar";
import RecipeInfo from "./pages/RecipeInfo";


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:MealId" element={<RecipeInfo/>}></Route>
        <Route path="/recipeAdd" element={<RecipeAdd />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
