import React, { useState } from "react";

function RecipeCard({ meal }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-44 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold mb-2 text-black-800 dark:text-black-100">
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
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${q}`
      );
      const json = await res.json();
      setResults(json.meals || []);
    } catch (err) {
      setError("Could not fetch recipes. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-6xl mx-auto p-6">
      {/* Search Bar */}
      <form
        onSubmit={search}
        className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
      >
        <input
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Search by ingredient (e.g., chicken, egg, tomato)"
          className="flex-1 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black-900 text-gray-800 dark:text-black-100"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Messages */}
      {error && (
        <div className="mb-4 text-sm text-red-500 text-center">{error}</div>
      )}

      {results === null && !error && (
        <div className="text-sm text-black-1000 text-center">
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

      {/* ✅ Fixed 3-column Grid */}
      {results && results.length > 0 && (
        <div className="grid grid-cols-3 gap-6">
          {results.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </section>
  );
}
