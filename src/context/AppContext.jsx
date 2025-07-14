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
    const [blog , setBlogs] = useState(null)
    const [input ,setInput] = useState("")


    
    const fetchBlogs = async ()=>{
        try {
            const {data} = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs): toast.error(data.message)
        }catch(error){
            toast.error(error.message)
        }
    }
   useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        setToken(storedToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    fetchBlogs();
}, []);

const logout = async () => {
  try {
    await axios.post('/api/admin/logout');
  } catch (e) {}
  localStorage.removeItem('token');
  setToken(null);
  delete axios.defaults.headers.common['Authorization'];
  navigate('/admin/login');
};


    const value = {
        axios,navigate,token,blog,input ,setToken,setBlogs,setInput,logout
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