import React, { useState, useMemo } from 'react';
import './ModalCommande.css';

const ModalCommande = ({ onClose, onSave, produits, fournisseurs, categories }) => {
  const [formData, setFormData] = useState({
    fournisseurId: '',
    dateLivraison: '', // "DMP" / Date de livraison
    dateCommande: '', // Nouveau champ
    numCommande: '', // Nouveau champ
    produits: [],
    notes: ''
  });

  const [etape, setEtape] = useState(1); // 1: Catalogue, 2: Infos & Produits, 3: Récap
  const [categorieSelectionnee, setCategorieSelectionnee] = useState(''); // Sélectionnée à l'étape 1
  const [produitsSelectionnes, setProduitsSelectionnes] = useState({});
  const [produitDetail, setProduitDetail] = useState(null);
  const [produitASupprimer, setProduitASupprimer] = useState(null);

  // États pour la recherche et la vue de l'étape 2
  const [viewMode, setViewMode] = useState('table'); // 'table' par défaut
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les produits par catégorie (choisie à l'étape 1) ET par terme de recherche
  const produitsFiltres = useMemo(() => {
    let filtered = produits;

    // 1. Filtrer par catégorie sélectionnée
    if (categorieSelectionnee) {
      filtered = filtered.filter(p => p.categorie === categorieSelectionnee);
    }

    // 2. Filtrer par terme de recherche
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.nom.toLowerCase().includes(lowerSearchTerm) ||
        p.description.toLowerCase().includes(lowerSearchTerm)
      );
    }

    return filtered;
  }, [produits, categorieSelectionnee, searchTerm]);

  // Types de cartons disponibles
  const typesCartons = [
    { type: "Petit", capacite: 10, dimensions: "30x20x15cm", prix: 2.50 },
    { type: "Moyen", capacite: 25, dimensions: "40x30x25cm", prix: 5.00 },
    { type: "Grand", capacite: 50, dimensions: "60x40x30cm", prix: 8.00 },
    { type: "Palette", capacite: 200, dimensions: "120x80x150cm", prix: 25.00 }
  ];

  const ajouterProduit = (produit) => {
    setProduitsSelectionnes(prev => ({
      ...prev,
      [produit.id]: {
        ...produit,
        quantite: 1,
        carton: 'Moyen',
        prixTotal: produit.prix
      }
    }));
  };

  const modifierQuantite = (produitId, nouvelleQuantite) => {
    if (nouvelleQuantite < 1) return;
    
    setProduitsSelectionnes(prev => ({
      ...prev,
      [produitId]: {
        ...prev[produitId],
        quantite: nouvelleQuantite,
        prixTotal: prev[produitId].prix * nouvelleQuantite
      }
    }));
  };

  const modifierCarton = (produitId, typeCarton) => {
    setProduitsSelectionnes(prev => ({
      ...prev,
      [produitId]: {
        ...prev[produitId],
        carton: typeCarton
      }
    }));
  };

  const supprimerProduit = (produitId) => {
    const newSelection = { ...produitsSelectionnes };
    delete newSelection[produitId];
    setProduitsSelectionnes(newSelection);
    setProduitASupprimer(null);
  };

  const confirmerSuppression = (produitId) => {
    setProduitASupprimer(produitId);
  };

  const annulerSuppression = () => {
    setProduitASupprimer(null);
  };

  const calculerTotaux = () => {
    const produitsArray = Object.values(produitsSelectionnes);
    const sousTotal = produitsArray.reduce((sum, produit) => sum + produit.prixTotal, 0);
    
    const fraisCartons = produitsArray.reduce((sum, produit) => {
      const carton = typesCartons.find(c => c.type === produit.carton);
      return sum + (carton ? carton.prix : 0);
    }, 0);

    const tva = sousTotal * 0.2;
    const fraisPort = sousTotal > 1000 ? 0 : 50;
    
    return {
      sousTotal,
      tva,
      fraisCartons,
      fraisPort,
      total: sousTotal + tva + fraisCartons + fraisPort
    };
  };

  const passerAEtapeSuivante = () => {
    if (etape === 2 && (!formData.fournisseurId || Object.keys(produitsSelectionnes).length === 0)) {
      alert('Veuillez sélectionner un fournisseur et au moins un produit');
      return;
    }
    setEtape(etape + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fournisseurId || Object.keys(produitsSelectionnes).length === 0) {
      alert('Veuillez sélectionner un fournisseur et au moins un produit');
      return;
    }

    const fournisseur = fournisseurs.find(f => f.id === parseInt(formData.fournisseurId));
    const totals = calculerTotaux();

    const nouvelleCommande = {
      // Champs du nouvel en-tête de commande
      numCommande: formData.numCommande,
      dateCommande: formData.dateCommande,
      dateLivraison: formData.dateLivraison,
      
      fournisseurId: parseInt(formData.fournisseurId),
      fournisseurNom: fournisseur.nom,
      fournisseurContact: fournisseur.contact,
      
      produits: Object.values(produitsSelectionnes).map(p => ({
        id: p.id,
        nom: p.nom,
        categorie: p.categorie,
        quantite: p.quantite,
        prixUnitaire: p.prix,
        prixTotal: p.prixTotal,
        carton: p.carton
      })),
      notes: formData.notes,
      ...totals
    };

    onSave(nouvelleCommande);
    onClose();
  };

  const totals = calculerTotaux();
  const fournisseurSelectionne = fournisseurs.find(f => f.id === parseInt(formData.fournisseurId));
  const produitsSelectionnesArray = Object.values(produitsSelectionnes);

 return (
    <div className="modal-overlay large">
      <div className="modal-commande large">
        <div className="modal-header">
          <div className="header-content">
            <h2>🛒 Nouvelle Commande PEAK</h2>
            <div className="etapes">
              <div className={`etape ${etape >= 1 ? 'active' : ''}`}>
                <span className="etape-numero">1</span>
                <span className="etape-label">Catalogue</span>
              </div>
              <div className={`etape ${etape >= 2 ? 'active' : ''}`}>
                <span className="etape-numero">2</span>
                <span className="etape-label">Infos & Produits</span>
              </div>
              <div className={`etape ${etape >= 3 ? 'active' : ''}`}>
                <span className="etape-numero">3</span>
                <span className="etape-label">Validation</span>
              </div>
            </div>
          </div>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Étape 1: Sélection du catalogue */}
          {etape === 1 && (
            <div className="form-section">
              <h3>🎯 Sélection du Catalogue</h3>
              
              <div className="catalogue-selection">
                <div className="modal-categories-grid">
                  <button
                    type="button"
                    className={`modal-categorie-btn ${categorieSelectionnee === '' ? 'active' : ''}`}
                    onClick={() => setCategorieSelectionnee('')}
                  >
                    <span className="modal-categorie-icon">🌍</span>
                    <span className="modal-categorie-nom">Tous les produits</span>
                    <span className="modal-categorie-count">
                      ({produits.length} produits)
                    </span>
                  </button>
                  {categories.map(categorie => (
                    <button
                      key={categorie}
                      type="button"
                      className={`modal-categorie-btn ${categorieSelectionnee === categorie ? 'active' : ''}`}
                      onClick={() => setCategorieSelectionnee(categorie)}
                    >
                      <span className="modal-categorie-icon">
                        {categorie.includes('Baskets') ? '👟' : 
                         categorie.includes('Vêtements') ? '👕' :
                         categorie.includes('Accessoires') ? '🎒' :
                         categorie.includes('Running') ? '🏃' : '⚽'}
                      </span>
                      <span className="modal-categorie-nom">{categorie}</span>
                      <span className="modal-categorie-count">
                        ({produits.filter(p => p.categorie === categorie).length} produits)
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Étape 2: Informations & Sélection des produits */}
          {etape === 2 && (
            <div className="form-section">
              
              {/* NOUVEAU: Formulaire En-tête de Commande */}
              <h3>📋 En-tête de Commande</h3>
              <div className="form-grid header-form-grid">
                <div className="form-group">
                  <label>Fournisseur *</label>
                  <select
                    value={formData.fournisseurId}
                    onChange={(e) => setFormData(prev => ({ ...prev, fournisseurId: e.target.value }))}
                    required
                    className="select-large"
                  >
                    <option value="">Choisir un fournisseur...</option>
                    {fournisseurs.map(fournisseur => (
                      <option key={fournisseur.id} value={fournisseur.id}>
                        {fournisseur.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Numéro de Commande (facultatif)</label>
                  <input
                    type="text"
                    value={formData.numCommande}
                    onChange={(e) => setFormData(prev => ({ ...prev, numCommande: e.target.value }))}
                    className="input-large"
                    placeholder="Ex: PO-12345"
                  />
                </div>

                <div className="form-group">
                  <label>Date de Commande</label>
                  <input
                    type="date"
                    value={formData.dateCommande}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateCommande: e.target.value }))}
                    className="input-large"
                  />
                </div>

                <div className="form-group">
                  <label>Date de livraison souhaitée (DMP)</label>
                  <input
                    type="date"
                    value={formData.dateLivraison}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateLivraison: e.target.value }))}
                    className="input-large"
                  />
                </div>
              </div>

              {fournisseurSelectionne && (
                <div className="fournisseur-info-card">
                  <div className="info-header">
                    <h4>Informations du fournisseur</h4>
                  </div>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Contact:</span>
                      <span className="info-value">{fournisseurSelectionne.contact}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Délai de livraison:</span>
                      <span className="info-value highlight">{fournisseurSelectionne.delaiLivraison}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Types de produits:</span>
                      <span className="info-value">{fournisseurSelectionne.typeProduits?.join(', ')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: Sélection des Produits */}
              <h3 className="section-divider">🛍️ Sélection des Produits {categorieSelectionnee && `- ${categorieSelectionnee}`}</h3>

              <div className="modal-selection-container">
                {/* Catalogue des produits */}
                <div className="modal-catalogue-produits">
                  <div className="modal-catalogue-header">
                    <h4>
                      Catalogue
                    </h4>
                    <div className="catalogue-filters">
                      <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        className="modal-search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="modal-view-toggle">
                        <button
                          type="button"
                          title="Vue Tableau"
                          className={`modal-view-btn ${viewMode === 'table' ? 'active' : ''}`}
                          onClick={() => setViewMode('table')}
                        >
                          📋
                        </button>
                        <button
                          type="button"
                          title="Vue Grille"
                          className={`modal-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                          onClick={() => setViewMode('grid')}
                        >
                          🔲
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Wrapper pour la liste scrollable */}
                  <div className="modal-produits-list-wrapper">
                    {produitsFiltres.length === 0 ? (
                      <div className="modal-empty-selection">
                        <div className="modal-empty-icon">🤷</div>
                        <p>Aucun produit ne correspond à vos filtres</p>
                      </div>
                    ) : viewMode === 'grid' ? (
                      // Vue Grille
                      <div className="modal-produits-grid">
                        {produitsFiltres.map(produit => (
                          <div key={produit.id} className="modal-produit-card">
                            <div className="modal-produit-image">
                              <img 
                                src={produit.details?.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop'} 
                                alt={produit.nom}
                              />
                            </div>
                            <div className="modal-produit-info">
                              <h5 className="modal-produit-nom">{produit.nom}</h5>
                              <p className="modal-produit-description">{produit.description}</p>
                              <div className="modal-produit-prix">{produit.prix} €</div>
                              <div className="modal-produit-stock">Stock: {produit.stock}</div>
                            </div>
                            <div className="modal-produit-actions">
                              <button
                                type="button"
                                onClick={() => setProduitDetail(produit)}
                                className="modal-btn-details"
                              >
                                👁️ Détails
                              </button>
                              <button
                                type="button"
                                onClick={() => ajouterProduit(produit)}
                                className="modal-btn-ajouter"
                                disabled={produitsSelectionnes[produit.id]}
                              >
                                {produitsSelectionnes[produit.id] ? '✓ Ajouté' : '+ Ajouter'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Vue Tableau
                      <div className="modal-produits-table">
                        <div className="modal-produit-table-header">
                          <div className="modal-produit-table-col image">Image</div>
                          <div className="modal-produit-table-col info">Produit</div>
                          <div className="modal-produit-table-col desc">Description</div>
                          <div className="modal-produit-table-col prix">Prix</div>
                          <div className="modal-produit-table-col stock">Stock</div>
                          <div className="modal-produit-table-col actions">Actions</div>
                        </div>
                        <div className="modal-produit-table-body">
                          {produitsFiltres.map(produit => (
                            <div key={produit.id} className="modal-produit-table-row">
                              <div className="modal-produit-table-col image">
                                <img 
                                  src={produit.details?.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop'} 
                                  alt={produit.nom}
                                />
                              </div>
                              <div className="modal-produit-table-col info">
                                <h5 className="modal-produit-nom-table">{produit.nom}</h5>
                                <span className="modal-produit-categorie-table">{produit.categorie}</span>
                              </div>
                              <div className="modal-produit-table-col desc">
                                <p className="modal-produit-description-table">{produit.description}</p>
                              </div>
                              <div className="modal-produit-table-col prix">
                                <div className="modal-produit-prix">{produit.prix} €</div>
                              </div>
                              <div className="modal-produit-table-col stock">
                                <div className="modal-produit-stock">Stock: {produit.stock}</div>
                              </div>
                              <div className="modal-produit-table-col actions">
                                <button
                                  type="button"
                                  onClick={() => setProduitDetail(produit)}
                                  className="modal-btn-details small"
                                  title="Détails"
                                >
                                  👁️
                                </button>
                                <button
                                  type="button"
                                  onClick={() => ajouterProduit(produit)}
                                  className="modal-btn-ajouter small"
                                  disabled={produitsSelectionnes[produit.id]}
                                  title={produitsSelectionnes[produit.id] ? 'Ajouté' : 'Ajouter'}
                                >
                                  {produitsSelectionnes[produit.id] ? '✓' : '+'}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Liste des produits sélectionnés (Panneau de droite) */}
                <div className="modal-produits-selectionnes-panel">
                  <div className="modal-panel-header">
                    <h4>📦 Produits Sélectionnés ({produitsSelectionnesArray.length})</h4>
                    <div className="modal-sous-total-preview">
                      Sous-total: {totals.sousTotal.toFixed(2)} €
                    </div>
                  </div>

                  {produitsSelectionnesArray.length > 0 ? (
                    <div className="modal-selection-table">
                      <div className="modal-table-header">
                        <div className="modal-col-produit">Produit</div>
                        <div className="modal-col-quantite">Quantité</div>
                        <div className="modal-col-carton">Carton</div>
                        <div className="modal-col-prix">Prix Total</div>
                        <div className="modal-col-actions">Actions</div>
                      </div>
                      
                      <div className="modal-table-body">
                        {produitsSelectionnesArray.map(produit => (
                          <div key={produit.id} className="modal-table-row">
                            <div className="modal-col-produit">
                              <div className="modal-produit-mini-info">
                                <strong>{produit.nom}</strong>
                                <span>{produit.prix} €/unité</span>
                              </div>
                            </div>
                            
                            <div className="modal-col-quantite">
                              <div className="modal-quantite-controls">
                                <button 
                                  type="button"
                                  onClick={() => modifierQuantite(produit.id, produit.quantite - 1)}
                                  className="modal-btn-quantite"
                                >
                                  -
                                </button>
                                <span className="modal-quantite-value">{produit.quantite}</span>
                                <button 
                                  type="button"
                                  onClick={() => modifierQuantite(produit.id, produit.quantite + 1)}
                                  className="modal-btn-quantite"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            <div className="modal-col-carton">
                              <select
                                value={produit.carton}
                                onChange={(e) => modifierCarton(produit.id, e.target.value)}
                                className="modal-carton-select"
                              >
                                {typesCartons.map(carton => (
                                  <option key={carton.type} value={carton.type}>
                                    {carton.type} ({carton.capacite} unités)
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div className="modal-col-prix">
                              <strong>{produit.prixTotal.toFixed(2)} €</strong>
                            </div>
                            
                            <div className="modal-col-actions">
                              <button
                                type="button"
                                onClick={() => setProduitDetail(produit)}
                                className="modal-btn-action view"
                                title="Voir détails"
                              >
                                👁️
                              </button>
                              <button
                                type="button"
                                onClick={() => confirmerSuppression(produit.id)}
                                className="modal-btn-action delete"
                                title="Supprimer"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="modal-empty-selection">
                      <div className="modal-empty-icon">🛒</div>
                      <p>Aucun produit sélectionné</p>
                      <p>Choisissez des produits dans le catalogue</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Étape 3: Récapitulatif */}
          {etape === 3 && (
            <div className="form-section">
              <h3>✅ Récapitulatif de la Commande</h3>
              
              <div className="recap-grid">
                <div className="recap-card large">
                  <h4>Informations Commande & Fournisseur</h4>
                  <div className="recap-info">
                    <div className="recap-item">
                      <span>Fournisseur:</span>
                      <strong>{fournisseurSelectionne?.nom}</strong>
                    </div>
                    <div className="recap-item">
                      <span>Num. Commande:</span>
                      <span>{formData.numCommande || 'Non spécifié'}</span>
                    </div>
                    <div className="recap-item">
                      <span>Date Commande:</span>
                      <span>{formData.dateCommande || 'Non spécifiée'}</span>
                    </div>
                    <div className="recap-item">
                      <span>Date livraison (DMP):</span>
                      <span>{formData.dateLivraison || 'Non spécifiée'}</span>
                    </div>
                    <div className="recap-item">
                      <span>Contact Fournisseur:</span>
                      <span>{fournisseurSelectionne?.contact}</span>
                    </div>
                  </div>
                </div>

                <div className="recap-card">
                  <h4>Détails des Produits</h4>
                  <div className="modal-produits-recap">
                    {produitsSelectionnesArray.map(produit => (
                      <div key={produit.id} className="modal-produit-recap-item">
                        <span className="modal-produit-nom">{produit.nom}</span>
                        <span className="modal-produit-details">
                          {produit.quantite} x {produit.prix} € | Carton: {produit.carton}
                        </span>
                        <span className="modal-produit-total">{produit.prixTotal.toFixed(2)} €</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="recap-card">
                  <h4>Détails Financiers</h4>
                  <div className="recap-financier">
                    <div className="recap-ligne">
                      <span>Sous-total produits:</span>
                      <span>{totals.sousTotal.toFixed(2)} €</span>
                    </div>
                    <div className="recap-ligne">
                      <span>Frais de cartons:</span>
                      <span>{totals.fraisCartons.toFixed(2)} €</span>
                    </div>
                    <div className="recap-ligne">
                      <span>TVA (20%):</span>
                      <span>{totals.tva.toFixed(2)} €</span>
                    </div>
                    <div className="recap-ligne">
                      <span>Frais de port:</span>
                      <span>{totals.fraisPort.toFixed(2)} €</span>
                    </div>
                    <div className="recap-ligne total">
                      <span>Total TTC:</span>
                      <span>{totals.total.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Notes (optionnel)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Instructions spéciales, remarques, informations supplémentaires..."
                  rows="4"
                  className="textarea-large"
                />
              </div>
            </div>
          )}

          <div className="modal-actions">
            <div className="actions-left">
              {etape > 1 && (
                <button 
                  type="button" 
                  onClick={() => setEtape(etape - 1)}
                  className="btn btn-outline"
                >
                  ← Retour
                </button>
              )}
            </div>
            
            <div className="actions-right">
              <button 
                type="button" 
                onClick={onClose} 
                className="btn btn-outline"
              >
                Annuler
              </button>
              
              {etape < 3 ? (
                <button 
                  type="button" 
                  onClick={passerAEtapeSuivante}
                  className="btn btn-primary"
                  disabled={
                    (etape === 2 && (!formData.fournisseurId || produitsSelectionnesArray.length === 0))
                  }
                >
                  Continuer →
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="btn btn-success"
                >
                  🚀 Créer la Commande
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Modal de détails produit */}
      {produitDetail && (
        <div className="modal-overlay modal-detail-overlay">
          <div className="modal-detail-produit">
            <div className="modal-header">
              <h3>Détails du Produit</h3>
              <button className="btn-close" onClick={() => setProduitDetail(null)}>×</button>
            </div>
            
            <div className="modal-detail-content">
              <div className="modal-detail-images">
                <img 
                  src={produitDetail.details?.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'} 
                  alt={produitDetail.nom}
                />
              </div>
              
              <div className="modal-detail-info">
                <h4>{produitDetail.nom}</h4>
                <div className="modal-detail-categorie">{produitDetail.categorie}</div>
                <div className="modal-detail-prix">{produitDetail.prix} €</div>
                
                <div className="modal-detail-description">
                  <h5>Description</h5>
                  <p>{produitDetail.details?.commentaire || produitDetail.description}</p>
                </div>
                
                {produitDetail.details?.caracteristiques && (
                  <div className="modal-detail-caracteristiques">
                    <h5>Caractéristiques</h5>
                    <ul>
                      {produitDetail.details.caracteristiques.map((caract, index) => (
                        <li key={index}>{caract}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {produitDetail.details?.couleurs && (
                  <div className="modal-detail-couleurs">
                    <h5>Couleurs disponibles</h5>
                    <div className="modal-couleurs-list">
                      {produitDetail.details.couleurs.map((couleur, index) => (
                        <span key={index} className="modal-couleur-tag">{couleur}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {produitDetail.details?.tailles && (
                  <div className="modal-detail-tailles">
                    <h5>Tailles disponibles</h5>
                    <div className="modal-tailles-list">
                      {produitDetail.details.tailles.map((taille, index) => (
                        <span key={index} className="modal-taille-tag">{taille}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                onClick={() => setProduitDetail(null)}
                className="btn btn-outline"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => {
                  ajouterProduit(produitDetail);
                  setProduitDetail(null);
                }}
                className="btn btn-primary"
                disabled={produitsSelectionnes[produitDetail.id]}
              >
                {produitsSelectionnes[produitDetail.id] ? '✓ Déjà ajouté' : '+ Ajouter au panier'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {produitASupprimer && (
        <div className="modal-overlay modal-confirm-overlay">
          <div className="modal-confirm">
            <div className="modal-header">
              <h3>Confirmer la suppression</h3>
            </div>
            
            <div className="modal-confirm-content">
              <p>Êtes-vous sûr de vouloir supprimer ce produit de la commande ?</p>
              <div className="modal-produit-a-supprimer">
                {produitsSelectionnes[produitASupprimer]?.nom}
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                onClick={annulerSuppression}
                className="btn btn-outline"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => supprimerProduit(produitASupprimer)}
                className="btn btn-danger"
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalCommande;