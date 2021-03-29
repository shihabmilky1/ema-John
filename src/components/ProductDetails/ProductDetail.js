import React , {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product,setProduct] = useState({})
    useEffect(()=>{
        fetch('https://obscure-shore-45833.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productKey])
    // const product = fakeData.find(pd=> pd.key === productKey);
    console.log(product)
    return (
        <div>
           
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;