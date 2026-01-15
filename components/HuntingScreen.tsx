'use client';

import { useEffect } from 'react';

interface HuntingScreenProps {
  onFinish: () => void;
}

export default function HuntingScreen({ onFinish }: HuntingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="text-center">
      <pre className="text-terminal-green glow text-xs sm:text-sm leading-tight">
{`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                        VULNERABILITY HUNTING                                 ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   You deploy your vulnerability scanner across the network...                ║
║                                                                              ║
║                                                                              ║
║          [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░] 75%             ║
║                                                                              ║
║                          Scanning port 443...                                ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`}
      </pre>
      <p className="mt-4 text-terminal-green blink">[ SCANNING... ]</p>
    </div>
  );
}
