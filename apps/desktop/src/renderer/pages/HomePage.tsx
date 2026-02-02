import React from 'react';
import '../styles/HomePage.css';

/**
 * Home page component.
 */
export function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to FansCRM</h1>
      <p>Simple Desktop Client for FansCRM</p>

      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>User Management</li>
          <li>Navigate between pages</li>
          <li>Backend API Integration</li>
        </ul>
      </div>
    </div>
  );
}
