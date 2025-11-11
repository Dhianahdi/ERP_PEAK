import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './Layout.css';

const Layout = ({ children }) => {
  // Plus besoin des états pour gérer l'ouverture/fermeture
  // La sidebar est toujours visible

  return (
    <div className="layout">
      <Sidebar />
      
      <div className="layout-main">
        <Navbar />
        
        <main className="layout-content">
          <div className="content-wrapper">
            {children}
          </div>
          
          {/* Footer moderne */}
          <footer className="layout-footer">
            <div className="footer-content">
              <div className="footer-left">
                <span>© 2024 PremiumPro Dashboard. Tous droits réservés.</span>
              </div>
              <div className="footer-right">
                <a href="#" className="footer-link">Conditions d'utilisation</a>
                <a href="#" className="footer-link">Politique de confidentialité</a>
                <a href="#" className="footer-link">Support</a>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Quick Actions Floating Button */}
      <div className="floating-actions">
        <button className="floating-btn primary" title="Actions rapides">
          <span>+</span>
        </button>
        <div className="floating-menu">
          <button className="floating-menu-item" title="Nouveau projet">
            📁
          </button>
          <button className="floating-menu-item" title="Nouveau rapport">
            📊
          </button>
          <button className="floating-menu-item" title="Nouveau message">
            ✉️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Layout;