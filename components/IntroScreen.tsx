'use client';

interface IntroScreenProps {
  onContinue: () => void;
}

export default function IntroScreen({ onContinue }: IntroScreenProps) {
  return (
    <div className="text-center cursor-pointer" onClick={onContinue}>
      <pre className="text-terminal-green glow text-sm sm:text-base leading-tight">
{`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                              THE YEAR IS 2024                                ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   The Department of Defense has mandated CMMC 2.0 for all contractors.      ║
║                                                                              ║
║   Your mission: Lead your compliance team on a treacherous 2000-mile        ║
║   journey through the wilderness of federal cybersecurity requirements.     ║
║                                                                              ║
║   You will face:                                                            ║
║     • Compliance checkpoints with difficult questions                       ║
║     • Random auditor encounters                                             ║
║     • The ever-present threat of data breaches                              ║
║     • Legacy systems that refuse to die                                     ║
║     • Shadow IT lurking in every department                                 ║
║                                                                              ║
║   Many compliance teams have tried this journey before.                     ║
║   Most have perished from unpatched vulnerabilities.                        ║
║                                                                              ║
║                                                                              ║
║                       Click anywhere to continue...                          ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`}
      </pre>
      <p className="mt-4 text-terminal-green blink">[ CLICK TO CONTINUE ]</p>
    </div>
  );
}
