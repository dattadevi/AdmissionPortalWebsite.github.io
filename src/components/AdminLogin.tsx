import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Shield, Lock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import instituteLogo from 'figma:asset/1f57e15346f74a19d63050e6a1cef9565c21df02.png';

type AdminLoginProps = {
  onAdminSignIn: () => void;
};

export function AdminLogin({ onAdminSignIn }: AdminLoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call with admin credentials validation
    setTimeout(() => {
      // Demo credentials: admin@mgr.edu / admin123
      if (email === 'admin@mgr.edu' && password === 'admin123') {
        toast.success('Admin login successful!');
        onAdminSignIn();
        navigate('/admin/dashboard');
      } else if (email && password) {
        toast.error('Invalid admin credentials');
      } else {
        toast.error('Please fill in all fields');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-purple-200 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <Card className="shadow-2xl border-purple-600 border-2 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img src={instituteLogo} alt="Institute Logo" className="h-20 w-20" />
                <div className="absolute -bottom-2 -right-2 bg-purple-700 rounded-full p-2">
                  <Shield className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-2xl text-purple-900 flex items-center justify-center gap-2">
              <Lock className="h-6 w-6" />
              Admin Portal
            </CardTitle>
            <CardDescription className="text-slate-700">
              Secure access for authorized administrators only
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="text-slate-800">Admin Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@mgr.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-purple-300 focus:border-purple-600"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-slate-800">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-purple-300 focus:border-purple-600"
                />
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-xs text-slate-700">
                <p className="font-semibold mb-1">Demo Credentials:</p>
                <p>Email: admin@mgr.edu</p>
                <p>Password: admin123</p>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-800"
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Sign In as Admin'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <div className="text-xs text-slate-500 flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" />
                <span>Secured with enterprise-grade encryption</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
