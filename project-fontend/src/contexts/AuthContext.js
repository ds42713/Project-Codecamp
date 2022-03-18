import { createContext, useEffect, useState } from 'react';
import axios from '../config/axios';
import { setToken, clearToken, getToken } from '../services/localStorage';
const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    if (getToken()) {
        axios
          .get('/users/me')
          .then(res => setUser(res.data.user))
          .catch(err => console.log(err));
      }
  },[])

  const login = async (username, password) => {
    try {
      const res = await axios.post('/users/login', {
        username,
        password
      });
      setToken(res.data.token);
      setUser(res.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout  }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

export { AuthContext };