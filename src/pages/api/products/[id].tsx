import prisma from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import type { NextApiRequest, NextApiResponse } from "next";
import login from '@/lib/login';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
 login(req, res)

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
  }