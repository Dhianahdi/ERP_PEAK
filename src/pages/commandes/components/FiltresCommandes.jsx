import React from 'react';
import './FiltresCommandes.css';

const FiltresCommandes = ({ filtres, setFiltres, fournisseurs }) => {
  const handleFiltreChange = (key, value) => {
    setFiltres(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFiltres = () => {
    setFiltres({
      statut: '',
      fournisseur: '',
      dateDebut: '',
      dateFin: '',
      recherche: ''
    });
  };

  const hasActiveFilters = Object.values(filtres).some(value => value !== '');

  return (
    <div className="filtres-commandes">
      <div className="filtres-header">
        <h3>Filtres</h3>
        {hasActiveFilters && (
          <button className="btn-reset" onClick={resetFiltres}>
            Réinitialiser
          </button>
        )}
      </div>

      <div className="filtres-grid">
        {/* Recherche globale */}
        <div className="filtre-group">
          <label>Recherche</label>
          <input
            type="text"
            placeholder="Numéro, fournisseur..."
            value={filtres.recherche}
            onChange={(e) => handleFiltreChange('recherche', e.target.value)}
            className="filtre-input"
          />
        </div>

        {/* Statut */}
        <div className="filtre-group">
          <label>Statut</label>
          <select
            value={filtres.statut}
            onChange={(e) => handleFiltreChange('statut', e.target.value)}
            className="filtre-select"
          >
            <option value="">Tous les statuts</option>
            <option value="en_attente">En Attente</option>
            <option value="confirme">Confirmée</option>
            <option value="livraison">En Livraison</option>
            <option value="livre">Livrée</option>
            <option value="annule">Annulée</option>
          </select>
        </div>

        {/* Fournisseur */}
        <div className="filtre-group">
          <label>Fournisseur</label>
          <select
            value={filtres.fournisseur}
            onChange={(e) => handleFiltreChange('fournisseur', e.target.value)}
            className="filtre-select"
          >
            <option value="">Tous les fournisseurs</option>
            {fournisseurs.map(fournisseur => (
              <option key={fournisseur.id} value={fournisseur.id}>
                {fournisseur.nom}
              </option>
            ))}
          </select>
        </div>

        {/* Date de début */}
        <div className="filtre-group">
          <label>Date de début</label>
          <input
            type="date"
            value={filtres.dateDebut}
            onChange={(e) => handleFiltreChange('dateDebut', e.target.value)}
            className="filtre-input"
          />
        </div>

        {/* Date de fin */}
        <div className="filtre-group">
          <label>Date de fin</label>
          <input
            type="date"
            value={filtres.dateFin}
            onChange={(e) => handleFiltreChange('dateFin', e.target.value)}
            className="filtre-input"
          />
        </div>

        {/* Filtres rapides */}
        <div className="filtre-group quick-filters">
          <label>Filtres rapides</label>
          <div className="quick-buttons">
            <button
              className={`quick-btn ${filtres.statut === 'en_attente' ? 'active' : ''}`}
              onClick={() => handleFiltreChange('statut', filtres.statut === 'en_attente' ? '' : 'en_attente')}
            >
              En Attente
            </button>
            <button
              className={`quick-btn ${filtres.statut === 'confirme' ? 'active' : ''}`}
              onClick={() => handleFiltreChange('statut', filtres.statut === 'confirme' ? '' : 'confirme')}
            >
              Confirmées
            </button>
            <button
              className={`quick-btn ${filtres.statut === 'livre' ? 'active' : ''}`}
              onClick={() => handleFiltreChange('statut', filtres.statut === 'livre' ? '' : 'livre')}
            >
              Livrées
            </button>
          </div>
        </div>
      </div>

      {/* Indicateur de filtres actifs */}
      {hasActiveFilters && (
        <div className="active-filters">
          <span>Filtres actifs:</span>
          {filtres.statut && (
            <span className="filter-tag">
              Statut: {filtres.statut}
              <button onClick={() => handleFiltreChange('statut', '')}>×</button>
            </span>
          )}
          {filtres.fournisseur && (
            <span className="filter-tag">
              Fournisseur: {fournisseurs.find(f => f.id === parseInt(filtres.fournisseur))?.nom}
              <button onClick={() => handleFiltreChange('fournisseur', '')}>×</button>
            </span>
          )}
          {filtres.recherche && (
            <span className="filter-tag">
              Recherche: "{filtres.recherche}"
              <button onClick={() => handleFiltreChange('recherche', '')}>×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FiltresCommandes;