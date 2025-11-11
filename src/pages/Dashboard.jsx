import React from 'react';
import './Pages.css';

// Ces styles "en ligne" seraient normalement dans le CSS, 
// mais pour l'exemple des avatars et mini-graphiques, ils restent ici.

const Dashboard = () => {
  return (
    <div className="page-content">
      {/* Header de la page */}
      <div className="page-header">
        <div className="breadcrumb">
          <span>Dashboard</span>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-active">Vue d'ensemble</span>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <span className="btn-icon">📊</span>
            Bilan des Ventes
          </button>
          <button className="btn btn-primary">
            <span className="btn-icon">✨</span>
            Nouvelle Collection
          </button>
        </div>
      </div>

      {/* Cartes de statistiques PEAK */}
      <div className="stats-grid">
        {/* Ventes (Sneakers) */}
        <div className="stat-card premium">
          <div className="stat-header">
            <div className="stat-icon revenue">👟</div>
            <div className="stat-trend positive">
              <span>+12.5%</span>
              <span>📈</span>
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">€124,580</h3>
            <p className="stat-label">Ventes (Sneakers)</p>
            <div className="stat-progress" style={{ marginTop: '1rem' }}>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '83%' }}></div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--gray-text)', marginTop: '0.5rem', display: 'block' }}>
                Objectif: €150k
              </span>
            </div>
          </div>
        </div>

        {/* Membres 'Gold' */}
        <div className="stat-card premium">
          <div className="stat-header">
            <div className="stat-icon users">🏆</div>
            <div className="stat-trend positive">
              <span>+8.2%</span>
              <span>📈</span>
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">8,248</h3>
            <p className="stat-label">Membres 'Gold'</p>
            {/* Reste du code pour les avatars (non modifié) */}
          </div>
        </div>

        {/* Ventes (Apparel) */}
        <div className="stat-card premium">
          <div className="stat-header">
            <div className="stat-icon orders">👕</div>
            <div className="stat-trend negative">
              <span>-3.1%</span>
              <span>📉</span>
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">1,890</h3>
            <p className="stat-label">Ventes (Apparel)</p>
            <div className="stat-details" style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--gray-text)' }}>En attente:</span>
                <span style={{ fontWeight: '600' }}>42</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                <span style={{ color: 'var(--gray-text)' }}>Expédiées:</span>
                <span style={{ fontWeight: '600' }}>1,848</span>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement (Mois) */}
        <div className="stat-card premium">
          <div className="stat-header">
            <div className="stat-icon growth">🚀</div>
            <div className="stat-trend positive">
              <span>+42.5%</span>
              <span>🔥</span>
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">+42.5%</h3>
            <p className="stat-label">Engagement (Mois)</p>
            {/* Reste du code pour le mini-graphique (non modifié) */}
          </div>
        </div>
      </div>

      {/* Grille de contenu principale */}
      <div className="content-grid">
        {/* Activité Récente */}
        <div className="content-card premium">
          <div className="card-header">
            <h3 className="card-title">Activité Récente</h3>
            <button className="card-action">Voir tout</button>
          </div>
          <div className="activity-list">
            {[
              { 
                user: "Alex 'Volt' Martin", 
                action: "a validé le design 'Hyperion'", 
                time: '2 min', 
                project: "Drop 'Apex'",
                avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0915?w=40&h=40&fit=crop&crop=face'
              },
              { 
                user: 'Julia Ramos', 
                action: "a lancé la campagne 'City-Wide'", 
                time: '15 min', 
                project: 'Marketing V2',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf02865f0?w=40&h=40&fit=crop&crop=face'
              },
              { 
                user: 'PEAK Bot', 
                action: "Stock 'Shadow' bas (15%)", 
                time: '45 min', 
                project: 'Inventaire',
                avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=40&h=40&fit=crop&crop=face'
              }
            ].map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-avatar">
                  <img src={activity.avatar} alt={activity.user} />
                </div>
                <div className="activity-content">
                  <p className="activity-text">
                    <strong>{activity.user}</strong> {activity.action}
                  </p>
                  <div className="activity-meta">
                    <span className="activity-project">{activity.project}</span>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
                <button className="activity-action">
                  ···
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Drops & Projets */}
        <div className="content-card premium">
          <div className="card-header">
            <h3 className="card-title">Drops & Projets</h3>
            <button className="card-action">+ Nouveau Projet</button>
          </div>
          <div className="projects-list">
            {[
              { name: "Lancement 'PEAK Apex'", progress: 85, team: 4, deadline: '15 Jan' },
              { name: "Collab 'Pro-League'", progress: 60, team: 6, deadline: '30 Jan' },
              { name: "Pop-up Store (Paris)", progress: 45, team: 3, deadline: '20 Fév' }
            ].map((project, index) => (
              <div key={index} className="project-item">
                <div className="project-info">
                  <h4 className="project-name">{project.name}</h4>
                  <div className="project-meta">
                    <span className="project-team">👥 {project.team}</span>
                    <span className="project-deadline">📅 {project.deadline}</span>
                  </div>
                </div>
                <div className="project-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;