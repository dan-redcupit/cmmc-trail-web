'use client';

import { useState, useEffect, useCallback } from 'react';
import * as sounds from '@/lib/sounds';

interface HuntingScreenProps {
  onFinish: () => void;
}

// Evidence types that might be requested during an assessment
const EVIDENCE_REQUESTS = [
  { id: 'logs', name: 'Audit Logs', control: '3.3.1', description: 'Show me your audit logs for the past 90 days' },
  { id: 'mfa', name: 'MFA Configuration', control: '3.5.3', description: 'Demonstrate that MFA is enabled for all users' },
  { id: 'backup', name: 'Backup Records', control: '3.8.9', description: 'Show evidence of backup testing procedures' },
  { id: 'training', name: 'Training Records', control: '3.2.1', description: 'Provide security awareness training completion records' },
  { id: 'vuln', name: 'Vulnerability Scans', control: '3.11.2', description: 'Show me your most recent vulnerability scan results' },
  { id: 'access', name: 'Access Control List', control: '3.1.1', description: 'Demonstrate how you limit system access' },
  { id: 'incident', name: 'Incident Reports', control: '3.6.1', description: 'Show your incident response documentation' },
  { id: 'ssp', name: 'System Security Plan', control: '3.12.4', description: 'Pull up your SSP for this boundary' },
];

// Dashboard items (some are evidence, some are distractors)
const DASHBOARD_ITEMS = [
  { id: 'logs', label: 'Audit Logs', icon: '📋', isEvidence: true },
  { id: 'mfa', label: 'MFA Settings', icon: '🔐', isEvidence: true },
  { id: 'backup', label: 'Backup Status', icon: '💾', isEvidence: true },
  { id: 'training', label: 'Training Portal', icon: '📚', isEvidence: true },
  { id: 'vuln', label: 'Vuln Scanner', icon: '🔍', isEvidence: true },
  { id: 'access', label: 'Access Control', icon: '👤', isEvidence: true },
  { id: 'incident', label: 'Incident Logs', icon: '🚨', isEvidence: true },
  { id: 'ssp', label: 'SSP Document', icon: '📄', isEvidence: true },
  // Distractors
  { id: 'email', label: 'Email Client', icon: '📧', isEvidence: false },
  { id: 'calendar', label: 'Calendar', icon: '📅', isEvidence: false },
  { id: 'chat', label: 'Team Chat', icon: '💬', isEvidence: false },
  { id: 'browser', label: 'Web Browser', icon: '🌐', isEvidence: false },
  { id: 'settings', label: 'System Settings', icon: '⚙️', isEvidence: false },
  { id: 'games', label: 'Solitaire', icon: '🃏', isEvidence: false },
];

export default function HuntingScreen({ onFinish }: HuntingScreenProps) {
  const [currentRequest, setCurrentRequest] = useState<typeof EVIDENCE_REQUESTS[0] | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(3);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [shuffledItems, setShuffledItems] = useState<typeof DASHBOARD_ITEMS>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Shuffle dashboard items
  const shuffleItems = useCallback(() => {
    const shuffled = [...DASHBOARD_ITEMS].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
  }, []);

  // Pick a random evidence request
  const pickNewRequest = useCallback(() => {
    const request = EVIDENCE_REQUESTS[Math.floor(Math.random() * EVIDENCE_REQUESTS.length)];
    setCurrentRequest(request);
    setTimeLeft(15);
    shuffleItems();
    sounds.playKeyboardClack();
  }, [shuffleItems]);

  // Initialize first round
  useEffect(() => {
    pickNewRequest();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isFinished || !currentRequest) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up for this round
          setFeedback("Time's up! The assessor is not impressed...");
          sounds.playWrong();
          setTimeout(() => {
            if (round >= totalRounds) {
              setIsFinished(true);
            } else {
              setRound(r => r + 1);
              setFeedback(null);
              pickNewRequest();
            }
          }, 1500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentRequest, round, totalRounds, isFinished, pickNewRequest]);

  // Handle clicking on a dashboard item
  const handleItemClick = (item: typeof DASHBOARD_ITEMS[0]) => {
    if (isFinished || !currentRequest || timeLeft === 0) return;

    if (item.id === currentRequest.id) {
      // Correct evidence found!
      sounds.playCorrect();
      setScore(s => s + timeLeft * 10); // Bonus for speed
      setFeedback("Excellent! Evidence presented successfully!");

      setTimeout(() => {
        if (round >= totalRounds) {
          setIsFinished(true);
        } else {
          setRound(r => r + 1);
          setFeedback(null);
          pickNewRequest();
        }
      }, 1500);
    } else if (!item.isEvidence) {
      // Clicked a distractor
      sounds.playFart();
      setFeedback(`"${item.label}"? That's not what I asked for...`);
      setTimeLeft(t => Math.max(0, t - 3)); // Penalty
      setTimeout(() => setFeedback(null), 1000);
    } else {
      // Clicked wrong evidence
      sounds.playWrong();
      setFeedback("Close, but that's not what I'm looking for.");
      setTimeLeft(t => Math.max(0, t - 2)); // Small penalty
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  // Finish screen
  useEffect(() => {
    if (isFinished) {
      setTimeout(onFinish, 2000);
    }
  }, [isFinished, onFinish]);

  if (isFinished) {
    const rating = score >= 300 ? 'EXCELLENT' : score >= 150 ? 'SATISFACTORY' : 'NEEDS IMPROVEMENT';
    const ratingColor = score >= 300 ? 'text-green-400' : score >= 150 ? 'text-terminal-yellow' : 'text-terminal-red';

    return (
      <div className="text-center max-w-2xl mx-auto">
        <div className="border-2 border-terminal-green p-6">
          <div className="text-terminal-green text-2xl font-bold mb-4">
            ASSESSMENT SCREEN SHARE COMPLETE
          </div>
          <div className={`text-3xl font-bold mb-4 ${ratingColor}`}>
            {rating}
          </div>
          <div className="text-terminal-cyan text-xl">
            Evidence Score: {score} points
          </div>
          <div className="mt-4 text-terminal-green/70 text-sm">
            The assessor is making notes...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="border-2 border-terminal-cyan p-4">
        {/* Header - Simulated video call */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-terminal-green/30">
          <div className="text-terminal-red text-xs flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            LIVE SCREEN SHARE
          </div>
          <div className="text-terminal-green text-sm">
            Round {round}/{totalRounds}
          </div>
          <div className={`text-lg font-bold ${timeLeft <= 5 ? 'text-terminal-red animate-pulse' : 'text-terminal-yellow'}`}>
            {timeLeft}s
          </div>
        </div>

        {/* Assessor Request */}
        {currentRequest && (
          <div className="bg-terminal-bg border border-terminal-green p-3 mb-4 text-left">
            <div className="text-terminal-cyan text-xs mb-1">ASSESSOR REQUEST ({currentRequest.control}):</div>
            <div className="text-terminal-green text-sm">
              "{currentRequest.description}"
            </div>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="mb-4 text-terminal-yellow animate-pulse text-sm">
            {feedback}
          </div>
        )}

        {/* Simulated Dashboard */}
        <div className="border border-terminal-green/50 p-2 bg-black/30">
          <div className="text-terminal-green/50 text-xs mb-2 text-left">
            COMPLIANCE DASHBOARD - Click to present evidence
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {shuffledItems.map((item) => (
              <button
                key={item.id}
                className="p-2 border border-terminal-green/30 hover:border-terminal-cyan hover:bg-terminal-cyan/10 transition-colors flex flex-col items-center"
                onClick={() => handleItemClick(item)}
              >
                <span className="text-2xl mb-1">{item.icon}</span>
                <span className="text-terminal-green text-xs truncate w-full">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Score */}
        <div className="mt-4 text-terminal-cyan text-sm">
          Evidence Score: {score}
        </div>
      </div>

      <div className="mt-4 text-terminal-green/50 text-xs">
        Find and click the correct evidence before time runs out!
      </div>
    </div>
  );
}
