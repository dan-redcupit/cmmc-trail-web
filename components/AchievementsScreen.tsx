'use client';

import { useState, useEffect } from 'react';
import { getAchievements, getUnlockedCount, Achievement } from '@/lib/achievements';
import * as sounds from '@/lib/sounds';

interface AchievementsScreenProps {
  onClose: () => void;
}

export default function AchievementsScreen({ onClose }: AchievementsScreenProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState({ unlocked: 0, total: 0 });

  useEffect(() => {
    setAchievements(getAchievements());
    setStats(getUnlockedCount());
  }, []);

  const handleClose = () => {
    sounds.playClick();
    onClose();
  };

  const progressPct = stats.total > 0 ? Math.round((stats.unlocked / stats.total) * 100) : 0;

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="border-2 border-terminal-cyan p-4 sm:p-6">
        <div className="text-terminal-cyan text-xl sm:text-2xl font-bold mb-2">
          ACHIEVEMENTS
        </div>
        <div className="text-terminal-green text-sm mb-4">
          {stats.unlocked} / {stats.total} Unlocked ({progressPct}%)
        </div>

        {/* Progress bar */}
        <div className="mb-4 text-xs">
          <div className="flex justify-between mb-1">
            <span className="text-terminal-green">Progress</span>
            <span className="text-terminal-cyan">{progressPct}%</span>
          </div>
          <div className="w-full bg-terminal-green/20 h-2 rounded">
            <div
              className="bg-terminal-cyan h-2 rounded transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Achievements grid */}
        <div className="max-h-[50vh] overflow-y-auto space-y-2 text-left">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`border p-2 ${
                achievement.unlocked
                  ? 'border-terminal-cyan bg-terminal-cyan/10'
                  : 'border-terminal-green/30 opacity-50'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-2xl">{achievement.unlocked ? achievement.icon : '🔒'}</span>
                <div className="flex-1">
                  <div className={`font-bold text-sm ${achievement.unlocked ? 'text-terminal-cyan' : 'text-terminal-green/50'}`}>
                    {achievement.name}
                  </div>
                  <div className={`text-xs ${achievement.unlocked ? 'text-terminal-green' : 'text-terminal-green/40'}`}>
                    {achievement.description}
                  </div>
                  {achievement.unlocked && achievement.unlockedAt && (
                    <div className="text-xs text-terminal-green/50 mt-1">
                      Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <button className="terminal-btn" onClick={handleClose}>
          Back
        </button>
      </div>
    </div>
  );
}
