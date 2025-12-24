import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { User, Building, GraduationCap, Briefcase } from 'lucide-react';
import { setUser } from '../utils/auth';

interface RoleSelectionProps {
  onRoleSelected: (userData: any) => void;
}

export default function RoleSelection({ onRoleSelected }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    status: '',
    companyCode: '',
    companyName: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState<string[]>([]);

  const roles = [
    {
      id: 'employee',
      title: 'Employee',
      description: 'Grow your skills and advance your career',
      icon: User,
      available: true
    },
    {
      id: 'company',
      title: 'Company',
      description: 'Find and develop top talent',
      icon: Building,
      available: true
    },
    {
      id: 'mentor',
      title: 'Mentor',
      description: 'Guide the next generation',
      icon: GraduationCap,
      available: true
    },
    {
      id: 'consultant',
      title: 'Consultant',
      description: 'Share your expertise globally',
      icon: Briefcase,
      available: true
    }
  ];

  const handleRoleClick = (roleId: string) => {
    setSelectedRole(roleId);
    setShowForm(true);
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (!formData.name.trim()) newErrors.push('Name is required');
    if (!formData.email.trim()) newErrors.push('Email is required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push('Invalid email format');
    }
    
    if (selectedRole === 'employee') {
      if (!formData.age || parseInt(formData.age) < 18 || parseInt(formData.age) > 100) {
        newErrors.push('Valid age (18-100) is required');
      }
      if (!formData.status) newErrors.push('Current status is required');
    }
    
    if (selectedRole === 'company') {
      if (!formData.companyName.trim()) newErrors.push('Company name is required');
    }
    
    if (!formData.agreeTerms) newErrors.push('You must agree to the terms');

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = {
        ...formData,
        role: selectedRole,
        level: selectedRole === 'mentor' ? 10 : selectedRole === 'company' ? 1 : 1,
        points: selectedRole === 'mentor' ? 1000 : 0,
        umrEligible: selectedRole === 'company' || selectedRole === 'mentor'
      };
      setUser(userData);
      onRoleSelected(userData);
    }
  };

  if (showForm) {
    return (
      <div className="w-full max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-400 mb-6">Join as {roles.find(r => r.id === selectedRole)?.title}</h2>
        
        {errors.length > 0 && (
          <Alert className="mb-4 bg-red-900/20 border-red-500">
            <AlertDescription className="text-red-400">
              {errors.map((error, i) => (
                <div key={i}>• {error}</div>
              ))}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-emerald-400">
              {selectedRole === 'company' ? 'Company Name' : 'Full Name'}
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-black/50 border-emerald-500/30 text-white"
              placeholder={selectedRole === 'company' ? 'Tech Corp' : 'John Doe'}
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-emerald-400">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-black/50 border-emerald-500/30 text-white"
              placeholder="john@example.com"
            />
          </div>

          {selectedRole === 'employee' && (
            <>
              <div>
                <Label htmlFor="age" className="text-emerald-400">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="bg-black/50 border-emerald-500/30 text-white"
                  placeholder="25"
                />
              </div>

              <div>
                <Label htmlFor="status" className="text-emerald-400">Current Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger className="bg-black/50 border-emerald-500/30 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-emerald-500/30">
                    <SelectItem value="employed" className="text-white">Employed</SelectItem>
                    <SelectItem value="unemployed" className="text-white">Unemployed</SelectItem>
                    <SelectItem value="student" className="text-white">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {selectedRole === 'company' && (
            <div>
              <Label htmlFor="companyCode" className="text-emerald-400">Company Code (Optional)</Label>
              <Input
                id="companyCode"
                value={formData.companyCode}
                onChange={(e) => setFormData({...formData, companyCode: e.target.value})}
                className="bg-black/50 border-emerald-500/30 text-white"
                placeholder="COMP123"
              />
            </div>
          )}

          {selectedRole === 'mentor' && (
            <div>
              <Label htmlFor="companyCode" className="text-emerald-400">Expertise Area</Label>
              <Input
                id="companyCode"
                value={formData.companyCode}
                onChange={(e) => setFormData({...formData, companyCode: e.target.value})}
                className="bg-black/50 border-emerald-500/30 text-white"
                placeholder="Software Development"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => setFormData({...formData, agreeTerms: !!checked})}
            />
            <Label htmlFor="terms" className="text-emerald-300 text-sm">
              I agree to the Terms of Service and Privacy Policy
            </Label>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowForm(false);
                setSelectedRole(null);
                setErrors([]);
              }}
              className="flex-1 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-emerald-400">Choose Your Path</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <div
              key={role.id}
              onClick={() => handleRoleClick(role.id)}
              className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                role.available
                  ? 'border-emerald-500/50 bg-black/30 hover:border-emerald-400 hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20'
                  : 'border-gray-700 bg-gray-900/20 opacity-50 cursor-not-allowed'
              }`}
            >
              {!role.available && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl">
                  <span className="text-gray-400 font-semibold">Coming Soon</span>
                </div>
              )}
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${role.available ? 'bg-emerald-500/20' : 'bg-gray-700/20'}`}>
                  <Icon className={`w-6 h-6 ${role.available ? 'text-emerald-400' : 'text-gray-500'}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 ${role.available ? 'text-emerald-400' : 'text-gray-500'}`}>
                    {role.title}
                  </h3>
                  <p className={`text-sm ${role.available ? 'text-emerald-300' : 'text-gray-600'}`}>
                    {role.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}