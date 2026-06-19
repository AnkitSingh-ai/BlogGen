import React from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

function Register({ onSwitchToLogin }) {
  const { axios, setToken, setUser, navigate } = useAppContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post('/api/user/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        toast.success('Registration successful! Welcome to BlogGen!');
        navigate('/user');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>
            Join <span className='text-primary'>BlogGen</span>
          </h1>
          <p className='text-gray-600 text-lg'>Create your account to start blogging</p>
        </div>

        {/* Registration Card */}
        <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300'>
          {/* User Icon and Title */}
          <div className='text-center mb-6'>
            <div className='w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'
                 style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
              <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
              </svg>
            </div>
            
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>
              Create Account
            </h2>
            <p className='text-gray-600'>
              Start your blogging journey today
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Full Name
              </label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                type="text" 
                placeholder='Enter your full name' 
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Email
              </label>
              <input 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email" 
                placeholder='Enter your email' 
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
              <input 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                type="password" 
                placeholder='Enter your password' 
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Confirm Password</label>
              <input 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                type="password" 
                placeholder='Confirm your password' 
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                required
              />
            </div>

            <button 
              type='submit' 
              disabled={isLoading}
              className='w-full py-3 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center bg-green-600 hover:bg-green-700'
            >
              {isLoading ? (
                <>
                  <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <div className='text-center mt-8'>
          <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>Already have an account?</h3>
            <p className='text-gray-600 mb-4'>Sign in to your existing account</p>
            <button
              type='button'
              onClick={onSwitchToLogin}
              className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl'
            >
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
              </svg>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
