import { useState, useEffect } from "react";

const useProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    // return necessary things
    return [products, setProducts];
}

export default useProducts;