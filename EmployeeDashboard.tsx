import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import ProgressCircle from './ProgressCircle';
import SkillTreePreview from './SkillTreePreview';
import Modal from './Modal';
import { Camera, TreePine, MessageSquare, Calendar, FileText, Trophy, Users } from 'lucide-react';

interface EmployeeDashboardProps {
  user: any;
}

export default function EmployeeDashboard({ user }: EmployeeDashboardProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const actionCards = [
    {
      id: 'liveClasses',
      title: 'Live Classes',
      description: 'Join interactive sessions with expert mentors',
      icon: Camera,
      color: 'emerald',
      action: () => setActiveModal('liveClasses')
    },
    {
      id: 'skillTree',
      title: 'Skill Tree',
      description: 'Track your learning journey and unlock new abilities',
      icon: TreePine,
      color: 'teal',
      action: () => setActiveModal('skillTree')
    },
    {
      id: 'verbalTests',
      title: 'Verbal Tests',
      description: 'Test your knowledge with AI-powered assessments',
      icon: MessageSquare,
      color: 'green',
      action: () => setActiveModal('verbalTests')
    },
    {
      id: 'consultations',
      title: 'Consultations',
      description: 'Book 1-on-1 sessions with industry experts',
      icon: Calendar,
      color: 'emerald',
      action: () => setActiveModal('consultations')
    }
  ];

  const closeModal = () => setActiveModal(null);

  const renderModalContent = () => {
    switch (activeModal) {
      case 'liveClasses':
        return (
          <div className="text-center">
            <Camera className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">Camera Required</h3>
            <p className="text-emerald-300 mb-6">Please turn on your camera to join the live class</p>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold">
              Start Session
            </Button>
          </div>
        );

      case 'skillTree':
        return (
          <div className="w-full">
            <h3 className="text-2xl font-bold text-emerald-400 mb-6">Your Skill Tree</h3>
            <SkillTreePreview />
            <p className="text-emerald-300 text-center mt-6">Complete 3 classes to unlock Leadership</p>
          </div>
        );

      case 'verbalTests':
        return (
          <div className="text-center">
            <MessageSquare className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">Next Test Available</h3>
            <div className="text-4xl font-bold text-emerald-300 mb-6">24:00:00</div>
            <p className="text-emerald-300">Practice your skills while you wait</p>
          </div>
        );

      case 'consultations':
        return (
          <div className="text-center">
            <Calendar className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">Book Your Free Session</h3>
            <div className="grid grid-cols-7 gap-2 mb-6">
              {Array.from({ length: 28 }, (_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 border border-emerald-500/30 rounded flex items-center justify-center text-emerald-300 hover:bg-emerald-500/20 cursor-pointer"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold">
              Select Time Slot
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] p-6">
      {/* Welcome Banner */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-emerald-400 mb-2">
          Welcome, {user.name}!
        </h1>
        <p className="text-xl text-emerald-300">Your Skill Journey Begins</p>
      </div>

      {/* Progress Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <Card className="bg-black/30 border-emerald-500/30">
          <CardHeader>
            <CardTitle className="text-emerald-400">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <ProgressCircle progress={0} size={80} />
                <p className="text-emerald-300 mt-2">Level {user.level}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">{user.points}</div>
                <p className="text-emerald-300">Points</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">❌</div>
                <p className="text-emerald-300">UMR Eligible</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">0</div>
                <p className="text-emerald-300">Skills Mastered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {actionCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.id}
              className="bg-black/30 border-emerald-500/30 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer"
              onClick={card.action}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-${card.color}-500/20`}>
                    <Icon className={`w-6 h-6 text-${card.color}-400`} />
                  </div>
                  <CardTitle className="text-emerald-400">{card.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-emerald-300">
                  {card.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-black/30 border-emerald-500/30">
          <CardHeader>
            <CardTitle className="text-emerald-400">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-emerald-400">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-xl font-semibold text-emerald-400">{user.name}</p>
                  <p className="text-emerald-300">{user.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
                onClick={() => alert('CV export feature coming soon!')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Export CV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Links */}
      <div className="max-w-4xl mx-auto mt-8 flex justify-center space-x-8">
        <Button
          variant="ghost"
          className="text-emerald-400 hover:text-emerald-300"
          onClick={() => setActiveModal('forum')}
        >
          <Users className="w-4 h-4 mr-2" />
          Forum
        </Button>
        <Button
          variant="ghost"
          className="text-emerald-400 hover:text-emerald-300"
          onClick={() => setActiveModal('achievements')}
        >
          <Trophy className="w-4 h-4 mr-2" />
          Achievements
        </Button>
      </div>

      {/* Modal */}
      <Modal isOpen={!!activeModal} onClose={closeModal}>
        <div className="p-6">
          {renderModalContent()}
        </div>
      </Modal>
    </div>
  );
}