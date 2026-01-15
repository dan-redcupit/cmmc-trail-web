'use client';

interface DeathScreenProps {
  name: string;
  message: string;
  onContinue: () => void;
}

export default function DeathScreen({ name, message, onContinue }: DeathScreenProps) {
  return (
    <div className="text-center cursor-pointer" onClick={onContinue}>
      <pre className="text-terminal-red glow-red text-sm sm:text-base leading-tight">
{`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                                                                              ║
║                                  ▄████▄                                      ║
║                                 ████████                                     ║
║                                 ██ R.I.P                                     ║
║                                 ██    ██                                     ║
║                                 ██    ██                                     ║
║                                 ██████████                                   ║
║                              ▄▄▄██████████▄▄▄                                ║
║                                                                              ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`}
      </pre>

      <p className="mt-4 text-terminal-red text-xl font-bold">{name}</p>
      <p className="mt-2 text-terminal-yellow">{message}</p>

      <p className="mt-6 text-terminal-red blink">[ CLICK TO CONTINUE ]</p>
    </div>
  );
}
