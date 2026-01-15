'use client';

import { Question } from '@/lib/gameData';

interface QuestionScreenProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

export default function QuestionScreen({ question, onAnswer }: QuestionScreenProps) {
  return (
    <div className="text-center">
      <pre className="text-terminal-green glow text-sm sm:text-base leading-tight">
{`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    ║
║    ░░                                                                  ░░    ║
║    ░░                   COMPLIANCE CHECKPOINT                          ░░    ║
║    ░░                                                                  ░░    ║
║    ░░                         ╔═══════╗                                ░░    ║
║    ░░                         ║ STOP  ║                                ░░    ║
║    ░░                         ║ C3PAO ║                                ░░    ║
║    ░░                         ╚═══════╝                                ░░    ║
║    ░░                            ║║                                    ░░    ║
║    ░░                            ║║                                    ░░    ║
║    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`}
      </pre>

      <pre className="text-terminal-green text-sm sm:text-base leading-tight mt-4">
{`╔══════════════════════════════════════════════════════════════════════════════╗
║                          AUDITOR'S QUESTION                                  ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║`}
      </pre>

      <div className="text-terminal-green text-sm sm:text-base font-mono text-left px-4">
        <div className="flex">
          <span>║  </span>
          <span className="text-white flex-1 pr-4">{question.question}</span>
          <span>║</span>
        </div>
      </div>

      <pre className="text-terminal-green text-sm sm:text-base leading-tight">
{`║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║`}
      </pre>

      <div className="text-terminal-green text-sm sm:text-base font-mono text-left px-4 space-y-1">
        {question.options.map((option, i) => (
          <div key={i} className="flex">
            <span>║    </span>
            <span className="text-terminal-cyan flex-1">{option}</span>
            <span>║</span>
          </div>
        ))}
      </div>

      <pre className="text-terminal-green text-sm sm:text-base leading-tight">
{`║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝`}
      </pre>

      <div className="mt-6 flex justify-center gap-4">
        <button className="terminal-btn" onClick={() => onAnswer('A')}>A</button>
        <button className="terminal-btn" onClick={() => onAnswer('B')}>B</button>
        <button className="terminal-btn" onClick={() => onAnswer('C')}>C</button>
        <button className="terminal-btn" onClick={() => onAnswer('D')}>D</button>
      </div>
    </div>
  );
}
