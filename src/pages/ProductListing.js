import React from 'react';

import { useLocation } from 'react-router-dom';
import ProductList from './../components/ProductList/ProductList'

const ProductListingPage = () => {
    const path = useLocation().pathname.substring(1);
    return <ProductList authorName={path} />
}

export default ProductListingPage;