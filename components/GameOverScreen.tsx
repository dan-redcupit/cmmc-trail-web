'use client';

import { GameState } from '@/lib/gameState';

interface GameOverScreenProps {
  state: GameState;
  onRestart: () => void;
}

export default function GameOverScreen({ state, onRestart }: GameOverScreenProps) {
  return (
    <div className="text-center">
      <pre className="text-terminal-red glow-red text-xs sm:text-sm leading-tight">
{`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                                                                              ║
║                                                                              ║
║             ██████╗  █████╗ ███╗   ███╗███████╗                               ║
║            ██╔════╝ ██╔══██╗████╗ ████║██╔════╝                               ║
║            ██║  ███╗███████║██╔████╔██║█████╗                                 ║
║            ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝                                 ║
║            ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗                               ║
║             ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝                               ║
║                                                                              ║
║              ██████╗ ██╗   ██╗███████╗██████╗                                 ║
║             ██╔═══██╗██║   ██║██╔════╝██╔══██╗                                ║
║             ██║   ██║██║   ██║█████╗  ██████╔╝                                ║
║             ██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗                                ║
║             ╚██████╔╝ ╚████╔╝ ███████╗██║  ██║                                ║
║              ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝                                ║
║                                                                              ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`}
      </pre>

      <p className="mt-4 text-terminal-yellow max-w-xl mx-auto">{state.gameOverReason}</p>

      <div className="mt-6 text-terminal-cyan">
        <p className="font-bold">Final Statistics:</p>
        <p>Miles Traveled: {state.milesTraveled}</p>
        <p>Questions Answered: {state.questionsAnswered}</p>
        <p>Correct Answers: {state.correctAnswers}</p>
      </div>

      <button className="terminal-btn mt-6" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
}
