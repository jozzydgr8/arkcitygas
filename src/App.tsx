import {createRoutesFromElements, RouterProvider, createBrowserRouter, Route, Outlet} from 'react-router-dom'
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
useEffect(()=>{
handle({type:'loading',payload:true})
const user = localStorage.getItem('user');
if(user){
  handle({type:'getUser', payload:JSON.parse(user)})
}
handle({type:'loading',payload:false})
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



if(loading || authLoading){
  return <Loading/>
}



  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/arkcitygas' element={<Outlet/>}>
      <Route index element={<Home/>}/>
    </Route>

    <Route path='/admin_jctbdil1$'element={<Main/>}>
      <Route index element={<ProtectedRoutes user={user}><Dashboard/></ProtectedRoutes>}/>
      <Route path='manageorders' element={<ProtectedRoutes user={user}><ManageOrders/></ProtectedRoutes>}/>
      <Route path='product' element={<ProtectedRoutes user={user}><Outlet/></ProtectedRoutes>}>
        <Route path='addproduct' element={<AddProduct/>}/>
        <Route path=':id' element={<DashboardProduct/>}/>
      </Route>
      <Route path='adminrequest' element={<ProtectedRoutes user={user}><AdminRequest/></ProtectedRoutes>}/>
      <Route path='session' element={<GuestRoutes user={user}><Session/></GuestRoutes>}/>

      

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
