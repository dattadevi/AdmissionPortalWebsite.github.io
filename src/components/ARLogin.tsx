import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Glasses, Scan } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import instituteLogo from 'figma:asset/1f57e15346f74a19d63050e6a1cef9565c21df02.png';

type ARLoginProps = {
  onARSignIn: () => void;
};

export function ARLogin({ onARSignIn }: ARLoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call with AR access validation
    setTimeout(() => {
      // Demo credentials: any email + access code "AR2024"
      if (email && accessCode === 'AR2024') {
        toast.success('AR access granted! Loading AR experience...');
        onARSignIn();
        navigate('/ar-tour');
      } else if (email && accessCode) {
        toast.error('Invalid access code');
      } else {
        toast.error('Please fill in all fields');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-purple-200 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <Card className="shadow-2xl border-purple-500 border-2 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img src={instituteLogo} alt="Institute Logo" className="h-20 w-20" />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-2">
                  <Glasses className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-700 flex items-center justify-center gap-2">
              <Scan className="h-6 w-6 text-purple-700" />
              AR Experience Access
            </CardTitle>
            <CardDescription className="text-slate-700">
              Enter your credentials to access the Augmented Reality tour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ar-email" className="text-slate-800">Email Address</Label>
                <Input
                  id="ar-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-purple-300 focus:border-purple-600"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ar-code" className="text-slate-800">AR Access Code</Label>
                <Input
                  id="ar-code"
                  type="text"
                  placeholder="Enter AR access code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  required
                  className="border-purple-300 focus:border-purple-600 font-mono tracking-wider"
                  maxLength={10}
                />
                <p className="text-xs text-slate-500">
                  Access code provided during registration or campus visit
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3 text-xs text-slate-700">
                <p className="font-semibold mb-1">Demo Access Code:</p>
                <p className="font-mono text-purple-700">AR2024</p>
                <p className="mt-1 text-slate-600">Enter any email with this code</p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-800 hover:to-pink-800"
                disabled={loading}
              >
                {loading ? 'Verifying Access...' : 'Enter AR Experience'}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="text-xs text-slate-500 text-center">
                <Glasses className="h-4 w-4 inline mr-1" />
                Experience our campus in immersive 3D & AR
              </div>
              
              <div className="text-center text-sm">
                <p className="text-slate-600">
                  Need an access code?{' '}
                  <Link to="/register" className="text-purple-700 hover:text-purple-900 font-medium">
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
