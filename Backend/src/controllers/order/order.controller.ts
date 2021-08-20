import { Request, Response } from 'express';
import { sendSuccess, sendCreated } from "../../helpers/response.helper";
import { dbOrder, IOrderModel } from "../../models/order.model";
import { dbArticle, IArticleModel } from "../../models/article.model";
import { checkJwt } from '../../helpers/json-web-token/json-web-token-helper';



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

export const calculationPrice = async (req: Request, res: Response) => {
    let checkedUser = checkJwt(req.body.token);
    let orderedArticles: OrderArticle[] = req.body.articles;
    // define a promise to use later for serilize
    let promise = Promise.resolve();



     orderedArticles.forEach( (orderedArticle: OrderArticle, index: any) => {
        promise = promise.then(async() => {
            const thisArticle = await dbArticle.findById(orderedArticle.articleId);
            if (thisArticle) orderedArticle.articlePrice= thisArticle.price;

            console.log(orderedArticle.articlePrice)
        })
        })

    promise.then(() => {
        // TODO Verify Token and add email
        const calPriceResult = calPrice(orderedArticles, checkedUser.email );
        
        sendSuccess(res, calPriceResult);
    })
};


interface OrderArticle {
    articleId: string,
    articlePrice: Number
    numberOfOrderedArticle: Number
}

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
const calPrice = (listOrderArticles: OrderArticle[], userEmail: string) => {
    // listArticles.map(async (orderedArticle: OrderArticle) => {
    //     const thisArticle = await dbArticle.findById();
    // })
    const listOfPartnerCompany = ["h-da,bartenbach,google,adesso,arithnea,adidas,rossman,rewe"];
    let sumPrice = 0.00;
    for (let orderArticle of listOrderArticles){
        sumPrice = sumPrice + Number(Number(orderArticle.articlePrice) * Number(orderArticle.numberOfOrderedArticle));
    }

    console.log(sumPrice);

    let shippingCost = 4.99;

    let endPrice = 0.00;

    // partner company
    if ( listOfPartnerCompany.includes(userEmail) && sumPrice > 200){
        endPrice = sumPrice - sumPrice*0.4;
    } else if (listOfPartnerCompany.includes(userEmail)) {
        endPrice = sumPrice - sumPrice*0.2;
    }

    // Events
    // 01.09.2021 - 10.09.2021: Versandkosten free all thing
    let startZeit = new Date("09/01/2021 00:00:00").getTime();
    let endZeit = new Date("09/10/2021 00:00:00").getTime();
    let now = Date.now()
    if ( now > startZeit && now < endZeit){
        shippingCost = 0.00;
    }
    
    // shipping free
    if (sumPrice > 40) {
        shippingCost = 0.00;
    }

    return {
        shippingCost: shippingCost,
        sumPrice: sumPrice,
        endPrice: endPrice === 0.00 ? sumPrice : endPrice,
    }
}