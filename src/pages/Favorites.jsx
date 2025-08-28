import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Favorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  )

  // Remove from favorites
  const removeFavorite = (id) => {
    const updated = favorites.filter((fav) => fav.idMeal !== id)
    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  if (favorites.length === 0) {
    return <p className="text-center mt-10">No favorite recipes yet ❤️</p>
  }

  return (
    <div className="w-full mx-auto px-4 ">
      <h2 className="text-2xl font-bold my-4">My Favorites</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="relative border rounded-lg overflow-hidden hover:shadow-md bg-white"
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-40 object-cover"
            />

            {/* Remove Favorite */}
            <button
              onClick={() => removeFavorite(recipe.idMeal)}
              className="absolute top-2 right-2 text-md"
            >
              ✖
            </button>

            <div className="p-2">
              <h3 className="font-semibold">{recipe.strMeal}</h3>
              <p className="text-sm text-gray-600">{recipe.strCategory}</p>
              <Link
                to={`/recipe/${recipe.idMeal}`}
                className="text-blue-500 text-sm hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
