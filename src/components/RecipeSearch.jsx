import React, { useState } from "react";

function RecipeCard({ meal }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-44 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
        {meal.strMeal}
      </h3>
      <a
        href={`https://www.themealdb.com/meal/${meal.idMeal}`}
        target="_blank"
        rel="noreferrer"
        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
      >
        View details →
      </a>
    </div>
  );
}

export default function RecipeSearch() {
  const [ingredient, setIngredient] = useState("");
  const [mood, setMood] = useState("");
  const [time, setTime] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function search(e) {
    e?.preventDefault();
    if (!ingredient.trim()) {
      setError("Type an ingredient (e.g. chicken, egg, tomato).");
      return;
    }
    setError("");
    setLoading(true);
    setResults(null);

    try {
      const q = encodeURIComponent(ingredient.trim());
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${q}`);
      const json = await res.json();

      // Simulate mood and time filtering (frontend logic)
      let meals = json.meals || [];

      if (mood) {
        meals = meals.filter(m =>
          (mood === "Comfort" && m.strMeal.toLowerCase().includes("curry")) ||
          (mood === "Light" && m.strMeal.toLowerCase().includes("salad")) ||
          (mood === "Spicy" && m.strMeal.toLowerCase().includes("spicy")) ||
          mood === "Any"
        );
      }

      if (time) {
        // Simulated: Quick = filter short names; Long = fancy dishes
        meals = meals.filter(m =>
          (time === "Quick (≤15 mins)" && m.strMeal.length < 15) ||
          (time === "Medium (≤30 mins)" && m.strMeal.length < 25) ||
          (time === "Fancy (1hr+)" && m.strMeal.length >= 25) ||
          time === "Any"
        );
      }

      setResults(meals);
    } catch {
      setError("Could not fetch recipes. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-6xl mx-auto p-6">
      {/* Search & Filters */}
      <form onSubmit={search} className="flex flex-col sm:flex-row justify-center gap-4 mb-8 flex-wrap">
        <input
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Search by ingredient (e.g., chicken, egg, tomato)"
          className="flex-1 rounded-lg px-4 py-2 border border-black-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-black-800 dark:text-black-100"
        />
        
        {/* Mood Filter */}
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="rounded-lg px-4 py-2 border border-gray-300 bg-white dark:bg-gray-900"
        >
          <option value="">Mood (Any)</option>
          <option value="Comfort">Comfort</option>
          <option value="Light">Light</option>
          <option value="Spicy">Spicy</option>
        </select>

        {/* Time Filter */}
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="rounded-lg px-4 py-2 border border-gray-300 bg-white dark:bg-gray-900"
        >
          <option value="">Time (Any)</option>
          <option value="Quick (≤15 mins)">Quick (≤15 mins)</option>
          <option value="Medium (≤30 mins)">Medium (≤30 mins)</option>
          <option value="Fancy (1hr+)">Fancy (1hr+)</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Messages */}
      {error && <div className="mb-4 text-sm text-red-500 text-center">{error}</div>}
      {results === null && !error && (
        <div className="text-sm text-gray-500 text-center">
          No search yet. Try: <span className="font-medium">chicken</span>,{" "}
          <span className="font-medium">egg</span>,{" "}
          <span className="font-medium">rice</span>.
        </div>
      )}
      {results && results.length === 0 && (
        <div className="text-center text-gray-500">
          No recipes found for “{ingredient}”.
        </div>
      )}

      {/* ✅ Three-column grid */}
      {results && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </section>
  );
}
