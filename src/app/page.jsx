"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { GameProvider } from '../context/GameContext';

// Dynamically import the App to disable Server-Side Rendering (SSR)
// This prevents hydration errors from browser extensions or window.ethereum
const App = dynamic(() => import('../App'), { ssr: false });

export default function Page() {
  return (
    <GameProvider>
      <App />
    </GameProvider>
  );
}
