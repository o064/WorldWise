import { lazy, Suspense } from 'react';
import { BrowserRouter  ,Routes ,Route, Navigate} from 'react-router-dom';

import { AuthProvider } from './contexts/AuthCotext';
import {CityProvider } from './contexts/CityContext';

import ProtectedRoute from './components/ProtectedRoute';
import City from './components/City';
import Form from './components/Form';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import SpinnerFullPage from './components/SpinnerFullPage';


import './App.css';

//  Lazy Loading 
const HomePage = lazy(()=> import("/src/Pages/Homepage"));
const Product = lazy(()=> import("/src/Pages/Product"));
const Pricing = lazy(()=> import("/src/Pages/Pricing"));
const PageNotFound = lazy(()=> import("/src/Pages/PageNotFound"));
const AppLayout = lazy(()=> import("/src/Pages/AppLayout"));
const Login = lazy(()=> import("/src/Pages/Login"));

function App() {
  return (
    <AuthProvider >
      <CityProvider >
          <BrowserRouter>
            <Suspense  fallback={ <SpinnerFullPage />}>
                <Routes>
                  <Route  index element = {<HomePage />}/>
                  <Route  path='product' element = {<Product />}/>
                  <Route  path='pricing' element = {<Pricing />}/>
                  <Route  path='app' element = {
                    <ProtectedRoute >
                      <AppLayout />
                    </ProtectedRoute>
                    }>
                    <Route index element={<Navigate replace to="cities"/>}/>
                    <Route path='cities' element={<CityList />}/>
                    <Route path='cities/:id' element={<City />}/>
                    <Route path='countries' element={<CountryList />}/>
                    <Route path='form' element={<Form />}/>
                  </Route>
                  <Route  path='login' element = {<Login />}/>
                  <Route  path='*' element = {<PageNotFound />}/>
                </Routes>
            </Suspense>
          </BrowserRouter>
      </CityProvider>
    </AuthProvider>

  )

}
export default App
