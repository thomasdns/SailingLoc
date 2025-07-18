import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import Logo from '../../assets/Logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Bateaux', path: '/bateaux' },
    { name: 'À propos', path: '/a-propos' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  const userPrenom = typeof window !== 'undefined' ? localStorage.getItem('userPrenom') : null;

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Logo SailingLoc" className="h-9 w-auto" />
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Boutons connexion/inscription */}
          <div className="hidden md:flex items-center space-x-4">
            {userPrenom ? (
              <>
                <Link
                  to="/favoris"
                  className="text-blue-600 hover:text-blue-800 px-4 py-2 text-sm font-medium transition-colors flex items-center"
                >
                  <Heart className="h-5 w-5" />
                </Link>
                <Link
                  to="/mon-compte"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Mon compte
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/connexion"
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors shadow-sm"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Menu mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 space-y-2">
                {userPrenom ? (
                  <>
                    <Link
                      to="/favoris"
                      className="block w-full text-center border border-blue-600 text-blue-600 px-3 py-2 rounded-full text-base font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Heart className="h-5 w-5" />
                    </Link>
                    <Link
                      to="/mon-compte"
                      className="block w-full text-center bg-blue-600 text-white px-3 py-2 rounded-full text-base font-medium hover:bg-blue-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mon compte
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/connexion"
                      className="block w-full text-center border border-orange-500 text-orange-500 px-3 py-2 rounded-full text-base font-medium hover:bg-orange-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Connexion
                    </Link>
                    <Link
                      to="/inscription"
                      className="block w-full text-center bg-orange-500 text-white px-3 py-2 rounded-full text-base font-medium hover:bg-orange-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Inscription
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}