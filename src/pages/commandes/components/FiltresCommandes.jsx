import React, { useState } from 'react';
import './FiltresCommandes.css';

const FiltresCommandes = ({ filtres, setFiltres, fournisseurs, onFiltresChange }) => {
  const [filtresAvances, setFiltresAvances] = useState(false);

  const handleFiltreChange = (key, value) => {
    const nouveauxFiltres = {
      ...filtres,
      [key]: value
    };
    setFiltres(nouveauxFiltres);
    
    // Callback pour notifier le parent des changements
    if (onFiltresChange) {
      onFiltresChange(nouveauxFiltres);
    }
  };

  const resetFiltres = () => {
    const filtresReset = {
      statut: '',
      fournisseur: '',
      dateDebut: '',
      dateFin: '',
      recherche: '',
      montantMin: '',
      montantMax: ''
    };
    setFiltres(filtresReset);
    
    if (onFiltresChange) {
      onFiltresChange(filtresReset);
    }
  };

  const appliquerFiltreRapide = (type, valeur) => {
    let nouveauxFiltres = { ...filtres };
    
    switch (type) {
      case 'aujourdhui':
        const aujourdhui = new Date().toISOString().split('T')[0];
        nouveauxFiltres.dateDebut = aujourdhui;
        nouveauxFiltres.dateFin = aujourdhui;
        break;
      case 'semaine':
        const debutSemaine = new Date();
        debutSemaine.setDate(debutSemaine.getDate() - 7);
        nouveauxFiltres.dateDebut = debutSemaine.toISOString().split('T')[0];
        nouveauxFiltres.dateFin = new Date().toISOString().split('T')[0];
        break;
      case 'mois':
        const debutMois = new Date();
        debutMois.setDate(1);
        nouveauxFiltres.dateDebut = debutMois.toISOString().split('T')[0];
        nouveauxFiltres.dateFin = new Date().toISOString().split('T')[0];
        break;
      case 'montantEleve':
        nouveauxFiltres.montantMin = '1000';
        break;
      case 'montantFaible':
        nouveauxFiltres.montantMax = '500';
        break;
      default:
        break;
    }
    
    setFiltres(nouveauxFiltres);
    if (onFiltresChange) {
      onFiltresChange(nouveauxFiltres);
    }
  };

  const getFiltreActifCount = () => {
    return Object.values(filtres).filter(value => value !== '' && value !== null && value !== undefined).length;
  };

  const hasActiveFilters = getFiltreActifCount() > 0;

  const getStatutLabel = (statut) => {
    const labels = {
      en_attente: '⏳ En Attente',
      confirme: '✅ Confirmée',
      livraison: '🚚 En Livraison',
      livre: '📦 Livrée',
      annule: '❌ Annulée'
    };
    return labels[statut] || statut;
  };

  return (
    <div className="filtres-commandes">
      {/* En-tête avec compteur de filtres */}
      <div className="filtres-header">
        <div className="header-content">
          <div className="header-title">
            <span className="filter-icon">🔍</span>
            <h3>Filtres et Recherche</h3>
            {hasActiveFilters && (
              <span className="filtres-count">{getFiltreActifCount()}</span>
            )}
          </div>
          <p className="header-subtitle">Affinez votre recherche de commandes</p>
        </div>
        
        <div className="header-actions">
          {hasActiveFilters && (
            <button className="btn-reset" onClick={resetFiltres}>
              <span className="btn-icon">🗑️</span>
              Tout effacer
            </button>
          )}
          <button 
            className={`btn-avance ${filtresAvances ? 'active' : ''}`}
            onClick={() => setFiltresAvances(!filtresAvances)}
          >
            <span className="btn-icon">{filtresAvances ? '▲' : '▼'}</span>
            Avancé
          </button>
        </div>
      </div>

      {/* Filtres rapides */}
      <div className="filtres-rapides">
        <h4>Filtres Rapides</h4>
        <div className="quick-filters-grid">
          <button
            className="quick-filter-btn periode"
            onClick={() => appliquerFiltreRapide('aujourdhui')}
          >
            <span className="quick-icon">📅</span>
            Aujourd'hui
          </button>
          <button
            className="quick-filter-btn periode"
            onClick={() => appliquerFiltreRapide('semaine')}
          >
            <span className="quick-icon">📆</span>
            7 derniers jours
          </button>
          <button
            className="quick-filter-btn periode"
            onClick={() => appliquerFiltreRapide('mois')}
          >
            <span className="quick-icon">🗓️</span>
            Ce mois
          </button>
          <button
            className="quick-filter-btn montant"
            onClick={() => appliquerFiltreRapide('montantEleve')}
          >
            <span className="quick-icon">💰</span>
            Commandes élevées
          </button>
          <button
            className="quick-filter-btn montant"
            onClick={() => appliquerFiltreRapide('montantFaible')}
          >
            <span className="quick-icon">💸</span>
            Petites commandes
          </button>
        </div>
      </div>

      {/* Filtres principaux */}
      <div className="filtres-principaux">
        <div className="filtres-grid">
          {/* Recherche globale */}
          <div className="filtre-group">
            <label className="filtre-label">
              <span className="label-icon">🔎</span>
              Recherche
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Numéro, fournisseur, référence..."
                value={filtres.recherche}
                onChange={(e) => handleFiltreChange('recherche', e.target.value)}
                className="filtre-input"
              />
              {filtres.recherche && (
                <button 
                  className="clear-input"
                  onClick={() => handleFiltreChange('recherche', '')}
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Statut */}
          <div className="filtre-group">
            <label className="filtre-label">
              <span className="label-icon">📊</span>
              Statut
            </label>
            <select
              value={filtres.statut}
              onChange={(e) => handleFiltreChange('statut', e.target.value)}
              className="filtre-select"
            >
              <option value="">Tous les statuts</option>
              <option value="en_attente">⏳ En Attente</option>
              <option value="confirme">✅ Confirmée</option>
              <option value="livraison">🚚 En Livraison</option>
              <option value="livre">📦 Livrée</option>
              <option value="annule">❌ Annulée</option>
            </select>
          </div>

          {/* Fournisseur */}
          <div className="filtre-group">
            <label className="filtre-label">
              <span className="label-icon">🏢</span>
              Fournisseur
            </label>
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

          {/* Filtres par statut rapides */}
          <div className="filtre-group">
            <label className="filtre-label">
              <span className="label-icon">⚡</span>
              Statut rapide
            </label>
            <div className="statut-buttons">
              {['en_attente', 'confirme', 'livre'].map(statut => (
                <button
                  key={statut}
                  className={`statut-btn ${filtres.statut === statut ? 'active' : ''} ${statut}`}
                  onClick={() => handleFiltreChange('statut', filtres.statut === statut ? '' : statut)}
                >
                  {getStatutLabel(statut)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filtres avancés */}
        {filtresAvances && (
          <div className="filtres-avances">
            <div className="avances-header">
              <h5>Filtres Avancés</h5>
              <span className="avances-subtitle">Affinez davantage votre recherche</span>
            </div>
            
            <div className="avances-grid">
              {/* Période */}
              <div className="filtre-group double">
                <label className="filtre-label">
                  <span className="label-icon">📅</span>
                  Période
                </label>
                <div className="date-range">
                  <div className="date-input">
                    <input
                      type="date"
                      value={filtres.dateDebut}
                      onChange={(e) => handleFiltreChange('dateDebut', e.target.value)}
                      className="filtre-input"
                      placeholder="Date de début"
                    />
                  </div>
                  <span className="date-separator">à</span>
                  <div className="date-input">
                    <input
                      type="date"
                      value={filtres.dateFin}
                      onChange={(e) => handleFiltreChange('dateFin', e.target.value)}
                      className="filtre-input"
                      placeholder="Date de fin"
                    />
                  </div>
                </div>
              </div>

              {/* Plage de montant */}
              <div className="filtre-group double">
                <label className="filtre-label">
                  <span className="label-icon">💰</span>
                  Montant (€)
                </label>
                <div className="montant-range">
                  <div className="montant-input">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filtres.montantMin}
                      onChange={(e) => handleFiltreChange('montantMin', e.target.value)}
                      className="filtre-input"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <span className="montant-separator">-</span>
                  <div className="montant-input">
                    <input
                      type="number"
                      placeholder="Max"
                      value={filtres.montantMax}
                      onChange={(e) => handleFiltreChange('montantMax', e.target.value)}
                      className="filtre-input"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filtres actifs */}
      {hasActiveFilters && (
        <div className="active-filters">
          <div className="active-filters-header">
            <span className="active-title">Filtres appliqués</span>
            <span className="active-count">{getFiltreActifCount()} filtre(s)</span>
          </div>
          <div className="filters-tags">
            {filtres.statut && (
              <span className="filter-tag">
                <span className="tag-icon">📊</span>
                Statut: {getStatutLabel(filtres.statut)}
                <button 
                  onClick={() => handleFiltreChange('statut', '')}
                  className="tag-remove"
                >
                  ×
                </button>
              </span>
            )}
            {filtres.fournisseur && (
              <span className="filter-tag">
                <span className="tag-icon">🏢</span>
                Fournisseur: {fournisseurs.find(f => f.id === parseInt(filtres.fournisseur))?.nom}
                <button 
                  onClick={() => handleFiltreChange('fournisseur', '')}
                  className="tag-remove"
                >
                  ×
                </button>
              </span>
            )}
            {filtres.recherche && (
              <span className="filter-tag">
                <span className="tag-icon">🔎</span>
                Recherche: "{filtres.recherche}"
                <button 
                  onClick={() => handleFiltreChange('recherche', '')}
                  className="tag-remove"
                >
                  ×
                </button>
              </span>
            )}
            {filtres.dateDebut && filtres.dateFin && (
              <span className="filter-tag">
                <span className="tag-icon">📅</span>
                Période: {new Date(filtres.dateDebut).toLocaleDateString()} - {new Date(filtres.dateFin).toLocaleDateString()}
                <button 
                  onClick={() => {
                    handleFiltreChange('dateDebut', '');
                    handleFiltreChange('dateFin', '');
                  }}
                  className="tag-remove"
                >
                  ×
                </button>
              </span>
            )}
            {(filtres.montantMin || filtres.montantMax) && (
              <span className="filter-tag">
                <span className="tag-icon">💰</span>
                Montant: {filtres.montantMin || '0'}€ - {filtres.montantMax || '∞'}€
                <button 
                  onClick={() => {
                    handleFiltreChange('montantMin', '');
                    handleFiltreChange('montantMax', '');
                  }}
                  className="tag-remove"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltresCommandes;