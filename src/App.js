import React from 'react';

import LandingPage from './pages/LandingPage'
import ProductListingPage from './pages/ProductListing';
import ProductItemPage from './pages/ProductItem';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';

import Header from './components/Header/Header';
import Form from './components/Form/Form';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/:authorName' element={<ProductListingPage />} exact></Route>
        <Route path='/profile' element={<ProfilePage />} exact></Route>
        <Route path='/cart' element={<CartPage />} exact></Route>
        <Route path='/' element={<LandingPage />} exact></Route>
        <Route path="/form/:formType" element={<Form />} exact></Route>
        <Route path="/:authorName/:id" element={<ProductItemPage />}></Route>
      </Routes>

    </Router>
  );
}

export default App;
