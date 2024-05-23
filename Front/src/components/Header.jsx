import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="fixed w-full bg-gray-100 p-4">
      <nav>
        <ul className="flex justify-around list-none m-0 p-0">
          <li><Link to="/" className="text-blue-500 hover:text-blue-700">Accueil</Link></li>
          <li><Link to="/add-quote" className="text-blue-500 hover:text-blue-700">Ajouter une citation</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;