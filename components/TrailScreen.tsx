'use client';

import { GameState } from '@/lib/gameState';

interface TrailScreenProps {
  state: GameState;
  onContinue: () => void;
  onRest: () => void;
  onHunt: () => void;
  onSupplies: () => void;
  onGiveUp: () => void;
}

export default function TrailScreen({ state, onContinue, onRest, onHunt, onSupplies, onGiveUp }: TrailScreenProps) {
  const progressPct = (state.milesTraveled / state.totalMiles) * 100;
  const milesRemaining = state.totalMiles - state.milesTraveled;
  const progressBarLen = 50;
  const filled = Math.floor((state.milesTraveled / state.totalMiles) * progressBarLen);
  const progressBar = '█'.repeat(filled) + '░'.repeat(progressBarLen - filled);

  const landscape = state.animationFrame % 2 === 0 ? `
      ~         .    *        .        *    .    ~        .
   .        *        .    SERVER      .        ~     .        *
        .       ~        MOUNTAIN    *     .        .    ~
    *      .        .    /\\    /\\        *    .        ~      .
       ~        *      /    \\/    \\    .        ~        .
  .        .        __/      DATA     \\__     .        *    .
     *        .    /     CENTER PASS     \\        .        ~
        ~        _/                        \\_    *        .
   .        .   /    ~~~~~~RIVER OF~~~~~~~   \\        .    *
        *      /    ~~~LEGACY SYSTEMS~~~      \\   ~        .
` : `
   ~         .    *        .        *    .    ~        .
        *        .    SERVER      .        ~     .        *
   .       ~        MOUNTAIN    *     .        .    ~
     *      .        .    /\\    /\\        *    .        ~      .
        ~        *      /    \\/    \\    .        ~        .
   .        .        __/      DATA     \\__     .        *    .
      *        .    /     CENTER PASS     \\        .        ~
  .      ~        _/                        \\_    *        .
    .        .   /    ~~~~~~RIVER OF~~~~~~~   \\        .    *
         *      /    ~~~LEGACY SYSTEMS~~~      \\   ~        .
`;

  const wagon = state.animationFrame % 2 === 0 ? `
                        _.---.._
                      .'        '.               __________________
                     /   CMMC    \\              |                  |
                    |   OR DIE   |==============| COMPLIANCE WAGON |
                    |  TRYIN'    |              |__________________|
                     \\          /
                      '._    _.'       o    O    o    O
` : `
                        _.---.._
                      .'        '.               __________________
                     /   CMMC    \\              |                  |
                    |   OR DIE   |==============| COMPLIANCE WAGON |
                    |  TRYIN'    |              |__________________|
                     \\          /
                      '._    _.'      O    o    O    o
`;

  return (
    <div>
      <pre className="text-terminal-green text-xs sm:text-sm leading-tight">
{`╔══════════════════════════════════════════════════════════════════════════════╗
║                              THE CMMC TRAIL                                  ║
╠══════════════════════════════════════════════════════════════════════════════╣`}
      </pre>
      <pre className="text-terminal-cyan text-xs sm:text-sm leading-tight">{landscape}</pre>
      <pre className="text-terminal-yellow text-xs sm:text-sm leading-tight">{wagon}</pre>
      <pre className="text-terminal-green text-xs sm:text-sm leading-tight">
{`╠══════════════════════════════════════════════════════════════════════════════╣
║  Date: October 2024              Weather: Cloudy with a chance of audits    ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  Miles traveled: ${String(state.milesTraveled).padEnd(6)}                Miles to certification: ${String(milesRemaining).padEnd(6)}   ║
║                                                                              ║
║  Progress: [${progressBar}] ${String(Math.floor(progressPct)).padStart(3)}%  ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  PARTY STATUS:                                                               ║
║  ───────────────────────────────────────────────────────────────────────     ║`}
      </pre>

      <div className="text-terminal-green text-xs sm:text-sm font-mono">
        {state.party.map((member, i) => (
          <div key={i} className="flex">
            <span>║    </span>
            <span className="w-48">{member.name}</span>
            <span className={member.alive ? 'text-terminal-green' : 'text-terminal-red'}>
              {member.alive ? 'healthy' : 'deceased'}
            </span>
            <span className="flex-1"></span>
            <span>║</span>
          </div>
        ))}
      </div>

      <pre className="text-terminal-green text-xs sm:text-sm leading-tight">
{`║                                                                              ║
║  Team Morale: ${String(state.morale).padEnd(3)}%      SPRS Score: ${String(state.sprsScore).padEnd(4)}                                  ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝`}
      </pre>

      {state.huntingResult && (
        <div className={`mt-2 p-2 border ${
          state.huntingResult.severity === 'critical' ? 'border-terminal-red text-terminal-red' :
          state.huntingResult.severity === 'moderate' ? 'border-terminal-yellow text-terminal-yellow' :
          'border-terminal-green text-terminal-green'
        }`}>
          {state.huntingResult.severity === 'critical' && `CRITICAL: Found ${state.huntingResult.findings} vulnerabilities! This is bad.`}
          {state.huntingResult.severity === 'moderate' && `Found ${state.huntingResult.findings} vulnerabilities. Manageable.`}
          {state.huntingResult.severity === 'low' && `Only ${state.huntingResult.findings} findings! Your patching is working!`}
        </div>
      )}

      <pre className="text-terminal-green text-xs sm:text-sm leading-tight mt-4">
{`╔══════════════════════════════════════════════════════════════════════════════╗
║  What would you like to do?                                                  ║
╠══════════════════════════════════════════════════════════════════════════════╣
║    1. Continue on the trail (face a compliance checkpoint)                   ║
║    2. Rest and review documentation                                          ║
║    3. Hunt for vulnerabilities                                               ║
║    4. Check supplies                                                         ║
║    5. Give up and become an organic farmer                                   ║
╚══════════════════════════════════════════════════════════════════════════════╝`}
      </pre>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button className="terminal-btn" onClick={onContinue}>1. Continue</button>
        <button className="terminal-btn" onClick={onRest}>2. Rest</button>
        <button className="terminal-btn" onClick={onHunt}>3. Hunt Vulns</button>
        <button className="terminal-btn" onClick={onSupplies}>4. Supplies</button>
        <button className="terminal-btn text-terminal-red border-terminal-red hover:bg-terminal-red" onClick={onGiveUp}>5. Give Up</button>
      </div>
    </div>
  );
}
