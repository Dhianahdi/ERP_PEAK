import React, { useState, useMemo } from 'react';
import { commandes, produits, fournisseurs, categories } from './data/mockData';
import CommandesTable from './components/CommandesTable';
import FiltresCommandes from './components/FiltresCommandes';
import ModalCommande from './components/ModalCommande';
import DetailsCommande from './components/DetailsCommande';
import './Commandes.css';

const Commandes = () => {
  const [commandesData, setCommandesData] = useState(commandes);
  const [filtres, setFiltres] = useState({
    statut: '',
    fournisseur: '',
    dateDebut: '',
    dateFin: '',
    recherche: ''
  });
  const [commandeSelectionnee, setCommandeSelectionnee] = useState(null);
  const [modalOuvert, setModalOuvert] = useState(false);
  const [detailsOuverts, setDetailsOuverts] = useState({});

  // Filtrer les commandes
  const commandesFiltrees = useMemo(() => {
    return commandesData.filter(commande => {
      const matchStatut = !filtres.statut || commande.statut === filtres.statut;
      const matchFournisseur = !filtres.fournisseur || commande.fournisseurId === parseInt(filtres.fournisseur);
      const matchRecherche = !filtres.recherche || 
        commande.numero.toLowerCase().includes(filtres.recherche.toLowerCase()) ||
        commande.fournisseurNom.toLowerCase().includes(filtres.recherche.toLowerCase());

      // Filtre par date
      let matchDate = true;
      if (filtres.dateDebut && filtres.dateFin) {
        const dateCommande = new Date(commande.dateCommande);
        const dateDebut = new Date(filtres.dateDebut);
        const dateFin = new Date(filtres.dateFin);
        matchDate = dateCommande >= dateDebut && dateCommande <= dateFin;
      }

      return matchStatut && matchFournisseur && matchRecherche && matchDate;
    });
  }, [commandesData, filtres]);

  const toggleDetails = (commandeId) => {
    setDetailsOuverts(prev => ({
      ...prev,
      [commandeId]: !prev[commandeId]
    }));
  };

  const ajouterCommande = (nouvelleCommande) => {
    const id = Math.max(...commandesData.map(c => c.id)) + 1;
    const commandeAvecId = {
      ...nouvelleCommande,
      id,
      dateCommande: new Date().toISOString().split('T')[0],
      statut: 'en_attente'
    };
    setCommandesData(prev => [commandeAvecId, ...prev]);
  };

  const mettreAJourStatut = (commandeId, nouveauStatut) => {
    setCommandesData(prev =>
      prev.map(commande =>
        commande.id === commandeId
          ? { ...commande, statut: nouveauStatut }
          : commande
      )
    );
  };

  return (
    <div className="commandes-page">
      {/* Header de la page */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Commandes Fournisseurs</h1>
          <p className="page-subtitle">Gérez vos commandes et suivez leur statut</p>
        </div>
        <button 
          className="btn btn-primary btn-large"
          onClick={() => setModalOuvert(true)}
        >
          <span className="btn-icon">+</span>
          Nouvelle Commande
        </button>
      </div>

      {/* Cartes de statistiques */}
      <div className="stats-commandes">
        <div className="stat-card">
          <div className="stat-icon total">📦</div>
          <div className="stat-content">
            <h3>{commandesData.length}</h3>
            <p>Total Commandes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon en-attente">⏳</div>
          <div className="stat-content">
            <h3>{commandesData.filter(c => c.statut === 'en_attente').length}</h3>
            <p>En Attente</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon confirme">✅</div>
          <div className="stat-content">
            <h3>{commandesData.filter(c => c.statut === 'confirme').length}</h3>
            <p>Confirmées</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon livre">🚚</div>
          <div className="stat-content">
            <h3>{commandesData.filter(c => c.statut === 'livre').length}</h3>
            <p>Livrées</p>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <FiltresCommandes
        filtres={filtres}
        setFiltres={setFiltres}
        fournisseurs={fournisseurs}
      />

      {/* Tableau des commandes */}
      <div className="table-container">
        <CommandesTable
          commandes={commandesFiltrees}
          detailsOuverts={detailsOuverts}
          toggleDetails={toggleDetails}
          mettreAJourStatut={mettreAJourStatut}
          setCommandeSelectionnee={setCommandeSelectionnee}
        />
      </div>

      {/* Modal pour ajouter une commande */}
      {modalOuvert && (
    <ModalCommande
  onClose={() => setModalOuvert(false)}
  onSave={ajouterCommande}
  produits={produits}
  fournisseurs={fournisseurs}
  categories={categories}  // ← Ajouter cette ligne
/>
      )}

      {/* Modal pour voir les détails d'une commande */}
      {commandeSelectionnee && (
        <DetailsCommande
          commande={commandeSelectionnee}
          onClose={() => setCommandeSelectionnee(null)}
          produits={produits}
        />
      )}
    </div>
  );
};

export default Commandes;