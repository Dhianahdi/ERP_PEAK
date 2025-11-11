import React from 'react';
import './DetailsCommande.css';

const DetailsCommande = ({ commande, onClose, produits }) => {
  const getStatutStyle = (statut) => {
    const styles = {
      en_attente: { background: '#FFF3CD', color: '#856404', label: 'En Attente' },
      confirme: { background: '#D1ECF1', color: '#0C5460', label: 'Confirmée' },
      livraison: { background: '#D4EDDA', color: '#155724', label: 'En Livraison' },
      livre: { background: '#E2E3E5', color: '#383D41', label: 'Livrée' },
      annule: { background: '#F8D7DA', color: '#721C24', label: 'Annulée' }
    };
    return styles[statut] || styles.en_attente;
  };

  const statut = getStatutStyle(commande.statut);

  return (
    <div className="modal-overlay">
      <div className="modal-details">
        <div className="modal-header">
          <div className="header-content">
            <h2>Détails de la Commande</h2>
            <div className="commande-numero">{commande.numero}</div>
          </div>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <div className="details-content">
          {/* En-tête de la commande */}
          <div className="details-header">
            <div className="header-info">
              <div className="info-group">
                <label>Fournisseur</label>
                <div className="info-value large">{commande.fournisseurNom}</div>
                <div className="info-subvalue">{commande.fournisseurContact}</div>
              </div>
              
              <div className="info-group">
                <label>Date de commande</label>
                <div className="info-value">
                  {new Date(commande.dateCommande).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>

            <div className="header-status">
              <div 
                className="statut-badge"
                style={{ background: statut.background, color: statut.color }}
              >
                {statut.label}
              </div>
              <div className="montant-total">
                {commande.montantTotal} €
              </div>
            </div>
          </div>

          {/* Produits commandés */}
          <div className="section">
            <h3>Produits Commandés</h3>
            <div className="produits-table">
              <div className="table-header">
                <div>Produit</div>
                <div>Quantité</div>
                <div>Prix Unitaire</div>
                <div>Total</div>
              </div>
              {commande.produits.map((produit, index) => (
                <div key={index} className="table-row">
                  <div className="produit-info">
                    <div className="produit-nom">{produit.nom}</div>
                    <div className="produit-ref">REF: {produit.id}</div>
                  </div>
                  <div className="produit-quantite">{produit.quantite}</div>
                  <div className="produit-prix">{produit.prixUnitaire} €</div>
                  <div className="produit-total">{produit.prixTotal} €</div>
                </div>
              ))}
            </div>
          </div>

          {/* Récapitulatif financier */}
          <div className="section">
            <h3>Récapitulatif Financier</h3>
            <div className="recap-financier">
              <div className="recap-ligne">
                <span>Sous-total</span>
                <span>{commande.sousTotal.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="recap-ligne">
                <span>TVA (20%)</span>
                <span>{commande.tva.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="recap-ligne">
                <span>Frais de port</span>
                <span>{commande.fraisPort.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="recap-ligne total">
                <span>Total TTC</span>
                <span>{commande.montantTotal.toLocaleString('fr-FR')} €</span>
              </div>
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="section-grid">
            <div className="section">
              <h3>Informations de Livraison</h3>
              <div className="info-card">
                <div className="info-item">
                  <label>Adresse de livraison</label>
                  <div>123 Rue des Entreprises, 75001 Paris</div>
                </div>
                <div className="info-item">
                  <label>Contact livraison</label>
                  <div>Jean Dupont - 01 23 45 67 89</div>
                </div>
                <div className="info-item">
                  <label>Instructions</label>
                  <div>Livraison entre 9h et 12h - Sonner à l'interphone</div>
                </div>
              </div>
            </div>

            <div className="section">
              <h3>Informations de Paiement</h3>
              <div className="info-card">
                <div className="info-item">
                  <label>Mode de paiement</label>
                  <div>Virement bancaire - 30 jours</div>
                </div>
                <div className="info-item">
                  <label>RIB</label>
                  <div>FR76 3000 4000 0100 1234 5678 900</div>
                </div>
                <div className="info-item">
                  <label>Prochaine échéance</label>
                  <div>15 Mars 2024</div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {commande.notes && (
            <div className="section">
              <h3>Notes</h3>
              <div className="notes-card">
                {commande.notes}
              </div>
            </div>
          )}

          {/* Historique */}
          <div className="section">
            <h3>Historique de la Commande</h3>
            <div className="historique">
              <div className="historique-item">
                <div className="historique-date">15 Fév 2024, 14:30</div>
                <div className="historique-action">Commande créée</div>
                <div className="historique-utilisateur">Par: Alex Morgan</div>
              </div>
              <div className="historique-item">
                <div className="historique-date">15 Fév 2024, 16:45</div>
                <div className="historique-action">Envoyée au fournisseur</div>
                <div className="historique-utilisateur">Système automatique</div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-outline">
            📄 Télécharger PDF
          </button>
          <button className="btn btn-outline">
            📧 Envoyer par email
          </button>
          <button className="btn btn-primary">
            ✏️ Modifier la commande
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsCommande;