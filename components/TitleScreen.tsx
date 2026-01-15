'use client';

interface TitleScreenProps {
  onContinue: () => void;
}

export default function TitleScreen({ onContinue }: TitleScreenProps) {
  return (
    <div className="text-center cursor-pointer" onClick={onContinue}>
      <pre className="text-terminal-green glow text-sm sm:text-base leading-tight">
{`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                                                                              ║
║        ████████╗██╗  ██╗███████╗     ██████╗███╗   ███╗███╗   ███╗ ██████╗   ║
║        ╚══██╔══╝██║  ██║██╔════╝    ██╔════╝████╗ ████║████╗ ████║██╔════╝   ║
║           ██║   ███████║█████╗      ██║     ██╔████╔██║██╔████╔██║██║        ║
║           ██║   ██╔══██║██╔══╝      ██║     ██║╚██╔╝██║██║╚██╔╝██║██║        ║
║           ██║   ██║  ██║███████╗    ╚██████╗██║ ╚═╝ ██║██║ ╚═╝ ██║╚██████╗   ║
║           ╚═╝   ╚═╝  ╚═╝╚══════╝     ╚═════╝╚═╝     ╚═╝╚═╝     ╚═╝ ╚═════╝   ║
║                                                                              ║
║                  ████████╗██████╗  █████╗ ██╗██╗                             ║
║                  ╚══██╔══╝██╔══██╗██╔══██╗██║██║                             ║
║                     ██║   ██████╔╝███████║██║██║                             ║
║                     ██║   ██╔══██╗██╔══██║██║██║                             ║
║                     ██║   ██║  ██║██║  ██║██║███████╗                        ║
║                     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝                        ║
║                                                                              ║
║                                                                              ║
║                    The Journey to CMMC 2.0 Certification                     ║
║                                                                              ║
║                                  ~ 2024 ~                                    ║
║                                                                              ║
║                                                                              ║
║                       Click anywhere to continue...                          ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`}
      </pre>
      <p className="mt-4 text-terminal-green blink">[ CLICK TO START ]</p>
    </div>
  );
}
