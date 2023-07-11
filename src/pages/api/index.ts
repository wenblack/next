import { NextApiRequest, NextApiResponse } from "next";


 const urls = { 
    "products": "https://wenblack-ubiquitous-space-trout-4qjrprppv57cjjg6-3000.preview.app.github.dev/api/products/", 
    "orders": "https://wenblack-ubiquitous-space-trout-4qjrprppv57cjjg6-3000.preview.app.github.dev/api/orders",
}


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET'){
        res.status(200).json(urls)
    }
    
}