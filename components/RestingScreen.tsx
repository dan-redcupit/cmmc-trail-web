'use client';

import { useEffect } from 'react';

interface RestingScreenProps {
  onFinish: () => void;
}

export default function RestingScreen({ onFinish }: RestingScreenProps) {
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
║                              RESTING...                                      ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║                                                                              ║
║                    Your team reviews the System Security Plan                ║
║                    and updates POA&M spreadsheets by firelight.              ║
║                                                                              ║
║                              ___________                                     ║
║                             /           \\                                    ║
║                            /   📋 SSP    \\                                   ║
║                           /               \\                                  ║
║                          /   ☕  💻  📊    \\                                 ║
║                          \\               /                                   ║
║                           \\  🔥🔥🔥🔥🔥 /                                    ║
║                            \\_____________/                                   ║
║                                                                              ║
║                                                                              ║
║                      Team morale has been restored.                          ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`}
      </pre>
      <p className="mt-4 text-terminal-green blink">[ RESTING... ]</p>
    </div>
  );
}
