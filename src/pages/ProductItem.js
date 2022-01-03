import React from 'react';
import { useLocation } from 'react-router-dom';

import ProductItem from './../components/ProductItem/ProductItem'

const ProductItemPage = () => {
    const path = useLocation().pathname;
    const authorAndProduct = path.split('/');
    authorAndProduct.shift();


    const authorName = authorAndProduct[0];
    const productId = authorAndProduct[1];

    return <>
        <ProductItem authorName={authorName} productId={productId} />
    </>
}

export default ProductItemPage;