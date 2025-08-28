export default function RecipeCard({
  title = "Recipe Title",
  category = "Category",
  thumb = "https://via.placeholder.com/600x400?text=Meal",
}) {
  return (
    <div key={meal.idMeal} className="border rounded-lg shadow-md p-4 relative">
  <img
    src={meal.strMealThumb}
    alt={meal.strMeal}
    className="w-full h-48 object-cover rounded"
  />
  <h3 className="mt-2 font-semibold">{meal.strMeal}</h3>

  {/* Favorite icon */}
  <button
    onClick={() => toggleFavorites(meal)}
    className="absolute top-2 right-2 text-2xl"
  >
    {isFavorites(meal.idMeal) ? "❤️" : "🤍"}
  </button>
</div>

  );
}
