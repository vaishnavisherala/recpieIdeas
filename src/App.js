// src/App.jsx
import React from "react";
// import ThemeToggle from "./components/ThemeToggle";
import RecipeSearch from "./components/RecipeSearch";
import Banner from "./components/Banner";
export default function App() {
  return (
    <div className="min-h-screen">
      <Banner/>
      <header className="max-w-6xl mx-auto p-6 flex flex-col items-center text-center">
  <div>
    <h1 className="text-2xl font-bold">Find Quick Recipes</h1>
    <p className="text-sm text-muted">
      Find meals by ingredient — fast, simple, and tailored for busy evenings.
    </p>
  </div>
</header>
      <main className="items-center text-center flex" >
        <RecipeSearch />
      </main>


    </div>
  );
}
