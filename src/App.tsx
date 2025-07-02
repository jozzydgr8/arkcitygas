import {createRoutesFromElements, RouterProvider, createBrowserRouter, Route, Outlet} from 'react-router-dom'
import { Home } from './pages/homepage/Home';
import { Main } from './admin/Main';
import { Dashboard } from './admin/pages/Dashboard';
import { DashboardProduct } from './admin/pages/DashboardProduct';
function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/arkcitygas' element={<Outlet/>}>
      <Route index element={<Home/>}/>
      {/* <Route path=':category' element={<CategoryLayout/>}/> */}
    </Route>

    <Route path='/admin_jctbdil1$'element={<Main/>}>
      <Route index element={<Dashboard/>}/>
      <Route path='product/:id' element={<DashboardProduct/>}/>

    </Route>
    </>
    
    
  ))
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
