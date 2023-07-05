import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import login from '@/lib/login';


// GET /api/post
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    login(req, res)

    const result = await prisma.order.findMany({
      select:{
        amount:true,
        product:true,
        status:true,
        productPrice:true
      },orderBy:{
        user:'asc'
      }
    });
    let total = result.length
    if (total === 0)
    res.status(HttpStatusCode.BadRequest).json({message : "There is no order registered"});
    else  
    res.json({total ,orders: result});
  }

