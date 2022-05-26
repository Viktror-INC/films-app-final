import React from 'react';
import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&display=swap"
        rel="stylesheet"
      />
      <img
        width={196}
        height={30}
        src={require('../../images/logo.png')}
        alt="logo"
      />
    </header>
  );
}
