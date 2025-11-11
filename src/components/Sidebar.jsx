import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const location = useLocation();

  const menuSections = [
    {
      title: 'MAIN',
      items: [
        { id: 'dashboard', icon: '📊', label: 'Dashboard', badge: null },
        { id: 'analytics', icon: '📈', label: 'Analytics', badge: 'New' },
        { id: 'commandes', icon: '📦', label: 'Commandes', badge: null },

        { id: 'clients', icon: '👥', label: 'Clients', badge: null },
        { id: 'transactions', icon: '💰', label: 'Transactions', badge: 12 },
        { id: 'projects', icon: '📋', label: 'Projects', badge: null },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { id: 'settings', icon: '⚙️', label: 'Settings', badge: null },
        { id: 'security', icon: '🔒', label: 'Security', badge: null },
        { id: 'messages', icon: '📧', label: 'Messages', badge: 3 },
        { id: 'notifications', icon: '🔔', label: 'Notifications', badge: 7 },
      ]
    }
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  return (
    <div className="sidebar">
      {/* Header avec logo */}
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <div className="logo-shine"></div>
            ⚡
          </div>
          <span className="logo-text">NexusFlow</span>
        </div>
      </div>

      {/* Navigation avec recherche */}
      {/* <div className="sidebar-search">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div> */}

      {/* Menu principal */}
      <nav className="sidebar-nav">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="nav-section">
            <h3 className="nav-section-title">{section.title}</h3>
            <ul className="nav-list">
              {section.items.map((item) => (
                <li key={item.id} className="nav-item">
                  <Link 
                    to={`/${item.id === 'dashboard' ? '' : item.id}`}
                    className={`nav-link ${location.pathname === `/${item.id}` || (item.id === 'dashboard' && location.pathname === '/') ? 'active' : ''}`}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    {item.badge && (
                      <span className={`nav-badge ${typeof item.badge === 'string' ? 'badge-new' : ''}`}>
                        {item.badge}
                      </span>
                    )}
                    <div className="nav-glow"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Profile utilisateur avec statut */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" 
              alt="Alex Morgan" 
            />
            <div className="user-status online"></div>
          </div>
          <div className="user-info">
            <div className="user-role">Alex Morgan</div>
            <div className="user-role">Administrator</div>
          </div>
          <div className="user-actions">
            <button className="user-action-btn" title="Settings">
              ⚙️
            </button>
            <button className="user-action-btn" title="Logout">
              🚪
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar discrète */}
      <div className="sidebar-progress">
        <div className="progress-info">
          <span>Espace stockage</span>
          <span>68%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: '68%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;