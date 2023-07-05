import prisma from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import type { NextApiRequest, NextApiResponse } from "next";
import login from '@/lib/login';

// GET products/id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
 login(req, res)
if(req.method === "GET"){
   const { id } = req.query;
     const result = await prisma.product.findUnique({
         where:{
             id : String(id)
         }
     })
     if(result === null)
     res.status(HttpStatusCode.NotFound).json({error : 'Product not Found'})
     else
     res.json(result);

} else{
  res.status(HttpStatusCode.MethodNotAllowed).json({error: 'Wrong method'});
  }
  }