import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon, MailIcon, PhoneIcon, UserIcon } from 'lucide-react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulating registration - replace with actual API call
      const userData = {
        email: formData.email,
        username: formData.firstName.toLowerCase(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phoneNumber
      };
      await setUser(userData);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
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
            alt="Register illustration"
            className="w-full max-w-[500px]"
          />
          <div className="mt-4">
            <img src="/logos.png" alt="Logos" className="h-8" />
          </div>
        </div>

        {/* Right side - Register Form */}
        <div className="w-full max-w-[400px] mx-auto">
          <h1 className="text-2xl font-bold text-white mb-8">WAOW Register</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="pl-10 bg-transparent border-gray-600 text-white"
                />
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <div className="relative">
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="pl-10 bg-transparent border-gray-600 text-white"
                />
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

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

            <div className="relative">
              <Input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="pl-10 bg-transparent border-gray-600 text-white"
              />
              <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

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

            <Button type="submit" className="w-full bg-white text-[#1e1b4b] hover:bg-gray-100">
              Register →
            </Button>

            <p className="text-center text-sm text-gray-300">
              Have an Account?{' '}
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;