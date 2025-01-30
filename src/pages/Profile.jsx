import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "@/hooks/useAuth";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CameraIcon } from 'lucide-react';

const Profile = () => {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    location: '',
  });
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    // Initialize form data with user data
    setFormData({
      username: user.username || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        ...user,
        ...formData,
        profileImage,
      };
      await setUser(updatedUser);
      // You might want to show a success message here
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#1e1b4b]">
      <header className="bg-[#1e1b4b]/50 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold text-white">WAOW</h1>
          <nav className="space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            <Link to="/profile" className="text-white hover:text-gray-300 font-bold">Profile</Link>
            <Link to="/category" className="text-white hover:text-gray-300">Category</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <img
            src={profileImage || "/default-avatar.jpeg"}
            alt="Profile"
            className="w-12 h-12 rounded-full object-fill"
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-[#2e2a5e] rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-transparent border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-transparent border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-transparent border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <img
                  src={profileImage || "/default-avatar.jpeg"}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover"
                />
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-full cursor-pointer shadow-lg"
                >
                  <CameraIcon className="h-5 w-5 text-[#1e1b4b]" />
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <Button
                onClick={handleSave}
                className="w-full bg-white text-[#1e1b4b] hover:bg-gray-100"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;