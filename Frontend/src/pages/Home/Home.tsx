import React, { useEffect, useState } from 'react';
import axios from 'axios-backend';

interface OrderArticle {
    articleId: string,
    articlePreis: Number
    numberOfOrderedArticle: Number
}

const Home = () => {

    const [articles, setArticles] = useState([]);
    const [shoppingCart, setShoppingCart] = useState([]);

    useEffect(() => {
        axios.get("article")
        .then((res) => {
            if (res.data.docs){
                setArticles(res.data.docs);
                console.log(res.data.docs);
            }
        })
    },[]);

    return (
        <>
        <div>
            List of Articles:
            {articles.map(article => {
                return (
                    <div>
                        
                    </div>
                )
            })}
        </div>

        </>
    );
}

export default Home;