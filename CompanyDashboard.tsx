import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Modal } from './Modal';
import { Users, TrendingUp, Calendar, Search, Award, Building } from 'lucide-react';

interface CompanyDashboardProps {
  user: any;
}

export default function CompanyDashboard({ user }: CompanyDashboardProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const stats = [
    { label: 'Total Employees', value: '24', icon: Users, color: 'emerald' },
    { label: 'Active Programs', value: '8', icon: TrendingUp, color: 'teal' },
    { label: 'Completion Rate', value: '87%', icon: Award, color: 'green' },
    { label: 'Skill Growth', value: '+42%', icon: TrendingUp, color: 'emerald' }
  ];

  const actionCards = [
    {
      id: 'recruit',
      title: 'Recruit Talent',
      description: 'Find and hire skilled professionals',
      icon: Search,
      color: 'emerald',
      action: () => setActiveModal('recruit')
    },
    {
      id: 'programs',
      title: 'Training Programs',
      description: 'Create and manage employee training',
      icon: Users,
      color: 'teal',
      action: () => setActiveModal('programs')
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Track team performance and growth',
      icon: TrendingUp,
      color: 'green',
      action: () => setActiveModal('analytics')
    },
    {
      id: 'schedule',
      title: 'Schedule Sessions',
      description: 'Book mentorship and training sessions',
      icon: Calendar,
      color: 'emerald',
      action: () => setActiveModal('schedule')
    }
  ];

  const closeModal = () => setActiveModal(null);

  const renderModalContent = () => {
    switch (activeModal) {
      case 'recruit':
        return (
          <div className="text-center">
            <Search className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">Find Top Talent</h3>
            <p className="text-emerald-300 mb-6">Browse our pool of skilled professionals</p>
            <div className="space-y-3">
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold">
                Browse Candidates
              </Button>
              <Button variant="outline" className="w-full border-emerald-500 text-emerald-400">
                Post Job Opening
              </Button>
            </div>
          </div>
        );

      case 'programs':
        return (
          <div className="text-center">
            <Users className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">Training Programs</h3>
            <p className="text-emerald-300 mb-6">Manage your employee development initiatives</p>
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold">
                Create Program
              </Button>
              <Button variant="outline" className="border-emerald-500 text-emerald-400">
                View Active
              </Button>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="text-center">
            <TrendingUp className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">Performance Analytics</h3>
            <div className="space-y-4">
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-emerald-300">Team Skill Score</p>
                <p className="text-3xl font-bold text-emerald-400">847</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-emerald-300">Monthly Growth</p>
                <p className="text-3xl font-bold text-emerald-400">+12%</p>
              </div>
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="text-center">
            <Calendar className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">Schedule Sessions</h3>
            <p className="text-emerald-300 mb-6">Book training and mentorship sessions</p>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold">
              Open Calendar
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
        <p className="text-xl text-emerald-300">Manage Your Team's Growth</p>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-black/30 border-emerald-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-300 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-emerald-400">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 text-${stat.color}-400`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
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

      {/* Company Profile */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-black/30 border-emerald-500/30">
          <CardHeader>
            <CardTitle className="text-emerald-400">Company Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Building className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-emerald-400">{user.name}</p>
                  <p className="text-emerald-300">{user.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
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