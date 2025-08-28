import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import CategoryFilter from "../components/CategoryFilter"

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [recipesPerPage] = useState(12)
  const [search, setSearch] = useState("")

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  )

  // Fetch recipes
  const fetchMeals = async (query = "") => {
    setLoading(true)
    try {
      let allMeals = []

      if (query) {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        )
        allMeals = res.data.meals || []
      } else {
        const letters = "abcdefghijklmnopqrstuvwxyz".split("")
        for (let i = 0; i < letters.length; i++) {
          const res = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/search.php?f=${letters[i]}`
          )
          allMeals = [...allMeals, ...(res.data.meals || [])]
        }
      }

      setRecipes(allMeals)
      setCurrentPage(1) // reset page
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMeals("")
  }, [])

  // Toggle favorites
  const toggleFavorites = (meal) => {
    let updated
    if (favorites.some((fav) => fav.idMeal === meal.idMeal)) {
      updated = favorites.filter((fav) => fav.idMeal !== meal.idMeal)
    } else {
      updated = [...favorites, meal]
    }
    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  const isFavorite = (id) => favorites.some((fav) => fav.idMeal === id)

  // Filter by category
  const categories = Array.from(new Set(recipes.map((r) => r.strCategory)))
  const filteredRecipes = recipes.filter((recipe) =>
    category ? recipe.strCategory === category : true
  )

  // Pagination based on filtered recipes
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage)
  const indexOfLast = currentPage * recipesPerPage
  const indexOfFirst = indexOfLast - recipesPerPage
  const currentRecipes = filteredRecipes.slice(indexOfFirst, indexOfLast)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [category])

  // Pagination Component
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxVisible = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = startPage + maxVisible - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-6 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          className="px-3 py-1 border rounded disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          First
        </button>

        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Prev
        </button>

        {startPage > 1 && <span className="px-2">...</span>}

        {pages.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-3 py-1 border rounded ${
              num === currentPage ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {num}
          </button>
        ))}

        {endPage < totalPages && <span className="px-2">...</span>}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50  dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Next
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1 border rounded disabled:opacity-50  dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Last
        </button>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search + Category Filter */}
      <div className="flex flex-wrap justify-center m-6 gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes..."
          className="border p-2 w-80 rounded-l-lg"
        />
        <button
          onClick={() => fetchMeals(search)}
          className="bg-blue-500 text-white px-4 rounded-r-lg"
        >
          Search
        </button>

        <CategoryFilter
          options={categories}
          value={category}
          onChange={(val) => setCategory(val)}
        />
      </div>

      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : (
        <>
          {/* Recipe Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentRecipes.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="relative border rounded-lg overflow-hidden hover:shadow-md bg-white"
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-40 object-cover"
                />
                <button
                  onClick={() => toggleFavorites(recipe)}
                  className="absolute top-2 right-2 text-lg"
                >
                  {isFavorite(recipe.idMeal) ? "❤️" : "🤍"}
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

          {/* Pagination */}
          {filteredRecipes.length > recipesPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  )
}
