import { Request, Response } from 'express';
import { sendSuccess, sendCreated, sendInternalError } from "../../helpers/response.helper";
import { dbOrder, IOrderModel } from "../../models/order.model";
import { dbArticle, IArticleModel } from "../../models/article.model";
import { checkJwt } from '../../helpers/json-web-token/json-web-token-helper';
import { dbBusinessrule } from '../../models/businessrule.model';
import { sendUnprocessable } from '../../helpers/request-response-helper/response-status';
const { Engine } = require('json-rules-engine');
const path = require('path');
const fs = require('fs');

export const getOrder = async (req: Request, res: Response) => {
    const order: IOrderModel | null = await dbOrder.findById(req.query.orderid);
    sendSuccess(res, order);
};

export const createOrder = async (req: Request, res: Response) => {
    const newOrder: IOrderModel | null = await dbOrder.create(req.body);
    sendCreated(res, newOrder);
};

export const updateOrder = async (req: Request, res: Response) => {
    const updateOrderById: IOrderModel | null = await dbOrder.findByIdAndUpdate(req.query.orderid, req.body, {
        new: true
    });
    sendSuccess(res, updateOrderById);
};

export const deleteOrder = async (req: Request, res: Response) => {
    const deleteOrderById: IOrderModel | null = await dbOrder.findByIdAndDelete(req.query.orderid);
    sendSuccess(res, deleteOrderById);
};

interface OrderArticle {
    articleName: string,
    articlePrice: Number
    numberOfOrderedArticle: Number
}

export const calculationPrice = async (req: Request, res: Response) => {
    // let checkedUser = checkJwt(req.body.token);
    let orderedArticles: OrderArticle[] = req.body.articles;
    // // define a promise to use later for serilize
    // let promise = Promise.resolve();



    //  orderedArticles.forEach( (orderedArticle: OrderArticle, index: any) => {
    //     promise = promise.then(async() => {
    //         const thisArticle = await dbArticle.findById(orderedArticle.articleId);
    //         if (thisArticle) orderedArticle.articlePrice= thisArticle.price;

    //         console.log(orderedArticle.articlePrice)
    //     })
    //     })

    // promise.then(() => {
    //     // TODO Verify Token and add email
    //     const calPriceResult = calPrice(orderedArticles, checkedUser.email );
        
    //     sendSuccess(res, calPriceResult);
    // })


    let ruleSetJson =  await dbBusinessrule.findOne({_id: "61be5c54ca383a002c72289c"});
    if (ruleSetJson) {
        let rulesObject= JSON.parse(ruleSetJson.rules);

        let engine = new Engine(rulesObject.decisions);
    
        let sumPrice = 0.00;
        for (let orderArticle of orderedArticles){
            sumPrice = sumPrice + Number(Number(orderArticle.articlePrice) * Number(orderArticle.numberOfOrderedArticle));
        }
    
        let shippingCost = 0.00;
        let endPrice = 0.00;
        let tax = 0.19;
        let discount: any[] = [];
    
        let facts = {
            partnerEmail: req.body.email.split('@')[1],
            totalPrice: sumPrice,
            DateInMilliseconds: Date.now()    
        }
    
    
        engine
        .run(facts)
        .then((engineResult: any) => {
            engineResult.events.forEach( (element: any) => {
                if (element.params.tax){
                    tax = element.params.tax
                } 

                if (element.params.shippingCost) {
                    shippingCost = element.params.shippingCost
                }

                if (element.params.discount) {
                    discount.push(element.params.discount)
                }
            });

            sendSuccess(res, {
                shippingCost: shippingCost,
                sumPrice: sumPrice,
                discount: discount,
                tax: tax
            })
        })
    } else {
        sendUnprocessable(res, "Business Rule Set Problem! Please contact system admin")
    }
};




/**
 * calculation preis through the rule
 * 
 * Wenn das Account von der Firma A oder von der Hochschule B kommt, sollte das Account 20% discount bekommt, 
 * Wenn man mehr als 50 Euro kaufen, sollte das Versandkosten frei sind, 
 * wegen eines Events sollte jeder Einkauf im Zeitraum (dd.mm.yyyy - dd.mm.yyy) 5 Euro Discount  
 * bekommt
 * 
 * 
 * @param listArticles 
 * @param userId 
 */
const calPrice = async (listOrderArticles: OrderArticle[], userEmail: string) => {

    // let ruleSetJson =  await dbBusinessrule.findById()
    // let rulesObject= JSON.parse(ruleSetJson);
    // console.log(rulesObject);

    // let engine = new Engine(rulesObject.decisions);

    // let sumPrice = 0.00;
    // for (let orderArticle of listOrderArticles){
    //     sumPrice = sumPrice + Number(Number(orderArticle.articlePrice) * Number(orderArticle.numberOfOrderedArticle));
    // }

    // let shippingCost = 0.00;
    // let endPrice = 0.00;
    // let tax = 0.19;

    // let facts = {
    //     partnerEmail: userEmail.split('@')[1],
    //     totalPrice: sumPrice,
    //     dateInMilliseconds: Date.now()    
    // }


    // engine
    // .run(facts)
    // .then((events: any) => {
    //     console.log(events)
    // })

    // return {
    //     shippingCost: shippingCost,
    //     sumPrice: sumPrice,
    //     endPrice: endPrice === 0.00 ? sumPrice : endPrice,
    // }

    /*

    // listArticles.map(async (orderedArticle: OrderArticle) => {
    //     const thisArticle = await dbArticle.findById();
    // })
    const listOfPartnerCompany = ["h-da,bartenbach,google,adesso,arithnea,adidas,rossman,rewe"];
    let sumPrice = 0.00;
    for (let orderArticle of listOrderArticles){
        sumPrice = sumPrice + Number(Number(orderArticle.articlePrice) * Number(orderArticle.numberOfOrderedArticle));
    }

    console.log(sumPrice);

    let shippingCost = 0.00;

    let endPrice = 0.00;

    let tax = 0.19;

    // partner company
    if ( listOfPartnerCompany.includes(userEmail) && sumPrice > 200){
        endPrice = sumPrice - sumPrice*0.4;
    } else if (listOfPartnerCompany.includes(userEmail)) {
        endPrice = sumPrice - sumPrice*0.2;
    }

    // Events
    // new: 15.09.2021 - 22.09.2021 und 1.12.2021 - 2.12.2021
    // 01.09.2021 - 10.09.2021: Versandkosten free all thing
    let startZeit = new Date("09/01/2021 00:00:00").getTime();
    let endZeit = new Date("09/10/2021 00:00:00").getTime();
    let now = Date.now()
    if ( now > startZeit && now < endZeit){
        shippingCost = 0.00;
    }
    
    // shipping
    if (sumPrice < 40 && !listOfPartnerCompany.includes(userEmail)) {
        shippingCost = 4.99;
    }

    return {
        shippingCost: shippingCost,
        sumPrice: sumPrice,
        endPrice: endPrice === 0.00 ? sumPrice : endPrice,
    }

    */
}