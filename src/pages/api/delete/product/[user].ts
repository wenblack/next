import prisma from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import type { NextApiRequest, NextApiResponse } from "next";
import login from '@/lib/login';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
 login(req, res)
 
if(req.method === 'PATCH'){
  const { user } = req.query;
  const userExists= await prisma.user.findUnique({
    where:{
      email: String(user)
    }
  })
  const userisAdmin = userExists?.isAdmin
  
  if(!userExists){
    res.status(HttpStatusCode.BadRequest).json({error: "User not found"})
  }else if(userExists && !userisAdmin){
    res.status(HttpStatusCode.BadRequest).json({error:"User don't have permission"})
  }else{
    const {name} = req.body
    const productExists = await prisma.product.findUnique({
      where:{
        name:name
      }
    })
    if(!name){
      res.status(HttpStatusCode.BadRequest).json({error : 'Some required fields are missing'})
    }else if(!productExists){
      res.status(HttpStatusCode.BadRequest).json({error : 'Product not registered'})
    }
    else{
      const deletedProduct = await prisma.product.delete({
      where:{
        name: name
      }
    })
    res.status(200).json({message: `${deletedProduct.name} deleted`})
    }
    }
    
  }
else{
  res.status(HttpStatusCode.MethodNotAllowed).json({error: 'Wrong method'});
  }
}