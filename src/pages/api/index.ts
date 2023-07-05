import { NextApiRequest, NextApiResponse } from "next";


 const urls = { 
    "products": "https://next-liart-delta.vercel.app/products/", 
    "orders": "https://next-liart-delta.vercel.app/orders",
}


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET'){
        res.status(200).json(urls)
    }
    
}