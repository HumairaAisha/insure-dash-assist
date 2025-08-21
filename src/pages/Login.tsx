import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/insurance-hero.jpg';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Welcome back!",
      description: "Successfully logged into Smart Claim Assistant.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Hero Image Section */}
      <div 
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-trust-blue-900/80 to-trust-blue-700/60" />
        <div className="relative z-10 flex flex-col justify-center px-12">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">
              Fast, Fair, and Trusted Insurance
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Streamline your claims processing with our intelligent dashboard. 
              Review, approve, and manage claims with confidence.
            </p>
            <div className="flex items-center space-x-4 text-blue-200">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>Secure & Compliant</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>Real-time Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-trust-blue-600 to-trust-blue-800 rounded-2xl flex items-center justify-center shadow-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome to Smart Claim Assistant
            </h2>
            <p className="text-muted-foreground">
              Sign in to your professional dashboard
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email or Phone Number
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1"
                  placeholder="admin@insurance.com"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember-me" className="ml-2 text-sm text-muted-foreground">
                  Remember me
                </Label>
              </div>

              <div className="text-sm">
                <a href="#" className="text-trust-blue-600 hover:text-trust-blue-500 font-medium">
                  Forgot your password?
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full button-primary text-lg py-3">
              Sign in to Dashboard
            </Button>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Need access? Contact your system administrator
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}