import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { EyeIcon, EyeOffIcon, MailIcon } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulating login - replace with actual API call
      const userData = {
        email: formData.email,
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890'
      };
      await setUser(userData);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side - Illustration */}
        <div className="hidden md:block">
          <img
            src="/illustration.png"
            alt="Login illustration"
            className="w-full max-w-[500px]"
          />
          <div className="mt-4">
            <img src="/logos.png" alt="Logos" className="h-8" />
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-[400px] mx-auto">
          <h1 className="text-2xl font-bold text-white mb-8">WAOW Log In</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 bg-transparent border-gray-600 text-white"
                />
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 bg-transparent border-gray-600 text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  className="border-gray-600"
                />
                <Label htmlFor="remember" className="text-sm text-gray-300">
                  Remember Me
                </Label>
              </div>
              <Link to="/forgot-password" className="text-sm text-gray-300 hover:text-white">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-white text-[#1e1b4b] hover:bg-gray-100">
              Login →
            </Button>

            <p className="text-center text-sm text-gray-300">
              Don't have account?{' '}
              <Link to="/register" className="text-white hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;