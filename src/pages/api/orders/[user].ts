import prisma from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import type { NextApiRequest, NextApiResponse } from "next";
import login from '@/lib/login';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
 login(req, res)
 if(req.method=== 'GET'){
     const { user } = req.query;
     const userExists = await prisma.user.findUnique({
      where:{
        email: String(user)
      }
     })
     if(!userExists){
      res.status(HttpStatusCode.NotFound).json({error : "User not Found"})
     }else{
       const result = await prisma.order.findMany({
             where:{
                  user: String(user)
             },select:{
             amount:true,
             product:true,
             status:true,
             productPrice:true
           },orderBy:{
             createdAt:'desc'
           }
         })
         if(result.length === 0)
         res.status(HttpStatusCode.NotFound).json({error : "Orders not Found for this user"})
         else
         res.json({total:result.length, result});
     }       
 }else{
  res.status(HttpStatusCode.MethodNotAllowed).json({error: 'Wrong method'});
  }

  }