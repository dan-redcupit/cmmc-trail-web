'use client';

import { useState, useEffect } from 'react';
import { GameState } from '@/lib/gameState';
import { playBrrrt, playJetEngine } from '@/lib/sounds';

interface TrailScreenProps {
  state: GameState;
  onContinue: () => void;
  onRest: () => void;
  onHunt: () => void;
  onSupplies: () => void;
  onGiveUp: () => void;
}

// A-10 Warthog ASCII art frames
const A10_FRAMES = [
  // Frame 1 - Normal
  `     _______________
    /                 \\__
===|  [=====GAU-8=====]  |>>>>
   |  USAF   ◯    ◯   |__/
    \\_____|_______|_____/`,
  // Frame 2 - Firing
  `     _______________
    /                 \\__
===|  [=====GAU-8=====]  |>>>>  BRRRRRT!
   |  USAF   ◯    ◯   |__/    ·····
    \\_____|_______|_____/       ···`,
  // Frame 3 - More firing
  `     _______________
    /                 \\__
===|  [=====GAU-8=====]  |>>>> BRRRRRRRRRT!!!
   |  USAF   ◯    ◯   |__/   ········
    \\_____|_______|_____/      ·····`,
];

// Landscape elements
const CLOUD = `  .-.
 (   )
(___)`;

const MOUNTAIN = `    /\\
   /  \\
  /    \\
 /______\\`;

const SERVER_RACK = ` ___
|===|
|===|
|___|`;

export default function TrailScreen({ state, onContinue, onRest, onHunt, onSupplies, onGiveUp }: TrailScreenProps) {
  const [frame, setFrame] = useState(0);
  const [a10Position, setA10Position] = useState(0);
  const [showBrrrt, setShowBrrrt] = useState(false);
  const [bulletTrails, setBulletTrails] = useState<string[]>([]);

  const progressPct = (state.milesTraveled / state.totalMiles) * 100;
  const milesRemaining = state.totalMiles - state.milesTraveled;
  const progressBarLen = 30;
  const filled = Math.floor((state.milesTraveled / state.totalMiles) * progressBarLen);
  const progressBar = '█'.repeat(filled) + '░'.repeat(progressBarLen - filled);

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % 3);
      setA10Position(p => {
        const newPos = p + 2;
        if (newPos > 100) return 0;
        return newPos;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Play jet engine sound periodically
  useEffect(() => {
    if (a10Position === 0) {
      playJetEngine();
    }
  }, [a10Position]);

  // Handle BRRRT firing
  const handleBrrrt = () => {
    setShowBrrrt(true);
    playBrrrt();

    // Create bullet trails
    const trails = ['·····', '········', '············', '····', '········'];
    setBulletTrails(trails);

    setTimeout(() => {
      setShowBrrrt(false);
      setBulletTrails([]);
    }, 800);
  };

  // Calculate A-10 display position
  const a10Left = `${Math.min(a10Position, 60)}%`;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-terminal-green text-center text-xl sm:text-2xl font-bold border-2 border-terminal-green p-2 mb-2">
        THE CMMC TRAIL
      </div>

      {/* Animated Scene */}
      <div className="border-2 border-terminal-green p-2 mb-2 overflow-hidden relative" style={{ height: '140px' }}>
        {/* Sky with clouds */}
        <div className="absolute top-0 left-0 w-full text-terminal-cyan opacity-50 text-xs">
          <span style={{ position: 'absolute', left: '10%', top: '5px' }}>☁</span>
          <span style={{ position: 'absolute', left: '45%', top: '10px' }}>☁</span>
          <span style={{ position: 'absolute', left: '75%', top: '5px' }}>☁</span>
        </div>

        {/* A-10 Warthog */}
        <div
          className="absolute transition-all duration-150 ease-linear"
          style={{ left: a10Left, top: '15px' }}
        >
          <pre className={`text-xs leading-none ${showBrrrt ? 'text-terminal-yellow' : 'text-terminal-green'}`}>
{showBrrrt ? A10_FRAMES[frame === 0 ? 1 : 2] : A10_FRAMES[0]}
          </pre>
          {/* Bullet trails */}
          {showBrrrt && (
            <div className="absolute text-terminal-yellow text-xs" style={{ left: '200px', top: '10px' }}>
              {bulletTrails.map((trail, i) => (
                <div key={i} style={{ marginLeft: `${i * 15}px` }}>{trail}</div>
              ))}
            </div>
          )}
        </div>

        {/* Ground with server racks and mountains */}
        <div className="absolute bottom-0 left-0 w-full">
          <pre className="text-terminal-cyan text-xs leading-tight">
{'═'.repeat(80)}
          </pre>
          {/* Server racks representing targets */}
          <div className="absolute bottom-2 flex justify-around w-full text-xs text-terminal-red opacity-70">
            <span>▄▄</span>
            <span>▄▄▄</span>
            <span>▄▄</span>
            <span>▄▄▄▄</span>
            <span>▄▄</span>
          </div>
        </div>

        {/* Destination marker */}
        <div className="absolute bottom-4 right-4 text-terminal-green text-xs text-right">
          <div>CMMC 2.0</div>
          <div>▶ CERTIFIED</div>
        </div>
      </div>

      {/* BRRRT Button */}
      <button
        className={`w-full mb-2 py-2 font-bold border-2 transition-all ${
          showBrrrt
            ? 'bg-terminal-yellow text-black border-terminal-yellow animate-pulse'
            : 'border-terminal-yellow text-terminal-yellow hover:bg-terminal-yellow hover:text-black'
        }`}
        onClick={handleBrrrt}
        disabled={showBrrrt}
      >
        {showBrrrt ? '🔥 BRRRRRRRRRT!!! 🔥' : '💥 FIRE GAU-8 (BRRRT!) 💥'}
      </button>

      {/* Status Panel */}
      <div className="border-2 border-terminal-green p-3 mb-2 text-base sm:text-lg">
        <div className="flex justify-between mb-2">
          <span>Miles: {state.milesTraveled} / {state.totalMiles}</span>
          <span>Remaining: {milesRemaining}</span>
        </div>
        <div className="mb-3">
          Progress: [{progressBar}] {Math.floor(progressPct)}%
        </div>
        <div className="flex justify-between">
          <span>Morale: {state.morale}%</span>
          <span>SPRS Score: {state.sprsScore}</span>
        </div>
      </div>

      {/* Party Status */}
      <div className="border-2 border-terminal-green p-3 mb-2 text-base sm:text-lg">
        <div className="font-bold mb-2">COMPLIANCE TEAM:</div>
        <div className="grid grid-cols-2 gap-1">
          {state.party.map((member, i) => (
            <div key={i} className="flex justify-between">
              <span className="truncate mr-2">{member.name}</span>
              <span className={member.alive ? 'text-terminal-green' : 'text-terminal-red'}>
                {member.alive ? '♥' : '✗'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hunting Result */}
      {state.huntingResult && (
        <div className={`border-2 p-2 mb-2 text-center ${
          state.huntingResult.severity === 'critical' ? 'border-terminal-red text-terminal-red' :
          state.huntingResult.severity === 'moderate' ? 'border-terminal-yellow text-terminal-yellow' :
          'border-terminal-green text-terminal-green'
        }`}>
          {state.huntingResult.severity === 'critical' && `CRITICAL: ${state.huntingResult.findings} vulnerabilities found!`}
          {state.huntingResult.severity === 'moderate' && `Found ${state.huntingResult.findings} vulnerabilities. Manageable.`}
          {state.huntingResult.severity === 'low' && `Only ${state.huntingResult.findings} findings! Great patching!`}
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <button className="terminal-btn text-sm sm:text-base py-2" onClick={onContinue}>Continue Trail</button>
        <button className="terminal-btn text-sm sm:text-base py-2" onClick={onRest}>Rest</button>
        <button className="terminal-btn text-sm sm:text-base py-2" onClick={onHunt}>Hunt Vulns</button>
        <button className="terminal-btn text-sm sm:text-base py-2" onClick={onSupplies}>Supplies</button>
        <button className="terminal-btn text-sm sm:text-base py-2 col-span-2 sm:col-span-1 text-terminal-red border-terminal-red hover:bg-terminal-red" onClick={onGiveUp}>Give Up</button>
      </div>
    </div>
  );
}
