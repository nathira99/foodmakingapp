export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-700">
        
        {/* Brand / About */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">🍽 Recipe Finder</h2>
          <p className="mt-2 text-sm">
            Discover delicious recipes from around the world.  
            Search, filter by category, and save your favorites.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-blue-500">Home</a></li>
            <li><a href="/favorites" className="hover:text-blue-500">Favorites</a></li>
            <li><a href="https://www.themealdb.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">API Source</a></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Connect</h3>
          <p className="text-sm">Follow us for more recipes:</p>
          <div className="flex space-x-4 mt-2">
            <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition"
          >
            <img src="../src/assets/facebook_icon.png" alt="" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition"
          >
            <img src="../src/assets/twitter_icon.png" alt="twitter" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 transition"
          >
            <img src="../src/assets/discord_icon.png" alt="icon" />
          </a></div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-200 text-center text-sm py-3 text-gray-600">
        © {new Date().getFullYear()} Recipe Finder. All rights reserved.
      </div>
    </footer>
  )
}
