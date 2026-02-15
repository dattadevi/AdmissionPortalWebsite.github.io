import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import instituteLogo from 'figma:asset/1f57e15346f74a19d63050e6a1cef9565c21df02.png';

type SignInProps = {
  onSignIn: () => void;
};

export function SignIn({ onSignIn }: SignInProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        toast.success('Sign in successful!');
        onSignIn();
        navigate('/admission');
      } else {
        toast.error('Please fill in all fields');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <Card className="shadow-xl border-2">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img src={instituteLogo} alt="Institute Logo" className="h-20 w-20" />
            </div>
            <CardTitle className="text-2xl text-purple-900">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue with admission
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-600">Remember me</span>
                </label>
                <a href="#" className="text-purple-700 hover:text-purple-900">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-800"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-700 hover:text-purple-900">
                Register here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
