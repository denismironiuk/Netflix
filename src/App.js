

import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import { AuthContextProvider } from './context/AuhtContext';
import Account from './pages/auth/Account';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

import Home from './pages/Home';


function App() {
  
  return (
    <>
    <AuthContextProvider>
    <div className='app'>
  
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<SignUp/>} />
    
    <Route path='/account' element={<ProtectedRoute><Account/></ProtectedRoute>} />

   </Routes>
    </div>
    </AuthContextProvider>
    </>
  );
}

export default App;
