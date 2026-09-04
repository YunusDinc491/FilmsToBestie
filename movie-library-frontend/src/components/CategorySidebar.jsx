import { CATEGORIES } from '../constants/categories.js'

function CategorySidebar({ selectedCategory, onSelectCategory }) {
  return (
    <aside className="category-sidebar">
      <h3>Kategoriler</h3>
      <ul>
        <li>
          <button
            className={!selectedCategory ? 'active' : ''}
            onClick={() => onSelectCategory(null)}
          >
            Tümü
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat}>
            <button
              className={selectedCategory === cat ? 'active' : ''}
              onClick={() => onSelectCategory(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default CategorySidebar