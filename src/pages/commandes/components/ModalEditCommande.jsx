import React, { useState, useEffect } from 'react';
import './ModalEditCommande.css';

const ModalEditCommande = ({ commande, onClose, onSave, produits, fournisseurs, categories }) => {
  const [formData, setFormData] = useState({
    numero: '',
    fournisseurId: '',
    dateCommande: '',
    dateLivraisonPrevue: '',
    produits: [],
    notes: '',
    fraisPort: 0,
    remise: 0
  });

  const [nouveauProduit, setNouveauProduit] = useState({
    produitId: '',
    quantite: 1,
    prixUnitaire: 0,
    categorie: ''
  });

  const [erreurs, setErreurs] = useState({});
  const [enregistrement, setEnregistrement] = useState(false);

  useEffect(() => {
    if (commande) {
      setFormData({
        numero: commande.numero || '',
        fournisseurId: commande.fournisseurId || '',
        dateCommande: commande.dateCommande || '',
        dateLivraisonPrevue: commande.dateLivraisonPrevue || '',
        produits: commande.produits || [],
        notes: commande.notes || '',
        fraisPort: commande.fraisPort || 0,
        remise: commande.remise || 0
      });
    }
  }, [commande]);

  const validerFormulaire = () => {
    const nouvellesErreurs = {};

    if (!formData.numero.trim()) {
      nouvellesErreurs.numero = 'Le numéro de commande est requis';
    }

    if (!formData.fournisseurId) {
      nouvellesErreurs.fournisseurId = 'Veuillez sélectionner un fournisseur';
    }

    if (!formData.dateCommande) {
      nouvellesErreurs.dateCommande = 'La date de commande est requise';
    }

    if (formData.produits.length === 0) {
      nouvellesErreurs.produits = 'Au moins un produit est requis';
    }

    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Effacer l'erreur quand l'utilisateur commence à taper
    if (erreurs[name]) {
      setErreurs(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleProduitChange = (e) => {
    const { name, value } = e.target;
    setNouveauProduit(prev => ({
      ...prev,
      [name]: name === 'produitId' || name === 'categorie' ? value : parseFloat(value) || 0
    }));

    // Mettre à jour le prix unitaire quand un produit est sélectionné
    if (name === 'produitId' && value) {
      const produitSelectionne = produits.find(p => p.id === parseInt(value));
      if (produitSelectionne) {
        setNouveauProduit(prev => ({
          ...prev,
          prixUnitaire: produitSelectionne.prix || 0,
          categorie: produitSelectionne.categorie || ''
        }));
      }
    }
  };

  const ajouterProduit = () => {
    if (nouveauProduit.produitId && nouveauProduit.quantite > 0) {
      const produitSelectionne = produits.find(p => p.id === parseInt(nouveauProduit.produitId));
      if (produitSelectionne) {
        const produitAvecDetails = {
          ...nouveauProduit,
          id: Date.now(), // ID temporaire
          nom: produitSelectionne.nom,
          reference: produitSelectionne.reference,
          prixTotal: nouveauProduit.prixUnitaire * nouveauProduit.quantite
        };

        setFormData(prev => ({
          ...prev,
          produits: [...prev.produits, produitAvecDetails]
        }));

        setNouveauProduit({
          produitId: '',
          quantite: 1,
          prixUnitaire: 0,
          categorie: ''
        });

        // Effacer l'erreur produits si elle existe
        if (erreurs.produits) {
          setErreurs(prev => ({
            ...prev,
            produits: ''
          }));
        }
      }
    }
  };

  const supprimerProduit = (index) => {
    setFormData(prev => ({
      ...prev,
      produits: prev.produits.filter((_, i) => i !== index)
    }));
  };

  const modifierQuantiteProduit = (index, nouvelleQuantite) => {
    if (nouvelleQuantite < 1) return;

    setFormData(prev => {
      const nouveauxProduits = [...prev.produits];
      nouveauxProduits[index] = {
        ...nouveauxProduits[index],
        quantite: nouvelleQuantite,
        prixTotal: nouveauxProduits[index].prixUnitaire * nouvelleQuantite
      };
      return { ...prev, produits: nouveauxProduits };
    });
  };

  const modifierPrixProduit = (index, nouveauPrix) => {
    if (nouveauPrix < 0) return;

    setFormData(prev => {
      const nouveauxProduits = [...prev.produits];
      nouveauxProduits[index] = {
        ...nouveauxProduits[index],
        prixUnitaire: nouveauPrix,
        prixTotal: nouveauPrix * nouveauxProduits[index].quantite
      };
      return { ...prev, produits: nouveauxProduits };
    });
  };

  const calculerSousTotal = () => {
    return formData.produits.reduce((total, produit) => total + (produit.prixTotal || 0), 0);
  };

  const calculerTotal = () => {
    const sousTotal = calculerSousTotal();
    const remiseMontant = sousTotal * (formData.remise / 100);
    const totalAvantTVA = sousTotal - remiseMontant + parseFloat(formData.fraisPort || 0);
    const tva = totalAvantTVA * 0.2; // TVA 20%
    return totalAvantTVA + tva;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validerFormulaire()) {
      return;
    }

    setEnregistrement(true);

    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const commandeModifiee = {
      ...commande,
      ...formData,
      fournisseurNom: fournisseurs.find(f => f.id === parseInt(formData.fournisseurId))?.nom || '',
      montantTotal: calculerTotal(),
      sousTotal: calculerSousTotal(),
      tva: calculerTotal() * 0.2
    };

    onSave(commandeModifiee);
    setEnregistrement(false);
  };

  const produitsDisponibles = produits.filter(produit => 
    !formData.produits.some(p => p.produitId === produit.id.toString())
  );

  const produitsFiltres = nouveauProduit.categorie 
    ? produitsDisponibles.filter(p => p.categorie === nouveauProduit.categorie)
    : produitsDisponibles;

  return (
    <div className="modal-edit-overlay">
      <div className="modal-edit-content">
        <div className="modal-edit-header">
          <div className="header-title">
            <div className="header-icon">✏️</div>
            <div>
              <h2>Modifier la Commande</h2>
              <p className="header-subtitle">Commande {commande?.numero}</p>
            </div>
          </div>
          <button className="btn-close" onClick={onClose} title="Fermer">
            <span>×</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-edit-form">
          {/* Informations générales */}
          <div className="form-section">
            <h3 className="section-title">
              <span className="section-icon">📋</span>
              Informations Générales
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Numéro de commande *
                  {erreurs.numero && <span className="error-message">{erreurs.numero}</span>}
                </label>
                <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleInputChange}
                  className={`form-input ${erreurs.numero ? 'error' : ''}`}
                  placeholder="CMD-2024-001"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Fournisseur *
                  {erreurs.fournisseurId && <span className="error-message">{erreurs.fournisseurId}</span>}
                </label>
                <select
                  name="fournisseurId"
                  value={formData.fournisseurId}
                  onChange={handleInputChange}
                  className={`form-select ${erreurs.fournisseurId ? 'error' : ''}`}
                >
                  <option value="">Sélectionnez un fournisseur</option>
                  {fournisseurs.map(fournisseur => (
                    <option key={fournisseur.id} value={fournisseur.id}>
                      {fournisseur.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Date de commande *
                  {erreurs.dateCommande && <span className="error-message">{erreurs.dateCommande}</span>}
                </label>
                <input
                  type="date"
                  name="dateCommande"
                  value={formData.dateCommande}
                  onChange={handleInputChange}
                  className={`form-input ${erreurs.dateCommande ? 'error' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date livraison prévue</label>
                <input
                  type="date"
                  name="dateLivraisonPrevue"
                  value={formData.dateLivraisonPrevue}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Section produits */}
          <div className="form-section">
            <h3 className="section-title">
              <span className="section-icon">🛒</span>
              Produits Commandés
              {erreurs.produits && <span className="error-message section-error">{erreurs.produits}</span>}
            </h3>
            
            {/* Ajout de produit */}
            <div className="ajout-produit-card">
              <h4 className="ajout-title">Ajouter un produit</h4>
              <div className="ajout-grid">
                <div className="form-group">
                  <label className="form-label">Catégorie</label>
                  <select
                    name="categorie"
                    value={nouveauProduit.categorie}
                    onChange={handleProduitChange}
                    className="form-select"
                  >
                    <option value="">Toutes les catégories</option>
                    {categories.map(categorie => (
                      <option key={categorie} value={categorie}>
                        {categorie}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Produit *</label>
                  <select
                    name="produitId"
                    value={nouveauProduit.produitId}
                    onChange={handleProduitChange}
                    className="form-select"
                  >
                    <option value="">Sélectionnez un produit</option>
                    {produitsFiltres.map(produit => (
                      <option key={produit.id} value={produit.id}>
                        {produit.nom} - {produit.prix} €
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Quantité *</label>
                  <input
                    type="number"
                    name="quantite"
                    value={nouveauProduit.quantite}
                    onChange={handleProduitChange}
                    min="1"
                    className="form-input"
                    placeholder="1"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Prix unitaire (€) *</label>
                  <input
                    type="number"
                    name="prixUnitaire"
                    value={nouveauProduit.prixUnitaire}
                    onChange={handleProduitChange}
                    step="0.01"
                    min="0"
                    className="form-input"
                    placeholder="0.00"
                  />
                </div>

                <div className="form-group ajout-action">
                  <label className="form-label">&nbsp;</label>
                  <button
                    type="button"
                    onClick={ajouterProduit}
                    disabled={!nouveauProduit.produitId || nouveauProduit.quantite < 1}
                    className="btn-ajouter"
                  >
                    <span className="btn-icon">+</span>
                    Ajouter le produit
                  </button>
                </div>
              </div>
            </div>

            {/* Liste des produits ajoutés */}
            {formData.produits.length > 0 && (
              <div className="produits-list-section">
                <div className="produits-header">
                  <h4>Produits dans la commande ({formData.produits.length})</h4>
                  <span className="sous-total">
                    Sous-total: {calculerSousTotal().toFixed(2)} €
                  </span>
                </div>
                
                <div className="produits-list">
                  {formData.produits.map((produit, index) => (
                    <div key={produit.id} className="produit-item">
                      <div className="produit-info">
                        <div className="produit-nom">{produit.nom}</div>
                        <div className="produit-reference">{produit.reference}</div>
                        <div className="produit-categorie">{produit.categorie}</div>
                      </div>
                      
                      <div className="produit-controles">
                        <div className="controle-group">
                          <label>Quantité</label>
                          <div className="quantite-controls">
                            <button
                              type="button"
                              onClick={() => modifierQuantiteProduit(index, produit.quantite - 1)}
                              className="btn-quantite"
                              disabled={produit.quantite <= 1}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={produit.quantite}
                              onChange={(e) => modifierQuantiteProduit(index, parseInt(e.target.value) || 1)}
                              min="1"
                              className="input-quantite"
                            />
                            <button
                              type="button"
                              onClick={() => modifierQuantiteProduit(index, produit.quantite + 1)}
                              className="btn-quantite"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="controle-group">
                          <label>Prix unitaire</label>
                          <input
                            type="number"
                            value={produit.prixUnitaire}
                            onChange={(e) => modifierPrixProduit(index, parseFloat(e.target.value) || 0)}
                            step="0.01"
                            min="0"
                            className="input-prix"
                          />
                        </div>

                        <div className="produit-total">
                          <span className="total-label">Total:</span>
                          <span className="total-montant">{produit.prixTotal.toFixed(2)} €</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => supprimerProduit(index)}
                          className="btn-supprimer"
                          title="Supprimer le produit"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Frais supplémentaires */}
          <div className="form-section">
            <h3 className="section-title">
              <span className="section-icon">💰</span>
              Frais Supplémentaires
            </h3>
            <div className="frais-grid">
              <div className="form-group">
                <label className="form-label">Frais de port (€)</label>
                <input
                  type="number"
                  name="fraisPort"
                  value={formData.fraisPort}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Remise (%)</label>
                <input
                  type="number"
                  name="remise"
                  value={formData.remise}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  max="100"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="form-section">
            <h3 className="section-title">
              <span className="section-icon">📝</span>
              Notes & Commentaires
            </h3>
            <div className="form-group">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="4"
                className="form-textarea"
                placeholder="Notes supplémentaires sur la commande..."
              />
            </div>
          </div>

          {/* Résumé de la commande */}
          <div className="resume-section">
            <h3 className="section-title">
              <span className="section-icon">🧮</span>
              Récapitulatif
            </h3>
            <div className="resume-grid">
              <div className="resume-item">
                <span>Sous-total:</span>
                <span>{calculerSousTotal().toFixed(2)} €</span>
              </div>
              <div className="resume-item">
                <span>Remise ({formData.remise}%):</span>
                <span>-{(calculerSousTotal() * (formData.remise / 100)).toFixed(2)} €</span>
              </div>
              <div className="resume-item">
                <span>Frais de port:</span>
                <span>{parseFloat(formData.fraisPort || 0).toFixed(2)} €</span>
              </div>
              <div className="resume-item">
                <span>TVA (20%):</span>
                <span>{(calculerTotal() * 0.2).toFixed(2)} €</span>
              </div>
              <div className="resume-item total">
                <span>Total TTC:</span>
                <span>{calculerTotal().toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={enregistrement}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={enregistrement}
            >
              {enregistrement ? (
                <>
                  <div className="loading-spinner"></div>
                  Enregistrement...
                </>
              ) : (
                <>
                  <span className="btn-icon">💾</span>
                  Enregistrer les modifications
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditCommande;