import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import Register from './Register';

function Login() {
    const {axios, setToken, setUser} = useAppContext();
    const [isLogin, setIsLogin] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    
    // User login state
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');

    async function handleUserLogin(event) {
      event.preventDefault();
      setIsLoading(true);
      
      try {
        const { data } = await axios.post('/api/user/login', { 
          email: userEmail, 
          password: userPassword 
        });
        if(data.success){
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
          toast.success('Login successful!');
          navigate('/user');
        }
        else{
           toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || 'Login failed');
      } finally {
        setIsLoading(false);
      }
    }

  // If not in login mode, show registration form
  if (!isLogin) {
    return <Register onSwitchToLogin={() => setIsLogin(true)} />;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>
            Welcome to <span className='text-primary'>BlogGen</span>
          </h1>
          <p className='text-gray-600 text-lg'>Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300'>
          {/* User Icon and Title */}
          <div className='text-center mb-6'>
            <div className='w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'
                 style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
              <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
            </div>
            
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>
              User Access
            </h2>
            <p className='text-gray-600'>
              Create and manage your personal blogs
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleUserLogin} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Email
              </label>
              <input 
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)} 
                type="email" 
                placeholder='Enter your email' 
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
              <input 
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)} 
                type="password" 
                placeholder='Enter your password' 
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
                  Signing in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>

        {/* Registration Link */}
        <div className='text-center mt-8'>
          <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>New to BlogGen?</h3>
            <p className='text-gray-600 mb-4'>Create your account to start writing amazing blogs</p>
            <button
              type='button'
              onClick={() => setIsLogin(false)}
              className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl'
            >
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
              </svg>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
