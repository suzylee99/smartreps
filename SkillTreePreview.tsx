import React from 'react';
import { Lock } from 'lucide-react';

export default function SkillTreePreview() {
  const skills = [
    { name: 'Communication', locked: false, completed: false },
    { name: 'Leadership', locked: true, completed: false },
    { name: 'Technical', locked: true, completed: false }
  ];

  return (
    <div className="flex justify-center items-center space-x-8 py-8">
      {skills.map((skill, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${
              skill.locked
                ? 'border-gray-600 bg-gray-800'
                : skill.completed
                ? 'border-emerald-400 bg-emerald-500/20'
                : 'border-emerald-500/50 bg-emerald-500/10'
            }`}
          >
            {skill.locked ? (
              <Lock className="w-6 h-6 text-gray-500" />
            ) : (
              <span className="text-emerald-400 font-bold">{index + 1}</span>
            )}
          </div>
          <p className={`mt-2 text-sm ${skill.locked ? 'text-gray-500' : 'text-emerald-300'}`}>
            {skill.name}
          </p>
          {index < skills.length - 1 && (
            <div className="absolute ml-20 w-8 h-0.5 bg-gray-600" />
          )}
        </div>
      ))}
    </div>
  );
}