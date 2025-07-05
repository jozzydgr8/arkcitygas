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

function App() {
  const {dispatch} = UseDataContext();
//useEffect to fetch product
useEffect(()=>{
  const fetchData = async ()=>{
    try{
      const response = await fetch('http://localhost:5000/product');
      const json = await response.json();
      console.log('product',json)
      dispatch({type:'getProduct', payload:json})

    }catch(error){
      console.error(error)
    }


  }
  fetchData();
},[]);

//useeffect to fetch orders

useEffect(()=>{
  const fetchData = async ()=>{
    try{
      const response = await fetch('http://localhost:5000/order');
      const json = await response.json();
      console.log('order',json)
      dispatch({type:'getOrders', payload:json})

    }catch(error){
      console.error(error)
    }


  }
  fetchData();
},[]);


  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/arkcitygas' element={<Outlet/>}>
      <Route index element={<Home/>}/>
      {/* <Route path=':category' element={<CategoryLayout/>}/> */}
    </Route>

    <Route path='/admin_jctbdil1$'element={<Main/>}>
      <Route index element={<Dashboard/>}/>
      <Route path='manageorders' element={<ManageOrders/>}/>
      <Route path='product' element={<Outlet/>}>
        <Route path='addproduct' element={<AddProduct/>}/>
        <Route path=':id' element={<DashboardProduct/>}/>
      </Route>

      

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
