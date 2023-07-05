import { NextApiRequest, NextApiResponse } from "next";


 const urls = { 
    "products": "https://next-liart-delta.vercel.app/api/products/", 
    "orders": "https://next-liart-delta.vercel.app/api/orders",
}


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET'){
        res.status(200).json(urls)
    }
    
}