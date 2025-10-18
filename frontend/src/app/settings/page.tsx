"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    currency: 'USD',
    language: 'en',
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isLoaded, setIsLoaded] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'ja', label: 'Japanese' }
  ];

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('finny-profile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
      } catch (error) {
        console.error('Error loading saved profile:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  const handleSave = async () => {
    setSaveStatus('saving');
    
    try {
      // Save to localStorage
      localStorage.setItem('finny-profile', JSON.stringify(profile));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSaveStatus('saved');
      
      // Reset status after 2 seconds
      setTimeout(() => setSaveStatus('idle'), 2000);
      
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handlePasswordChange = async () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (passwords.newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return;
    }

    // In a real app, this would validate current password and update on backend
    alert('Password change functionality would be implemented with proper authentication');
    
    // Clear password fields
    setPasswords({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleBankConnection = (bankName: string, action: 'connect' | 'disconnect') => {
    // In a real app, this would handle OAuth flow for bank connections
    alert(`${action === 'connect' ? 'Connecting to' : 'Disconnecting from'} ${bankName}...`);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your Finny account settings and preferences</p>
      </div>

      {saveStatus === 'saved' && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          Settings saved successfully!
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error saving settings. Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                placeholder="Enter your email"
              />
            </div>
            <Button 
              onClick={handleSave} 
              disabled={saveStatus === 'saving'}
              className="w-full md:w-auto"
            >
              {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select 
                value={profile.currency} 
                onValueChange={(value) => setProfile({...profile, currency: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select 
                value={profile.language} 
                onValueChange={(value) => setProfile({...profile, language: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleSave} 
              disabled={saveStatus === 'saving'}
              className="w-full md:w-auto"
            >
              {saveStatus === 'saving' ? 'Saving...' : 'Save Preferences'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                placeholder="Enter current password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                placeholder="Enter new password (min 6 characters)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                placeholder="Confirm new password"
              />
            </div>
            <Button onClick={handlePasswordChange} className="w-full md:w-auto">
              Change Password
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Bank of America</p>
                <p className="text-sm text-muted-foreground">Connected • Last sync: 2 hours ago</p>
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleBankConnection('Bank of America', 'disconnect')}
              >
                Disconnect
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Chase Bank</p>
                <p className="text-sm text-muted-foreground">Not connected</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBankConnection('Chase Bank', 'connect')}
              >
                Connect
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">PayPal</p>
                <p className="text-sm text-muted-foreground">Not connected</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBankConnection('PayPal', 'connect')}
              >
                Connect
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Connecting accounts allows Finny to provide better financial insights and tracking.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}