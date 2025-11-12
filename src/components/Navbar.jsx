import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ onMenuToggle }) => {  // Ajouter la prop onMenuToggle
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const notifications = [
    { id: 1, type: 'info', message: 'Nouveau message reçu', time: '2 min' },
    { id: 2, type: 'warning', message: 'Stock faible sur produit X', time: '15 min' },
    { id: 3, type: 'success', message: 'Paiement confirmé', time: '1 h' },
  ];

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-left">
        {/* Bouton menu pour mobile */}
        <button 
          className="sidebar-toggle-mobile"
          onClick={onMenuToggle}
          title="Ouvrir le menu"
        >
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        
        <div className="navbar-search">
          <input 
            type="text" 
            placeholder="Rechercher projets, documents..." 
            className="search-input"
          />
          <span className="search-icon">🔍</span>
          <div className="search-shortcut">⌘K</div>
        </div>
      </div>

      <div className="navbar-right">
        {/* Date et heure en temps réel */}
        <div className="datetime-widget">
          <div className="time">
            {currentTime.toLocaleTimeString('fr-FR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <div className="date">
            {currentTime.toLocaleDateString('fr-FR', {
              weekday: 'short',
              day: 'numeric',
              month: 'short'
            })}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="navbar-actions">
          <button className="nav-action quick-action" title="Créer nouveau">
            <span className="action-icon">+</span>
          </button>

          {/* Notifications */}
          <div className="notification-dropdown">
            <button 
              className="nav-action" 
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span className="action-icon">🔔</span>
              <span className="action-badge">3</span>
            </button>
            
            {showNotifications && (
              <div className="dropdown-menu notification-menu">
                <div className="dropdown-header">
                  <h3>Notifications</h3>
                  <span className="badge">3 nouvelles</span>
                </div>
                <div className="notification-list">
                  {notifications.map(notif => (
                    <div key={notif.id} className={`notification-item ${notif.type}`}>
                      <div className="notification-icon">
                        {notif.type === 'success' && '✅'}
                        {notif.type === 'warning' && '⚠️'}
                        {notif.type === 'info' && '💬'}
                      </div>
                      <div className="notification-content">
                        <p>{notif.message}</p>
                        <span>{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="dropdown-footer">
                  <button className="view-all">Voir tout</button>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <button className="nav-action">
            <span className="action-icon">📧</span>
            <span className="action-badge">7</span>
          </button>

          {/* Mode sombre/clair */}
          <button className="nav-action theme-toggle" title="Changer le thème">
            <span className="action-icon">🌙</span>
          </button>
        </div>

        {/* Profile utilisateur */}
        <div className="navbar-user">
          <div 
            className="user-profile-trigger"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                alt="Alex Morgan" 
              />
              <div className="user-status online"></div>
            </div>
            <div className="user-info">
              <span className="user-name">Alex Morgan</span>
              <span className="user-role">Administrator</span>
            </div>
            <button className="user-dropdown">⌄</button>
          </div>

          {showUserMenu && (
            <div className="dropdown-menu user-menu">
              <div className="user-menu-header">
                <div className="user-avatar large">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" 
                    alt="Alex Morgan" 
                  />
                </div>
                <div className="user-details">
                  <div className="user-name">Alex Morgan</div>
                  <div className="user-email">alex.morgan@example.com</div>
                </div>
              </div>
              <div className="menu-items">
                <a href="#" className="menu-item">
                  <span className="menu-icon">👤</span>
                  Mon Profile
                </a>
                <a href="#" className="menu-item">
                  <span className="menu-icon">⚙️</span>
                  Paramètres
                </a>
                <a href="#" className="menu-item">
                  <span className="menu-icon">💳</span>
                  Facturation
                </a>
                <div className="menu-divider"></div>
                <a href="#" className="menu-item logout">
                  <span className="menu-icon">🚪</span>
                  Déconnexion
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;