import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Layout.css';

/**
 * Props for Layout component.
 */
interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Application layout with navigation.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-brand">FansCRM</div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      <main className="main-content">{children}</main>
    </div>
  );
}
