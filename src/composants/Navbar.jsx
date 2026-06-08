import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const links = [
    { to: '/', label: '🏠 Accueil' },
    { to: '/taches', label: '✅ Tâches' },
    { to: '/depenses', label: '💰 Dépenses' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-brand">🏡 Colocation</div>
      <ul className="navbar-links">
        {links.map(link => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
