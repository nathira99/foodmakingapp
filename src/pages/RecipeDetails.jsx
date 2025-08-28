import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"

export default function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        )
        setRecipe(res.data.meals ? res.data.meals[0] : null)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipe()
  }, [id])

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (!recipe) return <p className="text-center mt-10">Recipe not found</p>

  return (
    <div className="w-full mx-auto p-4">
      {/* Responsive layout: flex-row on md+ and flex-col on small */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-auto rounded-lg shadow"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">{recipe.strMeal}</h1>
          <p className="text-gray-600">
            <span className="font-semibold">Category:</span> {recipe.strCategory}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Area:</span> {recipe.strArea}
          </p>

          {/* Instructions */}
          <div>
            <h2 className="text-xl font-semibold mt-2">Instructions</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {recipe.strInstructions}
            </p>
          </div>

          {/* Ingredients */}
          <div>
            <h2 className="text-xl font-semibold mt-2">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700">
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = recipe[`strIngredient${i + 1}`]
                const measure = recipe[`strMeasure${i + 1}`]
                if (ingredient) {
                  return (
                    <li key={i}>
                      {ingredient} - {measure}
                    </li>
                  )
                }
                return null
              })}
            </ul>
          </div>

          {/* Video */}
          {recipe.strYoutube && (
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2"
            >
              Watch Tutorial
            </a>
          )}
        </div>
      </div>

      {/* Back button */}
      <div className="mt-6">
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ← Back to Recipes
        </Link>
      </div>
    </div>
  )
}
