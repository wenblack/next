import jwt from '@/utils/jwt';
import { HttpStatusCode } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next'

 
async function login (req: NextApiRequest, res: NextApiResponse ) {
  const token = req.headers.authorization 
  if(!token){
    res.status(HttpStatusCode.Unauthorized).json({message : "No token provided"})
  }else{
    try {
    jwt.verify(token);
    return
  } catch {
    res.status(HttpStatusCode.Unauthorized).json({error:'Unauthorized'})
  }
    res.status(HttpStatusCode.Ok)
  }
}

export default login