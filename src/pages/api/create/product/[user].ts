import prisma from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import type { NextApiRequest, NextApiResponse } from "next";
import login from '@/lib/login';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
 login(req, res)
 
if(req.method = 'POST'){
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
    res.status(200).json({message: 'Admin conected'})
  }
}else{
  res.status(HttpStatusCode.MethodNotAllowed).json({error: 'Wrong method'});
  }
}