import React, { useEffect, useState } from 'react';
import axios from 'axios-backend';

interface OrderArticle {
    articleId: string,
    articlePreis: Number
    numberOfOrderedArticle: Number
}

const FakeOrder = () => {

    const [resultCheckedRule, setResultCheckedRule] = useState(null);

    useEffect(() => {
        axios.post("order/calculation", {
            "email": "abc@h-da.de",
            "articles": [{
                "articleName": "Articel 1",
                "articlePrice": 5.99,
                "numberOfOrderedArticle": 10
            },{
                "articleName": "Articel 2",
                "articlePrice": 15.99,
                "numberOfOrderedArticle": 1
            },{
                "articleName": "Articel 3",
                "articlePrice": 25.99,
                "numberOfOrderedArticle": 10
            }]
        })
        .then((res) => {
            if (res.status === 200 && res.data.docs){
                console.log("RuleCheck",res.data.docs)
                console.log("RuleCheck",JSON.stringify(res.data.docs))
                setResultCheckedRule(res.data.docs);
            }
        })
    },[]);

    return (
        <>
        <div>
            Example of use case rule engine management system
        </div>
        <div>
            UserEmail: abc@h-da.de 
        </div>
        <div>
            Fake Shopping cart:
            <div>
                Article: Articel 1 <br />
                Article Price: 5.99 EU <br />
                Number of ordered Article: 10 <br />
            </div>

            <div>
                Article: Articel 2 <br />
                Article Price: 15.99 EU <br />
                Number of ordered Article: 1 <br />
            </div>

            <div>
                Article: Articel 3 <br />
                Article Price: 25.99 EU <br />
                Number of ordered Article: 10 <br />
            </div>
        </div>
        <div>
            <input type="button" value="Check Rule for this Order" />
        </div>
        <div>
            Result Check: <br />
            {resultCheckedRule? JSON.stringify(resultCheckedRule) : ""}
        </div>
        </>
    );
}

export default FakeOrder;
