import prisma from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import type { NextApiRequest, NextApiResponse } from "next";
import login from '@/lib/login';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
 login(req, res)
 
if(req.method === 'POST'){
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
    const {name, description, price, categorie} = req.body
    const productExists = await prisma.product.findUnique({
      where:{
        name:name
      }
    })
    if(!name || !description || !price ){
      res.status(HttpStatusCode.BadRequest).json({error : 'Some required fields are missing'})
    }else if(productExists){
      res.status(HttpStatusCode.BadRequest).json({error : 'Product Already registered'})
    }
    else{
      const newProduct = await prisma.product.create({
      data:{
        name: name,
        description : description,
        price: price,
        categorie:categorie
      }
    })
    res.status(200).json({newProduct})
    }
    
  }
}else{
  res.status(HttpStatusCode.MethodNotAllowed).json({error: 'Wrong method'});
  }
}