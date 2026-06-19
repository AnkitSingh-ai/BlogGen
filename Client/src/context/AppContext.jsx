import { createContext, useEffect, useState ,useContext} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

// For Vite, use import.meta.env.VITE_BASE_URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const AppContext = createContext();


export const AppProvider = ({children})=>{

    const navigate = useNavigate();
    const [token ,setToken]  = useState(null)
    const [user, setUser] = useState(null)
    const [blog , setBlogs] = useState(null)
    const [input ,setInput] = useState("")


    
    const fetchBlogs = async ()=>{
        try {
            const {data} = await axios.get('/api/user-blog/published');
            data.success ? setBlogs(data.blogs): toast.error(data.message)
        }catch(error){
            toast.error(error.message)
        }
    }
   useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken) {
        setToken(storedToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
    
    fetchBlogs();
}, []);

const logout = async () => {
  try {
    // No need to call logout endpoint since we're removing admin functionality
  } catch (e) {}
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setToken(null);
  setUser(null);
  delete axios.defaults.headers.common['Authorization'];
  navigate('/user');
};


    const value = {
        axios,navigate,token,user,blog,input ,setToken,setUser,setBlogs,setInput,logout,fetchBlogs
    }


    return (
        <AppContext.Provider value = {value}>
            {children}
            </AppContext.Provider>
    )
}




export const useAppContext = () => {
    return useContext(AppContext);
};