import {createRoutesFromElements, RouterProvider, createBrowserRouter, Route, Outlet, Navigate} from 'react-router-dom'
import { Home } from './pages/homepage/Home';
import { Main } from './admin/Main';
import { Dashboard } from './admin/pages/Dashboard';
import { DashboardProduct } from './admin/pages/DashboardProduct';
import { AddProduct } from './admin/pages/AddProduct';
import { ManageOrders } from './admin/pages/ManageOrders';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { UseDataContext } from './context/UseDataContext';
import Session from './admin/pages/Session';
import { UseAuthContext } from './context/UseAuthContext';
import { ProtectedRoutes } from './shared/ProtectedRoutes';
import { GuestRoutes } from './shared/GuestRoutes';
import { AdminRequest } from './admin/pages/AdminRequest';
import { Loading } from './shared/Loading';
import { ResetPassword } from './admin/pages/ResetPassword';
import { MeterReading } from './admin/pages/MeterReading';

function App() {
  const {dispatch, loading} = UseDataContext();
  const {dispatch:handle, loading:authLoading, user} = UseAuthContext();

//useEffect to fetch product
useEffect(()=>{
  dispatch({type:"loading", payload:true})
  const fetchData = async ()=>{
    try{
      const response = await fetch('https://arkcityserver.vercel.app/product');
      if(!response.ok){
        throw Error('error fetching data')
      }
      const json = await response.json();
      console.log('product',json)
      dispatch({type:'getProduct', payload:json})

    }catch(error){
      console.error(error)
      dispatch({type:'loading', payload:false})
    }


  }
  fetchData();
},[]);

//useffect for authentication
useEffect(() => {
  handle({ type: 'loading', payload: true });

  const data = localStorage.getItem('user');
  if (data) {
    try {
      const parsed = JSON.parse(data);
      const now = new Date().getTime();
      const expiryDays = 3;
      const expiryTime = expiryDays * 24 * 60 * 60 * 1000; // days to ms

      if (now - parsed.savedAt < expiryTime) {
        // Not expired
        handle({ type: 'getUser', payload: parsed.user });
      } else {
        // Expired
        localStorage.removeItem('user');
      }
    } catch (e) {
      console.error('Failed to parse user data:', e);
      localStorage.removeItem('user');
    }
  }

  handle({ type: 'loading', payload: false });
}, []);


//useeffect to fetch readings
useEffect(()=>{
  dispatch({type:"loading", payload:true});
  const fetchReadings = async()=>{
    try{
      const data = await fetch('https://arkcityserver.vercel.app/reading',
        {
          headers:{
          'Authorization': `Bearer ${user?.token}`,
        }
        }
      );
      if(!data.ok){
        throw Error('error getting readings')
      }
      const json = await data.json();
      dispatch({type:'getReadings', payload:json});
      dispatch({type:'loading', payload:false});
      console.log('readings', json);
    }catch(error){
      console.error(error);
      dispatch({type:'loading', payload:false})
    }
  }
  fetchReadings();
},[])

//useEffect to fetch combined readings 
useEffect(()=>{
  const fetchCombined = async ()=>{
    try{
      const data = await fetch('https://arkcityserver.vercel.app/reading_combined',
        {
          headers:{
            'Authorization': `Bearer ${user?.token}`,
          }
        }
      );
      if(!data.ok){
        throw Error('error fetching data');
      }
      const json = await data.json();
      dispatch({type:'getCombined', payload:json});
      dispatch({type:'loading', payload:false});
      console.log('combined_readings', json);
    }catch(error){
      console.error(error)
    }
  };

  fetchCombined()
}, []);

//useEffect to fetchTotal
useEffect(()=>{
  const fetchTotal = async ()=>{
    try{
      const data = await fetch('https://arkcityserver.vercel.app/reading_total',
        {
          headers:{
            'Authorization': `Bearer ${user?.token}`,
          }
        }
      );
      if(!data.ok){
        throw Error('error fetching total readings');
      }
      const json = await data.json();
      dispatch({type:'getTotal', payload:json});
      dispatch({type:'loading', payload:false});
      console.log('total', json);
    }catch(error){
      console.error(error)
    }
  }
  fetchTotal();
},[])

//useeffect to fetch orders

useEffect(()=>{
  dispatch({type:'loading', payload:true});
  const fetchData = async ()=>{
    if(!user){
      return dispatch({ type: 'loading', payload: false }); 
    }
    try{
      const response = await fetch('https://arkcityserver.vercel.app/order',{
        headers:{
          'Authorization': `Bearer ${user?.token}`,
        }
      });
      if(!response.ok){
        throw Error('error getting orders')
      }
      const json = await response.json();
      console.log('order',json)
      dispatch({type:'getOrders', payload:json})

    }catch(error){
      console.error(error);
      dispatch({type:'loading', payload:false})
    }


  }
  fetchData();
},[user]);

//use effect to fetch authorities
useEffect(()=>{
  const fetchAuthorities = async()=>{
    if(!user){
      return handle({type:"loading", payload:false})
    }
    try{
      const response = await fetch('https://arkcityserver.vercel.app/user/getusers',{
      headers:{
        'Authorization': `Bearer ${user?.token}`
      }
    })
    if(!response.ok){
      throw Error('an error occured')
    }
    const json = await response.json();
    dispatch({type:'getadmin', payload:json})
    }catch(error){
      console.error(error)
    }
  }
  fetchAuthorities();
},[user])



//useEffect to fetch subscribers
useEffect(()=>{
  const fetchSubscribers = async()=>{
    if(!user){
      return handle({type:"loading", payload:false})
    }
    try{
      const response = await fetch('https://arkcityserver.vercel.app/subscribe',{
      headers:{
        'Authorization': `Bearer ${user?.token}`
      }
    })
    if(!response.ok){
      throw Error('an error occured')
    }
    const json = await response.json();
    dispatch({type:'getSubscribers', payload:json})
    }catch(error){
      console.error(error)
    }
  }
  fetchSubscribers();
},[user]);

  //useEffect for animation
   useEffect(()=>{
    const animation = ()=>{
      var leftAnimate = document.querySelectorAll('.animate-left');
      var rightAnimate = document.querySelectorAll('.animate-right');
      var downAnimate = document.querySelectorAll('.animate-down');
      var upAnimate = document.querySelectorAll('.animate-up');

      var windowHeight = window.innerHeight;
      rightAnimate.forEach(container=>{
        var containerPosition = container.getBoundingClientRect().top;

        if(containerPosition < windowHeight){
          container.classList.add('sectionAnimationRight')
        }

      })
      leftAnimate.forEach(container=>{
        var containerPosition = container.getBoundingClientRect().top;

        if(containerPosition < windowHeight){
          container.classList.add('sectionAnimationLeft')
        }

      })
      upAnimate.forEach(container=>{
        var containerPosition = container.getBoundingClientRect().top;

        if(containerPosition < windowHeight){
          container.classList.add('sectionAnimationUp')
        }

      })
      downAnimate.forEach(container=>{
        var containerPosition = container.getBoundingClientRect().top;

        if(containerPosition < windowHeight){
          container.classList.add('sectionAnimationDown')
        }

      })
    }
    window.addEventListener('scroll', animation);
  },[])



if(loading || authLoading){
  return <Loading/>
}



  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Outlet/>}>
      <Route index element={<Home/>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>

    <Route path='/admin_jctbdil1$'element={<Main/>}>
      <Route index element={<ProtectedRoutes user={user}><Dashboard/></ProtectedRoutes>}/>
      <Route path='manageorders' element={<ProtectedRoutes user={user}><ManageOrders/></ProtectedRoutes>}/>
      <Route path='product' element={<ProtectedRoutes user={user}><Outlet/></ProtectedRoutes>}>
        <Route path='addproduct' element={<AddProduct/>}/>
        <Route path=':id' element={<DashboardProduct/>}/>
      </Route>
      <Route path='meterreading' element={<ProtectedRoutes user={user}><MeterReading/></ProtectedRoutes>}/>
      <Route path='adminrequest' element={<ProtectedRoutes user={user}><AdminRequest/></ProtectedRoutes>}/>
      <Route path='session' element={<GuestRoutes user={user}><Session/></GuestRoutes>}/>
      <Route path="reset-password" element={<GuestRoutes user={user}><ResetPassword/></GuestRoutes>} />

      
     <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
    </>
    
    
  ))
  return (
    <div className="App">
      <RouterProvider router={router}/>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
