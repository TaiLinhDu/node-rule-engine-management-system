import React, { useEffect, useState } from 'react';
import axios from 'axios-backend';



const BusinessRuleEditor = () => {

    const [articles, setArticles] = useState([]);
    const [shoppingCart, setShoppingCart] = useState([]);

    return (
        <>
            <iframe 
                src="https://www.json-rule-editor.com/" 
                frameBorder="0" 
                width="100%"
                height="100vh">
            </iframe>
        </>
    );
}

export default BusinessRuleEditor;