'use client';

import { useState } from 'react';
import { DEFAULT_PARTY } from '@/lib/gameData';

interface PartySelectProps {
  onSubmit: (party: string[]) => void;
}

export default function PartySelect({ onSubmit }: PartySelectProps) {
  const [useDefault, setUseDefault] = useState<boolean | null>(null);
  const [customNames, setCustomNames] = useState<string[]>(['', '', '', '', '']);

  const handleCustomNameChange = (index: number, value: string) => {
    const newNames = [...customNames];
    newNames[index] = value;
    setCustomNames(newNames);
  };

  const handleSubmit = () => {
    if (useDefault) {
      onSubmit(DEFAULT_PARTY);
    } else {
      const party = customNames.map((name, i) => name.trim() || DEFAULT_PARTY[i]);
      onSubmit(party);
    }
  };

  if (useDefault === null) {
    return (
      <div className="text-center">
        <pre className="text-terminal-green glow text-sm sm:text-base leading-tight">
{`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                    ASSEMBLE YOUR COMPLIANCE TEAM                             ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  Your compliance wagon can hold 5 team members.                              ║
║                                                                              ║
║  Recommended team composition:                                               ║
║                                                                              ║
║    • CISO or Security Lead                                                   ║
║    • Compliance Officer                                                      ║
║    • IT Administrator                                                        ║
║    • Policy Writer                                                           ║
║    • The Intern (expendable)                                                 ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  Default team:                                                               ║
║    1. CISO McSecurityface                                                    ║
║    2. Compliance Carl                                                        ║
║    3. Policy Patricia                                                        ║
║    4. Audit Andy                                                             ║
║    5. The Intern (unnamed)                                                   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`}
        </pre>
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="terminal-btn"
            onClick={() => setUseDefault(true)}
          >
            Use Default Team
          </button>
          <button
            className="terminal-btn"
            onClick={() => setUseDefault(false)}
          >
            Custom Names
          </button>
        </div>
      </div>
    );
  }

  if (!useDefault) {
    return (
      <div className="text-center">
        <pre className="text-terminal-green glow text-sm sm:text-base leading-tight mb-4">
{`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                    ENTER YOUR TEAM MEMBER NAMES                              ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`}
        </pre>
        <div className="space-y-3 max-w-md mx-auto text-left">
          {customNames.map((name, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-terminal-green w-8">{index + 1}.</span>
              <input
                type="text"
                className="terminal-input flex-1"
                placeholder={DEFAULT_PARTY[index]}
                value={name}
                onChange={(e) => handleCustomNameChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="terminal-btn"
            onClick={() => setUseDefault(null)}
          >
            Back
          </button>
          <button
            className="terminal-btn"
            onClick={handleSubmit}
          >
            Start Journey
          </button>
        </div>
      </div>
    );
  }

  // Auto-submit with default party
  handleSubmit();
  return null;
}
