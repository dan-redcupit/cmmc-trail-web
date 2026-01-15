'use client';

interface ResultScreenProps {
  correct: boolean;
  explanation: string;
  correctAnswer: string;
  onContinue: () => void;
}

export default function ResultScreen({ correct, explanation, correctAnswer, onContinue }: ResultScreenProps) {
  if (correct) {
    return (
      <div className="text-center cursor-pointer" onClick={onContinue}>
        <pre className="text-terminal-green glow text-sm sm:text-base leading-tight">
{`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                           ╔═══════════════════╗                              ║
║                           ║                   ║                              ║
║                           ║   ✓  CORRECT!  ✓  ║                              ║
║                           ║                   ║                              ║
║                           ╚═══════════════════╝                              ║
║                                                                              ║
║               The auditor nods approvingly at your response.                 ║
║                    Your team may continue on the trail.                      ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`}
        </pre>
        <p className="mt-4 text-terminal-cyan max-w-2xl mx-auto">
          Explanation: {explanation}
        </p>
        <p className="mt-4 text-terminal-green blink">[ CLICK TO CONTINUE ]</p>
      </div>
    );
  }

  return (
    <div className="text-center cursor-pointer" onClick={onContinue}>
      <pre className="text-terminal-red glow-red text-sm sm:text-base leading-tight">
{`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                           ╔═══════════════════╗                              ║
║                           ║                   ║                              ║
║                           ║   ✗  INCORRECT ✗  ║                              ║
║                           ║                   ║                              ║
║                           ╚═══════════════════╝                              ║
║                                                                              ║
║              The auditor frowns and makes a note in their tablet.            ║
║                      The correct answer was: ${correctAnswer}                            ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`}
      </pre>
      <p className="mt-4 text-terminal-cyan max-w-2xl mx-auto">
        Explanation: {explanation}
      </p>
      <p className="mt-4 text-terminal-red blink">[ CLICK TO CONTINUE ]</p>
    </div>
  );
}
