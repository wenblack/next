import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import login from '@/lib/login';


// GET products/
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    login(req, res)
    if(req.method === 'GET'){
          const result = await prisma.product.findMany({
          });
          let total = result.length
          if (total === 0)
          res.status(HttpStatusCode.BadRequest).json({error : 'There is no registered product'});
          else  
          res.json({total ,products: result});
    }else{
       res.status(HttpStatusCode.MethodNotAllowed).json({error: 'Wrong method'});
    }
  }

