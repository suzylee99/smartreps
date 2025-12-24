import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';
import { setUser } from '../utils/auth';

interface LoginModalProps {
  onLoginSuccess: (userData: any) => void;
}

export default function LoginModal({ onLoginSuccess }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (!formData.email.trim()) newErrors.push('Email is required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push('Invalid email format');
    }
    if (!formData.password) newErrors.push('Password is required');

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock successful login with demo data
      const userData = {
        name: formData.email.split('@')[0].charAt(0).toUpperCase() + formData.email.split('@')[0].slice(1),
        email: formData.email,
        role: 'employee',
        level: 5,
        points: 250,
        umrEligible: false
      };
      
      setUser(userData);
      onLoginSuccess(userData);
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (role: string) => {
    const demoUsers = {
      employee: {
        name: 'John Employee',
        email: 'john@company.com',
        role: 'employee',
        level: 3,
        points: 150,
        umrEligible: false
      },
      company: {
        name: 'Tech Corp',
        email: 'hr@techcorp.com',
        role: 'company',
        level: 1,
        points: 0,
        umrEligible: true
      },
      mentor: {
        name: 'Sarah Mentor',
        email: 'sarah@expert.com',
        role: 'mentor',
        level: 10,
        points: 1000,
        umrEligible: true
      }
    };

    const userData = demoUsers[role as keyof typeof demoUsers];
    setUser(userData);
    onLoginSuccess(userData);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-emerald-400 mb-6">Login to Smartreps</h2>
      
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

        <div>
          <Label htmlFor="password" className="text-emerald-400">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="bg-black/50 border-emerald-500/30 text-white"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={formData.rememberMe}
              onCheckedChange={(checked) => setFormData({...formData, rememberMe: !!checked})}
            />
            <Label htmlFor="remember" className="text-emerald-300 text-sm">
              Remember me
            </Label>
          </div>
          <Button variant="link" className="text-emerald-400 text-sm p-0 h-auto">
            Forgot password?
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-emerald-500/30">
        <p className="text-emerald-300 text-sm mb-4 text-center">Quick Demo Access:</p>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin('employee')}
            className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 text-xs"
          >
            Employee
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin('company')}
            className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 text-xs"
          >
            Company
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin('mentor')}
            className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 text-xs"
          >
            Mentor
          </Button>
        </div>
      </div>
    </div>
  );
}