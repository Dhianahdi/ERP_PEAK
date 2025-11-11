import React from 'react';
import './Pages.css';

const Dashboard = () => {
  return (
    <div className="page-content">
      {/* Header de la page avec breadcrumb */}
      <div className="page-header">
        <div className="breadcrumb">
          <span>Dashboard</span>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-active">Vue d'ensemble</span>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <span className="btn-icon">📥</span>
            Exporter
          </button>
          <button className="btn btn-primary">
            <span className="btn-icon">+</span>
            Nouveau Projet
          </button>
        </div>
      </div>

      {/* Cartes de statistiques améliorées */}
      <div className="stats-grid">
        <div className="stat-card premium">
          <div className="stat-header">
            <div className="stat-icon revenue">
              <div className="icon-shine"></div>
              💰
            </div>
            <div className="stat-trend positive">
              <span>+12.5%</span>
              <span>📈</span>
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">€24,580</h3>
            <p className="stat-label">Revenu Total</p>
            <div className="stat-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
              <span>75% de l'objectif</span>
            </div>
          </div>
        </div>

        <div className="stat-card premium">
          <div className="stat-header">
            <div className="stat-icon users">
              <div className="icon-shine"></div>
              👥
            </div>
            <div className="stat-trend positive">
              <span>+8.2%</span>
              <span>📈</span>
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">1,248</h3>
            <p className="stat-label">Utilisateurs Actifs</p>
            <div className="user-avatars">
              <div className="avatar-group">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="avatar-item" style={{ zIndex: 5 - i }}>
                    <img 
                      src={`https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face&${i}`}
                      alt={`User ${i}`}
                    />
                  </div>
                ))}
                <div className="avatar-more">+12</div>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card premium">
          <div className="stat-header">
            <div className="stat-icon orders">
              <div className="icon-shine"></div>
              📦
            </div>
            <div className="stat-trend negative">
              <span>-3.1%</span>
              <span>📉</span>
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">356</h3>
            <p className="stat-label">Commandes</p>
            <div className="stat-details">
              <div className="detail-item">
                <span className="detail-label">En cours:</span>
                <span className="detail-value">42</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Complétées:</span>
                <span className="detail-value">314</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card premium">
          <div className="stat-header">
            <div className="stat-icon growth">
              <div className="icon-shine"></div>
              📈
            </div>
            <div className="stat-trend positive">
              <span>+5.7%</span>
              <span>🚀</span>
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">68.5%</h3>
            <p className="stat-label">Taux de Croissance</p>
            <div className="growth-chart">
              <div className="chart-mini">
                {[30, 45, 60, 55, 68].map((value, index) => (
                  <div 
                    key={index} 
                    className="chart-bar"
                    style={{ height: `${value}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grille de contenu principale */}
      <div className="content-grid">
        {/* Activité récente */}
        <div className="content-card premium">
          <div className="card-header">
            <h3 className="card-title">Activité Récente</h3>
            <button className="card-action">Voir tout</button>
          </div>
          <div className="activity-list">
            {[
              { 
                user: 'Sarah Johnson', 
                action: 'a créé un nouveau projet', 
                time: '2 min', 
                project: 'Design System',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
              },
              { 
                user: 'Mike Chen', 
                action: 'a terminé une tâche', 
                time: '15 min', 
                project: 'Dashboard V2',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
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

        {/* Projets en cours */}
        <div className="content-card premium">
          <div className="card-header">
            <h3 className="card-title">Projets en Cours</h3>
            <button className="card-action">+ Nouveau</button>
          </div>
          <div className="projects-list">
            {[
              { name: 'Design System', progress: 85, team: 4, deadline: '15 Jan' },
              { name: 'Mobile App', progress: 60, team: 6, deadline: '30 Jan' },
              { name: 'API Restructure', progress: 45, team: 3, deadline: '20 Fév' }
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