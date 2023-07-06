import prisma from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import type { NextApiRequest, NextApiResponse } from "next";
import login from '@/lib/login';

// GET products/id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
 login(req, res)
if(req.method === "GET"){
   const { name } = req.query;
   const categorieExists = await prisma.categorie.findUnique({
    where:{
      name:String(name)
    }
   })
   if(!categorieExists){
    res.status(HttpStatusCode.NotFound).json({error: `Categorie doesn't exist` })
   }else{
     const result = await prisma.product.findMany({
         where:{
             categorie: String(name)
         }
     })
     const total = result.length
     if(result.length === 0)
     res.status(HttpStatusCode.NotFound).json({error : 'There is no Product in Categorie'})
     else
     res.json({total, result});
   }

} else{
  res.status(HttpStatusCode.MethodNotAllowed).json({error: 'Wrong method'});
  }
  }