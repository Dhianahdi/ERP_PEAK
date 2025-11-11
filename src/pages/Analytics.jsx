import React from 'react';
import './Pages.css';

const Analytics = () => {
  return (
    <div className="page-content">
      <div className="page-header">
        <div className="breadcrumb">
          <span>Analytics</span>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-active">Statistiques détaillées</span>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <span className="btn-icon">📊</span>
            Exporter Rapport
          </button>
          <button className="btn btn-primary">
            <span className="btn-icon">🔄</span>
            Actualiser
          </button>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card large">
          <div className="card-header">
            <h3 className="card-title">Performance du Trafic</h3>
            <div className="time-filters">
              <button className="time-filter active">7j</button>
              <button className="time-filter">30j</button>
              <button className="time-filter">90j</button>
            </div>
          </div>
          <div className="traffic-chart">
            <div className="chart-placeholder">
              <div className="chart-line"></div>
              <div className="chart-points">
                {[30, 45, 60, 55, 70, 80, 75].map((point, index) => (
                  <div 
                    key={index} 
                    className="chart-point"
                    style={{ left: `${(index / 6) * 100}%`, bottom: `${point}%` }}
                  >
                    <div className="point-tooltip">{point}%</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="chart-labels">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mer</span>
              <span>Jeu</span>
              <span>Ven</span>
              <span>Sam</span>
              <span>Dim</span>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-header">
            <h3 className="card-title">Sources de Trafic</h3>
          </div>
          <div className="traffic-sources">
            {[
              { source: 'Réseaux sociaux', percentage: 45, color: '#D4AF37' },
              { source: 'Recherche directe', percentage: 25, color: '#667eea' },
              { source: 'Email', percentage: 15, color: '#f093fb' },
              { source: 'Référencement', percentage: 10, color: '#4facfe' },
              { source: 'Autres', percentage: 5, color: '#E2E8F0' }
            ].map((item, index) => (
              <div key={index} className="traffic-source">
                <div className="source-info">
                  <div className="source-color" style={{ backgroundColor: item.color }}></div>
                  <span className="source-name">{item.source}</span>
                </div>
                <div className="source-stats">
                  <span className="source-percentage">{item.percentage}%</span>
                  <div className="source-bar">
                    <div 
                      className="source-bar-fill" 
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-header">
            <h3 className="card-title">Métriques Clés</h3>
          </div>
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-icon">👥</div>
              <div className="metric-content">
                <div className="metric-value">12.4K</div>
                <div className="metric-label">Visiteurs</div>
                <div className="metric-trend positive">+8.2%</div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-icon">🔄</div>
              <div className="metric-content">
                <div className="metric-value">3.2%</div>
                <div className="metric-label">Taux de rebond</div>
                <div className="metric-trend negative">-1.5%</div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-icon">⏱️</div>
              <div className="metric-content">
                <div className="metric-value">4m 12s</div>
                <div className="metric-label">Durée moyenne</div>
                <div className="metric-trend positive">+45s</div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-icon">📱</div>
              <div className="metric-content">
                <div className="metric-value">68%</div>
                <div className="metric-label">Mobile</div>
                <div className="metric-trend positive">+12%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;