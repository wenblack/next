import bcrypt from 'bcryptjs';
import jwt from '@/utils/jwt';
import prisma from '@/lib/prisma'
import { HttpStatusCode } from 'axios';
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST"){
      const {email, password} = req.body
      if(!email || !password){
        res.status(HttpStatusCode.BadRequest).json({error : 'Some required fields are missing'})
      }
      const userExists = await prisma.user.findUnique({
        where:{
          email: String(email)
        }
      })
        const isValidPassword = await bcrypt.compare(password, String(userExists?.password));
        if(!userExists)
          res.status(HttpStatusCode.BadRequest).json({error : 'user not found'})
        else if(userExists && !isValidPassword)
          res.status(HttpStatusCode.BadRequest).json({error : 'Wrong username or password'})
        else{
          const token = jwt.sign({ id: userExists.id, email: userExists.email })
          const {isAdmin , id, email:userName } = userExists
          res.status(HttpStatusCode.Accepted).json({ id,  userName, token , isAdmin });
        }
    
    }
    else {res.status(HttpStatusCode.MethodNotAllowed).json({error: "Method not Allowed"})}
  }