'use client';

import { GameEvent } from '@/lib/gameData';

interface EventScreenProps {
  event: GameEvent;
  onContinue: () => void;
}

export default function EventScreen({ event, onContinue }: EventScreenProps) {
  const borderColor = event.type === 'death' ? 'text-terminal-red' :
                      event.type === 'good' ? 'text-terminal-green' :
                      event.type === 'bad' ? 'text-terminal-yellow' :
                      'text-terminal-cyan';

  const glowClass = event.type === 'death' ? 'glow-red' :
                    event.type === 'good' ? 'glow' :
                    'glow-yellow';

  return (
    <div className="text-center cursor-pointer" onClick={onContinue}>
      <pre className={`${borderColor} ${glowClass} text-sm sm:text-base leading-tight`}>
{`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                            TRAIL EVENT                                       ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║`}
      </pre>

      <div className={`${borderColor} text-sm sm:text-base font-mono px-4`}>
        <div className="flex justify-center">
          <span>║</span>
          <span className="text-white flex-1 text-center px-4 py-2">{event.text}</span>
          <span>║</span>
        </div>
      </div>

      <pre className={`${borderColor} ${glowClass} text-sm sm:text-base leading-tight`}>
{`║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`}
      </pre>

      <p className={`mt-4 ${borderColor} blink`}>[ CLICK TO CONTINUE ]</p>
    </div>
  );
}
