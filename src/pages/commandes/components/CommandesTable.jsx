import React, { useState, useMemo } from 'react';
import './CommandesTable.css';

const CommandesTable = ({ 
  commandes, 
  detailsOuverts, 
  toggleDetails, 
  mettreAJourStatut,
  setCommandeSelectionnee 
}) => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fonction pour formater les nombres en toute sécurité
  const formatMontant = (montant) => {
    if (montant === undefined || montant === null) return '0.00';
    return parseFloat(montant).toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Fonction pour formater les dates en toute sécurité
  const formatDate = (dateString) => {
    if (!dateString) return 'Date invalide';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return 'Date invalide';
    }
  };

  // Calcul de la pagination
  const paginatedCommandes = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return commandes.slice(startIndex, endIndex);
  }, [commandes, currentPage, pageSize]);

  const totalPages = Math.ceil(commandes.length / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, commandes.length);

  const getStatutStyle = (statut) => {
    const styles = {
      en_attente: { background: 'linear-gradient(135deg, #FFF3CD, #FFEAA7)', color: '#856404', label: 'En Attente' },
      confirme: { background: 'linear-gradient(135deg, #D1ECF1, #A8E6CF)', color: '#0C5460', label: 'Confirmée' },
      livraison: { background: 'linear-gradient(135deg, #D4EDDA, #C8E6C9)', color: '#155724', label: 'En Livraison' },
      livre: { background: 'linear-gradient(135deg, #E2E3E5, #F5F5F5)', color: '#383D41', label: 'Livrée' },
      annule: { background: 'linear-gradient(135deg, #F8D7DA, #FFCDD2)', color: '#721C24', label: 'Annulée' }
    };
    return styles[statut] || styles.en_attente;
  };

  const getBadgePrix = (montant) => {
    const montantNum = parseFloat(montant) || 0;
    if (montantNum > 5000) return 'premium';
    if (montantNum > 2000) return 'moyen';
    return 'standard';
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll vers le haut de la table
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
      tableContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
    
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Bouton précédent
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn-pagination"
      >
        ‹
      </button>
    );

    // Première page
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="btn-pagination"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="pagination-ellipsis">...</span>
        );
      }
    }

    // Pages visibles
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`btn-pagination ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Dernière page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="pagination-ellipsis">...</span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="btn-pagination"
        >
          {totalPages}
        </button>
      );
    }

    // Bouton suivant
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn-pagination"
      >
        ›
      </button>
    );

    return buttons;
  };

  return (
    <div className="commandes-table">
      {/* En-tête du tableau */}
      <div className="table-header">
        <div className="table-row header-row">
          <div className="col-checkbox">
            <input type="checkbox" />
          </div>
          <div className="col-details"></div>
          <div className="col-numero">N° COMMANDE</div>
          <div className="col-fournisseur">FOURNISSEUR</div>
          <div className="col-date">DATE</div>
          <div className="col-montant">MONTANT</div>
          <div className="col-statut">STATUT</div>
          <div className="col-actions">ACTIONS</div>
        </div>
      </div>

      {/* Corps du tableau */}
      <div className="table-body">
        {paginatedCommandes.map(commande => (
          <div key={commande.id} className="commande-item">
            <div className="table-row main-row">
              <div className="col-checkbox">
                <input type="checkbox" />
              </div>
              
              {/* Bouton détails déplacé à gauche */}
              <div className="col-details">
                <button 
                  className="btn-details"
                  onClick={() => toggleDetails(commande.id)}
                  title={detailsOuverts[commande.id] ? "Masquer les détails" : "Afficher les détails"}
                >
                  {detailsOuverts[commande.id] ? '▲' : '▼'}
                </button>
              </div>
              
              <div className="col-numero">
                <span className="numero-badge">{commande.numero || 'N/A'}</span>
              </div>
              
              <div className="col-fournisseur">
                <div className="fournisseur-info">
                  <div className="fournisseur-nom">{commande.fournisseurNom || 'Non spécifié'}</div>
                  <div className="fournisseur-contact">{commande.fournisseurContact || ''}</div>
                </div>
              </div>
              
              <div className="col-date">
                {formatDate(commande.dateCommande)}
              </div>
              
              <div className="col-montant">
                <span className={`montant-badge ${getBadgePrix(commande.montantTotal)}`}>
                  {formatMontant(commande.montantTotal)} €
                </span>
              </div>
              
              <div className="col-statut">
                <select
                  value={commande.statut || 'en_attente'}
                  onChange={(e) => mettreAJourStatut(commande.id, e.target.value)}
                  className={`statut-select ${commande.statut}`}
                  style={getStatutStyle(commande.statut)}
                >
                  <option value="en_attente">En Attente</option>
                  <option value="confirme">Confirmée</option>
                  <option value="livraison">En Livraison</option>
                  <option value="livre">Livrée</option>
                  <option value="annule">Annulée</option>
                </select>
              </div>
              
              <div className="col-actions">
                <button 
                  className="btn-action view"
                  onClick={() => setCommandeSelectionnee(commande)}
                  title="Voir détails complets"
                >
                  👁️
                </button>
                <button className="btn-action edit" title="Modifier">
                  ✏️
                </button>
                <button className="btn-action delete" title="Supprimer">
                  🗑️
                </button>
              </div>
            </div>

            {/* Ligne de détails dépliante */}
            {detailsOuverts[commande.id] && (
              <div className="details-row">
                <div className="details-content">
                  <div className="details-section">
                    <h4>📦 Produits Commandés</h4>
                    <div className="produits-list">
                      {(commande.produits || []).map((produit, index) => (
                        <div key={index} className="produit-item">
                          <span className="produit-nom">{produit.nom || 'Produit sans nom'}</span>
                          <span className="produit-quantite">Quantité: {produit.quantite || 0}</span>
                          <span className="produit-prix">{formatMontant(produit.prixUnitaire)} €/unité</span>
                          <span className="produit-total">{formatMontant(produit.prixTotal)} €</span>
                        </div>
                      ))}
                      {(!commande.produits || commande.produits.length === 0) && (
                        <div className="produit-item empty">
                          <span className="produit-nom">Aucun produit dans cette commande</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Sous-total HT:</span>
                      <span className="detail-value">{formatMontant(commande.sousTotal)} €</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">TVA (20%):</span>
                      <span className="detail-value">{formatMontant(commande.tva)} €</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Frais de port:</span>
                      <span className="detail-value">{formatMontant(commande.fraisPort)} €</span>
                    </div>
                    <div className="detail-item total">
                      <span className="detail-label">Total TTC:</span>
                      <span className="detail-value">{formatMontant(commande.montantTotal)} €</span>
                    </div>
                  </div>

                  <div className="actions-details">
                    <button className="btn btn-outline btn-small">
                      📄 Générer PDF
                    </button>
                    <button className="btn btn-outline btn-small">
                      📧 Envoyer par Email
                    </button>
                    <button className="btn btn-outline btn-small">
                      🔄 Dupliquer
                    </button>
                    <button className="btn btn-primary btn-small">
                      ✏️ Modifier
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {paginatedCommandes.length === 0 && (
          <div className="table-empty">
            <div className="empty-icon">📦</div>
            <h3>Aucune commande trouvée</h3>
            <p>Ajustez vos filtres ou créez une nouvelle commande</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {commandes.length > 0 && (
        <div className="pagination">
          <div className="pagination-info">
            Affichage de {startItem} à {endItem} sur {commandes.length} commande{commandes.length > 1 ? 's' : ''}
          </div>
          
          <div className="pagination-controls">
            <select 
              value={pageSize} 
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="pagination-select"
            >
              <option value="5">5 par page</option>
              <option value="10">10 par page</option>
              <option value="20">20 par page</option>
              <option value="50">50 par page</option>
            </select>
            
            <div className="pagination-buttons">
              {renderPaginationButtons()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandesTable;