import React from 'react';
import './ModalConfirmation.css';

const ModalConfirmation = ({ commande, onClose, onConfirm }) => {
  const formatMontant = (montant) => {
    return parseFloat(montant || 0).toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
<div className="modal-confirmation-overlay">
  <div className="modal-confirmation-content">
        <div className="modal-header">
          <h2>🗑️ Confirmer la suppression</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <div className="confirmation-content">
          <div className="warning-icon">⚠️</div>
          
          <div className="confirmation-message">
            <h3>Êtes-vous sûr de vouloir supprimer cette commande ?</h3>
            <p>Cette action est irréversible et supprimera définitivement la commande suivante :</p>
          </div>

          <div className="commande-info">
            <div className="info-item">
              <span className="info-label">Numéro :</span>
              <span className="info-value">{commande.numero}</span>
            </div>
            {/* <div className="info-item">
              <span className="info-label">Fournisseur :</span>
              <span className="info-value">{commande.fournisseurNom}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Date :</span>
              <span className="info-value">{formatDate(commande.dateCommande)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Montant :</span>
              <span className="info-value">{formatMontant(commande.montantTotal)} €</span>
            </div>
            <div className="info-item">
              <span className="info-label">Statut :</span>
              <span className={`statut-badge ${commande.statut}`}>
                {commande.statut === 'en_attente' && '⏳ En Attente'}
                {commande.statut === 'confirme' && '✅ Confirmée'}
                {commande.statut === 'livraison' && '🚚 En Livraison'}
                {commande.statut === 'livre' && '📦 Livrée'}
                {commande.statut === 'annule' && '❌ Annulée'}
              </span>
            </div> */}
          </div>

          {/* <div className="produits-resume">
            <h4>Produits concernés :</h4>
            <div className="produits-list-mini">
              {commande.produits && commande.produits.slice(0, 3).map((produit, index) => (
                <div key={index} className="produit-item-mini">
                  <span>{produit.nom}</span>
                  <span>{produit.quantite} x {formatMontant(produit.prixUnitaire)} €</span>
                </div>
              ))}
              {commande.produits && commande.produits.length > 3 && (
                <div className="produit-item-mini more">
                  <span>... et {commande.produits.length - 3} autre(s) produit(s)</span>
                </div>
              )}
            </div>
          </div> */}

          <div className="warning-message">
            <p>⚠️ <strong>Attention :</strong> Cette action ne peut pas être annulée.</p>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Annuler
          </button>
          <button type="button" onClick={onConfirm} className="btn btn-danger">
            🗑️ Supprimer définitivement
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;