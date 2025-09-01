import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authUser } from './lib/api';


function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const publicRoutes = ['/login', '/signup'];
  const location = useLocation();
 
    useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authUser();
        console.log("re running",res?.data)
        if(res){
          setAuthenticated(true)
        }else{
          setAuthenticated(false)
        }
      } catch (error) {
        console.log("Error authenticating user:", error);
        setAuthenticated(false)

      } finally {
        setLoading(false);
      }
    };

checkAuth();
  }, []);

  
  
  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-pink-300 via-yellow-200 to-cyan-300">
        <div className="bg-white text-black border-[5px] border-black rounded-2xl px-8 py-6 shadow-[6px_6px_0px_black] text-3xl font-comic animate-bounce">
          Loading... Let’s get this party started! 🎉
        </div>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Comic+Neue:wght@700&display=swap');
            .font-comic { font-family: 'Fredoka One', 'Comic Neue', cursive; }
          `}
        </style>
      </div>
    );
  }

  
  if (!authenticated && !publicRoutes.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  
  if (authenticated && publicRoutes.includes(location.pathname)) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-sky-100 font-[Quicksand] text-black min-h-screen font-comic">
      <style>
        {`
           @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap');

    .font-heading { font-family: 'Fredoka One', cursive; }
    .font-body { font-family: 'Quicksand', sans-serif; }
        `}
      </style>
      <Outlet />
    </div>
  );
}

export default App;
