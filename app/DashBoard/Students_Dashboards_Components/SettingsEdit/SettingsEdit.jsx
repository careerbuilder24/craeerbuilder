'use client';

import React from 'react';

export default function Settings({ navbarColor, sidebarColor, onColorChange }) {
  return (
    <div>
      <h1>Settings</h1>
      <div>
        <label>Navbar Color:</label>
        <input
          type="color"
          name="navbarColor"
          value={navbarColor}
          onChange={onColorChange}
        />
      </div>
      <div>
        <label>Sidebar Color:</label>
        <input
          type="color"
          name="sidebarColor"
          value={sidebarColor}
          onChange={onColorChange}
        />
      </div>
    </div>
  );
}
