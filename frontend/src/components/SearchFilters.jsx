import React, { useState } from "react";
import "./SearchFilters.css";

const SearchFilters = () => {
  const [filters, setFilters] = useState({
    destination: "",
    dateArrivee: "",
    dateDepart: "",
    typeBateau: "",
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    if (
      !filters.destination ||
      !filters.dateArrivee ||
      !filters.dateDepart ||
      !filters.typeBateau
    ) {
      alert("Veuillez remplir tous les champs de recherche");
      return;
    }

    if (new Date(filters.dateArrivee) >= new Date(filters.dateDepart)) {
      alert("La date de départ doit être après la date d'arrivée");
      return;
    }

    alert(
      `Recherche en cours...\nDestination: ${filters.destination}\nArrivée: ${filters.dateArrivee}\nDépart: ${filters.dateDepart}\nType: ${filters.typeBateau}`
    );
  };

  return (
    <div className="search-filters">
      <select
        value={filters.destination}
        onChange={(e) => handleFilterChange("destination", e.target.value)}
        className="filter-select"
      >
        <option value="">📍 Destination</option>
        <option value="saint-malo">Saint-Malo</option>
        <option value="les-glenan">Les Glénan</option>
        <option value="crozon">Crozon</option>
      </select>

      <input
        type="date"
        value={filters.dateArrivee}
        onChange={(e) => handleFilterChange("dateArrivee", e.target.value)}
        className="filter-input"
        min={new Date().toISOString().split("T")[0]}
      />

      <input
        type="date"
        value={filters.dateDepart}
        onChange={(e) => handleFilterChange("dateDepart", e.target.value)}
        className="filter-input"
        min={filters.dateArrivee || new Date().toISOString().split("T")[0]}
      />

      <select
        value={filters.typeBateau}
        onChange={(e) => handleFilterChange("typeBateau", e.target.value)}
        className="filter-select"
      >
        <option value="">🚤 Type Bateau</option>
        <option value="moteur">Moteur</option>
        <option value="voile">Voile</option>
      </select>

      <button onClick={handleSearch} className="search-btn">
        🔍 Recherche
      </button>
    </div>
  );
};

export default SearchFilters;
