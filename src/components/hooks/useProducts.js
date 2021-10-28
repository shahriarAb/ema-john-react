import { useState, useEffect } from "react";

const useProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://ancient-reef-85789.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data.products))
    }, []);
    // return necessary things
    return [products, setProducts];
}

export default useProducts;