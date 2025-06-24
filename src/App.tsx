import {createRoutesFromElements, RouterProvider, createBrowserRouter, Route} from 'react-router-dom'
import { Home } from './pages/homepage/Home';
import { Layout } from './Layout';
import { CategoryLayout } from './pages/Category/CategoryLayout';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path=':id' element={<CategoryLayout/>}/>
    </Route>
  ))
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
