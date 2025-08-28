export default function SearchBar({ value = "", onChange, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="flex gap-2 w-full"
    >
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search recipes by name..."
        className="flex-1 rounded-xl border px-3 py-2 focus:outline-none focus:ring"
      />
      <button type="submit" className="rounded-xl border px-4 py-2">
        Search
      </button>
    </form>
  );
}
