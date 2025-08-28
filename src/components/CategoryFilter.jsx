import { useEffect, useState } from "react"
import axios from "axios"

export default function CategoryFilter({ value = "", onChange }) {
  const [categories, setCategories] = useState([])

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
        )
        setCategories(res.data.meals || [])
      } catch (err) {
        console.error("Error fetching categories:", err)
      }
    }
    fetchCategories()
  }, [])

  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="rounded-xl border px-3 py-2"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat.strCategory} value={cat.strCategory}>
          {cat.strCategory}
        </option>
      ))}
    </select>
  )
}
